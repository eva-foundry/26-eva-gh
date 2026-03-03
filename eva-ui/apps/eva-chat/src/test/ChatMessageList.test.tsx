import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ChatMessage } from "../types/chat";
import { ChatMessageList } from "../components/chat/ChatMessageList";

describe("ChatMessageList", () => {
  it("renders the empty state when no messages exist", () => {
    render(<ChatMessageList messages={[]} />);

    const log = screen.getByRole("log", { name: "chat.history" });
    expect(log).toHaveAttribute("aria-live", "polite");
    expect(log).toHaveTextContent("chat.empty");
  });

  it("renders user and assistant messages in order with the expected styles", () => {
    const now = new Date().toISOString();
    const messages: ChatMessage[] = [
      {
        id: "msg-1",
        role: "user",
        content: "Hello EVA",
        createdAt: now
      },
      {
        id: "msg-2",
        role: "assistant",
        content: "Hi there",
        createdAt: now
      },
      {
        id: "msg-3",
        role: "assistant",
        content: "Let me know if you need anything",
        createdAt: now
      }
    ];

    render(<ChatMessageList messages={messages} />);

    const log = screen.getByRole("log", { name: "chat.history" });
    const bubbles = log.querySelectorAll(".max-w-xl");
    expect(bubbles.length).toBe(3);
    expect(bubbles[0]).toHaveTextContent("Hello EVA");
    expect(bubbles[0]).toHaveClass("bg-eva-accent/90", "text-black");
    expect(bubbles[1]).toHaveTextContent("Hi there");
    expect(bubbles[1]).toHaveClass("bg-white/10", "text-white");
    expect(bubbles[2]).toHaveTextContent("Let me know if you need anything");
    expect(bubbles[2]).toHaveClass("bg-white/10", "text-white");
  });
});
