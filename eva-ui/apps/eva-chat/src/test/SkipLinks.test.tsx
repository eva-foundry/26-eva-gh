import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLinks } from "../components/layout/SkipLinks";

describe("SkipLinks", () => {
  it("targets the main content and chat input", () => {
    render(<SkipLinks />);

    const mainLink = screen.getByRole("link", { name: "layout.skipToMain" });
    const inputLink = screen.getByRole("link", { name: "layout.skipToInput" });

    expect(mainLink).toHaveAttribute("href", "#main-content");
    expect(inputLink).toHaveAttribute("href", "#chat-input");
  });
});
