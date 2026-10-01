"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { InteriorComparisonSet } from "@/data/visual-art-gallery";

type InteriorDesignComparisonProps = {
  sets: InteriorComparisonSet[];
  title: string;
  resolveSrc: (src: string) => string;
};

export function InteriorDesignComparison({ sets, title, resolveSrc }: InteriorDesignComparisonProps) {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [rawIndex, setRawIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const reduceMotion = useReducedMotion();
  const activeSet = sets[activeSetIndex];

  useEffect(() => {
    if (!activeSet || !isPlaying || reduceMotion || activeSet.rawImages.length < 2) return;
    const timer = window.setInterval(() => {
      setRawIndex((current) => (current + 1) % activeSet.rawImages.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [activeSet, isPlaying, reduceMotion]);

  if (!activeSet) return null;

  const moveRaw = (direction: -1 | 1) => {
    setRawIndex((current) => (current + direction + activeSet.rawImages.length) % activeSet.rawImages.length);
  };

  return (
    <section className="mb-8" aria-label={`${title} final output comparisons`}>
      <div role="tablist" aria-label={`${title} final outputs`} className="portfolio-gallery-rail mb-5 flex gap-2 overflow-x-auto rounded-2xl border border-white/14 bg-black/18 p-3">
        {sets.map((set, index) => (
          <button
            key={set.id}
            type="button"
            role="tab"
            aria-selected={activeSetIndex === index}
            onClick={() => {
              setActiveSetIndex(index);
              setRawIndex(0);
            }}
            className={`shrink-0 rounded-[20%] border px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${activeSetIndex === index ? "border-violet-200/70 bg-violet-400/25 text-white shadow-[0_0_24px_rgba(139,92,246,0.24),inset_0_1px_0_rgba(255,255,255,0.15)]" : "border-white/14 bg-black/25 text-white/68 hover:border-white/35 hover:text-white"}`}
          >
            {set.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-violet-100">Design Development / Final Output</p>
          <h4 className="mt-2 text-xl font-semibold text-white">{activeSet.title}</h4>
          <p className="mt-1 text-xs text-white/50">Development stage {rawIndex + 1} of {activeSet.rawImages.length}</p>
        </div>
        <button type="button" onClick={() => setIsPlaying((playing) => !playing)} aria-pressed={isPlaying} className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-500/12 px-3.5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-violet-100 transition hover:border-violet-200/65 hover:bg-violet-500/20">
          {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
          {isPlaying ? "Pause raw sequence" : "Auto play raw sequence"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.figure
          className="portfolio-comparison-groove overflow-hidden rounded-2xl border border-white/14 bg-black/30"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          style={{ touchAction: "pan-y" }}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) < 50 && Math.abs(info.velocity.x) < 320) return;
            moveRaw(info.offset.x < 0 ? 1 : -1);
          }}
          onContextMenu={(event) => event.preventDefault()}
        >
          <div className="relative aspect-square overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSet.rawImages[rawIndex]}
                className="absolute inset-0"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -40, scale: 0.98 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: [0.65, 0, 0.35, 1] }}
              >
                <Image src={resolveSrc(activeSet.rawImages[rawIndex])} alt={`${activeSet.label} development stage ${rawIndex + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="pointer-events-none select-none object-cover" draggable={false} />
              </motion.div>
            </AnimatePresence>
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-xl">Swipe development stages</span>
          </div>
          <figcaption className="border-t border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Raw / Development</figcaption>
        </motion.figure>

        <figure className="portfolio-comparison-groove overflow-hidden rounded-2xl border border-violet-300/30 bg-black/30 shadow-[0_0_30px_rgba(139,92,246,0.14)]" onContextMenu={(event) => event.preventDefault()}>
          <div className="relative aspect-square overflow-hidden">
            <Image src={resolveSrc(activeSet.finalImage)} alt={`${activeSet.label} final interior output`} fill sizes="(max-width: 768px) 100vw, 50vw" className="pointer-events-none select-none object-cover" draggable={false} priority />
          </div>
          <figcaption className="border-t border-violet-300/20 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-100">Final Output / Static</figcaption>
        </figure>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-violet-100">{activeSet.label} Raw Files</p>
        <div className="portfolio-gallery-rail flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl border border-white/14 bg-black/18 p-3 pb-4">
          {activeSet.rawImages.map((src, index) => (
            <button key={src} type="button" onClick={() => setRawIndex(index)} onContextMenu={(event) => event.preventDefault()} aria-label={`Show ${activeSet.label} development stage ${index + 1}`} className={`group w-40 shrink-0 snap-center overflow-hidden rounded-xl border bg-black/35 transition sm:w-48 ${rawIndex === index ? "border-violet-300/70 shadow-[0_0_22px_rgba(139,92,246,0.22),inset_0_0_12px_rgba(139,92,246,0.14)]" : "border-white/10 opacity-70 hover:border-white/30 hover:opacity-100"}`}>
              <span className="relative block aspect-square overflow-hidden">
                <Image src={resolveSrc(src)} alt={`${activeSet.label} raw file ${index + 1}`} fill sizes="192px" className="pointer-events-none select-none object-cover transition duration-500 group-hover:scale-[1.035]" draggable={false} />
              </span>
              <span className="block border-t border-white/10 px-3 py-2 text-left text-[8px] font-semibold uppercase tracking-[0.14em] text-white/55">Stage {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
