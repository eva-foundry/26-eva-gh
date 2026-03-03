import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChatInputBar } from "../components/chat/ChatInputBar";

describe("ChatInputBar", () => {
  it("submits the draft when Enter is pressed without Shift", () => {
    const handleSend = vi.fn();
    render(<ChatInputBar onSend={handleSend} isSending={false} />);

    const textarea = screen.getAllByRole("textbox")[0] as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Hello EVA" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter", shiftKey: false });

    expect(handleSend).toHaveBeenCalledWith("Hello EVA");
  });

  it("keeps the draft when Shift+Enter is pressed", () => {
    const handleSend = vi.fn();
    render(<ChatInputBar onSend={handleSend} isSending={false} />);

    const textarea = screen.getAllByRole("textbox")[0] as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter", shiftKey: true });

    expect(handleSend).not.toHaveBeenCalled();
    expect(textarea.value).toBe("Hello");
  });
});import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChatInputBar } from "../components/chat/ChatInputBar";

describe("ChatInputBar", () => {
  it("calls onSend when Enter is pressed without Shift", () => {
    const handleSend = vi.fn();

    render(<ChatInputBar onSend={handleSend} isSending={false} />);

    const textareas = screen.getAllByRole("textbox");
    const textarea = textareas[0] as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "Hello EVA" } });

    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: false,
    });

    expect(handleSend).toHaveBeenCalledWith("Hello EVA");
  });

  it("inserts newline when Shift+Enter is pressed", () => {
    const handleSend = vi.fn();

    render(<ChatInputBar onSend={handleSend} isSending={false} />);

    const textareas = screen.getAllByRole("textbox");
    const textarea = textareas[0] as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "Hello" } });

    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: true,
    });

    expect(handleSend).not.toHaveBeenCalled();
    expect(textarea.value).toBe("Hello");
  });

  it("submits the draft via the send button and clears it", () => {
    const handleSend = vi.fn();

    render(<ChatInputBar onSend={handleSend} isSending={false} />);

    const textarea = screen.getAllByRole("textbox")[0] as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Hello" } });

    const sendButton = screen.getByRole("button", { name: /chat\.send/i });
    fireEvent.click(sendButton);

    expect(handleSend).toHaveBeenCalledWith("Hello");
    expect(textarea.value).toBe("");
  });

  it("skips submitting when the draft is only whitespace", () => {
    const handleSend = vi.fn();

    render(<ChatInputBar onSend={handleSend} isSending={false} />);

    const textarea = screen.getAllByRole("textbox")[0] as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "   " } });

    const sendButton = screen.getByRole("button", { name: /chat\.send/i });
    fireEvent.click(sendButton);

    expect(handleSend).not.toHaveBeenCalled();
    expect(textarea.value).toBe("   ");
  });

  it("appends the microphone sample text when MicButton is clicked", () => {
    const handleSend = vi.fn();

    render(<ChatInputBar onSend={handleSend} isSending={false} />);

    const textarea = screen.getAllByRole("textbox")[0] as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Hello" } });

    const micButton = screen.getByLabelText("chat.mic.label");
    fireEvent.click(micButton);

    expect(textarea.value).toBe("Hello chat.mic.sample");
  });

  it("disables the send button when isSending is true", () => {
    const handleSend = vi.fn();

    render(<ChatInputBar onSend={handleSend} isSending={true} />);

    const sendButton = screen.getByRole("button", { name: /chat\.sending/i });
    expect(sendButton).toBeDisabled();
    fireEvent.click(sendButton);
    expect(handleSend).not.toHaveBeenCalled();
  });
});
