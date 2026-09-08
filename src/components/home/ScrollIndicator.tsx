"use client";

import { Mouse } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();
  return <button type="button" onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" })} className="group mx-auto flex flex-col items-center gap-2 text-[9px] font-medium tracking-[0.28em] text-white/35 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80"><Mouse size={18} strokeWidth={1.4} aria-hidden="true" /><span>SCROLL TO EXPLORE</span><motion.span aria-hidden="true" className="h-7 w-px bg-gradient-to-b from-white/50 to-transparent" animate={shouldReduceMotion ? undefined : { scaleY: [0.55, 1, 0.55], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} /></button>;
}
