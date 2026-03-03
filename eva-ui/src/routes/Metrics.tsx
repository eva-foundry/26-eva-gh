import { useQuery } from "@tanstack/react-query";
import { getMetricsText } from "../lib/api";
import CodeBlock from "../components/CodeBlock";
import { parsePrometheusText } from "../lib/prom";
import Sparkline from "../components/Sparkline";
import { useMemo } from "react";

export default function Metrics() {
  const { data } = useQuery({ queryKey: ["metrics-text"], queryFn: getMetricsText, refetchInterval: 5000 });

  const parsed = useMemo(() => (data ? parsePrometheusText(data) : undefined), [data]);
  const httpCounter = parsed?.samples.filter((s) => s.metric === "http_requests_total") ?? [];
  const latHisto = parsed?.samples.filter((s) => s.metric === "http_request_duration_seconds_sum" || s.metric === "http_request_duration_seconds_count") ?? [];

  const sparkValues = (() => {
    const arr = httpCounter.filter((s) => s.labels.path).slice(-24).map((s) => s.value);
    if (!arr.length) return [];
    // convert cumulative to delta
    const delta: number[] = [];
    for (let i = 1; i < arr.length; i++) delta.push(Math.max(0, arr[i] - arr[i - 1]));
    return delta;
  })();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Metrics</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-sm text-neutral-400 mb-2">Requests sparkline (delta http_requests_total)</div>
          <Sparkline values={sparkValues} />
        </div>
        <div className="card p-4">
          <div className="text-sm text-neutral-400 mb-2">Latency summary (sum/count)</div>
          <div className="text-sm">
            {latHisto.map((s, i) => (
              <div key={i}>
                {s.metric} {JSON.stringify(s.labels)} = {s.value}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm text-neutral-400 mb-2">Raw exposition</div>
        <CodeBlock text={data ?? ""} />
      </div>
    </div>
  );
}