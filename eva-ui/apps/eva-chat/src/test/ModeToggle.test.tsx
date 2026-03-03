import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ModeToggle } from "../components/chat/ModeToggle";

describe("ModeToggle", () => {
  it("calls onModeChange when switching from internal to external", () => {
    const handleChange = vi.fn();
    render(<ModeToggle mode="internal" onModeChange={handleChange} />);

    const buttons = screen.getAllByRole("button");
    const externalButton = buttons.find((btn) => btn.textContent?.includes("chat.mode.external"));
    expect(externalButton).toBeDefined();
    fireEvent.click(externalButton!);

    expect(handleChange).toHaveBeenCalledWith("external");
  });

  it("invokes handler when switching back to internal", () => {
    const handleChange = vi.fn();
    render(<ModeToggle mode="external" onModeChange={handleChange} />);

    const buttons = screen.getAllByRole("button");
    const internalButton = buttons.find((btn) => btn.textContent?.includes("chat.mode.internal"));
    expect(internalButton).toBeDefined();
    fireEvent.click(internalButton!);

    expect(handleChange).toHaveBeenCalled();
  });
});import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModeToggle } from "../components/chat/ModeToggle";

describe("ModeToggle", () => {
  it("toggles from internal to external", () => {
    const handleChange = vi.fn();

    render(<ModeToggle mode="internal" onModeChange={handleChange} />);

    const externalButton = screen.getByRole("button", { name: /External/i });
    fireEvent.click(externalButton);

    expect(handleChange).toHaveBeenCalledWith("external");
  });

  it("toggles from external to internal", () => {
    const handleChange = vi.fn();

    render(<ModeToggle mode="external" onModeChange={handleChange} />);

    // There are two "Internal" buttons; pick the one that is NOT currently active
    const internalButtons = screen.getAllByRole("button", { name: /Internal/i });
    const internalButton =
      internalButtons.find(
        (btn) => btn.getAttribute("aria-pressed") === "false"
      ) ?? internalButtons[0];

    fireEvent.click(internalButton);

    expect(handleChange).toHaveBeenCalledWith("internal");
  });
});
