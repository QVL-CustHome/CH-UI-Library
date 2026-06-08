import { useTranslation } from "../../i18n";
import { useChTheme } from "../../theme";

export interface UseThemeToggleResult {
  isDark: boolean;
  label: string;
  toggle: () => void;
}

export function useThemeToggle(): UseThemeToggleResult {
  const { resolvedMode, toggleMode } = useChTheme();
  const { t } = useTranslation();
  const isDark = resolvedMode === "dark";
  return {
    isDark,
    label: isDark ? t("ch.themeToggle.toLight") : t("ch.themeToggle.toDark"),
    toggle: toggleMode,
  };
}
