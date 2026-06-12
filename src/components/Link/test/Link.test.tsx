import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { ChThemeProvider } from "../../../theme";
import { Link } from "../Link";

function renderLink(ui: React.ReactElement) {
  return render(<ChThemeProvider>{ui}</ChThemeProvider>);
}


function RouterLink({ to, children, ...rest }: { to: string; children: ReactNode }) {
  return (
    <a href={to} data-router="true" {...rest}>
      {children}
    </a>
  );
}

describe("Link", () => {
  it("rend un lien <a> avec href", () => {
    renderLink(<Link href="/register">Créer un compte</Link>);
    const link = screen.getByRole("link", { name: "Créer un compte" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/register");
  });

  it("rend le composant injecté avec sa prop to (react-router)", () => {
    renderLink(
      <Link component={RouterLink} to="/forgot-password">
        Mot de passe oublié ?
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Mot de passe oublié ?" });
    expect(link).toHaveAttribute("href", "/forgot-password");
    expect(link).toHaveAttribute("data-router", "true");
  });

  it("applique la taille medium par défaut", () => {
    renderLink(<Link href="/a">Lien</Link>);
    expect(screen.getByRole("link")).toHaveStyle({ fontSize: "1rem" });
  });

  it("applique la taille small pour les liens secondaires", () => {
    renderLink(
      <Link href="/a" size="small">
        Lien secondaire
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveStyle({ fontSize: "0.9rem" });
  });

  it("souligne au survol uniquement (underline hover)", () => {
    renderLink(<Link href="/a">Lien</Link>);
    expect(screen.getByRole("link").className).toContain("underlineHover");
  });
});
