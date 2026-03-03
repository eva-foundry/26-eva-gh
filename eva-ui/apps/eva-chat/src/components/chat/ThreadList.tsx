import { KeyboardEvent, useRef } from "react";

export interface ThreadSummary {
    id: string;
    title: string;
    updatedAt?: string;
}

interface ThreadListProps {
    threads: ThreadSummary[];
    activeThreadId: string;
    onSelect: (threadId: string) => void;
    ariaLabel?: string;
}

export function ThreadList({ threads, activeThreadId, onSelect, ariaLabel }: ThreadListProps) {
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (threads.length === 0) return;
        let nextIndex = index;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            nextIndex = (index + 1) % threads.length;
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            nextIndex = (index - 1 + threads.length) % threads.length;
        } else if (event.key === "Home") {
            event.preventDefault();
            nextIndex = 0;
        } else if (event.key === "End") {
            event.preventDefault();
            nextIndex = threads.length - 1;
        }

        if (nextIndex !== index) {
            const nextThread = threads[nextIndex];
            onSelect(nextThread.id);
            buttonRefs.current[nextIndex]?.focus();
        }
    };

    const formatUpdatedAt = (value?: string) => {
        if (!value) return null;
        const date = new Date(value);
        if (Number.isNaN(date.valueOf())) return null;
        return new Intl.DateTimeFormat("en-CA", {
            dateStyle: "short",
            timeStyle: "short"
        }).format(date);
    };

    return (
        <div role="listbox" aria-label={ariaLabel ?? "Chat threads"} className="flex flex-col gap-2" aria-activedescendant={`thread-${activeThreadId}`}>
            {threads.map((thread, index) => {
                const formattedDate = formatUpdatedAt(thread.updatedAt);
                return (
                    <button
                        key={thread.id}
                        id={`thread-${thread.id}`}
                        ref={(node) => {
                            buttonRefs.current[index] = node;
                        }}
                        type="button"
                        role="option"
                        aria-selected={thread.id === activeThreadId}
                        className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${thread.id === activeThreadId ? "bg-eva-accent/90 text-black" : "border-white/5 bg-transparent text-white hover:border-white/30"}`}
                        onClick={() => onSelect(thread.id)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                    >
                        <span className="font-semibold">{thread.title}</span>
                        {formattedDate && (
                            <span className="block text-xs text-white/60">{formattedDate}</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
