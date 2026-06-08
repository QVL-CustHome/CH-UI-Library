import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Heading } from "../components/Heading";
import { InputEmail } from "../components/Input";
import { Stack } from "../components/Stack";
import { ChThemeProvider } from "../theme";
import { palette, paletteDark, radius, shadows, spacing, typography } from "../tokens";

export default {
  title: "Accueil",
};

export const Presentation = () => (
  <Box sx={{ maxWidth: 720 }}>
    <Typography variant="h3" component="h1" gutterBottom>
      @custhome/ui
    </Typography>
    <Typography paragraph>
      Design system CustHome : librairie de composants React partagée entre tous les portails de
      l'écosystème. Wrapper autour de MUI — les portails n'importent jamais MUI directement.
    </Typography>
    <Typography paragraph>
      Envelopper l'application dans <code>ChThemeProvider</code> suffit à obtenir le rendu
      CustHome. Les tokens sont résolus en CSS variables <code>--ch-*</code> au runtime et
      restent surchargeables sans rebuild (voir docs/THEMING.md).
    </Typography>
    <Typography paragraph>
      Composants : Button, Input (Text/Email/Password), Feedback, Card, Layout, Spinner, Icon.
    </Typography>
  </Box>
);

const colorGroups = {
  primary: palette.primary,
  secondary: palette.secondary,
  accent: palette.accent,
  error: palette.error,
  warning: palette.warning,
  info: palette.info,
  success: palette.success,
} as const;

export const Couleurs = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    {Object.entries(colorGroups).map(([group, shades]) => (
      <Box key={group}>
        <Typography variant="h6" gutterBottom>
          {group}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {Object.entries(shades).map(([shade, value]) => (
            <Box key={shade} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 96,
                  height: 48,
                  backgroundColor: value,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
              <Typography variant="caption" display="block">
                {shade}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    ))}
    <Box>
      <Typography variant="h6" gutterBottom>
        fond, texte et séparateurs
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {Object.entries({ ...palette.background, ...palette.text, divider: palette.divider }).map(
          ([name, value]) => (
            <Box key={name} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 96,
                  height: 48,
                  backgroundColor: value,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
              <Typography variant="caption" display="block">
                {name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {value}
              </Typography>
            </Box>
          )
        )}
      </Box>
    </Box>
  </Box>
);

export const Typographie = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Typography variant="body2" color="text.secondary">
      {typography.fontFamily}
    </Typography>
    {Object.entries(typography.heading).map(([name, size]) => (
      <Typography key={name} sx={{ fontSize: size, fontWeight: typography.fontWeight.bold }}>
        {name} ({size}) — CustHome
      </Typography>
    ))}
    {Object.entries(typography.fontSize).map(([name, size]) => (
      <Typography key={name} sx={{ fontSize: size }}>
        {name} ({size}) — Portail client CustHome
      </Typography>
    ))}
    <Box sx={{ display: "flex", gap: 3 }}>
      {Object.entries(typography.fontWeight).map(([name, weight]) => (
        <Typography key={name} sx={{ fontWeight: weight }}>
          {name} ({weight})
        </Typography>
      ))}
    </Box>
  </Box>
);

export const ModeSombre = () => (
  <ChThemeProvider mode="dark">
    <Box sx={{ backgroundColor: paletteDark.background.default, padding: 4 }}>
      <Card>
        <Heading>Connexion</Heading>
        <Stack as="form" onSubmit={(e) => e.preventDefault()}>
          <InputEmail label="Email" value="" onChange={() => {}} />
          <Button type="submit" fullWidth>
            Se connecter
          </Button>
        </Stack>
      </Card>
    </Box>
  </ChThemeProvider>
);

export const Espacements = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
    {Object.entries(spacing)
      .filter(([name]) => name !== "unit")
      .map(([name, value]) => (
        <Box key={name} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ width: 80 }}>
            {name} ({value})
          </Typography>
          <Box sx={{ height: 16, width: value, backgroundColor: "primary.main" }} />
        </Box>
      ))}
  </Box>
);

export const RadiusEtOmbres = () => (
  <Box sx={{ display: "flex", gap: 4 }}>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {Object.entries(radius).map(([name, value]) => (
        <Box key={name} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 120,
              height: 48,
              borderRadius: value,
              border: "2px solid",
              borderColor: "primary.main",
            }}
          />
          <Typography variant="caption">
            {name} ({value})
          </Typography>
        </Box>
      ))}
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {Object.entries(shadows).map(([name, value]) => (
        <Box key={name} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 120,
              height: 48,
              boxShadow: value,
              borderRadius: 1,
              backgroundColor: "background.paper",
            }}
          />
          <Typography variant="caption">{name}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);
