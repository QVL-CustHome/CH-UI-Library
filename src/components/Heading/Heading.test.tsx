import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChThemeProvider } from "../../theme";
import { Heading } from "./Heading";

function renderHeading(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("Heading", () => {
  it("rend un h2 par défaut (titre de page)", () => {
    renderHeading(<Heading>Connexion</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Connexion" })).toBeInTheDocument();
  });

  it.each([
    [1, "2rem"],
    [2, "1.5rem"],
    [3, "1.25rem"],
    [4, "1rem"],
  ] as const)("rend un h%s avec la taille %s", (level, fontSize) => {
    renderHeading(<Heading level={level}>Titre</Heading>);
    const heading = screen.getByRole("heading", { level, name: "Titre" });
    expect(heading.tagName).toBe(`H${level}`);
    expect(heading).toHaveStyle({ fontSize });
  });

  it("met le niveau 1 en gras et les autres en semi-gras", () => {
    renderHeading(
      <>
        <Heading level={1}>Principal</Heading>
        <Heading level={3}>Section</Heading>
      </>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveStyle({ fontWeight: 700 });
    expect(screen.getByRole("heading", { level: 3 })).toHaveStyle({ fontWeight: 600 });
  });

  it("aligne à gauche par défaut et au centre sur demande", () => {
    renderHeading(
      <>
        <Heading>Gauche</Heading>
        <Heading align="center">Centre</Heading>
      </>,
    );
    expect(screen.getByRole("heading", { name: "Gauche" }).className).not.toContain(
      "alignCenter",
    );
    expect(screen.getByRole("heading", { name: "Centre" }).className).toContain("alignCenter");
  });

  it("applique une marge basse par défaut, désactivable", () => {
    renderHeading(
      <>
        <Heading>Avec marge</Heading>
        <Heading gutterBottom={false}>Sans marge</Heading>
      </>,
    );
    expect(screen.getByRole("heading", { name: "Avec marge" }).className).toContain(
      "gutterBottom",
    );
    expect(screen.getByRole("heading", { name: "Sans marge" }).className).not.toContain(
      "gutterBottom",
    );
  });
});
