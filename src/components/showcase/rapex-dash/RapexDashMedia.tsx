"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const mediaRoot = "/images/projects/RAPEX- DASH";

const slides = [
  { src: `${mediaRoot}/cover.png`, title: "Gameplay Recording", caption: "Neon courier gameplay and tactical navigation presentation." },
  { src: `${mediaRoot}/sc-1.png`, title: "Start Delivery Experience", caption: "Cinematic game entry screen with rider profile, mission preview and primary controls." },
  { src: `${mediaRoot}/sc-2.png`, title: "Four Gameplay Moments", caption: "Pickup, boost, traffic avoidance and successful order completion." },
  { src: `${mediaRoot}/sc-3.png`, title: "HUD & Tactical GPS", caption: "Mission guidance, rider telemetry, speed feedback and touch controls." },
  { src: `${mediaRoot}/sc-4.png`, title: "Vehicle Garage", caption: "Bike upgrades, delivery skins, equipment and performance tuning." },
  { src: `${mediaRoot}/sc-5.png`, title: "Engine Architecture Presentation", caption: "Visual overview of the five technical layers behind the browser game." },
  { src: `${mediaRoot}/rapex-dash-architecture-stack.png`, title: "Technical Architecture Blueprint", caption: "Detailed React, Three.js, WebGL, audio and mission-state implementation plan." },
  { src: `${mediaRoot}/dash-2.png`, title: "Delivery Shift Start Screen", caption: "Playable build entry state with rider stats, wallet, garage and control guidance." },
  { src: `${mediaRoot}/dash-1.png`, title: "Live Gameplay — Neon District", caption: "Original WebGL gameplay capture with mission HUD." },
  { src: `${mediaRoot}/dash-3.png`, title: "Live Gameplay — Mission Run", caption: "Courier route, traffic and active delivery objective." },
  { src: `${mediaRoot}/dash-4.png`, title: "Live Gameplay — Tactical Route", caption: "Lane controls, speed, nitro, mission payout and tactical GPS during a delivery run." },
  { src: `${mediaRoot}/dash-11.png`, title: "Completed Shift Recap", caption: "End-of-run score, earnings, completed orders, combo results and replay action." },
  { src: `${mediaRoot}/dash-12.png`, title: "Vehicle Fleet Selection", caption: "Garage comparison for speed, acceleration, handling, unlock price and equipped vehicle." },
];

const specificationCards = [
  { src: `${mediaRoot}/rapex-raw-01.png`, title: "Four Gameplay Screenshots", code: "RAW 01" },
  { src: `${mediaRoot}/rapex-raw-02.png`, title: "Start-Screen Capture", code: "RAW 02" },
  { src: `${mediaRoot}/rapex-raw-03.png`, title: "HUD & Tactical GPS Design", code: "RAW 03" },
  { src: `${mediaRoot}/rapex-raw-04.png`, title: "Vehicle Fleet Garage", code: "RAW 04" },
  { src: `${mediaRoot}/rapex-raw-05.png`, title: "Tech Specifications", code: "RAW 05" },
  { src: `${mediaRoot}/rapex-raw-06.png`, title: "Gameplay Recording Slot", code: "RAW 06" },
  { src: `${mediaRoot}/rapex-raw-07.png`, title: "Playable Browser Build Slot", code: "RAW 07" },
];

function SoundControl({ videoRef, playing }: { videoRef: React.RefObject<HTMLVideoElement | null>; playing: boolean }) {
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.65);

  function applyVolume(nextVolume: number) {
    setVolume(nextVolume);
    if (videoRef.current) {
      videoRef.current.volume = nextVolume;
      videoRef.current.muted = nextVolume === 0;
    }
    setMuted(nextVolume === 0);
  }

  function toggleMute() {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (videoRef.current) videoRef.current.muted = nextMuted;
  }

  return (
    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-cyan-200/10 bg-[#07101d] px-3 py-2.5 shadow-[inset_3px_3px_8px_rgba(0,0,0,0.7),inset_-2px_-2px_6px_rgba(34,211,238,0.06),0_7px_20px_rgba(0,0,0,0.28)]">
      <button type="button" onClick={toggleMute} aria-label={muted ? "Turn audio on" : "Mute audio"} className="grid size-9 shrink-0 place-items-center rounded-xl border border-cyan-200/12 bg-[#0b1728] text-cyan-200 shadow-[4px_4px_9px_rgba(0,0,0,0.55),-2px_-2px_6px_rgba(49,214,255,0.07)] transition active:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.7)]">
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>
      <div className="flex min-w-0 flex-1 items-end gap-1" aria-label="Audio frequency visualization">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} className={`w-1 flex-1 rounded-full bg-linear-to-t from-cyan-500 to-fuchsia-400 transition-opacity ${playing && !muted ? "animate-pulse opacity-90" : "opacity-25"}`} style={{ height: `${8 + ((index * 7) % 19)}px`, animationDelay: `${index * 45}ms` }} />
        ))}
      </div>
      <input aria-label="Video volume" type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={(event) => applyVolume(Number(event.target.value))} className="h-1 w-20 accent-cyan-400" />
    </div>
  );
}

export function RapexDashMediaViewer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"image" | "video">("image");
  const [playing, setPlaying] = useState(false);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play();
    else video.pause();
  }

  return (
    <article className="work-detail-glass-card overflow-hidden rounded-[1.8rem] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-200">MEDIA VIEWER</p>
          <p className="mt-1 text-xs text-white/45">Final artwork and recorded gameplay</p>
        </div>
        <div className="flex rounded-full border border-white/10 bg-black/25 p-1">
          <button type="button" onClick={() => setMode("image")} className={`rounded-full px-3 py-1.5 text-[9px] font-semibold tracking-[0.12em] transition ${mode === "image" ? "bg-cyan-400 text-[#03111b]" : "text-white/45"}`}>IMAGE</button>
          <button type="button" onClick={() => setMode("video")} className={`rounded-full px-3 py-1.5 text-[9px] font-semibold tracking-[0.12em] transition ${mode === "video" ? "bg-cyan-400 text-[#03111b]" : "text-white/45"}`}>MP4</button>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-2xl border border-cyan-200/12 bg-[#030712]">
        {mode === "image" ? (
          <Image src={`${mediaRoot}/cover.png`} alt="RAPEX DASH gameplay recording presentation" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        ) : (
          <>
            <video ref={videoRef} src={`${mediaRoot}/game-ui-record.mp4`} poster={`${mediaRoot}/cover.png`} playsInline muted onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} className="h-full w-full object-cover" />
            <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause gameplay video" : "Play gameplay video"} className="absolute inset-0 grid place-items-center bg-black/12 transition hover:bg-black/25">
              <span className="grid size-14 place-items-center rounded-full border border-cyan-100/30 bg-[#061529]/82 text-cyan-100 shadow-[0_0_35px_rgba(34,211,238,0.32)] backdrop-blur-md">{playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="translate-x-0.5" />}</span>
            </button>
          </>
        )}
      </div>
      {mode === "video" && <SoundControl videoRef={videoRef} playing={playing} />}
    </article>
  );
}

export function RapexDashGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const activeSlide = slides[activeIndex];
  const goTo = (index: number) => setActiveIndex((index + slides.length) % slides.length);

  return (
    <section className="pt-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2"><ImageIcon size={15} className="text-cyan-300" /><p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-200">PROJECT IMAGE GALLERY</p></div>
          <p className="mt-2 text-sm text-white/45">Autoplay pauses while your cursor is over the gallery.</p>
        </div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-white/35">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
      </div>

      <div className="group relative aspect-video overflow-hidden rounded-[1.8rem] border border-cyan-200/15 bg-[#030712] shadow-[0_26px_70px_rgba(0,0,0,0.42)]">
        <Image key={activeSlide.src} src={activeSlide.src} alt={activeSlide.title} fill sizes="(max-width: 1280px) 100vw, 1200px" className="object-cover animate-[pulse_700ms_ease-out_1]" />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#020817] via-[#020817]/78 to-transparent p-6 pt-20 sm:p-8 sm:pt-28">
          <p className="text-lg font-semibold text-white sm:text-2xl">{activeSlide.title}</p>
          <p className="mt-2 text-xs text-slate-300 sm:text-sm">{activeSlide.caption}</p>
        </div>
        <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous gallery image" className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#071224]/72 text-white shadow-xl backdrop-blur-xl transition hover:border-cyan-300/45 hover:text-cyan-200"><ChevronLeft size={20} /></button>
        <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next gallery image" className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#071224]/72 text-white shadow-xl backdrop-blur-xl transition hover:border-cyan-300/45 hover:text-cyan-200"><ChevronRight size={20} /></button>
      </div>

      <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-3">
        {slides.map((slide, index) => (
          <button type="button" key={slide.src} onClick={() => goTo(index)} className={`relative aspect-video w-48 shrink-0 snap-start overflow-hidden rounded-2xl border transition ${index === activeIndex ? "border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.22)]" : "border-white/10 opacity-55 hover:opacity-100"}`}>
            <Image src={slide.src} alt={`View ${slide.title}`} fill sizes="192px" className="object-cover" />
            <span className="absolute inset-x-0 bottom-0 truncate bg-black/70 px-3 py-2 text-left text-[9px] font-semibold tracking-[0.08em] text-white/80 backdrop-blur-sm">{slide.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function RapexDashSpecificationsRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  function scrollRail(direction: -1 | 1) {
    railRef.current?.scrollBy({ left: direction * Math.min(620, window.innerWidth * 0.72), behavior: "smooth" });
  }

  const selectedCard = selectedIndex === null ? null : specificationCards[selectedIndex];
  const selectedPosition = selectedIndex ?? 0;

  return (
    <section className="pt-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.24em] text-cyan-200">RAW FILES · TECHNICAL SPECIFICATIONS</p>
          <p className="mt-2 text-sm text-white/45">All seven original specification cards are preserved. Select any card to inspect it full size.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => scrollRail(-1)} aria-label="Scroll specification cards left" className="grid size-10 place-items-center rounded-full border border-cyan-200/14 bg-[#071224]/80 text-white/70 shadow-[5px_5px_14px_rgba(0,0,0,0.42),inset_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition hover:border-cyan-300/45 hover:text-cyan-200 active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.65)]"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => scrollRail(1)} aria-label="Scroll specification cards right" className="grid size-10 place-items-center rounded-full border border-cyan-200/14 bg-[#071224]/80 text-white/70 shadow-[5px_5px_14px_rgba(0,0,0,0.42),inset_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition hover:border-cyan-300/45 hover:text-cyan-200 active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.65)]"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div ref={railRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-color:rgba(34,211,238,0.65)_rgba(7,18,36,0.75)] [scrollbar-width:thin]">
        {specificationCards.map((card, index) => (
          <button type="button" key={card.src} onClick={() => setSelectedIndex(index)} className="group w-[78vw] max-w-125 shrink-0 snap-start overflow-hidden rounded-[1.45rem] border border-cyan-200/13 bg-[#050817] text-left shadow-[0_18px_42px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 hover:border-cyan-300/45">
            <div className="relative aspect-video overflow-hidden">
              <Image src={card.src} alt={card.title} fill sizes="(max-width: 768px) 78vw, 500px" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-linear-to-t from-[#020817]/80 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-cyan-200/18 bg-[#04101f]/80 px-3 py-1.5 text-[9px] font-semibold tracking-[0.16em] text-cyan-200 backdrop-blur-lg">{card.code}</span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-semibold text-white">{card.title}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/88 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={selectedCard.title} onClick={() => setSelectedIndex(null)}>
          <button type="button" onClick={() => setSelectedIndex(null)} aria-label="Close specification image" className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-[#071224]/80 text-white backdrop-blur-xl"><X size={18} /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedPosition - 1 + specificationCards.length) % specificationCards.length); }} aria-label="Previous specification image" className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#071224]/80 text-white backdrop-blur-xl sm:left-6"><ChevronLeft size={20} /></button>
          <div className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-2xl border border-cyan-200/20 bg-[#030712] shadow-[0_30px_100px_rgba(0,0,0,0.65)]" onClick={(event) => event.stopPropagation()}>
            <Image src={selectedCard.src} alt={selectedCard.title} fill sizes="100vw" className="object-contain" priority />
          </div>
          <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedPosition + 1) % specificationCards.length); }} aria-label="Next specification image" className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#071224]/80 text-white backdrop-blur-xl sm:right-6"><ChevronRight size={20} /></button>
        </div>
      )}
    </section>
  );
}
