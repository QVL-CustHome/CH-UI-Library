import Box from "@mui/material/Box";
import { StatusChip } from "./StatusChip";

export default {
  title: "Composants / StatusChip",
};

export const Tonalites = () => (
  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
    <StatusChip tone="success" label="Actif" />
    <StatusChip tone="warning" label="En attente" />
    <StatusChip tone="error" label="Désactivé" />
    <StatusChip tone="info" label="Information" />
    <StatusChip tone="neutral" label="Neutre" />
  </Box>
);

export const Tailles = () => (
  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
    <StatusChip tone="success" label="Small" size="small" />
    <StatusChip tone="success" label="Medium" size="medium" />
  </Box>
);
