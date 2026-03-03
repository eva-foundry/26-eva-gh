import { describe, it, expect } from "vitest";
import { parsePrometheusText } from "../lib/prom";

describe("parsePrometheusText", () => {
  it("parses help/type and samples with labels", () => {
    const text = [
      "# HELP x help",
      "# TYPE x counter",
      "x{a=\"b\",c=\"d\"} 3",
      "x 1"
    ].join("\n");
    const p = parsePrometheusText(text);
    expect(p.help.x).toBe("help");
    expect(p.type.x).toBe("counter");
    expect(p.samples.length).toBe(2);
    expect(p.samples[0].labels.a).toBe("b");
  });
});