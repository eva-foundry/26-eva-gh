import { createContext, createElement, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, localeFiles, type SupportedLocale, supportedLocales } from "@config/i18n.config";

export type Messages = Record<string, string>;

interface I18nContextValue {
    locale: SupportedLocale;
    setLocale: (next: SupportedLocale) => void;
    t: (key: string) => string;
    isLoading: boolean;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

async function loadMessages(locale: SupportedLocale): Promise<Messages> {
    const res = await fetch(localeFiles[locale]);
    if (!res.ok) throw new Error(`Unable to load locale file for ${locale}`);
    return (await res.json()) as Messages;
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<SupportedLocale>(defaultLocale);
    const [messages, setMessages] = useState<Messages>({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        loadMessages(locale)
            .then((msgs) => {
                if (!cancelled) setMessages(msgs);
            })
            .catch((err) => {
                console.error("i18n load error", err);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [locale]);

    const value = useMemo<I18nContextValue>(() => {
        const translate = (key: string) => messages[key] ?? key;
        return {
            locale,
            setLocale: (next) => {
                if (supportedLocales.includes(next)) setLocale(next);
            },
            t: translate,
            isLoading
        };
    }, [locale, messages, isLoading]);

    return createElement(I18nContext.Provider, { value }, children);
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
    return ctx;
}
