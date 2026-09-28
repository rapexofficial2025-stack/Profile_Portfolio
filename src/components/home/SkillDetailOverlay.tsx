"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import { capabilityMatrix, type CapabilityLabel } from "@/data/profile-details";
import { pageZoom } from "@/lib/zoom";

export type SkillDetailTarget = { label: CapabilityLabel; caption: string; art: string; rect: DOMRect };

const PANEL_MAX_WIDTH = 640;
const PANEL_MAX_HEIGHT = 560;
const easeIn = [0.64, 0, 0.36, 1] as const;
const subscribeNoop = () => () => {};

// all values in page px: the viewport is divided by the page zoom so the panel stays centered
function getPanelBox() {
  const zoom = pageZoom();
  const viewWidth = window.innerWidth / zoom, viewHeight = window.innerHeight / zoom;
  const width = Math.min(PANEL_MAX_WIDTH, viewWidth - 32);
  const height = Math.min(PANEL_MAX_HEIGHT, viewHeight - 48);
  return { width, height, left: (viewWidth - width) / 2, top: (viewHeight - height) / 2 };
}

export function SkillDetailOverlay({ target, onClose }: { target: SkillDetailTarget | null; onClose: () => void }) {
  const isMounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!isMounted) return null;
  return createPortal(<AnimatePresence>{target && <OverlayContent key={target.label} target={target} onClose={onClose} />}</AnimatePresence>, document.body);
}

function OverlayContent({ target, onClose }: { target: SkillDetailTarget; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [box, setBox] = useState(getPanelBox);
  const closeRef = useRef<HTMLButtonElement>(null);
  const detail = capabilityMatrix[target.label];
  const zoom = pageZoom();
  const rect = { left: target.rect.left / zoom, top: target.rect.top / zoom, width: target.rect.width / zoom, height: target.rect.height / zoom };
  const tiltX = useSpring(0, { stiffness: 160, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 160, damping: 18 });
  const glareX = useMotionValue(30);
  const glareY = useMotionValue(0);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent 55%)`;
  const canTilt = isOpen && !shouldReduceMotion;

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    tiltY.set((x - 0.5) * 10);
    tiltX.set((0.5 - y) * 8);
    glareX.set(x * 100);
    glareY.set(y * 100);
  };
  const onPointerLeave = () => { tiltX.set(0); tiltY.set(0); glareX.set(30); glareY.set(0); };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const onResize = () => setBox(getPanelBox());
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [onClose]);

  useEffect(() => { if (isOpen) closeRef.current?.focus(); }, [isOpen]);

  return <div className="fixed inset-0 z-100" role="dialog" aria-modal="true" aria-labelledby="skill-detail-title">
    <motion.button type="button" aria-label="Close details" tabIndex={-1} className="absolute inset-0 cursor-default bg-[radial-gradient(ellipse_at_center,rgba(10,6,30,0.25),rgba(4,3,12,0.6))]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} onClick={onClose} />
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: box.left + box.width * 0.1, top: box.top + box.height + 22, width: box.width * 0.8, height: 44 }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.4 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-hidden="true"
    ><div className="skill-detail-floor h-full w-full rounded-[50%]" /></motion.div>
    <motion.div
      className="absolute"
      style={{ transformStyle: "preserve-3d", transformPerspective: 1600 }}
      initial={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height, rotateX: 0, rotateY: 0 }}
      animate={{ ...box, rotateX: shouldReduceMotion ? 0 : 360, rotateY: shouldReduceMotion ? 0 : 360 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25, ease: "easeIn" } }}
      transition={shouldReduceMotion ? { duration: 0 } : isOpen ? { duration: 0.2 } : { duration: 0.95, ease: easeIn }}
      onAnimationComplete={() => setIsOpen(true)}
    >
      <div className={`h-full w-full ${canTilt ? "skill-detail-bob" : ""}`} style={{ perspective: 1200 }}>
      <motion.div className="skill-detail-glass relative h-full w-full overflow-hidden rounded-3xl" style={{ rotateX: tiltX, rotateY: tiltY }} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <motion.span className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]" style={{ background: glare }} animate={{ opacity: isOpen ? 1 : 0 }} aria-hidden="true" />
      <span className="skill-detail-edge pointer-events-none absolute inset-0 z-20 rounded-[inherit]" aria-hidden="true" />
      <motion.div className="pointer-events-none absolute inset-0" initial={{ opacity: 1 }} animate={{ opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.3 }} aria-hidden="true">
        <Image src={target.art} alt="" fill sizes="40rem" className="object-cover" />
        <span className="absolute inset-0 bg-linear-to-b from-transparent to-[#0F0C24]/70" />
      </motion.div>
      <motion.div className="relative flex h-full flex-col" initial={{ opacity: 0 }} animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 8 }} transition={{ duration: 0.35, delay: isOpen ? 0.05 : 0 }}>
        <header className="flex items-start justify-between gap-4 border-b border-white/10 px-6 pb-4 pt-6 sm:px-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-violet-200/80">{target.label} / {target.caption.toUpperCase()}</p>
            <h2 id="skill-detail-title" className="mt-2 text-2xl font-semibold tracking-tight text-white">{detail.headline}</h2>
          </div>
          <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"><X size={16} /></button>
        </header>
        <div className="skill-detail-scroll min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <p className="text-sm leading-7 text-slate-300">{detail.intro}</p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <section>
              <p className="text-[10px] font-semibold tracking-[0.24em] text-white/50">WHAT I CAN CREATE FOR YOU</p>
              <ul className="mt-3 space-y-2.5">{detail.create.map((line) => <li key={line} className="-mx-2 flex gap-2.5 rounded-lg px-2 py-0.5 text-sm leading-6 text-slate-200 transition hover:translate-x-1 hover:bg-white/5 hover:text-white"><Check size={15} className="mt-1 shrink-0 text-violet-300" />{line}</li>)}</ul>
            </section>
            <section>
              <p className="text-[10px] font-semibold tracking-[0.24em] text-white/50">WHAT I HELP YOU PRODUCE</p>
              <ul className="mt-3 space-y-2.5">{detail.produce.map((line) => <li key={line} className="-mx-2 flex gap-2.5 rounded-lg px-2 py-0.5 text-sm leading-6 text-slate-200 transition hover:translate-x-1 hover:bg-white/5 hover:text-white"><Sparkles size={15} className="mt-1 shrink-0 text-emerald-300" />{line}</li>)}</ul>
            </section>
          </div>
          <section className="mt-7">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-white/50">TOOLS</p>
            <div className="mt-3 flex flex-wrap gap-2">{detail.tools.map((tool) => <span key={tool} className="skill-detail-chip rounded-full px-3 py-1.5 text-xs text-slate-200 transition hover:-translate-y-0.5">{tool}</span>)}</div>
          </section>
          <section className="mt-8 border-t border-white/10 pt-6">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-white/50">FULL CAPABILITY MATRIX</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">{(Object.keys(capabilityMatrix) as CapabilityLabel[]).map((label) => <div key={label} className={`skill-detail-tile rounded-xl border px-4 py-3 transition duration-200 hover:-translate-y-1 ${label === target.label ? "border-violet-300/45 bg-violet-400/12" : "border-white/10 bg-white/4"}`}>
              <p className="text-xs font-semibold tracking-[0.16em] text-white">{label}</p>
              <p className="mt-1.5 text-xs leading-5 text-slate-400">{capabilityMatrix[label].create.slice(0, 3).join(" / ")}</p>
            </div>)}</div>
          </section>
        </div>
      </motion.div>
      </motion.div>
      </div>
    </motion.div>
  </div>;
}
