import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChI18nProvider, useTranslation } from "../../../i18n";
import { LanguageSelector } from "../LanguageSelector";

function CurrentLocale() {
  const { locale } = useTranslation();
  return <span data-testid="locale">{locale}</span>;
}

describe("LanguageSelector", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("ne s'affiche pas avec une seule locale disponible", () => {
    render(
      <ChI18nProvider locale="fr">
        <LanguageSelector />
      </ChI18nProvider>
    );
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("bascule la langue via la liste déroulante et persiste le choix", async () => {
    const user = userEvent.setup();
    render(
      <ChI18nProvider locale="fr" messages={{ fr: {}, en: {} }}>
        <LanguageSelector />
        <CurrentLocale />
      </ChI18nProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("fr");
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "EN" }));
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(window.localStorage.getItem("ch-locale")).toBe("en");
  });
});
