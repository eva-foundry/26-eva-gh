import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";
import { ChatMessageItem } from "./ChatMessage";
import { useI18n } from "../../lib/i18n";

interface ChatMessageListProps {
    messages: ChatMessage[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
    const { t } = useI18n();
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (listRef.current && typeof listRef.current.scrollTo === "function") {
            listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div
            ref={listRef}
            className="flex min-h-[320px] flex-1 flex-col gap-3 overflow-y-auto rounded-lg border border-white/5 bg-black/10 p-4"
            role="log"
            aria-live="polite"
            aria-label={t("chat.history")}
        >
            {messages.length === 0 ? (
                <p className="text-sm text-white/70">{t("chat.empty")}</p>
            ) : (
                messages.map((message) => <ChatMessageItem key={message.id} message={message} />)
            )}
        </div>
    );
}
