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
      position="relative"
      width="3.625rem"
      height="1.875rem"
      padding={0}
      border="none"
      borderRadius={999}
      bgcolor={isDark ? "secondary.main" : "secondary.light"}
      sx={{
        cursor: "pointer",
        transition: "background-color 220ms ease",
      }}
    >
      <Box
        position="absolute"
        top="0.1875rem"
        left={isDark ? "1.9375rem" : "0.1875rem"}
        width="1.5rem"
        height="1.5rem"
        borderRadius="50%"
        bgcolor="background.paper"
        boxShadow={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
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
