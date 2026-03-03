import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { ChatShell } from "../components/chat/ChatShell";

const mockSendChatCompletion = vi.fn(() => Promise.resolve({ reply: "Mock reply" }));
const mockTrackEvent = vi.fn();

vi.mock("../api/evaApiClient", () => ({
  sendChatCompletion: (...args: Parameters<typeof mockSendChatCompletion>) => mockSendChatCompletion(...args)
}));

vi.mock("../lib/telemetry", () => ({
  trackEvent: (...args: Parameters<typeof mockTrackEvent>) => mockTrackEvent(...args)
}));

describe("ChatShell", () => {
  beforeEach(() => {
    mockSendChatCompletion.mockResolvedValue({ reply: "Mock reply" });
    mockTrackEvent.mockClear();
    mockSendChatCompletion.mockClear();
  });

  it("renders the chat frame landmarks", () => {
    render(<ChatShell />);

    expect(screen.getByLabelText("chat.shell.aria")).toBeInTheDocument();
    expect(screen.getByText("chat.shell.title")).toBeInTheDocument();
    expect(screen.getByText("chat.shell.subtitle")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "chat.mode.label" })).toBeInTheDocument();
    expect(screen.getByRole("log", { name: "chat.history" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "chat.input.placeholder" })).toBeInTheDocument();
  });

  it("sends a message and renders the assistant reply", async () => {
    const user = userEvent.setup();
    render(<ChatShell />);

    const textarea = screen.getByRole("textbox", { name: "chat.input.placeholder" });
    await user.type(textarea, "Hello EVA");
    await user.keyboard("{Enter}");

    expect(mockSendChatCompletion).toHaveBeenCalledWith({
      threadId: expect.any(String),
      messages: [{ role: "user", content: "Hello EVA" }],
      mode: "external",
      locale: "en-CA"
    });

    expect(await screen.findByText("Mock reply")).toBeInTheDocument();
    expect(mockTrackEvent).toHaveBeenCalledWith("chat_message_sent", expect.objectContaining({ mode: "external", locale: "en-CA" }));
    expect(mockTrackEvent).toHaveBeenCalledWith("chat_message_received", expect.objectContaining({ mode: "external", locale: "en-CA" }));
  });

  it("clears the history when a new thread is created", async () => {
    const user = userEvent.setup();
    mockSendChatCompletion.mockResolvedValue({ reply: "Another reply" });
    render(<ChatShell />);

    const textarea = screen.getByRole("textbox", { name: "chat.input.placeholder" });
    await user.type(textarea, "Reset thread");
    await user.keyboard("{Enter}");

    await screen.findByText("Another reply");

    const newThreadButton = screen.getByRole("button", { name: "chat.sidebar.new" });
    await user.click(newThreadButton);

    expect(screen.getByText("chat.empty")).toBeInTheDocument();
  });
});
