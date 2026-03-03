import { useI18n } from "../../lib/i18n";

export function SkipLinks() {
    const { t } = useI18n();
    return (
        <nav aria-label="Skip links" className="skip-links">
            <a href="#main-content" className="skip-link">{t("layout.skipToMain")}</a>
            <a href="#chat-input" className="skip-link">{t("layout.skipToInput")}</a>
        </nav>
    );
}
