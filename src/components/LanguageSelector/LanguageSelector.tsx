import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslation } from "../../i18n";
import type { ChLocale } from "../../i18n";

export function LanguageSelector() {
  const { locale, locales, setLocale, t } = useTranslation();

  if (locales.length < 2) return null;

  return (
    <Select
      size="small"
      color="secondary"
      value={locale}
      onChange={(event) => setLocale(event.target.value as ChLocale)}
      aria-label={t("ch.language.label")}
      sx={{ minWidth: 84 }}
    >
      {locales.map((entry) => (
        <MenuItem key={entry} value={entry}>
          {entry.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
}
