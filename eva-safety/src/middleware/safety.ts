import type { Policy } from "../types.js";
import { PolicyEngine } from "../policy/engine.js";
import { sanitizeObjectDeep } from "../redaction/redactor.js";

export type RequestLike = { headers: Record<string, string | string[] | undefined>; body?: any; path?: string; method?: string; state?: any };
export type ResponseLike = { statusCode?: number; end?: (body?: any) => void; setHeader?: (k: string, v: string) => void };
export type NextLike = (err?: any) => void;

export function safetyMiddleware(opts: { policy: Policy }) {
  const engine = new PolicyEngine(opts.policy);
  return async (req: RequestLike, res: ResponseLike, next: NextLike) => {
    const content = req.body;
    const texts: string[] = [];
    collectStrings(content, texts);
    let blocked = false;
    const findingsAll: any[] = [];

    let sanitized = content;
    for (const t of texts) {
      const ev = engine.evaluate(t);
      findingsAll.push(...ev.findings);
      if (ev.blocked) {
        blocked = true;
        break;
      }
    }

    if (blocked) {
      res.statusCode = 400;
      res.end?.(JSON.stringify({ error: "SAFETY_BLOCKED" }));
      return;
    }

    sanitized = sanitizeObjectDeep(content, (s) => engine.evaluate(s).sanitizedText);
    req.body = sanitized;
    (req.state ?? (req.state = {})).safety = { findings: findingsAll };
    next();
  };
}

function collectStrings(node: any, out: string[]) {
  if (node == null) return;
  if (typeof node === "string") {
    out.push(node);
  } else if (Array.isArray(node)) {
    node.forEach((x) => collectStrings(x, out));
  } else if (typeof node === "object") {
    for (const v of Object.values(node)) collectStrings(v, out);
  }
}