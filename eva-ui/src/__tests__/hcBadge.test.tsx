import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HCBadge from "../components/HCBadge";

describe("HCBadge", () => {
  it("renders and shows initial theme state and ratios", async () => {
    const { findByText } = render(<HCBadge />);
    // Initial title (likely Off unless hc-theme class pre-set)
    const offOrOn = await findByText(/High-Contrast: (On|Off)/i);
    expect(offOrOn).toBeTruthy();

    // Ratios may be placeholders in test env (—:1)
    expect(screen.getAllByText(/—:1|:\d+(\.\d+)?\:1/).length).toBeGreaterThan(0);
  });

  it("updates when hc-theme toggles on documentElement", async () => {
    const { findByText } = render(<HCBadge />);

    // Ensure starting state observed
    await findByText(/High-Contrast: (On|Off)/i);

    // Toggle theme class
    document.documentElement.classList.add("hc-theme");

    // Allow MutationObserver/react render to settle
    await new Promise((r) => setTimeout(r, 10));

    const on = await findByText(/High-Contrast: On/i);
    expect(on).toBeTruthy();

    // Toggle off again
    document.documentElement.classList.remove("hc-theme");
    await new Promise((r) => setTimeout(r, 10));
    const off = await findByText(/High-Contrast: Off/i);
    expect(off).toBeTruthy();
  });
});