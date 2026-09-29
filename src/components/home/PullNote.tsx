"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { pageZoom } from "@/lib/zoom";

const PULL = 180;
const ROPE = 44;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Sim = {
  px: number; py: number; vx: number; vy: number; // handle offset from rest + velocity (px / frame)
  cx: number; cy: number; cvx: number; cvy: number; // rope bend point + velocity: it chases the rope's midpoint, so the rope swerves
  dragging: boolean; frame: number; moved: number;
  start: { pointerX: number; pointerY: number; px: number; py: number; zoom: number };
};

/**
 * Yellow "PULL DOWN" tag on a rope. Drag it anywhere: the rope bends and trails behind; let go and it keeps the
 * throw's momentum and swings back to rest. Pulling down unrolls the verse note.
 * `anchorRight` is the rope's tie point, in px from the container's right edge.
 */
export function PullNote({ className = "", anchorRight }: { className?: string; anchorRight?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tilt = useMotionValue(0);
  const paperScale = useTransform(y, [0, PULL], [0, 1]);
  const paperOpacity = useTransform(y, [0, 14], [0, 1]);
  const verseOpacity = useTransform(y, [62, 145], [0, 1]);
  const ropeRef = useRef<SVGPathElement>(null);
  const ropeTopRef = useRef<SVGPathElement>(null);
  const sim = useRef<Sim>({ px: 0, py: 0, vx: 0, vy: 0, cx: 0, cy: ROPE / 2, cvx: 0, cvy: 0, dragging: false, frame: 0, moved: 0, start: { pointerX: 0, pointerY: 0, px: 0, py: 0, zoom: 1 } });

  const render = () => {
    const s = sim.current;
    x.set(s.px); y.set(s.py); tilt.set(clamp(s.px * 0.22, -28, 28));
    const d = `M 0 0 Q ${s.cx.toFixed(1)} ${s.cy.toFixed(1)} ${s.px.toFixed(1)} ${(ROPE + s.py).toFixed(1)}`;
    ropeRef.current?.setAttribute("d", d); ropeTopRef.current?.setAttribute("d", d);
  };

  const step = () => {
    const s = sim.current;
    if (!s.dragging) {
      // inertia: velocity carries on, a spring pulls the tag back to rest, damping bleeds the swing off
      s.vx += -s.px * 0.035; s.vy += -s.py * 0.05;
      s.vx *= 0.94; s.vy *= 0.9;
      s.px += s.vx; s.py = Math.max(-18, s.py + s.vy);
    }
    const targetX = s.px / 2, targetY = (ROPE + s.py) / 2 + 6;
    s.cvx = (s.cvx + (targetX - s.cx) * 0.18) * 0.78; s.cvy = (s.cvy + (targetY - s.cy) * 0.18) * 0.78;
    s.cx += s.cvx; s.cy += s.cvy;
    render();
    const settled = !s.dragging && [s.px, s.py, s.vx, s.vy, s.cvx, s.cvy].every((v) => Math.abs(v) < 0.05) && Math.abs(s.cx) < 0.1;
    if (settled) { Object.assign(s, { px: 0, py: 0, vx: 0, vy: 0, cx: 0, cy: ROPE / 2 + 6, cvx: 0, cvy: 0, frame: 0 }); render(); return; }
    s.frame = requestAnimationFrame(step);
  };
  const run = () => { if (!sim.current.frame) sim.current.frame = requestAnimationFrame(step); };
  const tug = () => { const s = sim.current; s.vy = 14; s.vx = (Math.random() - 0.5) * 8; run(); };

  useEffect(() => () => cancelAnimationFrame(sim.current.frame), []);

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const s = sim.current;
    s.dragging = true; s.moved = 0; s.vx = 0; s.vy = 0;
    s.start = { pointerX: event.clientX, pointerY: event.clientY, px: s.px, py: s.py, zoom: pageZoom() };
    run();
  };
  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const s = sim.current; if (!s.dragging) return;
    const nx = clamp(s.start.px + (event.clientX - s.start.pointerX) / s.start.zoom, -120, 120);
    const ny = clamp(s.start.py + (event.clientY - s.start.pointerY) / s.start.zoom, -12, PULL + 12);
    s.vx = clamp(nx - s.px, -40, 40); s.vy = clamp(ny - s.py, -40, 40); // becomes the throw velocity on release
    s.moved += Math.abs(nx - s.px) + Math.abs(ny - s.py);
    s.px = nx; s.py = ny;
  };
  const onPointerUp = () => {
    const s = sim.current; if (!s.dragging) return;
    s.dragging = false;
    if (shouldReduceMotion) { Object.assign(s, { px: 0, py: 0, vx: 0, vy: 0 }); }
    else if (s.moved < 4) tug();
    run();
  };

  const anchorLeft = anchorRight === undefined ? "50%" : `calc(100% - ${anchorRight}px)`;
  return <div className={`note-pull-anchor ${className}`}>
    <motion.div style={{ scaleY: paperScale, opacity: paperOpacity, right: anchorRight === undefined ? 0 : Math.max(0, anchorRight - 24) }} className="prayer-note absolute top-0 z-1 aspect-3/4 w-full"><span className="prayer-note-lines" aria-hidden="true" /><motion.div style={{ opacity: verseOpacity }} className="prayer-note-copy"><p className="text-[0.46rem] font-bold tracking-[0.2em] text-amber-950/55">A VERSE FOR TODAY</p><blockquote className="mt-4 font-serif text-sm leading-6 text-amber-950/85">“The LORD bless thee, and keep thee.”</blockquote><p className="mt-3 text-[0.5rem] font-bold tracking-[0.16em] text-amber-900/55">NUMBERS 6:24 · KJV</p></motion.div></motion.div>
    <svg className="note-pull-rope" style={{ left: anchorLeft }} width="1" height="1" aria-hidden="true">
      <path ref={ropeRef} d={`M 0 0 Q 0 ${ROPE / 2 + 6} 0 ${ROPE}`} className="note-pull-rope-base" />
      <path ref={ropeTopRef} d={`M 0 0 Q 0 ${ROPE / 2 + 6} 0 ${ROPE}`} className="note-pull-rope-twist" />
    </svg>
    <span className="note-pull-knot" style={{ left: anchorLeft }} aria-hidden="true" />
    <motion.button type="button" style={{ x, y, rotate: tilt, top: ROPE, left: anchorLeft }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onClick={(event) => { if (event.detail === 0) tug(); }} className="note-pull-handle" aria-label="Pull down to reveal a Bible verse">PULL DOWN</motion.button>
  </div>;
}
