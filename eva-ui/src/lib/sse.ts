export type SSEStatus = "idle" | "connecting" | "open" | "error" | "closed";

export type SSEOptions = {
  withCredentials?: boolean;
  onOpen?: () => void;
  onError?: (e: Event) => void;
  onMessage?: (data: any) => void;
};

export class SSEClient {
  private es: EventSource | null = null;
  private status: SSEStatus = "idle";

  constructor(private url: string, private opts: SSEOptions = {}) { }

  getStatus(): SSEStatus {
    return this.status;
  }

  connect() {
    if (this.es) return;
    this.status = "connecting";
    this.es = new EventSource(this.url, { withCredentials: !!this.opts.withCredentials });
    const markOpen = () => {
      if (this.status === "open") return;
      this.status = "open";
      this.opts.onOpen?.();
    };
    this.es.onopen = () => {
      markOpen();
    };
    this.es.onerror = (e) => {
      // EventSource auto-reconnects; mark error for visibility
      this.status = "error";
      this.opts.onError?.(e);
    };
    this.es.onmessage = (ev) => {
      const txt = ev.data ?? "";
      if (!txt) return;
      try {
        const json = JSON.parse(txt);
        this.opts.onMessage?.(json);
      } catch {
        // ignore non-JSON lines
      }
    };
    markOpen();
  }

  close() {
    if (this.es) {
      this.es.close();
      this.es = null;
      this.status = "closed";
    }
  }
}