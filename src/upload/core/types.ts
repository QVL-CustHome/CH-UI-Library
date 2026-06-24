export type UploadSessionState =
  | "open"
  | "completing"
  | "completed"
  | "aborted";

export interface UploadSessionResponse {
  session_id: string;
  parent_id: string;
  file_name: string;
  declared_size: number;
  reserved_bytes: number;
  chunk_size: number;
  chunk_count: number;
  state: UploadSessionState;
  received_bytes: number;
  expires_at: string;
}

export interface OpenUploadBody {
  parent_id?: string;
  file_name: string;
  declared_size: number;
  chunk_size: number;
  declared_mime?: string;
  checksum?: string;
}

export interface PutChunkResponse {
  session_id: string;
  chunk_index: number;
  received_bytes: number;
  declared_size: number;
}

export interface UploadNode {
  id: string;
  parent_id: string;
  name: string;
  mime?: string;
  size: number;
}

export type UploadBytes = Uint8Array<ArrayBuffer>;

export interface UploadSource {
  name: string;
  size: number;
  mime?: string;
  slice: (start: number, end: number) => Promise<UploadBytes>;
}

export type UploadStrategy = "single-shot" | "chunked";

export type UploadPhase =
  | "idle"
  | "opening"
  | "uploading"
  | "completing"
  | "completed"
  | "paused"
  | "aborted"
  | "error";

export interface UploadProgress {
  phase: UploadPhase;
  strategy: UploadStrategy;
  uploadedBytes: number;
  totalBytes: number;
  ratio: number;
  percentage: number;
  chunkCount: number;
  completedChunkCount: number;
}

export interface UploadResult {
  strategy: UploadStrategy;
  node: UploadNode;
}

export type TokenProvider = () => string | null | Promise<string | null>;

export interface UploadTransportOptions {
  basePath: string;
  filesPath?: string;
  getToken: TokenProvider;
}

export interface StartUploadParams {
  source: UploadSource;
  parentId?: string;
  checksum?: string;
}
