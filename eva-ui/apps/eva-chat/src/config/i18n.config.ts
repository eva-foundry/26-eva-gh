export const supportedLocales = ["en-CA", "fr-CA"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "en-CA";

export const localeFiles: Record<SupportedLocale, string> = {
    "en-CA": "/locale/en-CA.json",
    "fr-CA": "/locale/fr-CA.json"
};
