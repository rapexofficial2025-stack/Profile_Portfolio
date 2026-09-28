"use client";

import { useEffect, useRef } from "react";
import { pageZoom } from "@/lib/zoom";

type Bubble = { id: number; x: number; y: number; size: number; vx: number; vy: number; opacity: number };

const BUBBLE_COUNT = 13;
const bubbleIds = Array.from({ length: BUBBLE_COUNT }, (_, id) => id);
// cards sit at z-2: depth-1 bubbles drift behind them, depths 3 and 4 float in front
const DEPTHS = [1, 3, 4];
const depthOf = (id: number) => DEPTHS[(id * 2) % DEPTHS.length];

export function AmbientBubbles() {
  const bubblesRef = useRef<Bubble[]>([]);
  const elementRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const createBubbles = () => Array.from({ length: BUBBLE_COUNT }, (_, id) => {
      const size = 18 + Math.random() * 52;
      return { id, size, x: Math.random() * (window.innerWidth / pageZoom() - size), y: Math.random() * (window.innerHeight / pageZoom() - size), vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, opacity: 0.2 + Math.random() * 0.2 };
    });
    bubblesRef.current = createBubbles();
    bubblesRef.current.forEach((bubble, index) => {
      const element = elementRefs.current[index];
      if (!element) return;
      element.style.width = `${bubble.size}px`;
      element.style.height = `${bubble.size}px`;
      element.style.opacity = `${bubble.opacity}`;
      element.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`;
    });
    let animationFrame = 0;

    const tick = () => {
      // page px: the viewport divided by the page's CSS zoom
      const zoom = pageZoom();
      const width = window.innerWidth / zoom;
      const height = window.innerHeight / zoom;
      const items = bubblesRef.current;
      for (const bubble of items) {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        if (bubble.x <= 0 || bubble.x + bubble.size >= width) bubble.vx *= -1;
        if (bubble.y <= 0 || bubble.y + bubble.size >= height) bubble.vy *= -1;
        bubble.x = Math.max(0, Math.min(width - bubble.size, bubble.x));
        bubble.y = Math.max(0, Math.min(height - bubble.size, bubble.y));
      }
      for (let first = 0; first < items.length; first += 1) {
        for (let second = first + 1; second < items.length; second += 1) {
          const one = items[first]; const two = items[second];
          const dx = (two.x + two.size / 2) - (one.x + one.size / 2);
          const dy = (two.y + two.size / 2) - (one.y + one.size / 2);
          const distance = Math.hypot(dx, dy) || 1;
          const minimum = (one.size + two.size) / 2;
          if (distance < minimum) {
            const nx = dx / distance; const ny = dy / distance;
            const overlap = (minimum - distance) / 2;
            one.x -= nx * overlap; one.y -= ny * overlap;
            two.x += nx * overlap; two.y += ny * overlap;
            const firstSpeed = Math.hypot(one.vx, one.vy) || 0.18;
            const secondSpeed = Math.hypot(two.vx, two.vy) || 0.18;
            one.vx = -nx * firstSpeed + (Math.random() - 0.5) * 0.08;
            one.vy = -ny * firstSpeed + (Math.random() - 0.5) * 0.08;
            two.vx = nx * secondSpeed + (Math.random() - 0.5) * 0.08;
            two.vy = ny * secondSpeed + (Math.random() - 0.5) * 0.08;
          }
        }
      }
      items.forEach((bubble, index) => { const element = elementRefs.current[index]; if (element) element.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`; });
      animationFrame = window.requestAnimationFrame(tick);
    };
    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return <>{DEPTHS.map((depth) => <div key={depth} className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: depth }} aria-hidden="true">{bubbleIds.filter((id) => depthOf(id) === depth).map((id) => <span key={id} ref={(element) => { elementRefs.current[id] = element; }} className="ambient-bubble absolute left-0 top-0 rounded-full" />)}</div>)}</>;
}
