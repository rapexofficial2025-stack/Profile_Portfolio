"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { identityStats, type IdentityStatId } from "@/data/identity-stats";
import { asset } from "@/lib/asset";
import { ExperienceModalContent, ProgrexModalContent, RapexModalContent } from "./IdentityModals";
import { StatModal } from "./StatModal";

const subscribeNoop = () => () => {};
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function StatIcon({ id }: { id: IdentityStatId }) {
  const sources: Record<IdentityStatId, string> = {
    experience: "/images/profile/GIF Icon/experience.gif",
    rapex: "/images/branding/rapex-logo.png",
    progrex: "/images/branding/progrex-logo.png",
    projects: "/images/profile/GIF Icon/completed-project.gif",
    ideas: "/images/profile/GIF Icon/idea.gif",
  };

  return <Image src={asset(sources[id])} alt="" width={64} height={64} unoptimized className={`identity-stat-art is-${id}`} />;
}

/** Stats bar as a mini navigation: 13+ / RAPEX / PROGREX open detail modals, 60+ goes to the Work page, ∞ glides down to Explore My Work. */
export function HeroStats() {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const [openId, setOpenId] = useState<Exclude<IdentityStatId, "ideas" | "projects"> | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const timers = useRef<number[]>([]);
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const close = useCallback(() => setOpenId(null), []);
  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const exploreWork = () => {
    const section = document.getElementById("explore");
    if (!section) return;
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    const spotlight = () => { section.classList.remove("is-spotlit"); void section.offsetWidth; section.classList.add("is-spotlit"); later(() => section.classList.remove("is-spotlit"), 1900); };
    if (shouldReduceMotion) { section.scrollIntoView(); spotlight(); return; }
    setShowMessage(true);
    later(() => {
      setShowMessage(false);
      const start = window.scrollY, target = section.getBoundingClientRect().top + window.scrollY - 24, began = performance.now(), duration = 900;
      const step = (now: number) => { const t = Math.min(1, (now - began) / duration); window.scrollTo(0, start + (target - start) * easeInOutCubic(t)); if (t < 1) requestAnimationFrame(step); else spotlight(); };
      requestAnimationFrame(step);
    }, 1100);
  };

  const activate = (id: IdentityStatId) => { if (id === "ideas") exploreWork(); else if (id === "projects") router.push("/work"); else setOpenId(id); };
  // the inner highlight follows the cursor
  const trackPointer = (event: React.PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };

  return <section aria-label="Profile highlights" className="hero-stats identity-stats border-y border-white/10 py-6 sm:py-7">
    <p className="hero-stats-title mb-4 text-center text-[10px] font-medium tracking-[0.25em] text-white/40">PRODUCT / VISUAL / DIGITAL</p>
    <div className="identity-stats-grid">
      {identityStats.map((stat) => <button key={stat.id} type="button" className="identity-stat" onPointerMove={trackPointer} onClick={() => activate(stat.id)} aria-haspopup={stat.id === "ideas" || stat.id === "projects" ? undefined : "dialog"} aria-label={`${stat.main}${stat.mainSuffix ? ` ${stat.mainSuffix}` : ""}: ${stat.label}. ${stat.id === "ideas" ? "Go to Explore My Work" : stat.id === "projects" ? "Open the Work page" : "Open details"}`}>
        <span className="identity-stat-icon" aria-hidden="true"><StatIcon id={stat.id} /></span>
        <ArrowUpRight size={14} className="identity-stat-arrow" aria-hidden="true" />
        <span className="identity-stat-main">{stat.main}{stat.mainSuffix && <span className="identity-stat-suffix">{stat.mainSuffix}</span>}</span>
        <span className="identity-stat-label">{stat.label}</span>
        <span className="identity-stat-sub">{stat.sublabel}</span>
      </button>)}
    </div>
    <p className="hero-stats-strip text-[9px] font-medium tracking-[0.3em] text-white/45">PRODUCT <span className="px-1 text-white/15">•</span> VISUAL <span className="px-1 text-white/15">•</span> DIGITAL</p>

    <StatModal open={openId !== null} onClose={close} labelledBy="stat-modal-title">
      {openId === "experience" && <ExperienceModalContent />}
      {openId === "rapex" && <RapexModalContent />}
      {openId === "progrex" && <ProgrexModalContent />}
    </StatModal>

    {/* portaled: the stats card's backdrop-filter would otherwise trap this fixed message inside the card */}
    {isClient && createPortal(<AnimatePresence>{showMessage && <motion.div className="identity-explore-message" role="status" initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      <span>Different tools.</span><span>Same passion.</span><span className="is-accent">Let&apos;s explore.</span>
    </motion.div>}</AnimatePresence>, document.querySelector(".portfolio-theme") ?? document.body)}
  </section>;
}
