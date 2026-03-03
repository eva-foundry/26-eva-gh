export type Severity = "low" | "medium" | "high" | "critical";
export type Category = "pii" | "secret" | "toxicity" | "jailbreak";

export type Span = { start: number; end: number }; // [start, end) UTF-16 indices
export type Finding = {
  category: Category;
  severity: Severity;
  label: string;
  span?: Span;
  value?: string;
};

export type Detector = (text: string) => Finding[];

export type RuleAction = "block" | "sanitize" | "flag" | "allow";

export type Rule = {
  id: string;
  categories: Category[];
  minSeverity?: Severity; // default low
  action: RuleAction;
  redaction?: "full" | "partial";
};

export type Policy = {
  rules: Rule[];
};

export type Evaluation = {
  blocked: boolean;
  action: RuleAction;
  sanitizedText: string;
  findings: Finding[];
  appliedRules: string[];
};