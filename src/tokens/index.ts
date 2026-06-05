import { palette } from "./palette";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const tokens = {
  palette,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export type ChTokens = typeof tokens;

export { palette, typography, spacing, radius, shadows };
