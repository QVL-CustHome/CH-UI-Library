import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChThemeProvider } from "../../../theme";
import { MultiSelect } from "../MultiSelect";

function renderSelect(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

const options = [{ value: "admin" }, { value: "editor" }, { value: "viewer" }];

describe("MultiSelect", () => {
  it("affiche les valeurs sélectionnées en puces", () => {
    renderSelect(<MultiSelect options={options} value={["admin"]} onChange={() => {}} />);
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("ajoute une valeur via la liste", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderSelect(<MultiSelect options={options} value={["admin"]} onChange={onChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: /editor/ }));

    expect(onChange).toHaveBeenCalledWith(["admin", "editor"]);
  });

  it("retire une valeur via la puce", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = renderSelect(
      <MultiSelect options={options} value={["admin"]} onChange={onChange} />
    );

    await user.click(container.querySelector(".MuiChip-deleteIcon")!);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("n'affiche plus une valeur déjà sélectionnée dans la liste", async () => {
    const user = userEvent.setup();
    renderSelect(<MultiSelect options={options} value={["admin"]} onChange={() => {}} />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("option", { name: /admin/ })).not.toBeInTheDocument();
  });
});
