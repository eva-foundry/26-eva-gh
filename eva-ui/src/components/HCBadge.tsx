import { useEffect, useMemo, useState } from "react";
import { checkContrast } from "eva-i11y";

type Ratio = {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  AALarge: boolean;
  AAALarge: boolean;
};

type Metrics = {
  themeOn: boolean;
  body: Ratio | null;
  link: Ratio | null;
  button: Ratio | null;
};

function getComputedPairColors(): {
  body: { fg: string; bg: string } | null;
  link: { fg: string; bg: string } | null;
  button: { fg: string; bg: string } | null;
} {
  // Body text vs background
  const bodyStyle = window.getComputedStyle(document.body);
  const body = {
    fg: bodyStyle.color,
    bg: bodyStyle.backgroundColor
  };

  // Link vs background (create a temp anchor to get link color)
  const a = document.createElement("a");
  a.href = "#";
  a.style.position = "absolute";
  a.style.left = "-9999px";
  a.textContent = "x";
  document.body.appendChild(a);
  const linkStyle = window.getComputedStyle(a);
  const link = {
    fg: linkStyle.color,
    bg: body.bg
  };
  document.body.removeChild(a);

  // Button (.btn) text vs background (use a temporary element to read Tailwind-applied styles)
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.style.position = "absolute";
  btn.style.left = "-9999px";
  btn.textContent = "x";
  document.body.appendChild(btn);
  const btnStyle = window.getComputedStyle(btn);
  const button = {
    fg: btnStyle.color,
    bg: btnStyle.backgroundColor
  };
  document.body.removeChild(btn);

  // Guard against empty computed values in very early mounts
  const valid = (c: { fg: string; bg: string }) =>
    !!c.fg && !!c.bg && c.fg !== "rgba(0, 0, 0, 0)" && c.bg !== "rgba(0, 0, 0, 0)";

  return {
    body: valid(body) ? body : null,
    link: valid(link) ? link : null,
    button: valid(button) ? button : null
  };
}

function compute(): Metrics {
  const themeOn = document.documentElement.classList.contains("hc-theme");
  const pairs = getComputedPairColors();

  const body = pairs.body ? checkContrast(pairs.body.fg, pairs.body.bg) : null;
  const link = pairs.link ? checkContrast(pairs.link.fg, pairs.link.bg) : null;
  const button = pairs.button ? checkContrast(pairs.button.fg, pairs.button.bg) : null;

  return { themeOn, body, link, button };
}

function StatusPill({ label, pass }: { label: string; pass: boolean | undefined }) {
  const cls = pass ? "bg-emerald-600/20 text-emerald-300 border-emerald-500/40" : "bg-rose-600/20 text-rose-300 border-rose-500/40";
  const dot = pass ? "bg-emerald-500" : "bg-rose-500";
  const sr = pass ? "Pass" : "Fail";
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${cls}`} aria-label={`${label}: ${sr}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      <span className="text-[10px] leading-none">{label}</span>
    </span>
  );
}

function Row({
  label,
  r
}: {
  label: string;
  r: Ratio | null | undefined;
}) {
  const ratioText = r ? `${r.ratio.toFixed(2)}:1` : "—:1";
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-neutral-300">{label}</div>
      <div className="flex items-center gap-2">
        <span className="tabular-nums text-neutral-200 w-[64px] text-right">{ratioText}</span>
        <div className="flex items-center gap-1.5">
          <StatusPill label="AA" pass={r?.AA} />
          <StatusPill label="AAA" pass={r?.AAA} />
        </div>
      </div>
    </div>
  );
}

export default function HCBadge() {
  const [metrics, setMetrics] = useState<Metrics>(() => compute());

  // Recompute on theme class changes (MutationObserver) and window resize
  useEffect(() => {
    // Recompute immediately after mount to ensure styles applied
    const id = window.setTimeout(() => setMetrics(compute()), 0);

    const mo = new MutationObserver((mut) => {
      if (mut.some((m) => m.type === "attributes" && m.attributeName === "class")) {
        setMetrics(compute());
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onResize = () => setMetrics(compute());
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(id);
      mo.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const title = useMemo(() => (metrics.themeOn ? "High-Contrast: On" : "High-Contrast: Off"), [metrics.themeOn]);

  return (
    <div className="card px-3 py-2 text-xs min-w-[280px]" role="status" aria-live="polite" title="WCAG contrast checks">
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-neutral-200">{title}</span>
        {/* Quick AA indicator for body text */}
        <StatusPill label="AA" pass={metrics.body?.AA} />
      </div>
      <div className="mt-2 space-y-1.5">
        <Row label="Body vs bg" r={metrics.body} />
        <Row label="Link vs bg" r={metrics.link} />
        <Row label="Button vs bg" r={metrics.button} />
      </div>
      <div className="mt-2 text-[11px] text-neutral-400">
        <span className="mr-2">AA ≥ 4.5</span>
        <span>AAA ≥ 7.0</span>
      </div>
    </div>
  );
}