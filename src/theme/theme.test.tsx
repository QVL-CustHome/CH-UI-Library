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

describe("createChTheme", () => {
  it("alimente la palette MUI avec les tokens", () => {
    const theme = createChTheme();
    expect(theme.palette.primary.main).toBe(tokens.palette.primary.main);
    expect(theme.palette.background.default).toBe(tokens.palette.background.default);
    expect(theme.palette.divider).toBe(tokens.palette.divider);
  });

  it("génère des CSS variables préfixées --ch-", () => {
    expect(chTheme.vars?.palette.primary.main).toBe(
      `var(--ch-palette-primary-main, ${tokens.palette.primary.main})`
    );
  });

  it("résout le radius et la typo depuis les tokens", () => {
    expect(chTheme.shape.borderRadius).toBe(8);
    expect(chTheme.typography.fontFamily).toBe(tokens.typography.fontFamily);
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
});
