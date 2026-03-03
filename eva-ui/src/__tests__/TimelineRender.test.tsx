import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Timeline from "../components/Timeline";

describe("Timeline", () => {
  it("renders lanes and spans", () => {
    const sessions = [
      {
        ingestionId: "ing-1",
        tenant: "t",
        start: 1000,
        end: 3000,
        phases: [
          { phase: "load", start: 1000, end: 1500, durationMs: 500 },
          { phase: "chunk", start: 1600, end: 2000, durationMs: 400 },
          { phase: "embed", start: 2100, end: 3000, durationMs: 900 }
        ]
      }
    ];
    const { getByLabelText } = render(<Timeline sessions={sessions as any} />);
    expect(getByLabelText("timeline")).toBeTruthy();
  });
});