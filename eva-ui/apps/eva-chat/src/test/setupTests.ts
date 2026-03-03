import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Global mock for the i18n hook used by components like ModeToggle, ChatInputBar, etc.
vi.mock("../lib/i18n", () => ({
  useI18n: () => ({
    // simple identity translator – returns the key as text
    t: (key: string) => key,
    locale: "en-CA",
    setLocale: vi.fn(),
  }),
}));

afterEach(() => cleanup());
