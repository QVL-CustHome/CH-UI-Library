import { SINGLE_SHOT_THRESHOLD } from "./constants";
import type { UploadStrategy } from "./types";

export function selectStrategy(declaredSize: number): UploadStrategy {
  return declaredSize < SINGLE_SHOT_THRESHOLD ? "single-shot" : "chunked";
}
