import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MicButton } from "../components/chat/MicButton";

describe("MicButton", () => {
  it("renders with the microphone label and calls onDictate when clicked", () => {
    const handleDictate = vi.fn();
    render(<MicButton onDictate={handleDictate} />);

    const button = screen.getByRole("button", { name: /chat\.mic\.label/i });
    fireEvent.click(button);

    expect(handleDictate).toHaveBeenCalledTimes(1);
  });
});
