import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "../Icon";

describe("Icon", () => {
  it("expose un rôle img et un libellé accessible quand title est fourni", () => {
    render(<Icon name="moon" title="Mode sombre" />);
    expect(screen.getByRole("img", { name: "Mode sombre" })).toBeInTheDocument();
  });

  it("est masqué de l'arbre d'accessibilité sans title", () => {
    const { container } = render(<Icon name="sun" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("applique la couleur fournie au SVG (fill currentColor)", () => {
    const { container } = render(<Icon name="sun" variant="solid" color="rgb(255, 0, 0)" />);
    expect(container.querySelector("svg")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});
