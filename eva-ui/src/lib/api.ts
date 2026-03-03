const BASE = import.meta.env.VITE_API_BASE || "";

export type BatchSnapshot = {
  counts: { running: number; queued: number; blocked: number; held: number; failed: number; succeeded: number; cancelled: number };
  running: Array<{ id: string; class: string; status: string; priority: number; attempts: number }>;
  queued: Array<{ id: string; class: string; status: string; priority: number; attempts: number }>;
  blocked: Array<{ id: string }>;
  held: Array<{ id: string }>;
  failed: Array<{ id: string; failureReason?: string }>;
  cancelled: Array<{ id: string }>;
  perClass: Record<string, { running: number; queued: number; concurrencyLimit?: number }>;
};

export async function getBatch(): Promise<BatchSnapshot> {
  const r = await fetch(`${BASE}/ops/batch`);
  if (!r.ok) throw new Error(`Batch fetch error ${r.status}`);
  return r.json();
}

export async function batchAction(id: string, action: "hold" | "release" | "cancel" | "requeue", overrides?: any) {
  const r = await fetch(`${BASE}/ops/batch`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id, action, overrides })
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getMetricsText(): Promise<string> {
  const r = await fetch(`${BASE}/ops/metrics`);
  if (!r.ok) throw new Error(`Metrics fetch error ${r.status}`);
  return r.text();
}

export async function ragIngest(req: any): Promise<{ ingestionId: string }> {
  const r = await fetch(`${BASE}/rag/ingest`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(req)
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function ragStatus(ingestionId: string): Promise<{ state: string; phases?: Array<{ phase: string; error?: string; durationMs: number }> }> {
  const r = await fetch(`${BASE}/rag/ingest/${ingestionId}/status`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}