import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ElementType, ReactNode } from "react";

const TRIANGLE = "polygon(50% 0%, 0% 100%, 100% 100%)";

type ShapeSx = Record<string, unknown>;

const desktopShapes: ShapeSx[] = [
  { top: "-5.625rem", left: "-4.375rem", width: "18.75rem", height: "18.75rem", borderRadius: "50%", backgroundColor: "accent.main", opacity: 0.85 },
  { bottom: "-7%", right: "7%", width: "14.375rem", height: "14.375rem", borderRadius: "3.25rem", backgroundColor: "secondary.light", opacity: 0.5, transform: "rotate(20deg)" },
  { top: "12%", right: "-3.125rem", width: "13.125rem", height: "13.125rem", backgroundColor: "accent.light", clipPath: TRIANGLE, opacity: 0.55, transform: "rotate(12deg)" },
  { bottom: "20%", left: "-3.4375rem", width: "13.75rem", height: "6.875rem", borderRadius: "13.75rem 13.75rem 0 0", backgroundColor: "primary.light", opacity: 0.7 },
  { top: "9%", left: "26%", width: "8.75rem", height: "3rem", borderRadius: "62.4375rem", backgroundColor: "accent.main", opacity: 0.45, transform: "rotate(-14deg)" },
  { bottom: "10%", left: "42%", width: "8.125rem", height: "8.125rem", borderRadius: "100% 0 0 0", backgroundColor: "background.paper", opacity: 0.14 },
  { top: "30%", left: "13%", width: "1.25rem", height: "1.25rem", borderRadius: "50%", backgroundColor: "background.paper", opacity: 0.7 },
  { top: "62%", right: "12%", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "secondary.light", opacity: 0.8 },
  { top: "46%", right: "26%", width: "5.625rem", height: "5.625rem", backgroundColor: "primary.light", clipPath: TRIANGLE, opacity: 0.4, transform: "rotate(200deg)" },
  { bottom: "26%", right: "16%", width: "7.5rem", height: "7.5rem", borderRadius: "50%", backgroundColor: "accent.main", opacity: 0.7 },
  { top: "20%", left: "8%", width: "6.875rem", height: "6.875rem", borderRadius: "1.875rem", backgroundColor: "accent.light", opacity: 0.55, transform: "rotate(16deg)" },
  { bottom: "8%", left: "20%", width: "7.5rem", height: "7.5rem", backgroundColor: "accent.main", clipPath: TRIANGLE, opacity: 0.5, transform: "rotate(-24deg)" },
  { top: "54%", left: "32%", width: "4.375rem", height: "1.75rem", borderRadius: "62.4375rem", backgroundColor: "accent.light", opacity: 0.6, transform: "rotate(10deg)" },
  { top: "16%", right: "20%", width: "1.375rem", height: "1.375rem", borderRadius: "50%", backgroundColor: "accent.main", opacity: 0.8 },
  { bottom: "44%", left: "6%", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "accent.light", opacity: 0.85 },
];

const mobileShapes: ShapeSx[] = [
  { top: "-3.75rem", right: "-3.125rem", width: "11.875rem", height: "11.875rem", borderRadius: "50%", backgroundColor: "accent.main", opacity: 0.85 },
  { top: "9%", left: "-1.875rem", width: "7.5rem", height: "7.5rem", backgroundColor: "secondary.light", clipPath: TRIANGLE, opacity: 0.5, transform: "rotate(12deg)" },
  { bottom: "-2.625rem", left: "18%", width: "10.625rem", height: "5.3125rem", borderRadius: "10.625rem 10.625rem 0 0", backgroundColor: "primary.light", opacity: 0.7 },
  { bottom: "7%", right: "-2.125rem", width: "7.5rem", height: "7.5rem", borderRadius: "1.875rem", backgroundColor: "accent.light", opacity: 0.55, transform: "rotate(18deg)" },
  { top: "38%", left: "10%", width: "1rem", height: "1rem", borderRadius: "50%", backgroundColor: "background.paper", opacity: 0.7 },
  { top: "30%", right: "14%", width: "3.75rem", height: "1.375rem", borderRadius: "62.4375rem", backgroundColor: "accent.main", opacity: 0.45, transform: "rotate(-12deg)" },
];

export interface ChShapeBackgroundProps {
  children?: ReactNode;
  color?: string;
  minHeight?: number | string;
  component?: ElementType;
  sx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

export function ShapeBackground({
  children,
  color = "primary.main",
  minHeight = "100vh",
  component = "div",
  sx,
  contentSx,
}: ChShapeBackgroundProps) {
  return (
    <Box
      component={component}
      sx={[
        {
          position: "relative",
          overflow: "hidden",
          minHeight,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          backgroundColor: color,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        aria-hidden
        sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}
      >
        {desktopShapes.map((shape, index) => (
          <Box key={`d-${index}`} sx={{ position: "absolute", display: { xs: "none", md: "block" }, ...shape }} />
        ))}
        {mobileShapes.map((shape, index) => (
          <Box key={`m-${index}`} sx={{ position: "absolute", display: { xs: "block", md: "none" }, ...shape }} />
        ))}
      </Box>
      <Box
        sx={[
          {
            position: "relative",
            zIndex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
          ...(Array.isArray(contentSx) ? contentSx : [contentSx]),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}
