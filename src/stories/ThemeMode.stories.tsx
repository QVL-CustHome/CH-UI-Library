import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Heading } from "../components/Heading";
import { Stack } from "../components/Stack";
import { InputText } from "../components/Input";
import { useChTheme } from "../theme";

export default {
  title: "Thème / Bascule clair-sombre",
};

const PREFERENCES = ["light", "dark", "system"] as const;

export const Bascule = () => {
  const { mode, resolvedMode, setMode, toggleMode } = useChTheme();
  const [value, setValue] = useState("");
  return (
    <Box sx={{ maxWidth: 520 }}>
      <Heading level={2}>Bascule de thème au runtime</Heading>
      <Typography paragraph>
        Le hook <code>useChTheme()</code> expose la préférence (<code>{mode}</code>), le mode
        effectivement appliqué (<code>{resolvedMode}</code>) et les actions de bascule. Le choix
        est persisté dans <code>localStorage</code>.
      </Typography>
      <Stack gap="md">
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {PREFERENCES.map((pref) => (
            <Button
              key={pref}
              variant={mode === pref ? "primary" : "secondary"}
              onClick={() => setMode(pref)}
            >
              {pref}
            </Button>
          ))}
          <Button variant="secondary" onClick={toggleMode}>
            toggle
          </Button>
        </Box>
        <Card>
          <Heading level={3}>Aperçu</Heading>
          <Typography paragraph>
            Tous les composants reflètent immédiatement le mode <strong>{resolvedMode}</strong>.
          </Typography>
          <InputText
            label="Champ d'exemple"
            placeholder="Saisie…"
            value={value}
            onChange={setValue}
          />
        </Card>
      </Stack>
    </Box>
  );
};
