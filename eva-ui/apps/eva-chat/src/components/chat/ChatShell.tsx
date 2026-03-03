import { useEffect, useRef, useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInputBar } from "./ChatInputBar";
import { ModeToggle } from "./ModeToggle";
import type { ChatMessage, ChatMode } from "../../types/chat";
import type { ChatThread } from "../../types/chat";
import { sendChatCompletion } from "../../api/evaApiClient";
import { trackEvent } from "../../lib/telemetry";
import { loadThreads } from "../../lib/threads";
import { useI18n } from "../../lib/i18n";
import { DEMO_MODE, demoThreads } from "../../config/demo";
import type { ThreadSummary } from "./ThreadList";

const createId = () => (typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

const mapToEvaMessages = (msgs: ChatMessage[]) =>
    msgs
        .filter((msg): msg is ChatMessage & { role: "user" | "assistant" } => msg.role === "user" || msg.role === "assistant")
        .map(({ role, content }) => ({ role, content }));

export function ChatShell() {
    const { locale, t } = useI18n();
    const mapThreadTitle = (key: string, fallback: string) => {
        const translated = t(key);
        return translated === key ? fallback : translated;
    };
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const messagesRef = useRef<ChatMessage[]>([]);
    const [mode, setMode] = useState<ChatMode>("external");
    const [isSending, setIsSending] = useState(false);
    const [threadId, setThreadId] = useState<string>("");
    const [threads, setThreads] = useState<ThreadSummary[]>([]);
    const defaultThreadTitle = useRef(mapThreadTitle("chat.sidebar.defaultThreadTitle", "Welcome to EVA"));

    useEffect(() => {
        if (DEMO_MODE) {
            const seededThreads: ChatThread[] = demoThreads.map((seed) => {
                const timestamp = new Date().toISOString();
                const seededMessages = (seed.messages ?? []).map((message, index) => ({
                    id: `${seed.id}-${message.role}-${index}`,
                    role: message.role,
                    content: message.content,
                    createdAt: message.createdAt
                }));
                const updatedAt = seededMessages.length > 0 ? seededMessages[seededMessages.length - 1].createdAt : timestamp;
                return {
                    id: seed.id,
                    title: seed.title,
                    mode: seed.mode,
                    locale: seed.locale,
                    messages: seededMessages,
                    createdAt: timestamp,
                    updatedAt
                };
            });

            if (seededThreads.length === 0) return;
            const [primaryThread] = seededThreads;
            setThreads(seededThreads.map(({ id, title, updatedAt }) => ({ id, title, updatedAt })));
            setThreadId(primaryThread.id);
            setMessages(primaryThread.messages);
            setMode(primaryThread.mode);
            return;
        }

        const persisted = loadThreads();
        if (persisted.length > 0) {
            setThreads(persisted.map(({ id, title, updatedAt }) => ({ id, title, updatedAt }))); 
            setThreadId(persisted[0].id);
            setMessages(persisted[0].messages);
            return;
        }

        const fallbackId = createId();
        setThreads([
            {
                id: fallbackId,
                title: defaultThreadTitle.current,
                updatedAt: new Date().toISOString()
            }
        ]);
        setThreadId(fallbackId);
    }, []);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    const handleSend = async (content: string) => {
        const trimmed = content.trim();
        if (!trimmed) return;

        const userMessage: ChatMessage = {
            id: createId(),
            role: "user",
            content: trimmed,
            createdAt: new Date().toISOString()
        };

        const nextMessages = [...messagesRef.current, userMessage];
        setMessages(nextMessages);
        messagesRef.current = nextMessages;
        trackEvent("chat_message_sent", { mode, locale, threadId });

        const updatedAtLabel = new Date().toISOString();
        setThreads((prev) =>
            prev.map((thread) => (thread.id === threadId ? { ...thread, updatedAt: updatedAtLabel } : thread))
        );

        setIsSending(true);
        try {
            const response = await sendChatCompletion({
                threadId,
                messages: mapToEvaMessages(nextMessages),
                mode,
                locale
            });
            const assistantMessage: ChatMessage = {
                id: createId(),
                role: "assistant",
                content: response.reply,
                createdAt: new Date().toISOString()
            };
            setMessages((prev) => [...prev, assistantMessage]);
            trackEvent("chat_message_received", { mode, locale, threadId });
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                {
                    id: createId(),
                    role: "assistant",
                    content: t("chat.error"),
                    createdAt: new Date().toISOString()
                }
            ]);
        } finally {
            setIsSending(false);
        }
    };

    const handleThreadSelect = (selectedId: string) => {
        if (selectedId === threadId) return;
        setThreadId(selectedId);
        setMessages([]);
        messagesRef.current = [];
    };

    const startNewThread = () => {
        const newId = createId();
        setThreadId(newId);
        setMessages([]);
        messagesRef.current = [];
        setThreads((prev) => {
            const nextTitle = mapThreadTitle("chat.sidebar.newThreadTitle", `New thread ${prev.length + 1}`);
            return [
                {
                    id: newId,
                    title: nextTitle,
                    updatedAt: new Date().toISOString()
                },
                ...prev
            ];
        });
    };

    return (
        <section aria-label={t("chat.shell.aria")} className="grid gap-6 lg:grid-cols-[300px,1fr]">
            <aside
                aria-label={t("chat.sidebar.title")}
                className="rounded-xl border border-white/10 bg-eva-panel/60"
            >
                <ChatSidebar
                    threads={threads}
                    activeThreadId={threadId}
                    onSelectThread={handleThreadSelect}
                    onStartNewThread={startNewThread}
                />
            </aside>
            <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-eva-panel/80 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-base font-semibold">{t("chat.shell.title")}</p>
                        <p className="text-sm text-white/70">{t("chat.shell.subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {DEMO_MODE && (
                            <div
                                aria-label="Demo mode active"
                                className="rounded-full border border-eva-accent/70 bg-eva-accent/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-eva-accent"
                            >
                                DEMO
                            </div>
                        )}
                        <ModeToggle
                            mode={mode}
                            onModeChange={(nextMode: ChatMode) => {
                                setMode(nextMode);
                                trackEvent("chat_mode_changed", { mode: nextMode });
                            }}
                        />
                    </div>
                </div>
                <ChatMessageList messages={messages} />
                <ChatInputBar isSending={isSending} onSend={handleSend} />
            </div>
        </section>
    );
}
