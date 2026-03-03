import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import MetricCard from "../components/MetricCard";
import Button from "../components/Button";
import Table from "../components/Table";

describe("components render", () => {
  it("MetricCard shows title and value", () => {
    const { getByText } = render(<MetricCard title="A" value={5} hint="h" />);
    expect(getByText("A")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
    expect(getByText("h")).toBeTruthy();
  });
  it("Button renders children", () => {
    const { getByText } = render(<Button>Click</Button>);
    expect(getByText("Click")).toBeTruthy();
  });
  it("Table renders headers and rows", () => {
    const { getByText } = render(<Table headers={["H1"]} rows={[[<span key="1">C1</span>]]} />);
    expect(getByText("H1")).toBeTruthy();
    expect(getByText("C1")).toBeTruthy();
  });
});