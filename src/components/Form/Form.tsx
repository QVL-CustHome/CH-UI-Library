import type { ReactNode } from "react";
import { Button } from "../Button";
import { Feedback } from "../Feedback";
import { Stack, type ChStackGap } from "../Stack";
import { useForm } from "./useForm";

export interface ChFormProps {
  onSubmit: () => void | Promise<void>;
  submitLabel?: string;
  loading?: boolean;
  error?: string | null;
  gap?: ChStackGap;
  children: ReactNode;
}

export function Form({
  onSubmit,
  submitLabel,
  loading = false,
  error = null,
  gap = "md",
  children,
}: ChFormProps) {
  const { handleSubmit } = useForm({ onSubmit });
  return (
    <Stack as="form" gap={gap} onSubmit={handleSubmit}>
      {children}
      {error ? <Feedback severity="error">{error}</Feedback> : null}
      {submitLabel && (
        <Button type="submit" loading={loading} fullWidth>
          {submitLabel}
        </Button>
      )}
    </Stack>
  );
}
