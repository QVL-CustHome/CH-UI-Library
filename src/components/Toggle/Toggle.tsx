import Box from "@mui/material/Box";

export type ChToggleColor = "primary" | "secondary" | "accent" | "success";

export interface ChToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: "small" | "medium";
  color?: ChToggleColor;
}

const sizes = {
  small: { track: { w: 40, h: 22 }, thumb: 16, offset: 3 },
  medium: { track: { w: 52, h: 28 }, thumb: 22, offset: 3 },
} as const;

export function Toggle({
  checked,
  onChange,
  disabled = false,
  label,
  size = "medium",
  color = "primary",
}: ChToggleProps) {
  const s = sizes[size];
  const thumbLeft = checked ? s.track.w - s.thumb - s.offset : s.offset;

  return (
    <Box
      component="button"
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      sx={{
        position: "relative",
        width: s.track.w,
        height: s.track.h,
        padding: 0,
        border: "none",
        borderRadius: 999,
        cursor: disabled ? "default" : "pointer",
        bgcolor: checked ? `${color}.main` : "grey.400",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 200ms ease",
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: s.offset,
          left: thumbLeft,
          width: s.thumb,
          height: s.thumb,
          borderRadius: "50%",
          bgcolor: "#fff",
          boxShadow: 1,
          transition: "left 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </Box>
  );
}
