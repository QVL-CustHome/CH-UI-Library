import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChThemeProvider } from "../../../theme";
import { ChI18nProvider } from "../../../i18n";
import { DeleteButton } from "../DeleteButton";

function renderButton(ui: React.ReactElement) {
  return render(
    <ChI18nProvider locale="fr">
      <ChThemeProvider>{ui}</ChThemeProvider>
    </ChI18nProvider>,
  );
}

describe("DeleteButton", () => {
  it("ouvre la pop-up au clic sans appeler onConfirm", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    renderButton(<DeleteButton aria-label="Supprimer l'élément" onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: "Supprimer l'élément" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("appelle onConfirm après validation de la pop-up", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    renderButton(<DeleteButton aria-label="Supprimer l'élément" onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: "Supprimer l'élément" }));
    
    await user.click(screen.getByRole("button", { name: "Supprimer" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("ferme la pop-up sans appeler onConfirm au clic sur Annuler", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    renderButton(<DeleteButton aria-label="Supprimer l'élément" onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: "Supprimer l'élément" }));
    await user.click(screen.getByRole("button", { name: "Annuler" }));
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
