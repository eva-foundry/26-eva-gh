import type { Detector, Finding, Span } from "../types.js";

const emailRe = /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi;
const phoneRe = /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g;
const ssnRe = /\b\d{3}-\d{2}-\d{4}\b/g;
const ipRe = /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g;
const ccRe = /\b(?:\d[ -]*?){13,19}\b/g;

export const detectPII: Detector = (text: string): Finding[] => {
  const findings: Finding[] = [];
  scan(emailRe, text, "pii.email", "medium");
  scan(phoneRe, text, "pii.phone", "medium");
  scan(ssnRe, text, "pii.ssn", "high");
  scan(ipRe, text, "pii.ip", "low");
  // Credit card with Luhn verification
  forEachMatch(ccRe, text, (m, start, end) => {
    const digits = m.replace(/[^\d]/g, "");
    if (digits.length >= 13 && digits.length <= 19 && luhnValid(digits)) {
      findings.push(f("pii.cc", "high", start, end, m));
    }
  });

  function scan(re: RegExp, s: string, label: string, severity: "low" | "medium" | "high") {
    forEachMatch(re, s, (m, start, end) => findings.push(f(label, severity, start, end, m)));
  }

  return findings;

  function f(label: string, severity: any, start: number, end: number, value?: string): Finding {
    return { category: "pii", severity, label, span: { start, end }, value };
  }
};

function forEachMatch(re: RegExp, s: string, cb: (m: string, start: number, end: number) => void) {
  re.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    const match = m[0];
    const idx = m.index;
    cb(match, idx, idx + match.length);
    if (m.index === re.lastIndex) re.lastIndex++; // avoid zero-length loops
  }
}

export function luhnValid(num: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = num.charCodeAt(i) - 48;
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}