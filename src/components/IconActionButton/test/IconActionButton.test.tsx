import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChThemeProvider } from "../../../theme";
import { IconActionButton } from "../IconActionButton";

function renderButton(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("IconActionButton", () => {
  it("rend un bouton avec le bon aria-label", () => {
    renderButton(<IconActionButton icon="trash" aria-label="Supprimer" />);
    expect(screen.getByRole("button", { name: "Supprimer" })).toBeInTheDocument();
  });

  it("appelle onClick au clic", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderButton(<IconActionButton icon="pencil" aria-label="Éditer" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Éditer" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("est desactivable", () => {
    renderButton(<IconActionButton icon="trash" aria-label="Supprimer" disabled />);
    expect(screen.getByRole("button", { name: "Supprimer" })).toBeDisabled();
  });

  it("ne declenche pas onClick quand desactive", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onClick = vi.fn();
    renderButton(<IconActionButton icon="trash" aria-label="Supprimer" disabled onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Supprimer" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
