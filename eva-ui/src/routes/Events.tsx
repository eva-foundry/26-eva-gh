import { useEffect, useMemo, useState } from "react";
import useRagEvents from "../store/useRagEvents";
import { buildSessions, type Session } from "../lib/eventsTransform";
import Timeline from "../components/Timeline";
import Button from "../components/Button";

export default function Events() {
  const { status, events, connect, disconnect, clear } = useRagEvents();
  const [tenantFilter, setTenantFilter] = useState("");
  const [ingFilter, setIngFilter] = useState("");
  const [rangeMin, setRangeMin] = useState<number | undefined>(undefined);
  const [rangeMax, setRangeMax] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (status === "idle" || status === "closed" || status === "error") connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const sessions: Session[] = useMemo(() => {
    const sess = buildSessions(events);
    const filtered = sess.filter(
      (s) =>
        (!tenantFilter || s.tenant.toLowerCase().includes(tenantFilter.toLowerCase())) &&
        (!ingFilter || s.ingestionId.toLowerCase().includes(ingFilter.toLowerCase()))
    );
    return filtered;
  }, [events, tenantFilter, ingFilter]);

  const resetRange = () => {
    setRangeMin(undefined);
    setRangeMax(undefined);
  };

  const fitLastMinutes = (mins: number) => {
    const now = Date.now();
    setRangeMin(now - mins * 60_000);
    setRangeMax(now);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Events • Timeline</h1>
      <div className="card p-4 flex flex-wrap gap-3 items-end">
        <div>
          <div className="text-sm text-neutral-400 mb-1">Tenant</div>
          <input
            className="w-52 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800"
            value={tenantFilter}
            onChange={(e) => setTenantFilter(e.target.value)}
            placeholder="Filter by tenant"
          />
        </div>
        <div>
          <div className="text-sm text-neutral-400 mb-1">Ingestion ID</div>
          <input
            className="w-64 px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800"
            value={ingFilter}
            onChange={(e) => setIngFilter(e.target.value)}
            placeholder="Filter by ingestion id"
          />
        </div>
        <div className="flex gap-2 ml-auto">
          {status !== "open" ? (
            <Button variant="ghost" onClick={connect}>Connect</Button>
          ) : (
            <Button variant="ghost" onClick={disconnect}>Disconnect</Button>
          )}
          <Button variant="ghost" onClick={clear}>Clear</Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => fitLastMinutes(5)}>Last 5 min</Button>
        <Button variant="ghost" onClick={() => fitLastMinutes(15)}>Last 15 min</Button>
        <Button variant="ghost" onClick={resetRange}>Auto range</Button>
      </div>

      <Timeline sessions={sessions} minTs={rangeMin} maxTs={rangeMax} />
    </div>
  );
}