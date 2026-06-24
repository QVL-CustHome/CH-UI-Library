import type { UploadSource } from "../core";

export function fileUploadSource(file: File): UploadSource {
  return {
    name: file.name,
    size: file.size,
    mime: file.type || undefined,
    slice: async (start, end) => {
      const buffer = await file.slice(start, end).arrayBuffer();
      return new Uint8Array(buffer);
    },
  };
}
