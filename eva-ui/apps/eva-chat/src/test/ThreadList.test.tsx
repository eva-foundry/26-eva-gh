import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";
import { ThreadList } from "../components/chat/ThreadList";

describe("ThreadList", () => {
  const threads = [
    { id: "one", title: "First thread", updatedAt: new Date().toISOString() },
    { id: "two", title: "Second thread", updatedAt: new Date().toISOString() },
    { id: "three", title: "Third thread" }
  ];

  it("renders a listbox with active selection", () => {
    render(<ThreadList threads={threads} activeThreadId="two" onSelect={vi.fn()} ariaLabel="Threads" />);

    const listbox = screen.getByRole("listbox", { name: "Threads" });
    expect(listbox).toHaveAttribute("aria-activedescendant", "thread-two");

    const options = screen.getAllByRole("option");
    expect(options[1]).toHaveAttribute("aria-selected", "true");
    expect(options[0]).toHaveAttribute("aria-selected", "false");
  });

  it("moves focus with arrow keys and triggers onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<ThreadList threads={threads} activeThreadId="one" onSelect={onSelect} ariaLabel="Threads" />);

    const firstButton = screen.getByRole("option", { name: /first thread/i });
    firstButton.focus();
    expect(firstButton).toHaveFocus();

    await user.keyboard("{ArrowDown}");

    expect(onSelect).toHaveBeenCalledWith("two");
  });

  it("supports Home, End, and ArrowUp navigation", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<ThreadList threads={threads} activeThreadId="two" onSelect={onSelect} ariaLabel="Threads" />);

    const buttons = screen.getAllByRole("option");
    const secondButton = buttons[1];
    secondButton.focus();

    await user.keyboard("{Home}");
    expect(onSelect).toHaveBeenNthCalledWith(1, "one");

    await user.keyboard("{End}");
    expect(onSelect).toHaveBeenNthCalledWith(2, "three");

    await user.keyboard("{ArrowUp}");
    expect(onSelect).toHaveBeenNthCalledWith(3, "two");
  });

  it("only renders timestamps for threads with valid updated dates", () => {
    const timestampThreads = [
      { id: "a", title: "Has date", updatedAt: new Date().toISOString() },
      { id: "b", title: "Invalid date", updatedAt: "not-a-date" },
      { id: "c", title: "No date" }
    ];

    render(<ThreadList threads={timestampThreads} activeThreadId="a" onSelect={vi.fn()} ariaLabel="Threads" />);

    const timestampedButton = screen.getByRole("option", { name: /Has date/i });
    expect(
      within(timestampedButton).getByText((_, node) => node?.tagName === "SPAN" && node.className.includes("text-xs"))
    ).toBeInTheDocument();

    const invalidButton = screen.getByRole("option", { name: /Invalid date/i });
    expect(
      within(invalidButton).queryByText((_, node) => node?.tagName === "SPAN" && node.className.includes("text-xs"))
    ).toBeNull();

    const noDateButton = screen.getByRole("option", { name: /No date/i });
    expect(
      within(noDateButton).queryByText((_, node) => node?.tagName === "SPAN" && node.className.includes("text-xs"))
    ).toBeNull();
  });
});
