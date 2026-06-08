import { useTranslation } from "../../i18n";
import { PASSWORD_MIN_LENGTH, isValidPassword } from "../../validation";
import { Input, type ChInputProps } from "./Input";

export type ChInputPasswordProps = Omit<ChInputProps, "type" | "icon" | "validate">;

export function InputPassword({
  autoComplete = "current-password",
  required,
  ...rest
}: ChInputPasswordProps) {
  const { t } = useTranslation();
  const validate = (value: string): string | null => {
    if (required && value === "") return t("ch.validation.required");
    if (value !== "" && !isValidPassword(value)) {
      return t("ch.validation.passwordMin", { min: PASSWORD_MIN_LENGTH });
    }
    return null;
  };
  return (
    <Input
      type="password"
      icon="lock"
      autoComplete={autoComplete}
      required={required}
      validate={validate}
      {...rest}
    />
  );
}
