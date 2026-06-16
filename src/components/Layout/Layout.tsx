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
        <Box
          position="fixed"
          top={{ xs: "2.5rem", md: "3.5rem" }}
          left={0}
          right={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="0.75rem"
          zIndex={2}
          sx={{ pointerEvents: "none" }}
        >
          {logo}
          <Heading level={1} size={2} gutterBottom={false} color="primary.contrastText">
            {brand}
          </Heading>
        </Box>
      )}
      <MuiCard elevation={1} style={{ width: "100%", maxWidth }}>
        <CardContent sx={{ padding: { xs: "1rem", sm: "1.5rem" } }}>{children}</CardContent>
      </MuiCard>
    </ShapeBackground>
  );
}
