import { useI18n } from "../../lib/i18n";
import { ThreadList, type ThreadSummary } from "./ThreadList";

interface ChatSidebarProps {
    threads: ThreadSummary[];
    activeThreadId: string;
    onSelectThread: (threadId: string) => void;
    onStartNewThread: () => void;
}

export function ChatSidebar({ threads, activeThreadId, onSelectThread, onStartNewThread }: ChatSidebarProps) {
    const { t } = useI18n();
    return (
        <div className="flex h-full flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                    {t("chat.sidebar.title")}
                </p>
                <button
                    type="button"
                    className="rounded-lg border border-dashed border-white/20 px-3 py-1 text-sm text-white hover:border-white/40 focus-visible:outline"
                    onClick={onStartNewThread}
                >
                    {t("chat.sidebar.new")}
                </button>
            </div>
            <nav aria-label={t("chat.sidebar.title")} className="flex h-full flex-1 overflow-y-auto">
                {threads.length === 0 ? (
                    <p className="text-sm text-white/60">{t("chat.sidebar.empty")}</p>
                ) : (
                    <ThreadList
                        threads={threads}
                        activeThreadId={activeThreadId}
                        onSelect={onSelectThread}
                        ariaLabel={t("chat.sidebar.threadsLabel")}
                    />
                )}
            </nav>
        </div>
    );
}
