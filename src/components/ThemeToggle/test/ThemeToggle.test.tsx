import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChThemeProvider } from "../../../theme";
import { ThemeToggle } from "../ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("bascule le thème et met à jour son libellé accessible", async () => {
    const user = userEvent.setup();
    render(
      <ChThemeProvider>
        <ThemeToggle />
      </ChThemeProvider>
    );

    const toggle = screen.getByRole("switch", { name: "Activer le thème sombre" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await user.click(toggle);

    expect(
      screen.getByRole("switch", { name: "Activer le thème clair" })
    ).toHaveAttribute("aria-checked", "true");
    expect(window.localStorage.getItem("ch-theme-mode")).toBe("dark");
  });
});
