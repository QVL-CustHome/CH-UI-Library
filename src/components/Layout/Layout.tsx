import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export interface ChLayoutProps {
  brand?: string;
  /** Logo de la marque, affiché à gauche du brand dans l'en-tête par défaut. */
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
          <Typography variant="h4" component="h1" sx={{ color: "accent.main" }}>
            {brand}
          </Typography>
        </Box>
      )}
      <Box style={{ width: "100%", maxWidth }}>{children}</Box>
    </Box>
  );
}
