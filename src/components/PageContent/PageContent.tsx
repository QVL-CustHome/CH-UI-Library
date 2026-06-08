import type { ReactNode } from "react";
import { Card } from "../Card";
import { Heading } from "../Heading";
import { Stack } from "../Stack";

export interface ChPageContentProps {
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function PageContent({ title, footer, children }: ChPageContentProps) {
  return (
    <Card>
      {title ? (
        <Heading level={2} size={4}>
          {title}
        </Heading>
      ) : null}
      <Stack gap="md">{children}</Stack>
      {footer}
    </Card>
  );
}
