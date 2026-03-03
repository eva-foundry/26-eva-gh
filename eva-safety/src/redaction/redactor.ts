import type { Finding, Span } from "../types.js";

export type RedactionMode = "full" | "partial";

// Redact spans with maskChar; partial for credit cards leaves last 4 digits visible
export function redactText(text: string, spans: Span[], mode: RedactionMode = "full", maskChar = "*"): string {
  if (spans.length === 0) return text;
  const merged = mergeSpans(spans);
  let out = "";
  let pos = 0;
  for (const s of merged) {
    out += text.slice(pos, s.start);
    const chunk = text.slice(s.start, s.end);
    out += mode === "partial" ? partialMask(chunk, maskChar) : maskChar.repeat(chunk.length);
    pos = s.end;
  }
  out += text.slice(pos);
  return out;
}

function mergeSpans(spans: Span[]): Span[] {
  const sorted = spans.slice().sort((a, b) => a.start - b.start);
  const merged: Span[] = [];
  for (const s of sorted) {
    if (merged.length === 0) {
      merged.push({ ...s });
      continue;
    }
    const last = merged[merged.length - 1];
    if (s.start <= last.end) {
      last.end = Math.max(last.end, s.end);
    } else {
      merged.push({ ...s });
    }
  }
  return merged;
}

function partialMask(chunk: string, maskChar: string): string {
  const digits = chunk.replace(/\D/g, "");
  if (digits.length < 6) return maskChar.repeat(chunk.length);
  // Keep last 4 digits; mask the rest (preserve length of original chunk)
  const visible = 4;
  let masked = "";
  let digitCount = 0;
  for (let i = 0; i < chunk.length; i++) {
    const c = chunk[i];
    if (/\d/.test(c)) {
      digitCount++;
      if (digitCount <= digits.length - visible) masked += maskChar;
      else masked += c;
    } else {
      masked += c;
    }
  }
  return masked;
}

export function collectSpans(findings: Finding[], categories: ("pii" | "secret")[]): Span[] {
  return findings
    .filter((f) => categories.includes(f.category) && f.span)
    .map((f) => f.span!) as Span[];
}

export function sanitizeText(text: string, findings: Finding[], mode: RedactionMode = "full"): string {
  const spans = collectSpans(findings, ["pii", "secret"]);
  return redactText(text, spans, mode);
}

// Deep sanitize an object: redact all string values using provided function
export function sanitizeObjectDeep<T>(obj: T, sanitize: (s: string) => string): T {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") return sanitize(obj) as any;
  if (Array.isArray(obj)) return obj.map((x) => sanitizeObjectDeep(x, sanitize)) as any;
  if (typeof obj === "object") {
    const out: any = Array.isArray(obj) ? [] : {};
    for (const [k, v] of Object.entries(obj as any)) {
      out[k] = sanitizeObjectDeep(v as any, sanitize);
    }
    return out;
  }
  return obj;
}