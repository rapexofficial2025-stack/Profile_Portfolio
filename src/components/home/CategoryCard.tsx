"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, AudioLines, Brush, Camera, Clapperboard, Code2, PanelsTopLeft, Shapes, Smartphone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioCategory } from "@/data/categories";
import { asset } from "@/lib/asset";

const iconMap = { product: PanelsTopLeft, graphic: Brush, motion: Clapperboard, audio: AudioLines, visual: Shapes, web: Code2, mobile: Smartphone, photo: Camera };

const accentMap = {
  product: { icon: "border-cyan-400/20 bg-cyan-400/[0.055] text-cyan-300 group-hover:border-cyan-300/35 group-hover:bg-cyan-400/[0.09] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]", card: "hover:border-cyan-300/25 hover:shadow-[0_20px_44px_rgba(8,145,178,0.08)]", line: "from-cyan-300/55" },
  graphic: { icon: "border-pink-400/20 bg-pink-400/[0.055] text-pink-300 group-hover:border-pink-300/35 group-hover:bg-pink-400/[0.09] group-hover:shadow-[0_0_20px_rgba(244,114,182,0.12)]", card: "hover:border-pink-300/25 hover:shadow-[0_20px_44px_rgba(219,39,119,0.08)]", line: "from-pink-300/55" },
  motion: { icon: "border-indigo-400/20 bg-indigo-400/[0.055] text-indigo-300 group-hover:border-indigo-300/35 group-hover:bg-indigo-400/[0.09] group-hover:shadow-[0_0_20px_rgba(129,140,248,0.12)]", card: "hover:border-indigo-300/25 hover:shadow-[0_20px_44px_rgba(79,70,229,0.08)]", line: "from-indigo-300/55" },
  audio: { icon: "border-violet-400/20 bg-violet-400/[0.055] text-violet-300 group-hover:border-violet-300/35 group-hover:bg-violet-400/[0.09] group-hover:shadow-[0_0_20px_rgba(167,139,250,0.12)]", card: "hover:border-violet-300/25 hover:shadow-[0_20px_44px_rgba(124,58,237,0.08)]", line: "from-violet-300/55" },
  web: { icon: "border-sky-400/20 bg-sky-400/[0.055] text-sky-300 group-hover:border-sky-300/35 group-hover:bg-sky-400/[0.09] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]", card: "hover:border-sky-300/25 hover:shadow-[0_20px_44px_rgba(2,132,199,0.08)]", line: "from-sky-300/55" },
  mobile: { icon: "border-fuchsia-400/20 bg-fuchsia-400/[0.055] text-fuchsia-300 group-hover:border-fuchsia-300/35 group-hover:bg-fuchsia-400/[0.09] group-hover:shadow-[0_0_20px_rgba(232,121,249,0.12)]", card: "hover:border-fuchsia-300/25 hover:shadow-[0_20px_44px_rgba(192,38,211,0.08)]", line: "from-fuchsia-300/55" },
  photo: { icon: "border-amber-400/20 bg-amber-400/[0.055] text-amber-300 group-hover:border-amber-300/35 group-hover:bg-amber-400/[0.09] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.12)]", card: "hover:border-amber-300/25 hover:shadow-[0_20px_44px_rgba(217,119,6,0.08)]", line: "from-amber-300/55" },
  visual: { icon: "border-orange-400/20 bg-orange-400/[0.055] text-orange-300 group-hover:border-orange-300/35 group-hover:bg-orange-400/[0.09] group-hover:shadow-[0_0_20px_rgba(251,146,60,0.12)]", card: "hover:border-orange-300/25 hover:shadow-[0_20px_44px_rgba(234,88,12,0.08)]", line: "from-orange-300/55" },
};

const beamColors: Record<PortfolioCategory["icon"], string> = { product: "#22d3ee", graphic: "#f472b6", motion: "#818cf8", audio: "#a78bfa", visual: "#fb923c", web: "#38bdf8", mobile: "#e879f9", photo: "#fbbf24" };

export function CategoryCard({ category, index }: { category: PortfolioCategory; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = iconMap[category.icon];
  const accent = accentMap[category.icon];

  return <motion.div className="group/card relative h-full" style={{ "--beam": beamColors[category.icon] } as React.CSSProperties} initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.06 }} whileHover={shouldReduceMotion ? undefined : { y: -4 }}>
    <Link href={category.href} className={`glass-card work-card group relative flex h-full flex-col rounded-2xl border border-white/[0.09] bg-[#0F1620]/78 p-4 shadow-[0_16px_38px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-300 hover:bg-[#141C28]/88 ${accent.card}`}>
      <span className="work-card-tint" aria-hidden="true" />
      <span className={`pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r ${accent.line} via-white/10 to-transparent opacity-45 transition-opacity duration-300 group-hover:opacity-80`} aria-hidden="true" />
      {/* art spills over the top and sides of the card and runs down behind the title */}
      <div className="work-card-pop pointer-events-none absolute inset-x-[-4%] top-0 z-[1] aspect-[127/100] -translate-y-[17.6%]" aria-hidden="true">
        <Image src={asset(category.image)} alt="" fill sizes="(min-width: 1024px) 26vw, (min-width: 640px) 52vw, 100vw" className="object-contain object-bottom transition-transform duration-500 ease-out group-hover/card:-translate-y-1 group-hover/card:scale-[1.02]" />
      </div>
      <span className="work-card-badge pointer-events-none absolute bottom-3.5 right-3.5 z-[3]" aria-hidden="true"><Icon size={26} strokeWidth={1.8} /></span>
      <div className="work-card-art -mx-4 -mt-4 aspect-[2/1]" aria-hidden="true" />

      {/* z-9: a clear glass pane overlays the text area (and the icon pit below it); title and subtitle sit on top of the glass */}
      <div className="work-card-body relative z-[9] mt-2 flex flex-col">
        <span className="work-card-glass" aria-hidden="true" />
        <h3 className="relative z-[2] text-[0.9rem] font-semibold uppercase tracking-[0.035em] text-white/95">{category.title}</h3>
        <p className="relative z-[2] mt-2 text-[0.7rem] font-medium uppercase leading-5 tracking-[0.055em] text-[#8E98A9]">{category.description}</p>
        <span className="neu-glass-pill relative mt-3 inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/70 group-hover:border-white/15 group-hover:text-white">
          <span>Open category</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
    <span className="work-card-beam" aria-hidden="true"><span /></span>
  </motion.div>;
}
