import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ChI18nContext, createTranslate } from "./ChI18nContext";
import { chBaseMessages, type ChLocale, type ChLocaleMessages } from "./messages";

const DEFAULT_STORAGE_KEY = "ch-locale";

function readStored(storageKey: string | null, locales: ChLocale[]): ChLocale | null {
  if (!storageKey || typeof window === "undefined") return null;
  const value = window.localStorage?.getItem(storageKey) as ChLocale | null;
  return value && locales.includes(value) ? value : null;
}

export interface ChI18nProviderProps {
  locale?: ChLocale;
  messages?: ChLocaleMessages;
  storageKey?: string | null;
  children: ReactNode;
}

export function ChI18nProvider({
  locale = "fr",
  messages,
  storageKey = DEFAULT_STORAGE_KEY,
  children,
}: ChI18nProviderProps) {
  const locales = useMemo(() => {
    const keys = messages ? (Object.keys(messages) as ChLocale[]) : [];
    return keys.length > 0 ? keys : [locale];
  }, [messages, locale]);

  const [current, setCurrent] = useState<ChLocale>(
    () => readStored(storageKey, locales) ?? locale
  );

  const setLocale = useCallback(
    (next: ChLocale) => {
      setCurrent(next);
      if (storageKey && typeof window !== "undefined") {
        window.localStorage?.setItem(storageKey, next);
      }
    },
    [storageKey]
  );

  const value = useMemo(() => {
    const merged = { ...chBaseMessages[current], ...(messages?.[current] ?? {}) };
    return { locale: current, locales, t: createTranslate(merged), setLocale };
  }, [current, locales, messages, setLocale]);

  return <ChI18nContext.Provider value={value}>{children}</ChI18nContext.Provider>;
}
