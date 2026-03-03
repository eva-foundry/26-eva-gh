import { create } from "zustand";
import { SSEClient, SSEStatus } from "../lib/sse";

export type RagEvent =
  | { type: "phase.start"; ingestionId: string; phase: string; tenant: string; ts: number }
  | { type: "phase.end"; ingestionId: string; phase: string; tenant: string; ts: number; error?: string }
  | { type: "ingestion.complete"; ingestionId: string; tenant: string; ts: number; ok: boolean };

type State = {
  status: SSEStatus;
  events: RagEvent[];
  filterIngestionId?: string;
  connect: () => void;
  disconnect: () => void;
  setFilter: (ingestionId?: string) => void;
  clear: () => void;
};

const BASE = import.meta.env.VITE_API_BASE || "";

let client: SSEClient | null = null;

const CAPACITY = 500;

const useRagEvents = create<State>((set, get) => ({
  status: "idle",
  events: [],
  connect: () => {
    if (client) return;
    client = new SSEClient(`${BASE}/rag/events`, {
      onOpen: () => set({ status: "open" }),
      onError: () => set({ status: "error" }),
      onMessage: (e: RagEvent) => {
        const { filterIngestionId } = get();
        if (filterIngestionId && e.ingestionId !== filterIngestionId) return;
        set((s) => {
          const next = s.events.length >= CAPACITY ? s.events.slice(1) : s.events.slice();
          next.push(e);
          return { events: next };
        });
      }
    });
    set({ status: "connecting" });
    client.connect();
  },
  disconnect: () => {
    client?.close();
    client = null;
    set({ status: "closed" });
  },
  setFilter: (ingestionId?: string) => set({ filterIngestionId: ingestionId, events: [] }),
  clear: () => set({ events: [] })
}));

export default useRagEvents;