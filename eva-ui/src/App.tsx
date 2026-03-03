import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import OpsBatch from "./routes/OpsBatch";
import RagIngest from "./routes/RagIngest";
import Metrics from "./routes/Metrics";
import Safety from "./routes/Safety";
import Events from "./routes/Events";
import ToastHost from "./components/ToastHost";

// a11y imports
import { SkipLink, ToastRegion, RouteFocus } from "eva-i11y";
import { useEffect } from "react";
import { useFocusVisible } from "eva-i11y";
import HCToggle from "./components/HCToggle";

export default function App() {
  useFocusVisible();
  const location = useLocation();

  useEffect(() => {
    // RouteFocus handles focus move; keep hook to reflect location.key dependency
  }, [location.key]);

  return (
    <ToastRegion>
      <RouteFocus resetKey={location.key} selector="#main" fallback="h1" />
      <div className="min-h-screen grid grid-cols-[260px_1fr]">
        {/* Skip link as first tabbable element */}
        <SkipLink href="#main">Skip to main content</SkipLink>

        <aside className="border-r border-neutral-800 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="font-semibold text-lg">
              <Link to="/">EVA UI</Link>
            </div>
            <HCToggle />
          </div>
          <nav className="flex flex-col gap-1 mt-4" aria-label="Primary">
            <NavItem to="/">Dashboard</NavItem>
            <NavItem to="/ops/batch">Ops • Batch</NavItem>
            <NavItem to="/rag/ingest">RAG • Ingest</NavItem>
            <NavItem to="/events">Events • Timeline</NavItem>
            <NavItem to="/metrics">Metrics</NavItem>
            <NavItem to="/safety">Safety</NavItem>
          </nav>
        </aside>

        <main id="main" role="main" className="p-6 space-y-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ops/batch" element={<OpsBatch />} />
            <Route path="/rag/ingest" element={<RagIngest />} />
            <Route path="/events" element={<Events />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/safety" element={<Safety />} />
          </Routes>
          <ToastHost />
        </main>
      </div>
    </ToastRegion>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md hover:bg-neutral-800 focus-ring ${isActive ? "bg-neutral-800" : ""}`
      }
      // NavLink sets aria-current="page" when active automatically
    >
      {children}
    </NavLink>
  );
}