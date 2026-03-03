export default function MetricCard({
  title,
  value,
  hint
}: {
  title: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="card p-4">
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {hint ? <div className="text-xs text-neutral-500 mt-1">{hint}</div> : null}
    </div>
  );
}