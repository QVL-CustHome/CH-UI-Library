import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChThemeProvider } from "../../theme";
import { Feedback } from "./Feedback";

function renderFeedback(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}

describe("Feedback — API rétro-compatible (portail Authenticator)", () => {
  it("affiche le message d'erreur en sévérité error", () => {
    renderFeedback(<Feedback error="Identifiants invalides" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Identifiants invalides");
    expect(alert.className).toContain("Error");
  });

  it("affiche le message d'info en sévérité info", () => {
    renderFeedback(<Feedback info="Un email vous a été envoyé" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Un email vous a été envoyé");
    expect(alert.className).toContain("Info");
  });

  it("priorise l'erreur sur l'info", () => {
    renderFeedback(<Feedback error="Erreur API" info="Information" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Erreur API");
    expect(screen.queryByText("Information")).not.toBeInTheDocument();
  });

  it("ne rend rien sans message", () => {
    const { container } = renderFeedback(<Feedback />);
    expect(container.querySelector(".MuiAlert-root")).not.toBeInTheDocument();
  });

  it("ne rend rien avec error et info null", () => {
    const { container } = renderFeedback(<Feedback error={null} info={null} />);
    expect(container.querySelector(".MuiAlert-root")).not.toBeInTheDocument();
  });

  it("ne rend rien avec des messages vides", () => {
    const { container } = renderFeedback(<Feedback error="" info="" />);
    expect(container.querySelector(".MuiAlert-root")).not.toBeInTheDocument();
  });
});

describe("Feedback — sévérités étendues", () => {
  it.each(["success", "error", "info", "warning"] as const)(
    "rend la sévérité %s avec children",
    (severity) => {
      renderFeedback(<Feedback severity={severity}>Message {severity}</Feedback>);
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent(`Message ${severity}`);
      expect(alert.className.toLowerCase()).toContain(severity);
    }
  );

  it("utilise la sévérité info par défaut avec children", () => {
    renderFeedback(<Feedback>Message neutre</Feedback>);
    expect(screen.getByRole("alert").className).toContain("Info");
  });

  it("error prime sur severity et children", () => {
    renderFeedback(
      <Feedback severity="success" error="Échec">
        Réussi
      </Feedback>
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Échec");
    expect(alert.className).toContain("Error");
  });

  it("affiche un bouton de fermeture qui déclenche onClose", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderFeedback(
      <Feedback severity="success" onClose={onClose}>
        Compte créé
      </Feedback>
    );
    await user.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("expose le rôle alert (accessibilité)", () => {
    renderFeedback(<Feedback severity="warning">Attention</Feedback>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
