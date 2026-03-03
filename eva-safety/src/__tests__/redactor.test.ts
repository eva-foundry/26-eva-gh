import { describe, it, expect } from "vitest";
import { redactText } from "../redaction/redactor.js";

describe("Redactor", () => {
  it("merges overlapping spans and redacts fully", () => {
    const text = "abcdefg";
    const spans = [{ start: 1, end: 4 }, { start: 3, end: 6 }];
    const red = redactText(text, spans, "full", "#");
    expect(red).toBe("a#####g");
  });
});