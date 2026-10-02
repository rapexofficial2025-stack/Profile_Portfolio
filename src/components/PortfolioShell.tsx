"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, Code2, Menu, Moon, Network, Play, Sun, X, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, type SocialIconName } from "@/data/profile";
import { navigationItems } from "@/lib/navigation";
import { NavigationItem } from "./NavigationItem";
import { AmbientBubbles } from "./AmbientBubbles";
import { CosmicBackground } from "./CosmicBackground";

const socialIconMap: Record<SocialIconName, LucideIcon> = { network: Network, code: Code2, video: Play, camera: Camera };

function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`sidebar-brand-groove ${compact ? "mobile-brand-groove space-y-1" : "space-y-2.5"}`}><div className={`flex items-center ${compact ? "gap-2.5" : "gap-3"}`}><div className={`sidebar-brand-monogram flex items-center justify-center font-semibold tracking-tight text-white ${compact ? "size-7 rounded-lg text-[11px]" : "size-9 rounded-xl text-sm"}`}>{profile.monogram}</div><span className={`font-semibold text-white ${compact ? "text-[12px] tracking-[0.13em]" : "text-sm tracking-[0.16em]"}`}>{profile.sidebarName}</span></div><p className={`whitespace-nowrap font-medium text-[#6B7280] ${compact ? "pl-9.5 text-[7px] leading-none tracking-[0.07em]" : "pl-12 text-[8px] tracking-[0.08em]"}`}>{profile.brandPhrase}</p></div>;
}

function DigitalClock({ theme, onToggleTheme }: { theme: "dark" | "light"; onToggleTheme: () => void }) {
  // null until mounted: the server (and the static export) can't know the visitor's time, so both render the same
  // placeholder and the real time appears right after hydration; no server/client mismatch
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => { window.clearTimeout(first); window.clearInterval(interval); };
  }, []);

  const time = now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }) : "--:--:--";
  const day = now ? now.toLocaleDateString([], { weekday: "long" }) : " ";
  const date = now ? now.toLocaleDateString([], { month: "short", day: "2-digit", year: "numeric" }) : " ";

  return <section className="digital-clock" aria-label={now ? `Current time: ${time}, ${day}, ${date}` : "Current time"}><div className="digital-clock-info"><p className="digital-clock-kicker">LOCAL TIME</p><time className="digital-clock-time" dateTime={now?.toISOString()}>{time}</time><div className="digital-clock-date"><span>{day}</span><span>{date}</span></div></div><div className="theme-switch-wrap"><button type="button" role="switch" aria-checked={theme === "light"} aria-label={theme === "dark" ? "Enable light neumorphic mode" : "Enable dark glass mode"} onClick={onToggleTheme} className={`theme-boolean-switch ${theme === "light" ? "is-light" : "is-dark"}`} title={theme === "dark" ? "Switch to day mode" : "Switch to night mode"}><span className="theme-switch-sky" aria-hidden="true"><span className="theme-cloud theme-cloud-one" /><span className="theme-cloud theme-cloud-two" /><span className="theme-star theme-star-one" /><span className="theme-star theme-star-two" /><span className="theme-star theme-star-three" /><span className="theme-sun" /></span><span className="theme-switch-orb" aria-hidden="true">{theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}</span></button><span className="theme-switch-label">{theme === "light" ? "DAY MODE" : "NIGHT MODE"}</span></div></section>;
}

function SidebarContent({ onNavigate, theme, onToggleTheme }: { onNavigate?: () => void; theme: "dark" | "light"; onToggleTheme: () => void }) {
  return <div className="flex h-full flex-col px-5 py-8"><Brand /><nav aria-label="Primary navigation" className="mt-12 space-y-1.5">{navigationItems.map((item) => <NavigationItem key={item.href} item={item} onNavigate={onNavigate} />)}</nav><DigitalClock theme={theme} onToggleTheme={onToggleTheme} /><div className="mt-auto space-y-5"><div className="flex items-center gap-2 border-t border-white/10 pt-5" aria-label="Social links">{profile.socialLinks.map((social) => { const Icon = socialIconMap[social.icon]; return <a key={social.label} href={social.href} aria-label={social.label} aria-disabled={social.isPlaceholder || undefined} title={social.isPlaceholder ? `Add ${social.label} URL in src/data/profile.ts` : social.label} tabIndex={social.isPlaceholder ? -1 : undefined} onClick={(event) => { if (social.isPlaceholder) event.preventDefault(); }} className="flex size-8 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80"><Icon size={15} strokeWidth={1.6} aria-hidden="true" /></a>; })}</div><div className="border-t border-white/10 pt-4 text-[10px] leading-5 tracking-widest text-[#6B7280]"><p>PORTFOLIO FOUNDATION</p><p className="text-white/40">Layer 1–6A</p></div></div></div>;
}

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedTheme = window.localStorage.getItem("portfolio-theme");
      if (savedTheme === "dark") setTheme("dark");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => setTheme((currentTheme) => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    window.localStorage.setItem("portfolio-theme", nextTheme);
    return nextTheme;
  });

  return <div className={`portfolio-theme theme-${theme} relative isolate min-h-screen text-white`}>
    <CosmicBackground />
    <AmbientBubbles />
    <aside className="sidebar-scrollbar glass-panel fixed inset-y-0 left-0 z-30 hidden w-69.5 overflow-x-hidden overflow-y-auto border-r border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(11,16,24,0.64)_18%,rgba(7,10,15,0.72))] shadow-[inset_-1px_0_0_rgba(255,255,255,0.07),12px_0_42px_rgba(0,0,0,0.28)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-white/25 before:via-white/8 before:to-transparent lg:block"><SidebarContent theme={theme} onToggleTheme={toggleTheme} /></aside>
    <div className="desktop-topbar fixed inset-x-0 top-0 z-20 hidden h-[2.45rem] lg:left-69.5 lg:block"><div className="desktop-topbar-surface absolute inset-x-0 top-0 h-[1.95rem]" aria-hidden="true" /><div className="desktop-topbar-overlay absolute inset-x-5 top-5 h-[1.2rem]" aria-hidden="true" /></div>
    <header className="glass-panel sticky top-0 z-20 flex h-18 items-center justify-between border-b border-white/10 bg-[#070A0F]/85 px-5 backdrop-blur-xl lg:hidden"><Brand compact /><div className="flex items-center gap-2"><button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="glass-icon-button flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-[#A7AFBF] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80">{theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}</button><button type="button" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)} className="glass-icon-button flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-[#A7AFBF] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80">{isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button></div></header>
    <AnimatePresence>{isOpen && <><motion.button type="button" aria-label="Close navigation menu" className="fixed inset-0 z-20 bg-black/60 backdrop-blur-[2px] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} /><motion.aside aria-label="Mobile navigation" className="sidebar-scrollbar fixed inset-y-18 right-0 z-30 w-[min(19rem,88vw)] overflow-x-hidden overflow-y-auto border-l border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(11,16,24,0.7)_20%,rgba(7,10,15,0.78))] shadow-[inset_1px_0_0_rgba(255,255,255,0.08),-16px_0_46px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:hidden" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 360, damping: 32 }}><SidebarContent onNavigate={() => setIsOpen(false)} theme={theme} onToggleTheme={toggleTheme} /></motion.aside></>}</AnimatePresence>
    <main className="relative z-10 min-h-screen min-w-0 overflow-x-clip lg:ml-69.5 lg:w-[calc(100%-17.375rem)] lg:pt-1.25">{children}</main>
  </div>;
}
