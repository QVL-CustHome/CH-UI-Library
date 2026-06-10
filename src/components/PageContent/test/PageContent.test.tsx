import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChThemeProvider } from "../../../theme";
import { ChI18nProvider } from "../../../i18n";
import { PageContent } from "../PageContent";

function renderContent(ui: React.ReactElement) {
  return render(
    <ChI18nProvider locale="fr" messages={{ fr: {}, en: {} }}>
      <ChThemeProvider>{ui}</ChThemeProvider>
    </ChI18nProvider>,
  );
}

describe("PageContent", () => {
  it("affiche le titre, le contenu et le pied", () => {
    renderContent(
      <PageContent title="Connexion" footer={<a href="/register">Créer un compte</a>}>
        <p>contenu de la page</p>
      </PageContent>,
    );

    expect(screen.getByRole("heading", { name: "Connexion" })).toBeInTheDocument();
    expect(screen.getByText("contenu de la page")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Créer un compte" })).toBeInTheDocument();
  });

  it("affiche le toggle de theme", () => {
    renderContent(
      <PageContent>
        <p>test</p>
      </PageContent>,
    );
    expect(screen.getByRole("switch", { name: /Activer le thème/ })).toBeInTheDocument();
  });

  it("affiche le selecteur de langue", () => {
    renderContent(
      <PageContent>
        <p>test</p>
      </PageContent>,
    );
    expect(screen.getByLabelText("Langue")).toBeInTheDocument();
  });
});
