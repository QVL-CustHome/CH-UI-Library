import { useTranslation } from "../../i18n";
import { isValidEmail } from "../../validation";
import { Input, type ChInputProps } from "./Input";

export type ChInputEmailProps = Omit<ChInputProps, "type" | "icon" | "validate">;

export function InputEmail({ autoComplete = "email", required, ...rest }: ChInputEmailProps) {
  const { t } = useTranslation();
  const validate = (value: string): string | null => {
    if (required && value.trim() === "") return t("ch.validation.required");
    if (value !== "" && !isValidEmail(value)) return t("ch.validation.email");
    return null;
  };
  return (
    <Input
      type="email"
      icon="mail"
      autoComplete={autoComplete}
      required={required}
      validate={validate}
      {...rest}
    />
  );
}
