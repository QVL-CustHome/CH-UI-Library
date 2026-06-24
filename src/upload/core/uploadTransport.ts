import { ApiError } from "../../http";
import type {
  OpenUploadBody,
  PutChunkResponse,
  TokenProvider,
  UploadBytes,
  UploadNode,
  UploadSessionResponse,
  UploadTransportOptions,
} from "./types";

export interface UploadTransport {
  open: (body: OpenUploadBody) => Promise<UploadSessionResponse>;
  putChunk: (
    sessionId: string,
    chunkIndex: number,
    bytes: UploadBytes,
    signal?: AbortSignal
  ) => Promise<PutChunkResponse>;
  status: (sessionId: string) => Promise<UploadSessionResponse>;
  complete: (sessionId: string) => Promise<UploadNode>;
  abort: (sessionId: string) => Promise<void>;
  uploadSingleShot: (
    fileName: string,
    bytes: UploadBytes,
    mime: string | undefined,
    parentId: string | undefined,
    signal?: AbortSignal
  ) => Promise<UploadNode>;
}

async function authorizationHeader(
  getToken: TokenProvider
): Promise<Record<string, string>> {
  const token = await getToken();
  if (!token) {
    throw new ApiError(401, "Token JWT indisponible", "missing_token");
  }
  return { Authorization: `Bearer ${token}` };
}

async function readError(response: Response): Promise<ApiError> {
  let message = `Erreur ${response.status}`;
  let code: string | undefined;
  try {
    const body = await response.json();
    if (typeof body?.error === "string") code = body.error;
    if (typeof body?.message === "string") message = body.message;
    else if (code) message = code;
  } catch {
    message = `Erreur ${response.status}`;
  }
  return new ApiError(response.status, message, code);
}

async function parseJson<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export function createUploadTransport({
  basePath,
  filesPath = "/files",
  getToken,
}: UploadTransportOptions): UploadTransport {
  const send = async (
    path: string,
    init: RequestInit
  ): Promise<Response> => {
    const auth = await authorizationHeader(getToken);
    const response = await fetch(`${basePath}${path}`, {
      ...init,
      headers: { ...auth, ...(init.headers ?? {}) },
    });
    if (!response.ok) {
      throw await readError(response);
    }
    return response;
  };

  const open: UploadTransport["open"] = async (body) => {
    const response = await send("/v1/uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return parseJson<UploadSessionResponse>(response);
  };

  const putChunk: UploadTransport["putChunk"] = async (
    sessionId,
    chunkIndex,
    bytes,
    signal
  ) => {
    const response = await send(
      `/v1/uploads/${sessionId}/chunks/${chunkIndex}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/octet-stream" },
        body: bytes,
        signal,
      }
    );
    return parseJson<PutChunkResponse>(response);
  };

  const status: UploadTransport["status"] = async (sessionId) => {
    const response = await send(`/v1/uploads/${sessionId}`, {
      method: "GET",
    });
    return parseJson<UploadSessionResponse>(response);
  };

  const complete: UploadTransport["complete"] = async (sessionId) => {
    const response = await send(`/v1/uploads/${sessionId}/complete`, {
      method: "POST",
    });
    return parseJson<UploadNode>(response);
  };

  const abort: UploadTransport["abort"] = async (sessionId) => {
    await send(`/v1/uploads/${sessionId}`, { method: "DELETE" });
  };

  const uploadSingleShot: UploadTransport["uploadSingleShot"] = async (
    fileName,
    bytes,
    mime,
    parentId,
    signal
  ) => {
    const form = new FormData();
    const blob = new Blob([bytes], {
      type: mime ?? "application/octet-stream",
    });
    form.append("file", blob, fileName);
    if (parentId) {
      form.append("parent_id", parentId);
    }
    const response = await send(filesPath, {
      method: "POST",
      body: form,
      signal,
    });
    return parseJson<UploadNode>(response);
  };

  return {
    open,
    putChunk,
    status,
    complete,
    abort,
    uploadSingleShot,
  };
}
