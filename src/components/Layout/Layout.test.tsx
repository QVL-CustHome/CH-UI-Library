import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChThemeProvider } from "../../theme";
import { Layout } from "./Layout";

function renderLayout(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("Layout", () => {
  it("rend le contenu dans un main", () => {
    renderLayout(<Layout>Contenu de page</Layout>);
    expect(screen.getByRole("main")).toHaveTextContent("Contenu de page");
  });

  it("affiche le brand CustHome par défaut en h1", () => {
    renderLayout(<Layout>Contenu</Layout>);
    expect(screen.getByRole("heading", { level: 1, name: "CustHome" })).toBeInTheDocument();
  });

  it("permet de personnaliser le brand", () => {
    renderLayout(<Layout brand="HealthServ">Contenu</Layout>);
    expect(screen.getByRole("heading", { level: 1, name: "HealthServ" })).toBeInTheDocument();
  });

  it("affiche le logo à côté du brand", () => {
    renderLayout(<Layout logo={<svg data-testid="logo" />}>Contenu</Layout>);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "CustHome" })).toBeInTheDocument();
  });

  it("remplace le brand par un header personnalisé", () => {
    renderLayout(<Layout header={<nav>Menu portail</nav>}>Contenu</Layout>);
    expect(screen.getByText("Menu portail")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  it("masque le header avec header={null}", () => {
    renderLayout(<Layout header={null}>Contenu</Layout>);
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  it("contraint la largeur du contenu à 380px par défaut", () => {
    renderLayout(<Layout>Contenu</Layout>);
    const wrapper = screen.getByText("Contenu");
    expect(wrapper).toHaveStyle({ maxWidth: "380px" });
  });

  it("accepte une largeur personnalisée", () => {
    renderLayout(<Layout maxWidth={600}>Contenu</Layout>);
    expect(screen.getByText("Contenu")).toHaveStyle({ maxWidth: "600px" });
  });
});
