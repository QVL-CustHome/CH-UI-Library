import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChThemeProvider } from "../../../theme";
import { Toggle } from "../Toggle";

function renderToggle(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("Toggle", () => {
  it("affiche un switch avec l'etat initial", () => {
    renderToggle(<Toggle checked={false} onChange={() => {}} label="Activer" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("affiche checked quand active", () => {
    renderToggle(<Toggle checked onChange={() => {}} label="Activer" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("appelle onChange au clic", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderToggle(<Toggle checked={false} onChange={onChange} label="Activer" />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("ne declenche pas onChange quand disabled", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChange = vi.fn();
    renderToggle(<Toggle checked={false} onChange={onChange} disabled label="Activer" />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
