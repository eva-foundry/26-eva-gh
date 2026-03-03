import type { Detector, Finding } from "../types.js";

const JAILBREAK_PHRASES = [
    "ignore previous instructions",
    "ignore all previous",
    "disregard previous",
    "forget previous",
    "enable developer mode",
    "enable debug mode",
    "bypass restrictions",
    "override safety",
    "disable safety",
    "act as if you are",
    "pretend you are",
    "roleplay as",
];

export const detectJailbreak: Detector = (text: string): Finding[] => {
    const t = text.toLowerCase();
    const findings: Finding[] = [];

    for (const phrase of JAILBREAK_PHRASES) {
        if (t.includes(phrase)) {
            findings.push({
                category: "jailbreak",
                severity: "high",
                label: "jailbreak.prompt_injection",
                value: phrase,
            });
        }
    }

    return findings;
};
