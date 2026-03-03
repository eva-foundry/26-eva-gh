import useRagEvents, { RagEvent } from "../store/useRagEvents";
import Button from "./Button";

export default function LiveEvents({ stickyIngestionId }: { stickyIngestionId?: string }) {
  const { status, events, connect, disconnect, setFilter, clear } = useRagEvents();

  // Keep filter aligned with parent ingestion id if provided
  // Do not re-filter existing buffer; we clear on filter change.
  if (stickyIngestionId) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.resolve().then(() => setFilter(stickyIngestionId));
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-400">Live events {statusBadge(status)}</div>
        <div className="flex gap-2">
          {status !== "open" ? (
            <Button variant="ghost" onClick={connect}>Connect</Button>
          ) : (
            <Button variant="ghost" onClick={disconnect}>Disconnect</Button>
          )}
          <Button variant="ghost" onClick={clear}>Clear</Button>
        </div>
      </div>
      <div className="max-h-64 overflow-auto pr-1">
        {events.length === 0 ? (
          <div className="text-neutral-500 text-sm">No events yet.</div>
        ) : (
          <ul className="space-y-1">
            {events.slice().reverse().map((e, i) => (
              <li key={i} className="text-sm">
                <EventRow e={e} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function statusBadge(st: string) {
  const map: Record<string, string> = {
    idle: "badge-yellow",
    connecting: "badge-yellow",
    open: "badge-green",
    error: "badge-red",
    closed: "badge-yellow"
  };
  const cls = map[st] || "badge-yellow";
  return <span className={`badge ${cls}`}>{st}</span>;
}

function EventRow({ e }: { e: RagEvent }) {
  const ts = new Date(e.ts).toLocaleTimeString();
  if (e.type === "phase.start") {
    return (
      <span className="text-neutral-300">
        <PhaseBadge phase={e.phase} /> <em className="text-neutral-500">{e.ingestionId}</em> [{e.tenant}] started at {ts}
      </span>
    );
  }
  if (e.type === "phase.end") {
    return (
      <span className="text-neutral-300">
        <PhaseBadge phase={e.phase} /> <em className="text-neutral-500">{e.ingestionId}</em> [{e.tenant}] ended at {ts}{" "}
        {e.error ? <span className="badge badge-red ml-1">error: {e.error}</span> : <span className="badge badge-green ml-1">ok</span>}
      </span>
    );
  }
  return (
    <span className="text-neutral-300">
      <span className="badge badge-green mr-1">complete</span> <em className="text-neutral-500">{e.ingestionId}</em> [{e.tenant}] at {ts}{" "}
      {e.ok ? "" : <span className="badge badge-red ml-1">failed</span>}
    </span>
  );
}

function PhaseBadge({ phase }: { phase: string }) {
  const color = phase === "embed" || phase === "index" ? "badge-yellow" : "badge-green";
  return <span className={`badge ${color} mr-1`}>{phase}</span>;
}