import { useEffect, useRef } from "react";

export default function Sparkline({ values, color = "#2491ff" }: { values: number[]; color?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dpr = window.devicePixelRatio || 1;
    const w = el.clientWidth;
    const h = el.clientHeight;
    el.width = w * dpr;
    el.height = h * dpr;
    const ctx = el.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    if (!values.length) return;
    const max = Math.max(...values);
    const min = Math.min(...values);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = (i / (values.length - 1)) * (w - 4) + 2;
      const y = h - 2 - ((v - min) / (max - min || 1)) * (h - 4);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [values, color]);
  return <canvas ref={ref} className="w-full h-10" />;
}