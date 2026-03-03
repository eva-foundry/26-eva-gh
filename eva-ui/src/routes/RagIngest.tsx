import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../components/Button";
import CodeBlock from "../components/CodeBlock";
import { ragIngest, ragStatus } from "../lib/api";
import { useEffect, useState } from "react";
import LiveEvents from "../components/LiveEvents";
import useRagEvents from "../store/useRagEvents";
// a11y form primitives
import { FormField, ErrorSummary } from "eva-i11y";

export default function RagIngest() {
  const [tenant, setTenant] = useState("tenantA");
  const [text, setText] = useState("Hello world\nThis is a test");
  const [ingId, setIngId] = useState<string | undefined>();
  const { status, connect } = useRagEvents();
  const [errors, setErrors] = useState<Array<{ id: string; message: string }>>([]);

  useEffect(() => {
    if (status === "idle" || status === "closed" || status === "error") {
      connect();
    }
  }, [status, connect]);

  const mIngest = useMutation({
    mutationFn: () => {
      // simple client-side validation placeholder
      const errs: Array<{ id: string; message: string }> = [];
      if (!tenant.trim()) errs.push({ id: "ing-tenant", message: "Tenant is required" });
      if (!text.trim()) errs.push({ id: "ing-text", message: "Text is required" });
      setErrors(errs);
      if (errs.length) {
        // throw to trigger onError without calling API
        return Promise.reject(new Error("Validation failed"));
      }
      return ragIngest({ tenant, inputs: [{ type: "text", id: "doc1", content: text }], safetyEnabled: true });
    },
    onSuccess: (d) => {
      setIngId(d.ingestionId);
      setErrors([]);
    },
    onError: () => {
      // keep errors displayed; API errors could be added here as well
    }
  });

  const statusQ = useQuery({
    queryKey: ["rag-status", ingId],
    queryFn: () => ragStatus(ingId!),
    enabled: !!ingId,
    refetchInterval: 1500
  });

  return (
    <div className="space-y-4" aria-busy={mIngest.isPending ? "true" : "false"}>
      <h1 className="text-xl font-semibold">RAG • Ingest</h1>

      <ErrorSummary errors={errors} />

      <form
        className="card p-4 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          mIngest.mutate();
        }}
        noValidate
      >
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <FormField id="ing-tenant" label="Tenant" hint="Organization or namespace identifier" required>
              <input
                id="ing-tenant"
                className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800"
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
                name="tenant"
                autoComplete="organization"
              />
            </FormField>
          </div>
          <div className="md:col-span-2">
            <FormField id="ing-text" label="Text" hint="Content to ingest" required>
              <textarea
                id="ing-text"
                rows={4}
                className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-800"
                value={text}
                onChange={(e) => setText(e.target.value)}
                name="text"
              />
            </FormField>
          </div>
        </div>
        <div>
          <Button type="submit" disabled={mIngest.isPending}>
            Submit Ingestion
          </Button>
        </div>
      </form>

      {ingId && (
        <div className="space-y-2">
          <div className="text-sm text-neutral-400">Ingestion ID</div>
          <div className="card p-3" aria-live="polite">{ingId}</div>
        </div>
      )}

      <LiveEvents stickyIngestionId={ingId} />

      {statusQ.data && (
        <div className="space-y-2">
          <div className="text-sm text-neutral-400">Status</div>
          <CodeBlock text={JSON.stringify(statusQ.data, null, 2)} />
        </div>
      )}
    </div>
  );
}