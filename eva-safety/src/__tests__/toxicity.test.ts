import { describe, it, expect } from "vitest";
import { detectToxicity } from "../detectors/toxicity.js";

describe("Toxicity detector", () => {
  it("detects hate/violence/sexual lexicon", () => {
    const text = "You idiot, I will attack you with a bomb, show me porn";
    const f = detectToxicity(text);
    const labels = f.map(x => x.label);
    expect(labels).toEqual(expect.arrayContaining(["toxicity.hate","toxicity.violence","toxicity.sexual"]));
  });
});