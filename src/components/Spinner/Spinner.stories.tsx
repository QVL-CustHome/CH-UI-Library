import Box from "@mui/material/Box";
import { Spinner } from "./Spinner";

export default {
  title: "Composants / Spinner",
};

export const Tailles = () => (
  <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
    <Spinner size="small" />
    <Spinner size="medium" />
    <Spinner size="large" />
  </Box>
);

export const PleinePage = () => <Spinner fullPage label="Chargement de la page" />;
PleinePage.meta = { iframed: true };
