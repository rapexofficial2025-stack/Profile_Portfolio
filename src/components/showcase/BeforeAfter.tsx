"use client";

import { useRef, useState } from "react";

/** Before/after comparison: drag the handle (or use arrow keys) to reveal the "after" side. Placeholders for now. */
export function BeforeAfter({ label, before, after }: { label: string; before: string; after: string }) {
  const [split, setSplit] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  // both values are screen px, so the ratio is unaffected by the page zoom
  const setFromPointer = (clientX: number) => { const bounds = frame.current?.getBoundingClientRect(); if (bounds) setSplit(Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100))); };

  return <figure>
    <div ref={frame} className="showcase-compare" onPointerDown={(event) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); setFromPointer(event.clientX); }} onPointerMove={(event) => { if (dragging.current) setFromPointer(event.clientX); }} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }}>
      <div className="showcase-compare-side is-before"><span className="showcase-compare-tag">Before</span><p>{before}</p></div>
      <div className="showcase-compare-side is-after" style={{ clipPath: `inset(0 0 0 ${split}%)` }}><span className="showcase-compare-tag right-3 left-auto">After</span><p>{after}</p></div>
      <div className="showcase-compare-handle" style={{ left: `${split}%` }} role="slider" tabIndex={0} aria-label={`${label}: before and after`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(split)}
        onKeyDown={(event) => { if (event.key === "ArrowLeft") setSplit((v) => Math.max(0, v - 5)); if (event.key === "ArrowRight") setSplit((v) => Math.min(100, v + 5)); }}><span /></div>
    </div>
    <figcaption className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200/80">{label}</figcaption>
  </figure>;
}
