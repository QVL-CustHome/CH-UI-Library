import {
  DEFAULT_CHUNK_SIZE,
  DEFAULT_MAX_RETRIES_PER_CHUNK,
  DEFAULT_RETRY_BASE_DELAY_MS,
} from "./constants";
import {
  firstMissingChunkIndex,
  pendingChunks,
  planChunks,
  type ChunkRange,
} from "./chunks";
import { withRetry } from "./retry";
import { selectStrategy } from "./strategy";
import type {
  StartUploadParams,
  UploadPhase,
  UploadProgress,
  UploadResult,
  UploadStrategy,
  UploadTransportOptions,
} from "./types";
import {
  createUploadTransport,
  type UploadTransport,
} from "./uploadTransport";

export interface UploaderOptions extends UploadTransportOptions {
  chunkSize?: number;
  maxRetriesPerChunk?: number;
  retryBaseDelayMs?: number;
  onProgress?: (progress: UploadProgress) => void;
  transport?: UploadTransport;
}

export interface Uploader {
  start: (params: StartUploadParams) => Promise<UploadResult>;
  pause: () => void;
  resume: () => Promise<UploadResult>;
  abort: () => Promise<void>;
  getProgress: () => UploadProgress;
}

class AbortError extends Error {
  constructor() {
    super("Upload interrompu");
    this.name = "AbortError";
  }
}

class PauseError extends Error {
  constructor() {
    super("Upload en pause");
    this.name = "PauseError";
  }
}

export function createUploader(options: UploaderOptions): Uploader {
  const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const maxRetriesPerChunk =
    options.maxRetriesPerChunk ?? DEFAULT_MAX_RETRIES_PER_CHUNK;
  const retryBaseDelayMs =
    options.retryBaseDelayMs ?? DEFAULT_RETRY_BASE_DELAY_MS;
  const transport =
    options.transport ?? createUploadTransport(options);

  let currentParams: StartUploadParams | null = null;
  let sessionId: string | null = null;
  let strategy: UploadStrategy = "chunked";
  let chunks: ChunkRange[] = [];
  let totalBytes = 0;
  let uploadedBytes = 0;
  let completedChunkCount = 0;
  let phase: UploadPhase = "idle";
  let pauseRequested = false;
  let abortController: AbortController | null = null;

  function buildProgress(): UploadProgress {
    const ratio = totalBytes === 0 ? 0 : uploadedBytes / totalBytes;
    return {
      phase,
      strategy,
      uploadedBytes,
      totalBytes,
      ratio,
      percentage: Math.round(ratio * 100),
      chunkCount: chunks.length,
      completedChunkCount,
    };
  }

  function emit(next: UploadPhase): void {
    phase = next;
    options.onProgress?.(buildProgress());
  }

  function ensureController(): AbortController {
    if (!abortController) {
      abortController = new AbortController();
    }
    return abortController;
  }

  async function runSingleShot(): Promise<UploadResult> {
    const params = currentParams;
    if (!params) {
      throw new Error("Aucun upload en cours");
    }
    const { source } = params;
    const controller = ensureController();
    emit("uploading");
    const bytes = await source.slice(0, source.size);
    const node = await transport.uploadSingleShot(
      source.name,
      bytes,
      source.mime,
      params.parentId,
      controller.signal
    );
    uploadedBytes = totalBytes;
    completedChunkCount = chunks.length;
    emit("completed");
    return { strategy, node };
  }

  async function sendChunks(): Promise<void> {
    const params = currentParams;
    if (!params || !sessionId) {
      throw new Error("Aucun upload en cours");
    }
    const controller = ensureController();
    const remaining = pendingChunks(chunks, uploadedBytes, chunkSize);
    for (const chunk of remaining) {
      if (controller.signal.aborted) {
        throw new AbortError();
      }
      if (pauseRequested) {
        throw new PauseError();
      }
      const bytes = await params.source.slice(chunk.start, chunk.end);
      const result = await withRetry(
        () =>
          transport.putChunk(
            sessionId as string,
            chunk.index,
            bytes,
            controller.signal
          ),
        {
          maxRetries: maxRetriesPerChunk,
          baseDelayMs: retryBaseDelayMs,
          signal: controller.signal,
        }
      );
      uploadedBytes = result.received_bytes;
      completedChunkCount = chunk.index + 1;
      emit("uploading");
    }
  }

  async function finalizeChunked(): Promise<UploadResult> {
    if (!sessionId) {
      throw new Error("Aucune session a finaliser");
    }
    emit("completing");
    const node = await transport.complete(sessionId);
    uploadedBytes = totalBytes;
    completedChunkCount = chunks.length;
    emit("completed");
    return { strategy, node };
  }

  async function runChunked(): Promise<UploadResult> {
    const params = currentParams;
    if (!params) {
      throw new Error("Aucun upload en cours");
    }
    emit("opening");
    const session = await transport.open({
      parent_id: params.parentId,
      file_name: params.source.name,
      declared_size: params.source.size,
      chunk_size: chunkSize,
      declared_mime: params.source.mime,
      checksum: params.checksum,
    });
    sessionId = session.session_id;
    uploadedBytes = session.received_bytes;
    chunks = planChunks(totalBytes, chunkSize);
    emit("uploading");
    await sendChunks();
    return finalizeChunked();
  }

  async function continueChunked(): Promise<UploadResult> {
    if (!sessionId) {
      throw new Error("Aucune session a reprendre");
    }
    emit("opening");
    const session = await transport.status(sessionId);
    uploadedBytes = session.received_bytes;
    chunks = planChunks(totalBytes, chunkSize);
    completedChunkCount = firstMissingChunkIndex(uploadedBytes, chunkSize);
    emit("uploading");
    await sendChunks();
    return finalizeChunked();
  }

  async function drive(
    runner: () => Promise<UploadResult>
  ): Promise<UploadResult> {
    try {
      return await runner();
    } catch (error) {
      if (error instanceof PauseError) {
        emit("paused");
        throw error;
      }
      if (error instanceof AbortError) {
        emit("aborted");
        throw error;
      }
      emit("error");
      throw error;
    }
  }

  async function start(params: StartUploadParams): Promise<UploadResult> {
    currentParams = params;
    sessionId = null;
    abortController = new AbortController();
    pauseRequested = false;
    totalBytes = params.source.size;
    uploadedBytes = 0;
    completedChunkCount = 0;
    strategy = selectStrategy(params.source.size);
    chunks = planChunks(totalBytes, chunkSize);
    return drive(strategy === "single-shot" ? runSingleShot : runChunked);
  }

  function pause(): void {
    if (phase === "uploading") {
      pauseRequested = true;
    }
  }

  async function resume(): Promise<UploadResult> {
    if (!currentParams) {
      throw new Error("Aucun upload a reprendre");
    }
    pauseRequested = false;
    abortController = new AbortController();
    if (strategy === "single-shot") {
      return drive(runSingleShot);
    }
    if (!sessionId) {
      return drive(runChunked);
    }
    return drive(continueChunked);
  }

  async function abort(): Promise<void> {
    pauseRequested = false;
    abortController?.abort(new AbortError());
    if (sessionId) {
      try {
        await transport.abort(sessionId);
      } finally {
        sessionId = null;
      }
    }
    emit("aborted");
  }

  return {
    start,
    pause,
    resume,
    abort,
    getProgress: buildProgress,
  };
}
