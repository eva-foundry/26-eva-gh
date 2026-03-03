#!/usr/bin/env node
/* eslint-disable no-console */
type Cmd = "ingest" | "status" | "list" | "tail";

const BASE = process.env.RAG_API_BASE || "http://localhost:8088";

class CliExit extends Error {
  constructor(public code: number) {
    super("cli-exit");
  }
}

async function main(argv: string[], options?: { exitOnError?: boolean }) {
  const [cmd, ...rest] = argv.slice(2);
  if (!cmd || !["ingest", "status", "list", "tail"].includes(cmd)) {
    printHelp();
    if (options?.exitOnError) throw new CliExit(1);
    return;
  }
  const C = cmd as Cmd;
  if (C === "ingest") {
    const tenant = getArg(rest, "--tenant", "tenantA");
    const text = getArg(rest, "--text", "Hello world");
    const id = getArg(rest, "--id");
    const body = { tenant, inputs: [{ type: "text", id: id || undefined, content: text }], safetyEnabled: true };
    const r = await fetch(`${BASE}/rag/ingest`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json();
    console.log(JSON.stringify(j, null, 2));
    return;
  }
  if (C === "status") {
    const id = rest[0];
    if (!id) return console.error("usage: rag status <ingestionId>");
    const r = await fetch(`${BASE}/rag/ingest/${id}/status`);
    console.log(await r.text());
    return;
  }
  if (C === "list") {
    // For demo, reuse /ops/batch to show active rag jobs
    const r = await fetch(`${BASE}/ops/batch`);
    console.log(await r.text());
    return;
  }
  if (C === "tail") {
    const res = await fetch(`${BASE}/rag/events`);
    if (!res.body) {
      console.error("No stream");
      return;
    }
    const reader = res.body.getReader();
    // naive stream read to stdout
    for (; ;) {
      const { done, value } = await reader.read();
      if (done) break;
      process.stdout.write(new TextDecoder().decode(value));
    }
  }
}

function getArg(arr: string[], key: string, def?: string) {
  const idx = arr.indexOf(key);
  if (idx >= 0 && arr[idx + 1]) return arr[idx + 1];
  return def;
}

function printHelp() {
  console.log(`
Usage:
  rag ingest --tenant T --text "content" [--id ID]
  rag status <ingestionId>
  rag list
  rag tail
Env:
  RAG_API_BASE (default http://localhost:8088)
`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv, { exitOnError: true })
    .then(() => process.exit(0))
    .catch((e) => {
      if (e instanceof CliExit) {
        process.exit(e.code);
      }
      console.error(e?.message || e);
      process.exit(1);
    });
}

export default main;