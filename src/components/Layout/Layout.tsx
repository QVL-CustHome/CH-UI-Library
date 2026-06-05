import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export interface ChLayoutProps {
  brand?: string;
  header?: ReactNode;
  maxWidth?: number | string;
  children: ReactNode;
}

export function Layout({ brand = "CustHome", header, maxWidth = 380, children }: ChLayoutProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        backgroundColor: "background.default",
      }}
    >
      {header !== undefined ? (
        header
      ) : (
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
          {brand}
        </Typography>
      )}
      <Box style={{ width: "100%", maxWidth }}>{children}</Box>
    </Box>
  );
}
