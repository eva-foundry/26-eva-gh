import { FormEvent, KeyboardEvent, useState } from "react";
import { useI18n } from "../../lib/i18n";
import { MicButton } from "./MicButton";

interface ChatInputBarProps {
    onSend: (message: string) => Promise<void> | void;
    isSending: boolean;
}

export function ChatInputBar({ onSend, isSending }: ChatInputBarProps) {
    const { t } = useI18n();
    const [draft, setDraft] = useState("");
    const hintId = "chat-input-hint";
    const hintTextKey = "chat.input.hint";
    const fallbackHint = "Press Enter to send or Shift+Enter for a new line.";
    const hintText = (() => {
        const translated = t(hintTextKey);
        return translated === hintTextKey ? fallbackHint : translated;
    })();

    const submit = () => {
        if (!draft.trim()) return;
        void onSend(draft);
        setDraft("");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submit();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
        }
    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit} aria-label={t("chat.input.label")}>
            <label htmlFor="chat-input" className="text-sm font-medium text-white/80">
                {t("chat.input.label")}
            </label>
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/30 p-3 md:flex-row md:items-end">
                <div className="flex flex-1 flex-col gap-2">
                    <textarea
                        id="chat-input"
                        className="min-h-[96px] flex-1 resize-y rounded-lg border border-white/10 bg-transparent p-3 text-sm text-white placeholder-white/40"
                        placeholder={t("chat.input.placeholder")}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label={t("chat.input.placeholder")}
                        aria-describedby={hintId}
                    />
                    <p id={hintId} className="text-xs text-white/50">
                        {hintText}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <MicButton
                        onDictate={() => {
                            const sample = t("chat.mic.sample");
                            setDraft((prev) => (prev ? `${prev} ${sample}` : sample));
                        }}
                        disabled={isSending}
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-eva-accent px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
                        disabled={isSending}
                    >
                        {isSending ? t("chat.sending") : t("chat.send")}
                    </button>
                </div>
            </div>
        </form>
    );
}
