import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ElementType, ReactNode } from "react";

const TRIANGLE = "polygon(50% 0%, 0% 100%, 100% 100%)";

type ShapeSx = Record<string, unknown>;

const desktopShapes: ShapeSx[] = [
  { top: -90, left: -70, width: 300, height: 300, borderRadius: "50%", bgcolor: "accent.main", opacity: 0.85 },
  { bottom: "-7%", right: "7%", width: 230, height: 230, borderRadius: "52px", bgcolor: "secondary.light", opacity: 0.5, transform: "rotate(20deg)" },
  { top: "12%", right: "-50px", width: 210, height: 210, bgcolor: "accent.light", clipPath: TRIANGLE, opacity: 0.55, transform: "rotate(12deg)" },
  { bottom: "20%", left: "-55px", width: 220, height: 110, borderRadius: "220px 220px 0 0", bgcolor: "primary.light", opacity: 0.7 },
  { top: "9%", left: "26%", width: 140, height: 48, borderRadius: 999, bgcolor: "accent.main", opacity: 0.45, transform: "rotate(-14deg)" },
  { bottom: "10%", left: "42%", width: 130, height: 130, borderRadius: "100% 0 0 0", bgcolor: "background.paper", opacity: 0.14 },
  { top: "30%", left: "13%", width: 20, height: 20, borderRadius: "50%", bgcolor: "background.paper", opacity: 0.7 },
  { top: "62%", right: "12%", width: 16, height: 16, borderRadius: "50%", bgcolor: "secondary.light", opacity: 0.8 },
  { top: "46%", right: "26%", width: 90, height: 90, bgcolor: "primary.light", clipPath: TRIANGLE, opacity: 0.4, transform: "rotate(200deg)" },
  { bottom: "26%", right: "16%", width: 120, height: 120, borderRadius: "50%", bgcolor: "accent.main", opacity: 0.7 },
  { top: "20%", left: "8%", width: 110, height: 110, borderRadius: "30px", bgcolor: "accent.light", opacity: 0.55, transform: "rotate(16deg)" },
  { bottom: "8%", left: "20%", width: 120, height: 120, bgcolor: "accent.main", clipPath: TRIANGLE, opacity: 0.5, transform: "rotate(-24deg)" },
  { top: "54%", left: "32%", width: 70, height: 28, borderRadius: 999, bgcolor: "accent.light", opacity: 0.6, transform: "rotate(10deg)" },
  { top: "16%", right: "20%", width: 22, height: 22, borderRadius: "50%", bgcolor: "accent.main", opacity: 0.8 },
  { bottom: "44%", left: "6%", width: 16, height: 16, borderRadius: "50%", bgcolor: "accent.light", opacity: 0.85 },
];

const mobileShapes: ShapeSx[] = [
  { top: -60, right: -50, width: 190, height: 190, borderRadius: "50%", bgcolor: "accent.main", opacity: 0.85 },
  { top: "9%", left: "-30px", width: 120, height: 120, bgcolor: "secondary.light", clipPath: TRIANGLE, opacity: 0.5, transform: "rotate(12deg)" },
  { bottom: -42, left: "18%", width: 170, height: 85, borderRadius: "170px 170px 0 0", bgcolor: "primary.light", opacity: 0.7 },
  { bottom: "7%", right: "-34px", width: 120, height: 120, borderRadius: "30px", bgcolor: "accent.light", opacity: 0.55, transform: "rotate(18deg)" },
  { top: "38%", left: "10%", width: 16, height: 16, borderRadius: "50%", bgcolor: "background.paper", opacity: 0.7 },
  { top: "30%", right: "14%", width: 60, height: 22, borderRadius: 999, bgcolor: "accent.main", opacity: 0.45, transform: "rotate(-12deg)" },
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
          padding: 2,
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
