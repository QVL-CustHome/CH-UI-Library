import Box from "@mui/material/Box";
import type { ReactNode } from "react";

export interface ChBulletListItem {
  key: string;
  content: ReactNode;
  action?: ReactNode;
}

export interface ChBulletListProps {
  items: ChBulletListItem[];
}

export function BulletList({ items }: ChBulletListProps) {
  return (
    <Box
      component="ul"
      sx={{ listStyle: "none" }}
      padding="0"
      margin="0"
      display="flex"
      flexDirection="column"
      gap="0.375rem"
    >
      {items.map((item) => (
        <Box
          component="li"
          key={item.key}
          display="flex"
          alignItems="center"
          gap="0.5rem"
        >
          <Box
            width="0.4375rem"
            height="0.4375rem"
            borderRadius="50%"
            bgcolor="primary.main"
            flexShrink={0}
          />
          <Box flex={1} minWidth={0}>{item.content}</Box>
          {item.action ? <Box flexShrink={0}>{item.action}</Box> : null}
        </Box>
      ))}
    </Box>
  );
}
