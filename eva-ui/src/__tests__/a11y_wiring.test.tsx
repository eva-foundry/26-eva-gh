import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";

describe("a11y wiring", () => {
  it("renders SkipLink and main landmark", () => {
    const client = new QueryClient();
    const { getByText, container } = render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(getByText(/Skip to main content/i)).toBeTruthy();
    const main = container.querySelector("#main");
    expect(main?.getAttribute("role")).toBe("main");
  });
});