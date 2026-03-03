import "eva-i11y/styles/a11y.css";
import "eva-i11y/styles/high-contrast.css"; // High-contrast theme (opt-in via .hc-theme class)
import "./index.css";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const qc = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={qc}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);