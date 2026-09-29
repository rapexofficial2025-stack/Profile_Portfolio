"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { PullNote } from "./PullNote";
import { asset } from "@/lib/asset";

export function ProfilePortrait() {
  const shouldReduceMotion = useReducedMotion();
  const bottomFade = "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)";

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="relative mx-auto aspect-[4/5] w-full max-w-[36rem] lg:max-w-[38rem]"
    >
      <div className="portrait-glow pointer-events-none absolute inset-[8%_5%_8%] rounded-full bg-[radial-gradient(circle_at_50%_38%,rgba(125,150,255,0.13),rgba(124,58,237,0.075)_42%,transparent_72%)] blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0">
        <PullNote className="absolute right-[2%] top-[9%] w-[min(11rem,40%)] xl:hidden" />
        {profile.portraitAvailable ? (
          <Image src={asset(profile.portraitPath)} alt="Portrait of Irvin Jay Palacio" fill sizes="(max-width: 1024px) 84vw, 36vw" className="portrait-image object-contain object-bottom brightness-[1.06] contrast-[1.03] drop-shadow-[0_34px_26px_rgba(0,0,0,0.86)]" style={{ WebkitMaskImage: bottomFade, maskImage: bottomFade }} priority />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_32%,rgba(168,85,247,0.25),transparent_24%),linear-gradient(155deg,rgba(14,165,233,0.1),transparent_45%)] px-8 text-center">
            <div className="flex size-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl font-semibold tracking-[0.12em] text-white/65 shadow-[0_0_60px_rgba(124,58,237,0.12)]">IP</div>
            <div>
              <p className="text-[10px] font-medium tracking-[0.28em] text-white/40">PORTRAIT ASSET</p>
              <p className="mt-2 text-xs text-white/30">/images/profile/irvin-suit.png</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
