import { useI18n } from "../../lib/i18n";
import { supportedLocales } from "../../config/i18n.config";
import type { SupportedLocale } from "../../config/i18n.config";
import { trackEvent } from "../../lib/telemetry";

export function AppHeader() {
    const { t } = useI18n();
    return (
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
                <img src="/eva-logo.svg" alt="EVA" className="h-10 w-10" />
                <div>
                    <p className="text-lg font-semibold">{t("app.title")}</p>
                    <p className="text-sm text-white/70">{t("app.subtitle")}</p>
                </div>
            </div>
            <LocaleToggle />
        </div>
    );
}

function LocaleToggle() {
    const { locale, setLocale, t } = useI18n();
    return (
        <label className="flex items-center gap-2 text-sm">
            <span>{t("layout.languageToggle")}</span>
            <select
                className="rounded-md border border-white/10 bg-eva-panel px-2 py-1 text-eva-text"
                value={locale}
                aria-label={t("layout.languageToggle")}
                onChange={(event) => {
                    const nextLocale = event.target.value as SupportedLocale;
                    setLocale(nextLocale);
                    trackEvent("chat_locale_changed", { locale: nextLocale });
                }}
            >
                {supportedLocales.map((loc) => (
                    <option key={loc} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>
        </label>
    );
}
