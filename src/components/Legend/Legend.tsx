import Box from "@mui/material/Box";

export type ChLegendStatus = "neutral" | "success" | "warning" | "error";

export interface ChLegendEntry {
  status: ChLegendStatus;
  label: string;
}

export interface ChLegendProps {
  items: ChLegendEntry[];
}

const statusColor: Record<ChLegendStatus, string> = {
  neutral: "text.secondary",
  success: "success.main",
  warning: "warning.main",
  error: "error.main",
};

export function Legend({ items }: ChLegendProps) {
  return (
    <Box
      component="ul"
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      gap="1rem"
      margin="0"
      padding="0"
      sx={{ listStyle: "none" }}
    >
      {items.map((item) => (
        <Box
          component="li"
          key={`${item.status}-${item.label}`}
          display="flex"
          alignItems="center"
          gap="0.5rem"
          color="text.secondary"
          fontSize="0.875rem"
        >
          <Box
            width="0.75rem"
            height="0.75rem"
            borderRadius="50%"
            bgcolor={statusColor[item.status]}
            flexShrink={0}
          />
          {item.label}
        </Box>
      ))}
    </Box>
  );
}
