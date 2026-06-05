import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../tokens";
import { ChThemeProvider } from "./ChThemeProvider";
import { chTheme, createChTheme } from "./createChTheme";

function ThemeProbe() {
  const theme = useTheme();
  return <span data-testid="probe">{theme.vars?.palette.primary.main}</span>;
}

function ModeProbe() {
  const theme = useTheme();
  return <span data-testid="mode">{theme.palette.mode}</span>;
}

describe("createChTheme", () => {
  it("alimente la palette MUI avec les tokens de marque", () => {
    const theme = createChTheme();
    expect(theme.palette.primary.main).toBe(tokens.palette.primary.main);
    expect(theme.palette.background.default).toBe(tokens.palette.background.default);
    expect(theme.palette.divider).toBe(tokens.palette.divider);
  });

  it("expose la couleur d'accent CustHome", () => {
    expect(createChTheme().palette.accent.main).toBe(tokens.palette.accent.main);
    expect(createChTheme("dark").palette.accent.main).toBe(tokens.paletteDark.accent.main);
  });

  it("décline le thème en mode sombre depuis paletteDark", () => {
    const dark = createChTheme("dark");
    expect(dark.palette.mode).toBe("dark");
    expect(dark.palette.primary.main).toBe(tokens.paletteDark.primary.main);
    expect(dark.palette.background.default).toBe(tokens.paletteDark.background.default);
    expect(dark.palette.text.primary).toBe(tokens.paletteDark.text.primary);
  });

  it("génère des CSS variables préfixées --ch-", () => {
    expect(chTheme.vars?.palette.primary.main).toBe(
      `var(--ch-palette-primary-main, ${tokens.palette.primary.main})`
    );
  });

  it("résout le radius et la typo Chivo depuis les tokens", () => {
    expect(chTheme.shape.borderRadius).toBe(8);
    expect(chTheme.typography.fontFamily).toBe(tokens.typography.fontFamily);
    expect(chTheme.typography.fontFamily).toContain("Chivo");
  });

  it("applique l'échelle de titres de la marque aux variantes h1-h5", () => {
    expect(chTheme.typography.h1.fontSize).toBe(tokens.typography.heading.h1);
    expect(chTheme.typography.h2.fontSize).toBe(tokens.typography.heading.h2);
    expect(chTheme.typography.h5.fontSize).toBe(tokens.typography.heading.h5);
    expect(chTheme.typography.h2.fontWeight).toBe(tokens.typography.fontWeight.bold);
  });
});

describe("ChThemeProvider", () => {
  it("rend les enfants", () => {
    render(
      <ChThemeProvider>
        <p>contenu CustHome</p>
      </ChThemeProvider>
    );
    expect(screen.getByText("contenu CustHome")).toBeInTheDocument();
  });

  it("fournit le thème CustHome via le contexte, résolu en CSS variables", () => {
    render(
      <ChThemeProvider>
        <ThemeProbe />
      </ChThemeProvider>
    );
    expect(screen.getByTestId("probe")).toHaveTextContent("var(--ch-palette-primary-main)");
  });

  it("est en mode clair par défaut et bascule en sombre via mode", () => {
    const { rerender } = render(
      <ChThemeProvider>
        <ModeProbe />
      </ChThemeProvider>
    );
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
    rerender(
      <ChThemeProvider mode="dark">
        <ModeProbe />
      </ChThemeProvider>
    );
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
  });
});
