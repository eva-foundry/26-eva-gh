import type { ChatMode } from "../../types/chat";
import { useI18n } from "../../lib/i18n";

interface ModeToggleProps {
    mode: ChatMode;
    onModeChange: (mode: ChatMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
    const { t } = useI18n();
    return (
        <div className="flex items-center gap-2" role="group" aria-label={t("chat.mode.label")}>
            {["external", "internal"].map((value) => {
                const isActive = mode === value;
                return (
                    <button
                        key={value}
                        type="button"
                        className={`rounded-full px-4 py-1 text-sm font-medium transition ${isActive ? "bg-eva-accent text-black" : "bg-white/10 text-white"
                            }`}
                        aria-pressed={isActive}
                        onClick={() => onModeChange(value as ChatMode)}
                    >
                        {value === "external" ? t("chat.mode.external") : t("chat.mode.internal")}
                    </button>
                );
            })}
        </div>
    );
}
