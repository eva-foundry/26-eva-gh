import { useI18n } from "../../lib/i18n";

interface MicButtonProps {
    onDictate: () => void;
    disabled?: boolean;
}

export function MicButton({ onDictate, disabled = false }: MicButtonProps) {
    const { t } = useI18n();
    return (
        <button
            type="button"
            onClick={() => {
                if (disabled) return;
                onDictate();
            }}
            className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm text-white hover:border-white/40 focus-visible:outline"
            aria-label={t("chat.mic.label")}
            aria-disabled={disabled}
            disabled={disabled}
        >
            🎙️ <span>{t("chat.mic.button")}</span>
        </button>
    );
}
