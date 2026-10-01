import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, ExternalLink, Gamepad2 } from "lucide-react";
import { ProjectEmbed } from "@/components/ProjectEmbed";
import { RapexDashGallery, RapexDashMediaViewer, RapexDashSpecificationsRail } from "@/components/showcase/rapex-dash/RapexDashMedia";

const liveGameUrl = "https://rapexofficial2025-stack.github.io/RAPEX-DASH/";
const sourceUrl = "https://github.com/rapexofficial2025-stack/RAPEX-DASH";

export const metadata: Metadata = {
  title: "RAPEX DASH — Playable Case Study",
  description: "A playable neon arcade courier runner built with React, TypeScript and Three.js/WebGL.",
};

const features = [
  "Pickup and delivery missions across a neon city",
  "Tactical GPS minimap for route and traffic awareness",
  "Moving traffic and lane-changing challenges",
  "Vehicle progression and courier rewards",
  "Responsive boost controls for keyboard and touch",
];

const controls = [
  ["Keyboard steering", "Arrow Left / Arrow Right or A / D to change lane"],
  ["Boost", "Press Space to trigger the vehicle boost"],
  ["Touch", "Swipe left or right to steer on supported mobile devices"],
];

export default function RapexDashCaseStudyPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_8%,rgba(6,182,212,0.15),transparent_30%),radial-gradient(ellipse_at_12%_88%,rgba(217,70,239,0.12),transparent_28%)]" />
      <Link href="/work/savor-house-restaurant-web-experience" aria-label="Previous project: Savor House" className="fixed left-72 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-2 rounded-r-2xl border border-white/12 bg-[#071224]/72 px-3 py-4 text-[9px] font-semibold tracking-[0.14em] text-white/65 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-cyan-300/40 hover:text-white lg:flex"><ChevronLeft size={17} /><span className="[writing-mode:vertical-rl] rotate-180">PREVIOUS WORK</span></Link>
      <Link href="/work/react-native-digital-ecommerce" aria-label="Next project: React Native Digital Ecommerce" className="fixed right-0 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-2 rounded-l-2xl border border-white/12 bg-[#071224]/72 px-3 py-4 text-[9px] font-semibold tracking-[0.14em] text-white/65 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-cyan-300/40 hover:text-white lg:flex"><span className="[writing-mode:vertical-rl]">NEXT WORK</span><ChevronRight size={17} /></Link>
      <main className="mx-auto max-w-375 px-6 pb-16 pt-12 sm:px-10 lg:px-14 xl:px-20">
        <Link href="/work" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/2 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white/70 transition hover:border-cyan-300/40 hover:text-white">
          <ArrowLeft size={14} /> BACK TO WORK
        </Link>

        <header className="mt-8 border-b border-white/10 pb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">Interactive 3D Browser Game</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-tighter text-white sm:text-6xl lg:text-7xl">RAPEX <span className="text-cyan-300">DASH</span></h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#A7AFBF]">A neon arcade courier runner where players weave through traffic, follow tactical routes, collect pickup missions and use boost to complete deliveries across a fast-moving city.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "TypeScript", "Three.js", "WebGL"].map((tool) => <span key={tool} className="work-detail-black-button rounded-full px-3 py-1.5 text-xs">{tool}</span>)}
          </div>
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-[10px] font-semibold tracking-[0.14em] text-white/75 transition hover:border-cyan-300/45 hover:text-white">VIEW SOURCE ON GITHUB <ExternalLink size={14} /></a>
        </header>

        <section className="pt-10">
          <ProjectEmbed
            src={liveGameUrl}
            title="RAPEX DASH playable demo"
            aspectRatio="16 / 9"
            minHeight={480}
            hint="Click once to give the game control of your keyboard. Arrow keys and Space will then control the game instead of scrolling this portfolio page."
          />
        </section>

        <RapexDashGallery />

        <section className="grid gap-6 pt-12 lg:grid-cols-2">
          <article className="work-detail-overview-card rounded-[1.8rem] p-6">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-200">OVERVIEW</p>
            <p className="mt-4 text-sm leading-7 text-[#D7DCE7]">RAPEX DASH turns a delivery workflow into an energetic arcade experience. The interface keeps missions, navigation, speed and vehicle feedback visible while the player reacts to traffic at high speed.</p>
          </article>
          <RapexDashMediaViewer />
        </section>

        <section className="pt-6">
          <article className="work-detail-glass-card rounded-[1.8rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-200">FEATURES</p><p className="mt-2 text-xs text-white/40">Core systems visible in the playable demo</p></div>
              <ArrowRight size={18} className="text-cyan-300/60" />
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{features.map((feature) => <li key={feature} className="rounded-2xl border border-white/8 bg-black/15 p-4 text-xs leading-5 text-[#A7AFBF]"><Check size={15} className="mb-3 text-cyan-300" />{feature}</li>)}</ul>
          </article>
        </section>

        <section className="grid gap-6 pt-6 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="work-detail-groove-card rounded-[1.8rem] p-6">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-200">TECH STACK</p>
            <div className="mt-5 flex flex-wrap gap-2">{["React", "TypeScript", "Three.js", "WebGL", "Responsive Game UI"].map((tool) => <span key={tool} className="work-detail-black-button rounded-full px-3 py-2 text-xs">{tool}</span>)}</div>
          </article>

          <article className="work-detail-groove-card rounded-[1.8rem] p-6">
            <div className="flex items-center gap-2"><Gamepad2 size={16} className="text-cyan-300" /><p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-200">CONTROLS</p></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{controls.map(([label, description]) => <div key={label} className="rounded-2xl border border-white/8 bg-black/15 p-4"><p className="text-xs font-semibold text-white">{label}</p><p className="mt-2 text-xs leading-5 text-[#A7AFBF]">{description}</p></div>)}</div>
          </article>
        </section>

        <RapexDashSpecificationsRail />
      </main>
    </div>
  );
}
