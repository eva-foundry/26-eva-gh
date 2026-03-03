import type { Context } from "@opentelemetry/api";
import { context, trace, TraceFlags } from "@opentelemetry/api";

/**
 * Returns trace correlation fields if there is an active span.
 * Used by the logger hook to append traceId/spanId/sample flag.
 */
export function getTraceContext(ctx?: Context): Record<string, unknown> {
  const activeContext = ctx ?? context.active();
  const span = trace.getSpan(activeContext);
  const sc = span?.spanContext();
  if (!sc) return {};
  return {
    traceId: sc.traceId,
    spanId: sc.spanId,
    sampled: sc.traceFlags === TraceFlags.SAMPLED
  };
}
