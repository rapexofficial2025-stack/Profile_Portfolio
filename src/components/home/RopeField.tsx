"use client";

import { useEffect, useRef } from "react";

const ROPES = 10;
const POINTS = 28;
const FRAME_MS = 1000 / 30; // 30fps is plenty for this ambient effect and halves the work
type Point = { x: number; y: number; vx: number; vy: number };

/**
 * Stress-reliever canvas: glowing rope lines on a dark field. Ropes bend toward and follow the pointer; a click
 * scatters them outward so they fly around, then springs pull them back to their resting waves.
 */
export function RopeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0, height = 0, frame = 0, time = 0, visible = true, last = 0;
    let gradients: CanvasGradient[] = [], glowGradients: CanvasGradient[] = [];
    let ropes: Point[][] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let scatter = 0; // 1 right after a click, decays to 0: loosens the springs so the ropes fly

    const restY = (rope: number, i: number) => {
      const base = height * (0.16 + (rope / (ROPES - 1)) * 0.68);
      return base + Math.sin(i * 0.28 + rope * 0.6 + time * 1.1) * height * 0.045 + Math.sin(i * 0.11 - time * 0.7 + rope) * height * 0.03;
    };
    const restX = (i: number) => (i / (POINTS - 1)) * (width + 40) - 20;

    const resize = () => {
      const dpr = Math.min(1.25, window.devicePixelRatio || 1);
      width = canvas.clientWidth; height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      ropes = Array.from({ length: ROPES }, (_, rope) => Array.from({ length: POINTS }, (_, i) => ({ x: restX(i), y: restY(rope, i), vx: 0, vy: 0 })));
      context.fillStyle = "#070912"; context.fillRect(0, 0, width, height);
      // gradients only depend on width, so build them once per resize instead of every frame
      gradients = []; glowGradients = [];
      for (let r = 0; r < ROPES; r++) {
        const hue = 188 + (r / (ROPES - 1)) * 120; // cyan -> violet -> magenta
        const line = context.createLinearGradient(0, 0, width, 0);
        line.addColorStop(0, `hsla(${hue - 20}, 90%, 62%, 0.05)`); line.addColorStop(0.5, `hsla(${hue}, 95%, 66%, 0.85)`); line.addColorStop(1, `hsla(${hue + 25}, 90%, 62%, 0.05)`);
        const glow = context.createLinearGradient(0, 0, width, 0);
        glow.addColorStop(0, `hsla(${hue}, 95%, 65%, 0)`); glow.addColorStop(0.5, `hsla(${hue}, 95%, 65%, 0.16)`); glow.addColorStop(1, `hsla(${hue}, 95%, 65%, 0)`);
        gradients.push(line); glowGradients.push(glow);
      }
    };

    const step = () => {
      if (!reduceMotion) time += 0.016;
      scatter *= 0.99;
      const stiffness = 0.02 * (1 - scatter * 0.92), damping = 0.9 + scatter * 0.08;
      const reach = Math.max(60, width * 0.18);
      for (let r = 0; r < ROPES; r++) {
        const rope = ropes[r];
        for (let i = 0; i < POINTS; i++) {
          const p = rope[i];
          p.vx += (restX(i) - p.x) * stiffness; p.vy += (restY(r, i) - p.y) * stiffness;
          // rope tension: each point is pulled toward the middle of its neighbours
          if (i > 0 && i < POINTS - 1) { p.vx += ((rope[i - 1].x + rope[i + 1].x) / 2 - p.x) * 0.12; p.vy += ((rope[i - 1].y + rope[i + 1].y) / 2 - p.y) * 0.12; }
          if (pointer.active) {
            const dx = pointer.x - p.x, dy = pointer.y - p.y, dist = Math.hypot(dx, dy);
            if (dist < reach) { const pull = (1 - dist / reach) ** 2 * 0.09; p.vx += dx * pull; p.vy += dy * pull; }
          }
          p.vx *= damping; p.vy *= damping; p.x += p.vx; p.y += p.vy;
          // while scattered, the panel edges bounce the ropes back in so they fly around inside the frame
          if (scatter > 0.05) {
            if (p.y < 4 || p.y > height - 4) { p.vy *= -0.7; p.y = Math.min(height - 4, Math.max(4, p.y)); }
            if (i > 0 && i < POINTS - 1 && (p.x < 4 || p.x > width - 4)) { p.vx *= -0.7; p.x = Math.min(width - 4, Math.max(4, p.x)); }
          }
        }
      }
    };

    const draw = () => {
      // translucent fill instead of clear: leaves soft motion trails
      context.globalCompositeOperation = "source-over";
      context.fillStyle = "rgba(7, 9, 18, 0.5)"; context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      context.lineCap = "round"; context.lineJoin = "round";
      for (let r = 0; r < ROPES; r++) {
        const rope = ropes[r], t = r / (ROPES - 1), core = 1.3 + (1 - Math.abs(t - 0.5) * 2) * 0.9;
        context.beginPath(); context.moveTo(rope[0].x, rope[0].y);
        for (let i = 1; i < POINTS - 1; i++) { const mx = (rope[i].x + rope[i + 1].x) / 2, my = (rope[i].y + rope[i + 1].y) / 2; context.quadraticCurveTo(rope[i].x, rope[i].y, mx, my); }
        context.lineTo(rope[POINTS - 1].x, rope[POINTS - 1].y);
        // cheap glow: a wide faint stroke under the core line instead of shadowBlur, which re-blurs every frame
        context.strokeStyle = glowGradients[r]; context.lineWidth = core * 5; context.stroke();
        context.strokeStyle = gradients[r]; context.lineWidth = core; context.stroke();
      }
      if (pointer.active) { // soft light under the cursor
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 42);
        glow.addColorStop(0, "rgba(167, 139, 250, 0.22)"); glow.addColorStop(1, "rgba(167, 139, 250, 0)");
        context.fillStyle = glow; context.fillRect(pointer.x - 42, pointer.y - 42, 84, 84);
      }
    };

    const loop = (now: number) => {
      if (now - last >= FRAME_MS) { last = now; step(); step(); draw(); }
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(loop); };

    // pointer position as a ratio of the element: correct at any page zoom
    const toLocal = (event: PointerEvent) => { const b = canvas.getBoundingClientRect(); pointer.x = ((event.clientX - b.left) / b.width) * width; pointer.y = ((event.clientY - b.top) / b.height) * height; };
    const onMove = (event: PointerEvent) => { toLocal(event); pointer.active = true; start(); };
    const onLeave = () => { pointer.active = false; };
    const onDown = (event: PointerEvent) => {
      toLocal(event); scatter = 1;
      for (const rope of ropes) for (const p of rope) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y, dist = Math.hypot(dx, dy) || 1, force = 3.5 + Math.random() * 4.5;
        p.vx += (dx / dist) * force + (Math.random() - 0.5) * 3; p.vy += (dy / dist) * force + (Math.random() - 0.5) * 3;
      }
      start();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); }); intersection.observe(canvas);
    const onVisibility = () => { if (!document.hidden) start(); };
    canvas.addEventListener("pointermove", onMove); canvas.addEventListener("pointerleave", onLeave); canvas.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); intersection.disconnect();
      canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerleave", onLeave); canvas.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <div className="rope-field">
    <canvas ref={canvasRef} className="rope-field-canvas" aria-label="Interactive rope animation: move to pull the lines, click to scatter them" role="img" />
    <span className="rope-field-hint" aria-hidden="true">Move · Click</span>
  </div>;
}
