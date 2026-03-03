import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "../components/Table";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { batchAction, getBatch } from "../lib/api";
import useToasts from "../store/useToasts";

export default function OpsBatch() {
  const qc = useQueryClient();
  const toast = useToasts();
  const { data, isLoading } = useQuery({ queryKey: ["batch"], queryFn: getBatch, refetchInterval: 2500 });
  const mut = useMutation({
    mutationFn: ({ id, action }: { id: string; action: "hold" | "release" | "cancel" | "requeue" }) => batchAction(id, action),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["batch"] });
      toast.push("Action applied");
    },
    onError: (e: any) => toast.push(`Error: ${e.message || e}`)
  });

  if (isLoading) return <div>Loading...</div>;

  const rows = (data?.running ?? [])
    .concat(data?.queued ?? [])
    .concat(data?.blocked ?? [])
    .concat(data?.held ?? [])
    .map((j) => [
      j.id,
      j.class,
      j.priority,
      j.hasOwnProperty("attempts") ? (j as any).attempts : "-",
      <Badge key="st" color={statusColor((j as any).status)}>{(j as any).status ?? "queued"}</Badge>,
      <div className="flex gap-2" key="actions">
        <Button variant="ghost" onClick={() => mut.mutate({ id: j.id, action: "hold" })}>Hold</Button>
        <Button variant="ghost" onClick={() => mut.mutate({ id: j.id, action: "release" })}>Release</Button>
        <Button variant="ghost" onClick={() => mut.mutate({ id: j.id, action: "requeue" })}>Requeue</Button>
        <Button variant="ghost" onClick={() => mut.mutate({ id: j.id, action: "cancel" })}>Cancel</Button>
      </div>
    ]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Ops • Batch</h1>
      <Table headers={["ID", "Class", "Priority", "Attempts", "Status", "Actions"]} rows={rows} />
    </div>
  );
}

function statusColor(st?: string): "green" | "yellow" | "red" {
  if (st === "running" || st === "succeeded") return "green";
  if (st === "queued" || st === "held" || st === "blocked") return "yellow";
  return "red";
}