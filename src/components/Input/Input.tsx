import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField from "@mui/material/TextField";
import { useState } from "react";
import { useTranslation } from "../../i18n";
import { Icon, type ChIconName } from "../Icon";

export type ChInputType = "text" | "email" | "password" | "tel" | "url" | "number";
export type ChInputSize = "small" | "medium";

export interface ChInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: ChInputType;
  name?: string;
  placeholder?: string;
  helperText?: string;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  size?: ChInputSize;
  icon?: ChIconName;
  validate?: (value: string) => string | null;
}

export function Input({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  helperText,
  error,
  required = false,
  disabled = false,
  fullWidth = true,
  autoComplete,
  autoFocus = false,
  size = "medium",
  icon,
  validate,
}: ChInputProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;
  const shownError = error ?? localError;

  const handleChange = (next: string) => {
    onChange(next);
    if (localError !== null && validate) {
      setLocalError(validate(next));
    }
  };

  const handleBlur = () => {
    if (validate) {
      setLocalError(validate(value));
    }
  };

  const startAdornment = icon ? (
    <InputAdornment position="start">
      <Icon name={icon} variant="outline" size={20} color="var(--ch-palette-secondary-main)" />
    </InputAdornment>
  ) : undefined;

  const endAdornment = isPassword ? (
    <InputAdornment position="end">
      <IconButton
        aria-label={showPassword ? t("ch.input.hidePassword") : t("ch.input.showPassword")}
        onClick={() => setShowPassword((visible) => !visible)}
        edge="end"
        size="small"
      >
        <Icon name={showPassword ? "eyeOff" : "eye"} variant="outline" size={20} />
      </IconButton>
    </InputAdornment>
  ) : undefined;

  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      onBlur={handleBlur}
      type={resolvedType}
      name={name}
      placeholder={placeholder}
      helperText={shownError ?? helperText}
      error={Boolean(shownError)}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      size={size}
      slotProps={{ input: { startAdornment, endAdornment } }}
    />
  );
}
