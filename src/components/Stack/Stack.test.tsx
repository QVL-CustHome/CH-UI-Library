import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChThemeProvider } from "../../theme";
import { Stack } from "./Stack";

function renderStack(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("Stack", () => {
  it("rend ses enfants dans un div en colonne par défaut", () => {
    renderStack(
      <Stack>
        <span>Premier</span>
        <span>Second</span>
      </Stack>,
    );
    const stack = screen.getByText("Premier").parentElement!;
    expect(stack.tagName).toBe("DIV");
    expect(stack).toHaveStyle({ display: "flex", flexDirection: "column" });
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it.each([
    ["xs", "0.25rem"],
    ["sm", "0.5rem"],
    ["md", "1rem"],
    ["lg", "1.5rem"],
    ["xl", "2rem"],
  ] as const)("applique le gap %s (%s) issu des tokens", (gap, value) => {
    renderStack(
      <Stack gap={gap}>
        <span>Contenu</span>
      </Stack>,
    );
    expect(screen.getByText("Contenu").parentElement).toHaveStyle({ gap: value });
  });

  it("applique le gap md par défaut", () => {
    renderStack(
      <Stack>
        <span>Contenu</span>
      </Stack>,
    );
    expect(screen.getByText("Contenu").parentElement).toHaveStyle({ gap: "1rem" });
  });

  it("rend un formulaire soumettable avec as=form", async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    renderStack(
      <Stack as="form" onSubmit={onSubmit}>
        <button type="submit">Envoyer</button>
      </Stack>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Envoyer" }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("rend une navigation accessible avec as=nav et label", () => {
    renderStack(
      <Stack as="nav" label="Liens secondaires" gap="xs">
        <a href="/register">Créer un compte</a>
      </Stack>,
    );
    expect(screen.getByRole("navigation", { name: "Liens secondaires" })).toBeInTheDocument();
  });

  it("rend une section avec as=section", () => {
    renderStack(
      <Stack as="section">
        <span>Contenu</span>
      </Stack>,
    );
    expect(screen.getByText("Contenu").parentElement!.tagName).toBe("SECTION");
  });
});
