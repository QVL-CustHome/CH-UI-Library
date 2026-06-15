import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChThemeProvider } from "../../../theme";
import { Spinner } from "../Spinner";

function renderSpinner(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("Spinner", () => {
  it("expose un progressbar accessible avec libellé par défaut", () => {
    renderSpinner(<Spinner />);
    expect(screen.getByRole("progressbar", { name: "Chargement" })).toBeInTheDocument();
  });

  it("accepte un libellé personnalisé", () => {
    renderSpinner(<Spinner label="Envoi en cours" />);
    expect(screen.getByRole("progressbar", { name: "Envoi en cours" })).toBeInTheDocument();
  });

  it("utilise la couleur d'accent CustHome", () => {
    renderSpinner(<Spinner />);
    expect(screen.getByRole("progressbar").className).toContain("colorAccent");
  });

  it("rend en inline par défaut (sans conteneur pleine page)", () => {
    const { container } = renderSpinner(<Spinner />);
    expect(container.querySelector(".MuiBox-root")).not.toBeInTheDocument();
  });

  it("rend en pleine page avec fullPage", () => {
    const { container } = renderSpinner(<Spinner fullPage />);
    expect(container.querySelector(".MuiBox-root")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it.each([
    ["small", "20px"],
    ["medium", "40px"],
    ["large", "64px"],
  ] as const)("mappe la taille %s sur %s", (size, pixels) => {
    renderSpinner(<Spinner size={size} />);
    expect(screen.getByRole("progressbar")).toHaveStyle({ width: pixels, height: pixels });
  });
});
