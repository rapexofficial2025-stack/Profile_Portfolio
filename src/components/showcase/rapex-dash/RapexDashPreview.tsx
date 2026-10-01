"use client";

import { useState } from "react";
import { Gauge, MapPin, Play, Zap } from "lucide-react";

const buildings = Array.from({ length: 14 }, (_, index) => index);
const laneMarkers = Array.from({ length: 9 }, (_, index) => index);

export function RapexDashThumbnail() {
  return (
    <div className="relative aspect-16/10 overflow-hidden rounded-[1.25rem] border border-cyan-300/20 bg-[#050817] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" aria-label="RAPEX DASH neon courier game preview">
      <DashCityScene lane={0} speed={93} compact />
      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
        <strong className="text-[11px] font-black tracking-tight text-cyan-300">RAPEX <span className="text-white">DASH</span></strong>
        <span className="rounded border border-cyan-300/25 bg-slate-950/75 px-2 py-1 text-[7px] font-bold tracking-[0.16em] text-cyan-200">3D RIDER</span>
      </div>
      <div className="absolute inset-x-3 bottom-3 rounded-lg border border-cyan-300/20 bg-slate-950/80 px-3 py-2 backdrop-blur-md">
        <p className="text-[7px] font-bold tracking-[0.18em] text-amber-300">INTERACTIVE WEB GAME</p>
        <p className="mt-1 text-[9px] font-semibold text-white">Neon courier missions · traffic · boost</p>
      </div>
    </div>
  );
}

export function RapexDashPreview() {
  const [playing, setPlaying] = useState(false);
  const [lane, setLane] = useState(-1);
  const [speed, setSpeed] = useState(46);
  const [wallet, setWallet] = useState(2635);
  const [deliveries, setDeliveries] = useState(1);

  const steer = (direction: -1 | 1) => {
    setPlaying(true);
    setLane((current) => Math.max(-1, Math.min(1, current + direction)));
  };

  const boost = () => {
    setPlaying(true);
    setSpeed((current) => Math.min(150, current + 18));
  };

  const brake = () => setSpeed((current) => Math.max(18, current - 20));

  const deliver = () => {
    setPlaying(true);
    setDeliveries((current) => current + 1);
    setWallet((current) => current + 85);
  };

  if (!playing) {
    return (
      <div className="relative flex min-h-144 items-center justify-center overflow-hidden bg-[#020617] p-5 text-white">
        <DashCityScene lane={0} speed={0} />
        <section className="relative z-10 w-full max-w-md rounded-2xl border border-cyan-300/20 bg-[#0b1429]/94 p-6 text-center shadow-[0_25px_80px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <p className="text-[9px] font-black tracking-[0.24em] text-cyan-300">3D ARCADE COURIER RUNNER</p>
          <h2 className="mt-2 text-4xl font-black tracking-tighter text-cyan-300">RAPEX <span className="text-white">DASH</span></h2>
          <p className="mx-auto mt-3 max-w-sm text-xs leading-5 text-slate-300">Pick up orders across a neon metropolis, weave through traffic and deliver before the timer runs out.</p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-left">
            {[['HIGH SCORE', '19,026'], ['WALLET', `$${wallet.toLocaleString()}`], ['DELIVERIES', String(deliveries)]].map(([label, value]) => <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-3"><p className="text-[7px] tracking-[0.16em] text-slate-400">{label}</p><p className="mt-1 text-sm font-black text-white">{value}</p></div>)}
          </div>
          <button type="button" onClick={() => setPlaying(true)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200/30 bg-cyan-500 px-5 py-3 text-xs font-black tracking-[0.1em] text-white shadow-[0_0_30px_rgba(6,182,212,0.35)] transition hover:brightness-110 active:shadow-inner"><Play size={15} fill="currentColor" /> START DELIVERY SHIFT</button>
          <p className="mt-4 text-[8px] tracking-[0.12em] text-cyan-200/70">PORTFOLIO MINI PREVIEW · FULL PLAYABLE BUILD CAN BE CONNECTED LATER</p>
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-144 overflow-hidden bg-[#020617] text-white">
      <DashCityScene lane={lane} speed={speed} />
      <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-3 sm:inset-x-4 sm:top-4">
        <div className="rounded-xl border border-cyan-300/15 bg-slate-950/80 p-3 backdrop-blur-md">
          <p className="text-sm font-black text-cyan-300">RAPEX <span className="text-white">DASH</span></p>
          <p className="mt-1 text-[9px] font-semibold text-emerald-300">$ {wallet.toLocaleString()} <span className="ml-3 text-slate-400">{deliveries} delivered</span></p>
        </div>
        <div className="hidden rounded-xl border border-cyan-300/15 bg-slate-950/80 p-3 backdrop-blur-md sm:block">
          <p className="flex items-center gap-2 text-[8px] font-black tracking-[0.18em] text-cyan-200"><MapPin size={11} /> TACTICAL GPS</p>
          <div className="mt-2 grid grid-cols-4 gap-1">{Array.from({ length: 16 }, (_, index) => <i key={index} className={`size-1 rounded-full ${index % 5 === 0 ? "bg-amber-300" : index % 7 === 0 ? "bg-pink-400" : "bg-cyan-400/35"}`} />)}</div>
        </div>
      </div>

      <button type="button" onClick={deliver} className="absolute left-1/2 top-[42%] z-10 w-[min(72%,19rem)] -translate-x-1/2 rounded-xl border border-cyan-300/20 bg-[#111b39]/92 p-3 text-left shadow-2xl backdrop-blur-md">
        <span className="text-[8px] font-black tracking-[0.14em] text-amber-300">MISSION · PICKUP</span>
        <span className="ml-2 text-[10px] font-semibold text-white">Spicy Tonkotsu Ramen</span>
        <span className="float-right text-[9px] font-black text-emerald-300">+$85</span>
        <span className="mt-1 block text-[8px] text-slate-400">Tap to complete this delivery checkpoint</span>
      </button>

      <div className="absolute inset-x-3 bottom-4 z-10 flex items-end justify-between gap-2 sm:inset-x-4">
        <div className="flex gap-2">
          <button type="button" onClick={() => steer(-1)} aria-label="Steer left" className="rounded-xl border border-white/10 bg-[#101a35]/92 px-4 py-3 text-[9px] font-black shadow-xl active:shadow-inner">◀ LEFT</button>
          <button type="button" onClick={() => steer(1)} aria-label="Steer right" className="rounded-xl border border-white/10 bg-[#101a35]/92 px-4 py-3 text-[9px] font-black shadow-xl active:shadow-inner">RIGHT ▶</button>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#101a35]/92 px-5 py-2 text-center shadow-xl">
          <p className="text-2xl font-black leading-none">{speed}</p><p className="text-[7px] tracking-[0.16em] text-slate-400">MPH</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={brake} className="rounded-xl border border-red-400/30 bg-red-950/90 px-4 py-3 text-[9px] font-black text-red-100 shadow-xl active:shadow-inner">BRAKE</button>
          <button type="button" onClick={boost} className="inline-flex items-center gap-1 rounded-xl border border-cyan-200/30 bg-cyan-500 px-4 py-3 text-[9px] font-black shadow-[0_0_24px_rgba(6,182,212,0.35)] active:shadow-inner"><Zap size={13} /> BOOST</button>
        </div>
      </div>
    </div>
  );
}

function DashCityScene({ lane, speed, compact = false }: { lane: number; speed: number; compact?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(217,70,239,0.42),transparent_24%),linear-gradient(#321058_0%,#120729_42%,#020617_100%)]" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-fuchsia-500/20 to-transparent" />
      <div className="absolute inset-x-[20%] bottom-0 top-[23%] bg-[#312e36] [clip-path:polygon(44%_0,56%_0,100%_100%,0_100%)]" />
      <div className="absolute inset-x-[22%] bottom-0 top-[23%] border-x-2 border-cyan-300/80 [clip-path:polygon(43%_0,57%_0,100%_100%,0_100%)]" />
      {buildings.map((item) => <i key={item} className="absolute bottom-[36%] bg-[#08091a] shadow-[inset_0_0_0_1px_rgba(34,211,238,0.06)]" style={{ left: `${item < 7 ? item * 7 : 56 + (item - 7) * 7}%`, width: `${5 + (item % 3)}%`, height: `${22 + (item % 5) * 8}%` }} />)}
      {laneMarkers.map((item) => <i key={item} className="absolute left-1/2 h-[5%] w-1 -translate-x-1/2 bg-amber-300" style={{ bottom: `${item * 9}%`, transform: `translateX(-50%) scale(${0.45 + item * 0.08})` }} />)}
      <div className="absolute bottom-[13%] left-1/2 transition-transform duration-300" style={{ transform: `translateX(calc(-50% + ${lane * (compact ? 24 : 52)}px))` }}>
        <div className={`${compact ? "size-6" : "size-10"} rounded-t-full border border-cyan-200 bg-cyan-400 shadow-[0_0_22px_rgba(34,211,238,0.85)]`} />
        <div className={`${compact ? "h-5 w-9" : "h-8 w-14"} -translate-x-1/4 bg-emerald-400 shadow-[inset_0_0_0_3px_#0f172a]`} />
      </div>
      {speed > 80 ? <div className="absolute inset-0 bg-[repeating-linear-gradient(100deg,transparent_0_9%,rgba(34,211,238,0.16)_9.2%,transparent_9.5%_18%)] opacity-60" /> : null}
      <Gauge className="absolute bottom-[29%] right-[22%] text-cyan-300/25" size={compact ? 18 : 28} />
    </div>
  );
}
