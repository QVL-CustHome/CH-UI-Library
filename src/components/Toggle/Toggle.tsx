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
  color = "accent",
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
      position="relative"
      width={`${s.track.w / 16}rem`}
      height={`${s.track.h / 16}rem`}
      padding={0}
      border="none"
      borderRadius={999}
      bgcolor={checked ? `${color}.main` : "grey.400"}
      flexShrink={0}
      sx={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "default" : "pointer",
        transition: "background-color 200ms ease",
      }}
    >
      <Box
        position="absolute"
        top={`${s.offset / 16}rem`}
        left={`${thumbLeft / 16}rem`}
        width={`${s.thumb / 16}rem`}
        height={`${s.thumb / 16}rem`}
        borderRadius="50%"
        bgcolor="common.white"
        boxShadow={1}
        sx={{
          transition: "left 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </Box>
  );
}
