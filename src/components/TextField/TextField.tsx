import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField from "@mui/material/TextField";
import SvgIcon from "@mui/material/SvgIcon";
import { useState } from "react";

export type ChTextFieldType = "text" | "email" | "password" | "number" | "tel" | "url";
export type ChTextFieldSize = "small" | "medium";

export interface ChTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: ChTextFieldType;
  name?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  size?: ChTextFieldSize;
}

function EyeIcon() {
  return (
    <SvgIcon fontSize="small">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </SvgIcon>
  );
}

function EyeOffIcon() {
  return (
    <SvgIcon fontSize="small">
      <path d="M12 7a5 5 0 0 1 5 5c0 .65-.13 1.26-.36 1.83l2.92 2.92A11.82 11.82 0 0 0 23 12c-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55A3 3 0 0 0 12 15c.22 0 .44-.03.65-.08l1.55 1.55A4.97 4.97 0 0 1 7 12c0-.79.18-1.53.53-2.2z" />
    </SvgIcon>
  );
}

export function TextField({
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
  fullWidth = false,
  autoComplete,
  autoFocus = false,
  size = "medium",
}: ChTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type={resolvedType}
      name={name}
      placeholder={placeholder}
      helperText={error ?? helperText}
      error={Boolean(error)}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      size={size}
      slotProps={{
        input: {
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={() => setShowPassword((visible) => !visible)}
                edge="end"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}
