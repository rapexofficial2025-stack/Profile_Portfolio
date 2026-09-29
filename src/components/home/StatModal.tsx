"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const subscribeNoop = () => () => {};

/**
 * Frosted-glass modal for the stats bar. Rendered inside the themed shell (.portfolio-theme) so it follows
 * light/dark mode, including a switch while it is open. Esc, a backdrop click or × closes it; the page behind
 * doesn't scroll; focus moves in on open and back to the trigger on close.
 */
export function StatModal({ open, onClose, labelledBy, children }: { open: boolean; onClose: () => void; labelledBy: string; children: React.ReactNode }) {
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const shouldReduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); window.clearTimeout(focusTimer); trigger?.focus?.(); };
  }, [open, onClose]);

  if (!isClient) return null;
  const host = document.querySelector(".portfolio-theme") ?? document.body;
  const hidden = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15, filter: "blur(5px)" };

  return createPortal(<AnimatePresence>{open && <div className="stat-modal-layer" role="presentation">
    <motion.button type="button" tabIndex={-1} aria-label="Close" className="stat-modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
    <motion.div role="dialog" aria-modal="true" aria-labelledby={labelledBy} className="stat-modal" initial={hidden} animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }} exit={hidden} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      <button ref={closeRef} type="button" onClick={onClose} className="stat-modal-close">Close <X size={15} /></button>
      <div className="stat-modal-body">{children}</div>
    </motion.div>
  </div>}</AnimatePresence>, host);
}
