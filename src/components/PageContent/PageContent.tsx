import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { Stack } from "../Stack";

export interface ChPageContentProps {
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function PageContent({ title, footer, children }: ChPageContentProps) {
  return (
    <MuiCard elevation={1}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        {title ? (
          <Heading level={2} size={4}>
            {title}
          </Heading>
        ) : null}
        <Stack gap="md">{children}</Stack>
        {footer}
      </CardContent>
    </MuiCard>
  );
}
