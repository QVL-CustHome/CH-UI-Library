import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageContent } from "../PageContent";

describe("PageContent", () => {
  it("affiche le titre, le contenu et le pied", () => {
    render(
      <PageContent title="Connexion" footer={<a href="/register">Créer un compte</a>}>
        <p>contenu de la page</p>
      </PageContent>
    );

    expect(screen.getByRole("heading", { name: "Connexion" })).toBeInTheDocument();
    expect(screen.getByText("contenu de la page")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Créer un compte" })).toBeInTheDocument();
  });
});
