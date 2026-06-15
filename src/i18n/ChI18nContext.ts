import { createContext, useContext } from "react";
import { chBaseMessages, type ChLocale, type ChMessages } from "./messages";

export type ChTranslateVars = Record<string, string | number>;

export type ChTranslate = (key: string, vars?: ChTranslateVars) => string;

export interface ChI18nContextValue {
  locale: ChLocale;
  locales: ChLocale[];
  t: ChTranslate;
  setLocale: (locale: ChLocale) => void;
}

export function interpolate(template: string, vars?: ChTranslateVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    name in vars ? String(vars[name]) : match
  );
}

export function createTranslate(messages: ChMessages): ChTranslate {
  return (key, vars) => interpolate(messages[key] ?? key, vars);
}

export function apiErrorMessage(t: ChTranslate, code: string | undefined, fallback: string): string {
  if (!code) return fallback;
  const key = `ch.error.${code}`;
  const translated = t(key);
  return translated === key ? fallback : translated;
}

export const ChI18nContext = createContext<ChI18nContextValue>({
  locale: "fr",
  locales: ["fr"],
  t: createTranslate(chBaseMessages.fr),
  setLocale: () => {},
});

export function useTranslation(): ChI18nContextValue {
  return useContext(ChI18nContext);
}
