import Box from "@mui/material/Box";
import { Icon } from "../Icon";
import { useThemeToggle } from "./useThemeToggle";

export function ThemeToggle() {
  const { isDark, label, toggle } = useThemeToggle();
  return (
    <Box
      component="button"
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      onClick={toggle}
      sx={{
        position: "relative",
        width: 58,
        height: 30,
        padding: 0,
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        backgroundColor: isDark ? "secondary.main" : "secondary.light",
        transition: "background-color 220ms ease",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 3,
          left: isDark ? 31 : 3,
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "background.paper",
          boxShadow: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "left 220ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Icon
          name={isDark ? "moon" : "sun"}
          variant="solid"
          size={16}
          color={isDark ? "var(--ch-palette-primary-main)" : "var(--ch-palette-accent-main)"}
        />
      </Box>
    </Box>
  );
}
