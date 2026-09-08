"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, Code2, Menu, Network, Play, X, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { profile, type SocialIconName } from "@/data/profile";
import { navigationItems } from "@/lib/navigation";
import { NavigationItem } from "./NavigationItem";

const socialIconMap: Record<SocialIconName, LucideIcon> = { network: Network, code: Code2, video: Play, camera: Camera };

function Brand() {
  return <div className="space-y-2.5"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.025))] text-sm font-semibold tracking-tight text-white shadow-[inset_1px_1px_0_rgba(255,255,255,0.14),inset_-2px_-2px_5px_rgba(0,0,0,0.35),0_10px_30px_rgba(0,0,0,0.25)]">{profile.monogram}</div><span className="text-sm font-semibold tracking-[0.16em] text-white">{profile.sidebarName}</span></div><p className="whitespace-nowrap pl-12 text-[9px] font-medium tracking-[0.18em] text-[#6B7280]">{profile.brandPhrase}</p></div>;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return <div className="flex h-full flex-col px-5 py-8"><Brand /><nav aria-label="Primary navigation" className="mt-12 space-y-1.5">{navigationItems.map((item) => <NavigationItem key={item.href} item={item} onNavigate={onNavigate} />)}</nav><div className="mt-auto space-y-5"><div className="flex items-center gap-2 border-t border-white/10 pt-5" aria-label="Social links">{profile.socialLinks.map((social) => { const Icon = socialIconMap[social.icon]; return <a key={social.label} href={social.href} aria-label={social.label} aria-disabled={social.isPlaceholder || undefined} title={social.isPlaceholder ? `Add ${social.label} URL in src/data/profile.ts` : social.label} tabIndex={social.isPlaceholder ? -1 : undefined} onClick={(event) => { if (social.isPlaceholder) event.preventDefault(); }} className="flex size-8 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80"><Icon size={15} strokeWidth={1.6} aria-hidden="true" /></a>; })}</div><div className="border-t border-white/10 pt-4 text-[10px] leading-5 tracking-[0.1em] text-[#6B7280]"><p>PORTFOLIO FOUNDATION</p><p className="text-white/40">Layer 1–6A</p></div></div></div>;
}

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="min-h-screen bg-[#070A0F] text-white">
    <aside className="sidebar-scrollbar fixed inset-y-0 left-0 z-30 hidden w-[17rem] overflow-y-auto border-r border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(11,16,24,0.64)_18%,rgba(7,10,15,0.72))] shadow-[inset_-1px_0_0_rgba(255,255,255,0.07),12px_0_42px_rgba(0,0,0,0.28)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-white/25 before:via-white/8 before:to-transparent lg:block"><SidebarContent /></aside>
    <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-white/10 bg-[#070A0F]/85 px-5 backdrop-blur-xl lg:hidden"><Brand /><button type="button" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)} className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#A7AFBF] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80">{isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button></header>
    <AnimatePresence>{isOpen && <><motion.button type="button" aria-label="Close navigation menu" className="fixed inset-0 z-20 bg-black/60 backdrop-blur-[2px] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} /><motion.aside aria-label="Mobile navigation" className="sidebar-scrollbar fixed inset-y-18 right-0 z-30 w-[min(19rem,88vw)] overflow-y-auto border-l border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(11,16,24,0.7)_20%,rgba(7,10,15,0.78))] shadow-[inset_1px_0_0_rgba(255,255,255,0.08),-16px_0_46px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:hidden" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 360, damping: 32 }}><SidebarContent onNavigate={() => setIsOpen(false)} /></motion.aside></>}</AnimatePresence>
    <main className="min-h-screen lg:pl-[17rem]">{children}</main>
  </div>;
}
