"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AudioLines, Brush, Clapperboard, PanelsTopLeft, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { asset } from "@/lib/asset";
import { SkillDetailOverlay, type SkillDetailTarget } from "./SkillDetailOverlay";

type Tone = "blue" | "purple" | "pink" | "orange";
type OrbitItem = (typeof profile.collageItems)[number];

const iconMap: Record<string, LucideIcon> = { DESIGN: PanelsTopLeft, DEVELOP: Clapperboard, CREATE: Brush, PRODUCE: AudioLines };
const artByLabel: Record<OrbitItem["label"], string> = { DESIGN: asset("/images/hero/card-design.webp"), DEVELOP: asset("/images/hero/card-web.webp"), CREATE: asset("/images/hero/card-%20create.webp"), PRODUCE: asset("/images/hero/card-music.webp") };
const darkArtByLabel: Record<OrbitItem["label"], string> = { DESIGN: asset("/images/hero/card-design-dark.webp"), DEVELOP: asset("/images/hero/card-web-dark.webp"), CREATE: asset("/images/hero/card-%20create-dark.webp"), PRODUCE: asset("/images/hero/card-music-dark.webp") };
// every card glows purple-blue: glow only, no colored border (no white, no per-topic colors)
const accents: Record<Tone, string> = {
  blue: "border-transparent text-indigo-100 shadow-[0_0_22px_rgba(99,102,241,0.3),0_20px_40px_-12px_rgba(79,70,229,0.35)]",
  purple: "border-transparent text-indigo-100 shadow-[0_0_22px_rgba(99,102,241,0.3),0_20px_40px_-12px_rgba(79,70,229,0.35)]",
  pink: "border-transparent text-indigo-100 shadow-[0_0_22px_rgba(99,102,241,0.3),0_20px_40px_-12px_rgba(79,70,229,0.35)]",
  orange: "border-transparent text-indigo-100 shadow-[0_0_22px_rgba(99,102,241,0.3),0_20px_40px_-12px_rgba(79,70,229,0.35)]",
};
const activeAccents: Record<Tone, string> = {
  blue: "border-transparent shadow-[0_0_22px_rgba(139,92,246,0.75),0_0_60px_rgba(79,70,229,0.45)]",
  purple: "border-transparent shadow-[0_0_22px_rgba(139,92,246,0.75),0_0_60px_rgba(79,70,229,0.45)]",
  pink: "border-transparent shadow-[0_0_22px_rgba(139,92,246,0.75),0_0_60px_rgba(79,70,229,0.45)]",
  orange: "border-transparent shadow-[0_0_22px_rgba(139,92,246,0.75),0_0_60px_rgba(79,70,229,0.45)]",
};

const labels = ["CREATE", "PRODUCE", "DESIGN", "DEVELOP", "CREATE", "PRODUCE", "DESIGN", "DEVELOP"] as const;
const orbitItems = labels.map((label) => profile.collageItems.find((item) => item.label === label) as OrbitItem);
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

function getSlot(itemIndex: number, frontIndex: number) { return slots[(itemIndex - frontIndex + slots.length) % slots.length]; }

export function FloatingSkillOrbit() {
  const shouldReduceMotion = useReducedMotion();
  const [frontIndex, setFrontIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [detailTarget, setDetailTarget] = useState<SkillDetailTarget | null>(null);
  const closeDetail = useCallback(() => setDetailTarget(null), []);
  const openDetail = (item: OrbitItem, element: HTMLElement) => { setHoveredIndex(null); setDetailTarget({ label: item.label as SkillDetailTarget["label"], caption: item.caption, art: element.closest(".theme-light") ? artByLabel[item.label] : darkArtByLabel[item.label], rect: element.getBoundingClientRect() }); };
  const rotate = (direction: number) => { setHoveredIndex(null); setFrontIndex((current) => (current + direction + orbitItems.length) % orbitItems.length); };

  useEffect(() => {
    if (shouldReduceMotion || detailTarget) return;
    const intervalId = window.setInterval(() => rotate(1), 3600);
    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion, detailTarget]);

  return <>
    <motion.div className="absolute inset-0 hidden touch-pan-y lg:block" onPanEnd={(_, info) => { if (Math.abs(info.offset.x) >= 32) rotate(info.offset.x > 0 ? -1 : 1); }}>
      {orbitItems.map((item, index) => {
        const slot = getSlot(index, frontIndex);
        const Icon = iconMap[item.label] ?? PanelsTopLeft;
        const isHovered = hoveredIndex === index;
        const isFront = index === frontIndex;
        const tone = item.tone as Tone;
        const showContent = slot.zIndex >= 24;
        return <motion.button key={`${item.label}-${index}`} type="button" aria-label={`Open ${item.label.toLowerCase()} details`} aria-pressed={isFront} className={`hero-art-card absolute w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border p-5 text-left backdrop-blur-2xl transition-[border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${accents[tone]} ${isFront || isHovered ? activeAccents[tone] : ""}`} style={{ zIndex: isHovered ? 40 : slot.zIndex, transformStyle: "preserve-3d", transformOrigin: "center center", willChange: "transform, left, top" }} initial={false} animate={{ left: slot.left, top: slot.top, scale: isHovered ? slot.scale * 1.35 : slot.scale, opacity: isHovered ? 1 : slot.opacity, rotateY: isHovered ? 0 : slot.rotateY, rotateZ: isHovered ? 0 : slot.rotateZ, skewX: isHovered ? 0 : slot.skewX, transformPerspective: 1400 }} transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 175, damping: 23, mass: 0.8 }} onPointerEnter={() => setHoveredIndex(index)} onPointerLeave={() => setHoveredIndex(null)} onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)} onClick={(event) => { setFrontIndex(index); openDetail(item, event.currentTarget); }}>
          <Image src={artByLabel[item.label]} alt="" fill sizes="14rem" className="hero-art-image hero-art-light object-cover" /><Image src={darkArtByLabel[item.label]} alt="" fill sizes="14rem" className="hero-art-image hero-art-dark object-cover" />
          <span className="hero-art-shade" aria-hidden="true" />
          <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-violet-400/80 via-indigo-400/80 to-blue-400/70" />
          {showContent ? <><span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-current/30 bg-black/20"><Icon className="h-5 w-5" strokeWidth={1.8} /></span><span className="relative z-10 mt-5 block text-base font-semibold tracking-wide text-white">{item.label}</span><span className="relative z-10 mt-1.5 block text-xs leading-snug text-slate-300">{item.caption}</span></> : <span className="absolute inset-x-5 top-5 z-10 h-px bg-current/35" />}
        </motion.button>;
      })}
    </motion.div>
    <div className="absolute inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 lg:hidden">{profile.collageItems.map((item, index) => { const Icon = iconMap[item.label] ?? PanelsTopLeft; const tone = item.tone as Tone; return <button key={item.label} type="button" aria-pressed={index === frontIndex % profile.collageItems.length} onClick={(event) => { setFrontIndex(index); openDetail(item, event.currentTarget); }} className={`hero-art-card relative overflow-hidden rounded-xl border px-3 py-2.5 text-left backdrop-blur-xl transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${accents[tone]}`}><Image src={artByLabel[item.label]} alt="" fill sizes="45vw" className="hero-art-image hero-art-light object-cover" /><Image src={darkArtByLabel[item.label]} alt="" fill sizes="45vw" className="hero-art-image hero-art-dark object-cover" /><span className="hero-art-shade" aria-hidden="true" /><span className="absolute inset-x-0 top-0 z-10 h-px bg-white/65" /><span className="relative z-10 flex items-center gap-2"><Icon className="h-4 w-4" strokeWidth={1.8} /><span className="text-xs font-semibold text-white">{item.label}</span></span></button>; })}</div>
    <SkillDetailOverlay target={detailTarget} onClose={closeDetail} />
  </>;
}
