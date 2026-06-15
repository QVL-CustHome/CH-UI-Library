import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export interface ChCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "small" | "medium";
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  size = "medium",
}: ChCheckboxProps) {
  const control = (
    <MuiCheckbox
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      disabled={disabled}
      size={size}
      color="primary"
    />
  );

  if (!label) {
    return control;
  }

  return <FormControlLabel control={control} label={label} disabled={disabled} />;
}
