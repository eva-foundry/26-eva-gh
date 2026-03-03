export type Sample = { metric: string; labels: Record<string, string>; value: number };

export function parsePrometheusText(text: string): { help: Record<string, string>; type: Record<string, string>; samples: Sample[] } {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const help: Record<string, string> = {};
  const type: Record<string, string> = {};
  const samples: Sample[] = [];
  const reMeta = /^#\s+(HELP|TYPE)\s+(\w+)\s+(.*)$/;
  const reSample = /^(\w+)(\{[^}]*\})?\s+([0-9.eE+-]+)$/;

  for (const ln of lines) {
    const m = reMeta.exec(ln);
    if (m) {
      const kind = m[1];
      const name = m[2];
      const rest = m[3];
      if (kind === "HELP") help[name] = rest;
      if (kind === "TYPE") type[name] = rest;
      continue;
    }
    const s = reSample.exec(ln);
    if (s) {
      const name = s[1];
      const labelStr = s[2];
      const value = Number(s[3]);
      const labels: Record<string, string> = {};
      if (labelStr) {
        const inner = labelStr.slice(1, -1);
        if (inner.trim().length) {
          inner.split(",").forEach((kv) => {
            const [k, raw] = kv.split("=");
            labels[k] = (raw || "").replace(/^"/, "").replace(/"$/, "").replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
          });
        }
      }
      samples.push({ metric: name, labels, value });
    }
  }
  return { help, type, samples };
}