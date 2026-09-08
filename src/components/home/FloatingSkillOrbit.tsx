"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AudioLines, Brush, Clapperboard, PanelsTopLeft, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";

type Tone = "blue" | "purple" | "pink" | "orange";
type OrbitItem = (typeof profile.collageItems)[number];

const iconMap: Record<string, LucideIcon> = { DESIGN: PanelsTopLeft, DEVELOP: Clapperboard, CREATE: Brush, PRODUCE: AudioLines };
const accents: Record<Tone, string> = {
  blue: "border-emerald-400/45 text-emerald-200 shadow-[0_20px_52px_rgba(52,211,153,0.2)]",
  purple: "border-violet-400/35 text-violet-200 shadow-[0_20px_52px_rgba(124,58,237,0.18)]",
  pink: "border-violet-400/18 text-violet-300/65 shadow-[0_16px_38px_rgba(124,58,237,0.055)]",
  orange: "border-orange-400/35 text-orange-200 shadow-[0_20px_52px_rgba(249,115,22,0.16)]",
};

const activeAccents: Record<Tone, string> = {
  blue: "border-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.88),0_0_52px_rgba(52,211,153,0.32)]",
  purple: "border-violet-300 shadow-[0_0_18px_rgba(167,139,250,0.88),0_0_52px_rgba(124,58,237,0.32)]",
  pink: "border-violet-300/35 shadow-[0_0_12px_rgba(167,139,250,0.22),0_0_36px_rgba(124,58,237,0.09)]",
  orange: "border-orange-300 shadow-[0_0_18px_rgba(253,186,116,0.88),0_0_52px_rgba(249,115,22,0.3)]",
};

const labels = ["CREATE", "PRODUCE", "DESIGN", "DEVELOP", "CREATE", "PRODUCE", "DESIGN", "DEVELOP"] as const;
const orbitItems = labels.map((label) => profile.collageItems.find((item) => item.label === label) as OrbitItem);

// The lower z-index slots pass beneath the portrait; the front half overlays it.
const slots = [
  { left: "50%", top: "71%", scale: 1.22, opacity: 1, zIndex: 30, rotateY: 0, rotateZ: 0, skewX: 0 },
  { left: "77%", top: "69%", scale: 0.94, opacity: 0.75, zIndex: 24, rotateY: -42, rotateZ: 3, skewX: -5 },
  { left: "104%", top: "64%", scale: 0.64, opacity: 0, zIndex: 6, rotateY: -72, rotateZ: 5, skewX: -9 },
  { left: "90%", top: "56%", scale: 0.48, opacity: 0, zIndex: 4, rotateY: -80, rotateZ: 5, skewX: -9 },
  { left: "50%", top: "53%", scale: 0.46, opacity: 0, zIndex: 3, rotateY: 180, rotateZ: 0, skewX: 0 },
  { left: "10%", top: "56%", scale: 0.48, opacity: 0, zIndex: 4, rotateY: 80, rotateZ: -5, skewX: 9 },
  { left: "-4%", top: "64%", scale: 0.64, opacity: 0, zIndex: 6, rotateY: 72, rotateZ: -5, skewX: 9 },
  { left: "23%", top: "69%", scale: 0.94, opacity: 0.75, zIndex: 24, rotateY: 42, rotateZ: -3, skewX: 5 },
] as const;

function getSlot(itemIndex: number, frontIndex: number) {
  return slots[(itemIndex - frontIndex + slots.length) % slots.length];
}

export function FloatingSkillOrbit() {
  const shouldReduceMotion = useReducedMotion();
  const [frontIndex, setFrontIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rotate = (direction: number) => {
    setHoveredIndex(null);
    setFrontIndex((current) => (current + direction + orbitItems.length) % orbitItems.length);
  };

  useEffect(() => {
    if (shouldReduceMotion) return;
    const intervalId = window.setInterval(() => rotate(1), 3600);
    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  return <>
    <motion.div className="absolute inset-0 hidden touch-pan-y lg:block" onPanEnd={(_, info) => { if (Math.abs(info.offset.x) >= 32) rotate(info.offset.x > 0 ? -1 : 1); }}>
      {orbitItems.map((item, index) => {
        const slot = getSlot(index, frontIndex);
        const Icon = iconMap[item.label] ?? PanelsTopLeft;
        const isHovered = hoveredIndex === index;
        const isFront = index === frontIndex;
        const tone = item.tone as Tone;
        const showContent = slot.zIndex >= 24;
        return <motion.button key={`${item.label}-${index}`} type="button" aria-label={`Bring ${item.label.toLowerCase()} forward`} aria-pressed={isFront} className={`absolute w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border ${item.label === "CREATE" ? "bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(12,14,22,0.78)_30%,rgba(5,7,12,0.88)_82%)]" : "bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(17,28,43,0.46)_32%,rgba(7,10,15,0.62)_80%)]"} p-5 text-left backdrop-blur-2xl transition-[border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${accents[tone]} ${isFront || isHovered ? activeAccents[tone] : ""}`} style={{ zIndex: isHovered ? 40 : slot.zIndex, transformStyle: "preserve-3d", transformOrigin: "center center", willChange: "transform, left, top" }} initial={false} animate={{ left: slot.left, top: slot.top, scale: isHovered ? slot.scale * 1.35 : slot.scale, opacity: isHovered ? 1 : slot.opacity, rotateY: isHovered ? 0 : slot.rotateY, rotateZ: isHovered ? 0 : slot.rotateZ, skewX: isHovered ? 0 : slot.skewX, transformPerspective: 1400 }} transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 175, damping: 23, mass: 0.8 }} onPointerEnter={() => setHoveredIndex(index)} onPointerLeave={() => setHoveredIndex(null)} onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)} onClick={() => setFrontIndex(index)}>
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />
          <motion.span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.18),transparent)] blur-sm" initial={false} animate={isHovered && !shouldReduceMotion ? { y: ["-120%", "280%"], opacity: [0, item.label === "CREATE" ? 0.22 : 0.55, 0] } : { y: "-120%", opacity: 0 }} transition={{ duration: 0.85, ease: "easeInOut" }} />
          {showContent ? <><span className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-current/30 bg-black/20"><Icon className="h-5 w-5" strokeWidth={1.8} /></span><span className="relative mt-5 block text-base font-semibold tracking-wide text-white">{item.label}</span><span className="relative mt-1.5 block text-xs leading-snug text-slate-300">{item.caption}</span></> : <span className="absolute inset-x-5 top-5 h-px bg-current/35" />}
        </motion.button>;
      })}
    </motion.div>
    <div className="absolute inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 lg:hidden">{profile.collageItems.map((item, index) => { const Icon = iconMap[item.label] ?? PanelsTopLeft; const tone = item.tone as Tone; return <button key={item.label} type="button" aria-pressed={index === frontIndex % profile.collageItems.length} onClick={() => setFrontIndex(index)} className={`relative overflow-hidden rounded-xl border bg-black/45 px-3 py-2.5 text-left backdrop-blur-xl transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${accents[tone]}`}><span className="absolute inset-x-0 top-0 h-px bg-white/65" /><span className="relative flex items-center gap-2"><Icon className="h-4 w-4" strokeWidth={1.8} /><span className="text-xs font-semibold text-white">{item.label}</span></span></button>; })}</div>
  </>;
}
