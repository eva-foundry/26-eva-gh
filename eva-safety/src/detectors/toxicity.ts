import type { Detector, Finding } from "../types.js";

const HATE = ["idiot", "stupid", "hate", "dumb"];
const VIOLENCE = ["kill", "hurt", "attack", "bomb"];
const SEXUAL = ["nude", "sex", "porn"];

export const detectToxicity: Detector = (text: string): Finding[] => {
  const t = text.toLowerCase();
  const findings: Finding[] = [];
  const add = (label: string, word: string, severity: any) =>
    findings.push({ category: "toxicity", severity, label, value: word });

  for (const w of HATE) if (t.includes(w)) add("toxicity.hate", w, "medium");
  for (const w of VIOLENCE) if (t.includes(w)) add("toxicity.violence", w, "high");
  for (const w of SEXUAL) if (t.includes(w)) add("toxicity.sexual", w, "medium");

  return findings;
};