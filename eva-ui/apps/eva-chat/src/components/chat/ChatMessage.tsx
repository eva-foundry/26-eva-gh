import { useMemo } from "react";
import type { ChatMessage } from "../../types/chat";
import { useI18n } from "../../lib/i18n";

interface ChatMessageProps {
    message: ChatMessage;
}

export function ChatMessageItem({ message }: ChatMessageProps) {
    const { locale, t } = useI18n();
    const timestamp = useMemo(() => {
        try {
            const date = typeof message.createdAt === "string" ? new Date(message.createdAt) : new Date(message.createdAt);
            return new Intl.DateTimeFormat(locale, {
                hour: "2-digit",
                minute: "2-digit"
            }).format(date);
        } catch {
            return "";
        }
    }, [message.createdAt, locale]);

    const isUser = message.role === "user";
    return (
        <div
            className={`flex flex-col gap-1 ${isUser ? "items-end text-right" : "items-start"}`}
            aria-live="polite"
        >
            <span className="text-xs uppercase tracking-wide text-white/60">
                {isUser ? t("chat.message.userLabel") : t("chat.message.assistantLabel")} · {timestamp}
            </span>
            <div
                className={`max-w-xl rounded-lg px-4 py-3 text-sm leading-relaxed ${isUser ? "bg-eva-accent/90 text-black" : "bg-white/10 text-white"
                    }`}
            >
                {message.content}
            </div>
        </div>
    );
}
