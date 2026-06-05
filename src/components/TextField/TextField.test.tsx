import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { ChThemeProvider } from "../../theme";
import { TextField, type ChTextFieldProps } from "./TextField";

function renderField(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

function ControlledField(props: Partial<ChTextFieldProps>) {
  const [value, setValue] = useState(props.value ?? "");
  return <TextField label="Email" {...props} value={value} onChange={setValue} />;
}

describe("TextField", () => {
  it("associe le label à l'input (accessibilité)", () => {
    renderField(<TextField label="Email" value="" onChange={() => undefined} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("affiche la valeur contrôlée", () => {
    renderField(<TextField label="Email" value="martin@custhome.fr" onChange={() => undefined} />);
    expect(screen.getByLabelText("Email")).toHaveValue("martin@custhome.fr");
  });

  it("remonte chaque saisie via onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderField(<TextField label="Email" value="" onChange={onChange} />);
    await user.type(screen.getByLabelText("Email"), "abc");
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenNthCalledWith(1, "a");
  });

  it("fonctionne en formulaire contrôlé complet", async () => {
    const user = userEvent.setup();
    renderField(<ControlledField />);
    await user.type(screen.getByLabelText("Email"), "martin@custhome.fr");
    expect(screen.getByLabelText("Email")).toHaveValue("martin@custhome.fr");
  });

  it("affiche le helper text", () => {
    renderField(
      <TextField label="Email" value="" onChange={() => undefined} helperText="Format attendu : nom@domaine.fr" />
    );
    expect(screen.getByText("Format attendu : nom@domaine.fr")).toBeInTheDocument();
  });

  it("affiche le message d'erreur et marque l'input invalide", () => {
    renderField(<TextField label="Email" value="" onChange={() => undefined} error="Email invalide" />);
    expect(screen.getByText("Email invalide")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("l'erreur remplace le helper text", () => {
    renderField(
      <TextField
        label="Email"
        value=""
        onChange={() => undefined}
        helperText="Format attendu"
        error="Email invalide"
      />
    );
    expect(screen.getByText("Email invalide")).toBeInTheDocument();
    expect(screen.queryByText("Format attendu")).not.toBeInTheDocument();
  });

  it("masque la saisie en type password", () => {
    renderField(
      <TextField label="Mot de passe" type="password" value="secret" onChange={() => undefined} />
    );
    expect(screen.getByLabelText("Mot de passe")).toHaveAttribute("type", "password");
  });

  it("bascule la visibilité du mot de passe via le toggle", async () => {
    const user = userEvent.setup();
    renderField(
      <TextField label="Mot de passe" type="password" value="secret" onChange={() => undefined} />
    );
    await user.click(screen.getByRole("button", { name: "Afficher la saisie" }));
    expect(screen.getByLabelText("Mot de passe")).toHaveAttribute("type", "text");
    await user.click(screen.getByRole("button", { name: "Masquer la saisie" }));
    expect(screen.getByLabelText("Mot de passe")).toHaveAttribute("type", "password");
  });

  it("n'affiche pas de toggle hors type password", () => {
    renderField(<TextField label="Email" value="" onChange={() => undefined} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("respecte required, disabled et placeholder", () => {
    renderField(
      <TextField
        label="Email"
        value=""
        onChange={() => undefined}
        required
        disabled
        placeholder="nom@domaine.fr"
      />
    );
    const input = screen.getByLabelText(/Email/);
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("placeholder", "nom@domaine.fr");
  });

  it("transmet name et autoComplete au champ", () => {
    renderField(
      <TextField label="Email" value="" onChange={() => undefined} name="email" autoComplete="email" />
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
  });
});
