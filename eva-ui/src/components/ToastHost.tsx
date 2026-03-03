import { useEffect, useRef } from "react";
import useToasts from "../store/useToasts";
import { useToastAnnouncer } from "eva-i11y";

export default function ToastHost() {
  const { toasts, remove } = useToasts();
  const announce = useToastAnnouncer();
  const lastAnnouncedId = useRef<string | null>(null);

  // Announce the latest toast via live region (polite)
  useEffect(() => {
    if (toasts.length === 0) return;
    const last = toasts[toasts.length - 1];
    if (last && last.id !== lastAnnouncedId.current) {
      announce(last.text, "polite");
      lastAnnouncedId.current = last.id;
    }
  }, [toasts, announce]);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50" role="region" aria-label="Notifications">
      {toasts.map((t) => (
        <div key={t.id} className="card px-3 py-2 text-sm flex items-center gap-3" role="status" aria-live="polite">
          <span>{t.text}</span>
          <button className="btn-ghost focus-ring" onClick={() => remove(t.id)}>
            Close
          </button>
        </div>
      ))}
    </div>
  );
}