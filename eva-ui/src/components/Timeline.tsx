import { useEffect, useMemo, useRef, useState } from "react";
import type { Session, PhaseSpan } from "../lib/eventsTransform";

type Props = {
  sessions: Session[];
  minTs?: number;
  maxTs?: number;
  heightPerLane?: number;
};

const PADDING_LEFT = 160;
const PADDING_RIGHT = 24;
const PADDING_TOP = 32;
const PADDING_BOTTOM = 24;

const PHASE_COLORS: Record<string, string> = {
  load: "#22c55e",
  chunk: "#84cc16",
  embed: "#eab308",
  index: "#06b6d4",
  manifest: "#8b5cf6",
  evaluate: "#f97316",
  complete: "#22c55e",
  rollback: "#ef4444"
};

function colorForPhase(phase: string, error?: string) {
  if (error) return "#ef4444";
  return PHASE_COLORS[phase] || "#a3a3a3";
}

export default function Timeline({ sessions, minTs, maxTs, heightPerLane = 28 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(800);
  const [now, setNow] = useState(Date.now());

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => setWidth(el.clientWidth));
    obs.observe(el);
    setWidth(el.clientWidth);
    return () => obs.disconnect();
  }, []);

  // Update 'now' every 2s for running spans rendering
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 2000);
    return () => clearInterval(id);
  }, []);

  const timeBounds = useMemo(() => {
    if (minTs != null && maxTs != null && maxTs > minTs) return { min: minTs, max: maxTs };
    let min = Number.POSITIVE_INFINITY;
    let max = 0;
    for (const s of sessions) {
      min = Math.min(min, s.start);
      max = Math.max(max, s.end ?? s.start);
    }
    if (!isFinite(min) || max <= min) {
      const nowTs = Date.now();
      return { min: nowTs - 60_000, max: nowTs };
    }
    return { min, max };
  }, [sessions, minTs, maxTs]);

  const w = Math.max(320, width);
  const contentW = Math.max(1, w - PADDING_LEFT - PADDING_RIGHT);
  const laneGap = 10;
  const totalHeight = PADDING_TOP + PADDING_BOTTOM + sessions.length * (heightPerLane + laneGap);

  const xScale = (ts: number) => {
    const t = (ts - timeBounds.min) / (timeBounds.max - timeBounds.min || 1);
    return PADDING_LEFT + t * contentW;
  };

  const axisTicks = buildTicks(timeBounds.min, timeBounds.max, 5);

  return (
    <div ref={containerRef} className="card p-0 overflow-hidden">
      <svg width={w} height={totalHeight} aria-label="timeline">
        {/* Axis */}
        <g transform={`translate(0,${PADDING_TOP - 12})`}>
          {axisTicks.map((t, i) => (
            <g key={i} transform={`translate(${xScale(t)},0)`}>
              <line x1={0} y1={0} x2={0} y2={totalHeight - PADDING_TOP - PADDING_BOTTOM + 12} stroke="#262626" />
              <text y={-4} textAnchor="middle" fill="#9ca3af" fontSize="10">
                {formatTime(t)}
              </text>
            </g>
          ))}
        </g>

        {/* Lanes */}
        {sessions.map((s, idx) => {
          const y = PADDING_TOP + idx * (heightPerLane + laneGap);
          return (
            <g key={s.ingestionId} transform={`translate(0,${y})`}>
              {/* Label area */}
              <text x={PADDING_LEFT - 8} y={heightPerLane * 0.7} textAnchor="end" fill="#d4d4d4" fontSize="12">
                {truncate(s.ingestionId, 18)}
              </text>
              <text x={PADDING_LEFT - 8} y={heightPerLane * 0.7 + 12} textAnchor="end" fill="#9ca3af" fontSize="10">
                [{s.tenant}]
              </text>

              {/* Spans */}
              {s.phases.map((ph, j) => {
                const x1 = xScale(ph.start);
                const x2 = xScale(ph.end ?? now);
                const width = Math.max(2, x2 - x1);
                const c = colorForPhase(ph.phase, ph.error);
                return (
                  <g key={j} transform={`translate(${x1},0)`} title={spanTitle(ph)}>
                    <rect width={width} height={heightPerLane} rx={4} fill={c} opacity={0.85} />
                    <text x={6} y={heightPerLane * 0.66} fontSize="11" fill="#111827">
                      {ph.phase}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="px-3 py-2 border-t border-neutral-800 bg-neutral-950/60 text-xs text-neutral-400 flex flex-wrap gap-3">
        {Object.entries(PHASE_COLORS).map(([k, v]) => (
          <span key={k} className="inline-flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded" style={{ background: v }} />
            <span>{k}</span>
          </span>
        ))}
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded" style={{ background: "#ef4444" }} />
          <span>error</span>
        </span>
      </div>
    </div>
  );
}

function spanTitle(ph: PhaseSpan) {
  const dur = ph.durationMs ?? (ph.end && ph.start ? ph.end - ph.start : 0);
  return `${ph.phase} • ${formatDuration(dur)}${ph.error ? ` • error: ${ph.error}` : ""}`;
}

function buildTicks(min: number, max: number, count: number): number[] {
  const arr: number[] = [];
  const step = (max - min) / Math.max(1, count - 1);
  for (let i = 0; i < count; i++) arr.push(Math.round(min + i * step));
  return arr;
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function formatDuration(ms: number) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}
function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}