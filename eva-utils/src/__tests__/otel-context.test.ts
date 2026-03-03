import { describe, it, expect } from "vitest";
import type { Span, SpanContext } from "@opentelemetry/api";
import { context, trace, TraceFlags } from "@opentelemetry/api";

import { getTraceContext } from "../otel/context.js";

// Minimal fake span with a valid context to test correlation fields
function makeFakeSpan(): Span {
  const sc: SpanContext = {
    traceId: "0123456789abcdef0123456789abcdef",
    spanId: "0123456789abcdef",
    traceFlags: TraceFlags.SAMPLED,
    isRemote: false
  };
  return {
    spanContext: () => sc,
    setAttribute: () => ({} as Span),
    setAttributes: () => ({} as Span),
    addEvent: () => ({} as Span),
    setStatus: () => ({} as Span),
    updateName: () => ({} as Span),
    end: () => { },
    isRecording: () => false,
    recordException: () => { }
  } as unknown as Span;
}

describe("OTel getTraceContext", () => {
  it("returns empty object when no active span", () => {
    const ctx = getTraceContext();
    expect(ctx).toEqual({});
  });

  it("returns trace fields when span active", () => {
    const span = makeFakeSpan();
    const ctxWithSpan = trace.setSpan(context.active(), span);
    const ctx = getTraceContext(ctxWithSpan);
    expect(ctx).toMatchObject({
      traceId: "0123456789abcdef0123456789abcdef",
      spanId: "0123456789abcdef",
      sampled: true
    });
  });
});
