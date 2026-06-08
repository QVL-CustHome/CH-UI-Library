import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChThemeProvider } from "../../../theme";
import { PageScaffold } from "../PageScaffold";

function renderScaffold(ui: ReactNode) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("PageScaffold", () => {
  it("affiche la marque CustHome par défaut, le contenu et le toggle de thème", () => {
    renderScaffold(
      <PageScaffold>
        <p>contenu de page</p>
      </PageScaffold>
    );

    expect(screen.getByRole("heading", { name: "CustHome" })).toBeInTheDocument();
    expect(screen.getByText("contenu de page")).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /Activer le thème/ })).toBeInTheDocument();
  });

  it("permet de surcharger la marque", () => {
    renderScaffold(
      <PageScaffold brand="MonPortail">
        <p>x</p>
      </PageScaffold>
    );

    expect(screen.getByRole("heading", { name: "MonPortail" })).toBeInTheDocument();
  });
});
