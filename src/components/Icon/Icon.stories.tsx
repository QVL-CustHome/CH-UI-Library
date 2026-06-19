import Box from "@mui/material/Box";
import { Icon } from "./Icon";

export default {
  title: "Composants / Icon",
};

export const Variantes = () => (
  <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
    <Icon name="sun" variant="outline" />
    <Icon name="sun" variant="solid" />
    <Icon name="moon" variant="outline" />
    <Icon name="moon" variant="solid" />
  </Box>
);

export const CouleursDuTheme = () => (
  <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
    <Icon name="sun" variant="solid" size="lg" color="accent" />
    <Icon name="moon" variant="solid" size="lg" color="primary" />
    <Icon name="sun" variant="outline" size="lg" color="info" />
  </Box>
);
