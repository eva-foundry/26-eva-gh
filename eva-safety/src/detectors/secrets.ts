import type { Detector, Finding } from "../types.js";

const awsAccessKeyRe = /\b(AKIA|ASIA)[A-Z0-9]{14,20}\b/g; // AWS Access Key ID
const githubTokenRe = /\bghp_[A-Za-z0-9]{30,40}\b/g;
const openaiKeyRe = /\bsk-[A-Za-z0-9]{20,48}\b/g;
const jwtRe = /\b[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\b/g;

export const detectSecrets: Detector = (text: string): Finding[] => {
  const f: Finding[] = [];
  scan(awsAccessKeyRe, "secret.aws_access_key", "critical");
  scan(githubTokenRe, "secret.github_pat", "critical");
  scan(openaiKeyRe, "secret.openai_key", "critical");
  // Heuristic for JWTs (cannot verify signature here)
  scan(jwtRe, "secret.jwt_token", "high");

  return f;

  function scan(re: RegExp, label: string, severity: any) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const val = m[0];
      f.push({
        category: "secret",
        severity,
        label,
        span: { start: m.index, end: m.index + val.length },
        value: val
      });
      if (m.index === re.lastIndex) re.lastIndex++;
    }
  }
};
