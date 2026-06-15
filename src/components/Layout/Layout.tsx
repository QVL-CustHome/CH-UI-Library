import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { ReactNode } from "react";
import { Heading } from "../Heading";
import { ShapeBackground } from "../ShapeBackground";

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
    <ShapeBackground component="main">
      {header !== undefined ? (
        header
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, marginBottom: 2 }}>
          {logo}
          <Heading level={1} size={2} gutterBottom={false} color="primary.contrastText">
            {brand}
          </Heading>
        </Box>
      )}
      <MuiCard elevation={1} style={{ width: "100%", maxWidth }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>{children}</CardContent>
      </MuiCard>
    </ShapeBackground>
  );
}
