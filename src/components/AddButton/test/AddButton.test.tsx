import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChThemeProvider } from "../../../theme";
import { AddButton } from "../AddButton";

function renderButton(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("AddButton", () => {
  it("rend un bouton avec le bon aria-label", () => {
    renderButton(<AddButton aria-label="Ajouter" />);
    expect(screen.getByRole("button", { name: "Ajouter" })).toBeInTheDocument();
  });

  it("appelle onClick au clic", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderButton(<AddButton aria-label="Ajouter" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Ajouter" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("est desactivable", () => {
    renderButton(<AddButton aria-label="Ajouter" disabled />);
    expect(screen.getByRole("button", { name: "Ajouter" })).toBeDisabled();
  });

  it("ne declenche pas onClick quand desactive", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onClick = vi.fn();
    renderButton(<AddButton aria-label="Ajouter" disabled onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Ajouter" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
