import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import { Heading } from "../Heading";

export interface ChLayoutProps {
  brand?: string;
  
  logo?: ReactNode;
  header?: ReactNode;
  maxWidth?: number | string;
  children: ReactNode;
}

export function Layout({
  brand = "CustHome",
  logo,
  header,
  maxWidth = 380,
  children,
}: ChLayoutProps) {
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, marginBottom: 2 }}>
          {logo}
          <Heading level={1} size={2} gutterBottom={false} color="accent.main">
            {brand}
          </Heading>
        </Box>
      )}
      <Box style={{ width: "100%", maxWidth }}>{children}</Box>
    </Box>
  );
}
