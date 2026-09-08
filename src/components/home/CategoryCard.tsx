"use client";

import Link from "next/link";
import { ArrowUpRight, AudioLines, Brush, Clapperboard, PanelsTopLeft, Shapes } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioCategory } from "@/data/categories";

const iconMap = { product: PanelsTopLeft, graphic: Brush, motion: Clapperboard, audio: AudioLines, visual: Shapes };

const accentMap = {
  product: { icon: "border-cyan-400/20 bg-cyan-400/[0.055] text-cyan-300 group-hover:border-cyan-300/35 group-hover:bg-cyan-400/[0.09] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]", card: "hover:border-cyan-300/25 hover:shadow-[0_20px_44px_rgba(8,145,178,0.08)]", line: "from-cyan-300/55" },
  graphic: { icon: "border-pink-400/20 bg-pink-400/[0.055] text-pink-300 group-hover:border-pink-300/35 group-hover:bg-pink-400/[0.09] group-hover:shadow-[0_0_20px_rgba(244,114,182,0.12)]", card: "hover:border-pink-300/25 hover:shadow-[0_20px_44px_rgba(219,39,119,0.08)]", line: "from-pink-300/55" },
  motion: { icon: "border-indigo-400/20 bg-indigo-400/[0.055] text-indigo-300 group-hover:border-indigo-300/35 group-hover:bg-indigo-400/[0.09] group-hover:shadow-[0_0_20px_rgba(129,140,248,0.12)]", card: "hover:border-indigo-300/25 hover:shadow-[0_20px_44px_rgba(79,70,229,0.08)]", line: "from-indigo-300/55" },
  audio: { icon: "border-violet-400/20 bg-violet-400/[0.055] text-violet-300 group-hover:border-violet-300/35 group-hover:bg-violet-400/[0.09] group-hover:shadow-[0_0_20px_rgba(167,139,250,0.12)]", card: "hover:border-violet-300/25 hover:shadow-[0_20px_44px_rgba(124,58,237,0.08)]", line: "from-violet-300/55" },
  visual: { icon: "border-orange-400/20 bg-orange-400/[0.055] text-orange-300 group-hover:border-orange-300/35 group-hover:bg-orange-400/[0.09] group-hover:shadow-[0_0_20px_rgba(251,146,60,0.12)]", card: "hover:border-orange-300/25 hover:shadow-[0_20px_44px_rgba(234,88,12,0.08)]", line: "from-orange-300/55" },
};

export function CategoryCard({ category, index }: { category: PortfolioCategory; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = iconMap[category.icon];
  const accent = accentMap[category.icon];

  return <motion.div className="h-full" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.06 }} whileHover={shouldReduceMotion ? undefined : { y: -4 }}>
    <Link href={category.href} className={`group relative flex h-full min-h-[10.5rem] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0F1620]/78 p-5 shadow-[0_16px_38px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-300 hover:bg-[#141C28]/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80 sm:p-5 xl:p-6 ${accent.card}`}>
      <span className={`pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r ${accent.line} via-white/10 to-transparent opacity-45 transition-opacity duration-300 group-hover:opacity-80`} aria-hidden="true" />
      <div className="flex items-center justify-between"><span className={`flex size-10 items-center justify-center rounded-xl border transition-[background-color,border-color,box-shadow] duration-300 ${accent.icon}`}><Icon size={18} strokeWidth={1.65} aria-hidden="true" /></span><ArrowUpRight size={17} className="text-white/30 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-white/75" aria-hidden="true" /></div>
      <div className="mt-auto pt-8"><h3 className="text-[0.9rem] font-semibold uppercase tracking-[0.035em] text-white/95">{category.title}</h3><p className="mt-2 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.055em] text-[#8E98A9]">{category.description}</p></div>
    </Link>
  </motion.div>;
}
