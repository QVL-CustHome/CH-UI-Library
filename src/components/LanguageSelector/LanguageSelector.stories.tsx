import { ChI18nProvider } from "../../i18n";
import { LanguageSelector } from "./LanguageSelector";

export default {
  title: "Composants / LanguageSelector",
};

export const FrEn = () => (
  <ChI18nProvider locale="fr" messages={{ fr: {}, en: {} }}>
    <LanguageSelector />
  </ChI18nProvider>
);
