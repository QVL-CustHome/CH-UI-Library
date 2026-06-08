import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChI18nProvider } from "../ChI18nProvider";
import { useTranslation, interpolate } from "../ChI18nContext";

function Probe({ k, vars }: { k: string; vars?: Record<string, string | number> }) {
  const { t, locale } = useTranslation();
  return (
    <>
      <span data-testid="locale">{locale}</span>
      <span data-testid="value">{t(k, vars)}</span>
    </>
  );
}

describe("i18n", () => {
  it("interpole les variables {nom}", () => {
    expect(interpolate("min {min} caractères", { min: 8 })).toBe("min 8 caractères");
  });

  it("fournit les messages de base de la lib en français par défaut", () => {
    render(<Probe k="ch.validation.required" />);
    expect(screen.getByTestId("value")).toHaveTextContent("Ce champ est requis.");
  });

  it("bascule de locale et applique les messages anglais", () => {
    render(
      <ChI18nProvider locale="en">
        <Probe k="ch.themeToggle.toDark" />
      </ChI18nProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("value")).toHaveTextContent("Switch to dark theme");
  });

  it("fusionne et surcharge avec les messages de l'application", () => {
    render(
      <ChI18nProvider locale="fr" messages={{ fr: { "app.title": "Connexion à {portal}" } }}>
        <Probe k="app.title" vars={{ portal: "CustHome" }} />
      </ChI18nProvider>
    );
    expect(screen.getByTestId("value")).toHaveTextContent("Connexion à CustHome");
  });

  it("retourne la clé brute si absente", () => {
    render(<Probe k="cle.inconnue" />);
    expect(screen.getByTestId("value")).toHaveTextContent("cle.inconnue");
  });
});
