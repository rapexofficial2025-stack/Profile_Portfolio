"use client";

import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/data/profile";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { HeroVisual } from "./HeroVisual";
import { PullNote } from "./PullNote";
import { LiquidGlassButton } from "../LiquidGlassButton";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeLetter, setActiveLetter] = useState<number | null>(null);
  // the name card toggles between raised (embossed) and pressed (grooved) on click
  const [isCardPressed, setIsCardPressed] = useState(false);
  const nameParts = profile.name.split(" ");
  const firstLine = nameParts.slice(0, 2).join(" ");
  const secondLine = nameParts.slice(2).join(" ");
  let letterIndex = 0;
  const renderNameLine = (line: string, className: string) => <span className={className}>{line.split("").map((letter) => {
    const currentIndex = letterIndex++;
    if (letter === " ") return <span key={`space-${currentIndex}`} className="name-space">&nbsp;</span>;
    const distance = activeLetter === null ? 99 : Math.abs(activeLetter - currentIndex);
    return <span key={`${letter}-${currentIndex}`} onPointerEnter={() => setActiveLetter(currentIndex)} className={`name-letter ${currentIndex === 8 || currentIndex === profile.name.length - 1 ? "name-letter-edge-gap" : ""} ${activeLetter === currentIndex ? "is-smoke-active" : ""} ${distance === 1 ? "is-smoke-neighbor" : ""}`}>{letter}</span>;
  })}</span>;
  return (
    <section className="hero-section light-hero relative isolate z-[2]">
      <div className="hero-backdrop pointer-events-none absolute -inset-x-6 -top-9 bottom-0 z-0 overflow-hidden sm:-inset-x-10 lg:-inset-x-14 lg:-top-12 xl:-inset-x-20" aria-hidden="true"><Image src="/images/hero/honeycomb-cover.png" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-80" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,15,0.84)_0%,rgba(7,10,15,0.56)_42%,rgba(7,10,15,0.18)_72%,rgba(7,10,15,0.42)_100%),linear-gradient(180deg,rgba(7,10,15,0.1)_0%,rgba(7,10,15,0.28)_52%,#070A0F_100%)]" /></div>
      <div className="mb-7 xl:hidden"><AvailabilityBadge /></div>
      <div className="relative z-10 grid items-center gap-10 xl:grid-cols-[minmax(0,1.02fr)_minmax(25rem,0.98fr)] xl:gap-8">
        <div className={`hero-copy relative z-10 max-w-2xl ${isCardPressed ? "is-pressed" : ""}`} onClick={(event) => { if (!(event.target as HTMLElement).closest("a, button")) setIsCardPressed((pressed) => !pressed); }}>
          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="mb-6 text-[10px] font-semibold tracking-[0.34em] text-violet-300/75">{profile.eyebrow}</p>
            <h1 onPointerLeave={() => setActiveLetter(null)} className="hero-name-shell max-w-3xl text-[clamp(3.4rem,8vw,8.8rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-white" aria-label={profile.name}>{renderNameLine(firstLine, "block whitespace-nowrap text-white")}{renderNameLine(secondLine, "hero-name-ghost block whitespace-nowrap")}</h1>
            <div className="mt-7 flex flex-col items-start gap-2 text-xs font-medium tracking-[0.12em] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1 sm:text-sm">
              {profile.roleSegments.map((segment, index) => <span key={segment} className={index === 0 ? "whitespace-nowrap text-sky-200" : index === 1 ? "whitespace-nowrap text-violet-200" : "whitespace-nowrap text-pink-200"}>{segment}{index < profile.roleSegments.length - 1 ? <span className="ml-3 hidden text-white/20 sm:inline">|</span> : null}</span>)}
            </div>
            <p className="mt-6 max-w-[23rem] text-base leading-7 text-[#A7AFBF] sm:max-w-lg sm:text-lg">{profile.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LiquidGlassButton href="/work" icon={<ArrowRight size={18} />}>VIEW MY WORK</LiquidGlassButton>
              <LiquidGlassButton href={profile.resumePath} icon={<Download size={17} />}>DOWNLOAD RESUME</LiquidGlassButton>
            </div>
          </motion.div>
        </div>
        <div className="relative min-h-[31rem] sm:min-h-[36rem] lg:min-h-[40rem] xl:min-h-[42rem]">
          <HeroVisual />
          <div className="absolute right-0 top-0 z-40 hidden flex-col items-end xl:flex"><AvailabilityBadge />{/* rope hangs from under the S of OPPORTUNITIES */}<PullNote className="relative w-[11rem]" anchorRight={18} /></div>
          <div className="pointer-events-none absolute bottom-10 -right-16 z-50 hidden w-[30rem] text-right xl:block"><div className="mb-3 ml-auto h-px w-44 bg-gradient-to-l from-violet-300/55 to-transparent" /><p className="flex items-baseline justify-end gap-3 whitespace-nowrap font-serif text-3xl italic leading-none text-white/90 drop-shadow-[0_3px_20px_rgba(7,10,15,0.9)]">{profile.creativePhrase.map((line) => <span key={line}>{line}</span>)}</p><p className="mt-4 flex justify-end gap-4 text-[9px] font-medium leading-4 tracking-[0.24em] text-white/55">{profile.creativeSubphrase.map((line) => <span key={line} className="whitespace-nowrap">{line}</span>)}</p><div className="mt-3 ml-auto h-px w-28 bg-gradient-to-l from-sky-300/45 to-transparent" /></div>
        </div>
      </div>
    </section>
  );
}
