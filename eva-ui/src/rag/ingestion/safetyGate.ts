import type { ISafetyGate, NormalizedDoc } from "./types.js";

export class NoopSafetyGate implements ISafetyGate {
    async check(docs: NormalizedDoc[]) {
        return { allowed: docs, blocked: [] as NormalizedDoc[] };
    }
}
