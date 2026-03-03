import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations as any);

describe("axe smoke test", () => {
  it("App has no critical a11y violations on initial render", async () => {
    const client = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const results = await axe(container);
    // This is a smoke test; if you see failures, fix or add explicit bypass where justified.
    expect(results).toHaveNoViolations();
  });
});