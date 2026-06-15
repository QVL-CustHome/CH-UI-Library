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
      sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 0.75 }}
    >
      {items.map((item) => (
        <Box
          component="li"
          key={item.key}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box
            sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0 }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>{item.content}</Box>
          {item.action ? <Box sx={{ flexShrink: 0 }}>{item.action}</Box> : null}
        </Box>
      ))}
    </Box>
  );
}
