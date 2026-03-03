import { useQuery } from "@tanstack/react-query";
import MetricCard from "../components/MetricCard";
import { getBatch } from "../lib/api";
import HCBadge from "../components/HCBadge";
import { getDemoProjects } from "../lib/projectCatalog";

export default function Dashboard() {
  const { data } = useQuery({ queryKey: ["batch-snapshot"], queryFn: getBatch, refetchInterval: 3000 });
  const demoProject = getDemoProjects()[0];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <HCBadge />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard title="Running" value={data?.counts.running ?? 0} />
        <MetricCard title="Queued" value={data?.counts.queued ?? 0} />
        <MetricCard title="Blocked" value={data?.counts.blocked ?? 0} />
        <MetricCard title="Held" value={data?.counts.held ?? 0} />
        <MetricCard title="Failed" value={data?.counts.failed ?? 0} />
        <MetricCard title="Succeeded" value={data?.counts.succeeded ?? 0} />
      </div>

      {demoProject && (
        <div className="card p-4">
          <div className="text-sm text-neutral-400">Demo project</div>
          <div className="text-lg font-semibold">{demoProject.name}</div>
          <div className="text-xs text-neutral-400 truncate">{demoProject.api.ragEndpoint}</div>
        </div>
      )}

      <div className="text-sm text-neutral-400">Per-class limits</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data &&
          Object.entries(data.perClass).map(([cls, v]) => (
            <div className="card p-4" key={cls}>
              <div className="text-sm text-neutral-400">{cls}</div>
              <div className="mt-2 text-neutral-300">
                running {v.running} / queued {v.queued} {v.concurrencyLimit ? `(limit ${v.concurrencyLimit})` : ""}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}