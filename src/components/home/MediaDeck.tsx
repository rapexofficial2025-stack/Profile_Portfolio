"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, Repeat, RotateCcw, RotateCw } from "lucide-react";
import { pageZoom } from "@/lib/zoom";
import { asset } from "@/lib/asset";

const TRACK = asset("/audio/rapex-theme_IK7pcIES.mp3.mp3");
const LOCAL_HEART_KEY = "portfolio-heart-until";
const HEART_COOLDOWN = 5 * 60 * 1000;
const CLIENT_ID_KEY = "portfolio-heart-cid";
const KNOB_SWEEP = 270;

const formatTime = (seconds: number) => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}` : "0:00";

export function MediaDeck() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0 });
  const [volume, setVolume] = useState(0.7);
  // audio graph: element -> gain (volume) -> analyser (meters) -> speakers; built on first play (browsers require a gesture)
  const graphRef = useRef<{ context: AudioContext; gain: GainNode; analyser: AnalyserNode } | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    if (graphRef.current) graphRef.current.gain.gain.value = volume;
    else if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);
  useEffect(() => { if (audioRef.current) audioRef.current.loop = isLooping; }, [isLooping]);

  const connectGraph = (audio: HTMLAudioElement) => {
    if (graphRef.current) return graphRef.current;
    const context = new AudioContext();
    const gain = context.createGain();
    const meter = context.createAnalyser();
    meter.fftSize = 1024; meter.smoothingTimeConstant = 0.78;
    context.createMediaElementSource(audio).connect(gain).connect(meter).connect(context.destination);
    audio.volume = 1; gain.gain.value = volume;
    graphRef.current = { context, gain, analyser: meter };
    setAnalyser(meter);
    return graphRef.current;
  };
  const togglePlay = () => {
    const audio = audioRef.current; if (!audio) return;
    if (!audio.paused) { audio.pause(); return; }
    void connectGraph(audio).context.resume();
    void audio.play();
  };
  const skip = (seconds: number) => { const audio = audioRef.current; if (audio) audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds)); };
  const seek = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current; if (!audio || !audio.duration) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    audio.currentTime = ((event.clientX - bounds.left) / bounds.width) * audio.duration;
  };
  const progress = time.duration ? (time.current / time.duration) * 100 : 0;

  return <div className="media-deck mt-4 not-italic">
    <audio ref={audioRef} src={TRACK} preload="metadata" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} onLoadedMetadata={(event) => setTime({ current: 0, duration: event.currentTarget.duration })} onTimeUpdate={(event) => setTime({ current: event.currentTarget.currentTime, duration: event.currentTarget.duration })} />
    <div className="flex items-center gap-3">
      <div className="media-deck-pill" role="group" aria-label="Music player">
        <button type="button" className="media-deck-btn" onClick={() => skip(-10)} aria-label="Back 10 seconds"><RotateCcw size={13} /></button>
        <button type="button" className={`media-deck-btn media-deck-play ${isPlaying ? "is-on" : ""}`} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>{isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-px" />}</button>
        <button type="button" className="media-deck-btn" onClick={() => skip(10)} aria-label="Forward 10 seconds"><RotateCw size={13} /></button>
        <button type="button" className={`media-deck-btn ${isLooping ? "is-on" : ""}`} onClick={() => setIsLooping((value) => !value)} aria-label="Repeat" aria-pressed={isLooping}><Repeat size={13} /></button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HeartButton />
        <VolumeKnob value={volume} onChange={setVolume} />
      </div>
      <SpectrumMeter analyser={analyser} isPlaying={isPlaying} />
    </div>
    <div className="mt-2.5 flex items-center gap-2 text-[0.55rem] font-medium tabular-nums tracking-[0.08em] text-current/60">
      <span>{formatTime(time.current)}</span>
      <div className="media-deck-track" onClick={seek} role="presentation"><span style={{ width: `${progress}%` }} /></div>
      <span>{formatTime(time.duration)}</span>
    </div>
  </div>;
}

const BARS = 24;
const MIN_HZ = 40, MAX_HZ = 16000;
const formatHz = (hz: number) => hz >= 1000 ? `${(hz / 1000).toFixed(1)} kHz` : `${Math.round(hz)} Hz`;

/** Live spectrum: log-spaced frequency bars with falling peak caps, peak frequency (Hz) and level (dBFS). */
export function SpectrumMeter({ analyser, isPlaying }: { analyser: AnalyserNode | null; isPlaying: boolean }) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const capRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const levelRef = useRef<HTMLSpanElement>(null);
  const hzRef = useRef<HTMLSpanElement>(null);
  const dbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bins = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    const wave = analyser ? new Float32Array(analyser.fftSize) : null;
    const binHz = analyser ? analyser.context.sampleRate / analyser.fftSize : 1;
    const edges = Array.from({ length: BARS + 1 }, (_, i) => MIN_HZ * (MAX_HZ / MIN_HZ) ** (i / BARS));
    const heights = new Array(BARS).fill(0), caps = new Array(BARS).fill(0);
    let frame = 0;
    const tick = () => {
      let peakBin = 0, peakValue = 0, db = -Infinity;
      if (analyser && bins && wave && isPlaying) {
        analyser.getByteFrequencyData(bins);
        analyser.getFloatTimeDomainData(wave);
        for (let i = 1; i < bins.length; i++) if (bins[i] > peakValue) { peakValue = bins[i]; peakBin = i; }
        let sum = 0; for (const sample of wave) sum += sample * sample;
        db = 20 * Math.log10(Math.sqrt(sum / wave.length) || 1e-8);
      }
      for (let bar = 0; bar < BARS; bar++) {
        let target = 0;
        if (bins && isPlaying) {
          const from = Math.max(1, Math.floor(edges[bar] / binHz)), to = Math.max(from + 1, Math.ceil(edges[bar + 1] / binHz));
          let max = 0; for (let i = from; i < to && i < bins.length; i++) max = Math.max(max, bins[i]);
          target = max / 255;
        }
        heights[bar] += (target - heights[bar]) * (target > heights[bar] ? 0.6 : 0.18);
        caps[bar] = Math.max(heights[bar], caps[bar] - 0.012);
        const barEl = barRefs.current[bar], capEl = capRefs.current[bar];
        if (barEl) barEl.style.transform = `scaleY(${Math.max(0.04, heights[bar])})`;
        if (capEl) capEl.style.bottom = `${Math.max(0.04, caps[bar]) * 100}%`;
      }
      const shown = Number.isFinite(db) && db > -90;
      if (dbRef.current) dbRef.current.textContent = shown ? `${db.toFixed(1)} dB` : "-\u221e dB";
      if (hzRef.current) hzRef.current.textContent = shown && peakValue > 8 ? formatHz(peakBin * binHz) : "\u2014 Hz";
      if (levelRef.current) levelRef.current.style.width = `${shown ? Math.min(100, Math.max(0, ((db + 60) / 60) * 100)) : 0}%`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [analyser, isPlaying]);

  return <div className="media-deck-screen" aria-hidden="true">
    <div className="flex items-center justify-between text-[0.5rem] font-semibold tabular-nums tracking-[0.08em]">
      <span className="text-cyan-300/90">PEAK <span ref={hzRef}>{"\u2014 Hz"}</span></span>
      <span ref={dbRef} className="text-emerald-300/90">{"-\u221e dB"}</span>
    </div>
    <div className="media-deck-bars">{Array.from({ length: BARS }, (_, bar) => <span key={bar} className="media-deck-bar-slot"><span ref={(el) => { barRefs.current[bar] = el; }} className="media-deck-bar" /><span ref={(el) => { capRefs.current[bar] = el; }} className="media-deck-cap" /></span>)}</div>
    <div className="media-deck-level"><span ref={levelRef} /></div>
    <div className="flex justify-between text-[0.4rem] font-medium tracking-widest text-white/35"><span>40</span><span>250</span><span>1k</span><span>4k</span><span>16k Hz</span></div>
  </div>;
}

export function VolumeKnob({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const drag = useRef<{ y: number; value: number; zoom: number } | null>(null);
  const set = (next: number) => onChange(Math.round(Math.min(1, Math.max(0, next)) * 100) / 100);
  const angle = -KNOB_SWEEP / 2 + value * KNOB_SWEEP;

  return <div
    className="media-deck-knob"
    role="slider" tabIndex={0} aria-label="Volume" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)}
    style={{ "--knob-fill": `${value * KNOB_SWEEP}deg` } as React.CSSProperties}
    onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); drag.current = { y: event.clientY, value, zoom: pageZoom() }; }}
    onPointerMove={(event) => { const start = drag.current; if (start) set(start.value + (start.y - event.clientY) / start.zoom / 120); }}
    onPointerUp={() => { drag.current = null; }}
    onPointerCancel={() => { drag.current = null; }}
    onWheel={(event) => set(value - Math.sign(event.deltaY) * 0.05)}
    onKeyDown={(event) => {
      const step = { ArrowUp: 0.05, ArrowRight: 0.05, ArrowDown: -0.05, ArrowLeft: -0.05 }[event.key];
      if (step) { event.preventDefault(); set(value + step); } else if (event.key === "Home") set(0); else if (event.key === "End") set(1);
    }}
  >
    <span className="media-deck-knob-cap" style={{ transform: `rotate(${angle}deg)` }}><span className="media-deck-knob-dot" /></span>
  </div>;
}

function HeartButton() {
  const [count, setCount] = useState<number | null>(null);
  // no /api/hearts (static hosting): hearts still work per browser, the shared count is hidden
  const [offline, setOffline] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(0);
  const clientId = useRef("");

  useEffect(() => {
    try {
      clientId.current = localStorage.getItem(CLIENT_ID_KEY) ?? "";
      if (!clientId.current) { clientId.current = crypto.randomUUID(); localStorage.setItem(CLIENT_ID_KEY, clientId.current); }
    } catch { clientId.current = crypto.randomUUID(); }
    fetch(asset(`/api/hearts?cid=${clientId.current}`)).then((response) => { if (!response.ok) throw new Error("no heart api"); return response.json(); }).then((state) => {
      setCount(state.count); setCooldownUntil(Date.now() + state.cooldownMs); setNow(Date.now());
    }).catch(() => {
      setOffline(true);
      try { setCooldownUntil(Number(localStorage.getItem(LOCAL_HEART_KEY)) || 0); } catch { /* storage unavailable */ }
      setNow(Date.now());
    });
  }, []);

  const remaining = Math.max(0, cooldownUntil - now);
  useEffect(() => {
    if (remaining <= 0) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [remaining]);

  const heart = async () => {
    if (remaining > 0 || !clientId.current) return;
    setCooldownUntil(Date.now() + HEART_COOLDOWN); setNow(Date.now());
    if (offline) { try { localStorage.setItem(LOCAL_HEART_KEY, String(Date.now() + HEART_COOLDOWN)); } catch { /* storage unavailable */ } return; }
    setCount((value) => (value ?? 0) + 1);
    try {
      const state = await (await fetch(asset("/api/hearts"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cid: clientId.current }) })).json();
      setCount(state.count); setCooldownUntil(Date.now() + state.cooldownMs); setNow(Date.now());
    } catch { /* keep the optimistic count; it re-syncs on the next visit */ }
  };

  const cooling = remaining > 0;
  const label = cooling ? `Hearted. You can heart again in ${formatTime(remaining / 1000)}` : "Send a heart";
  return <div className="flex flex-col items-center gap-1">
    <button type="button" onClick={heart} aria-label={label} title={label} aria-disabled={cooling} className={`media-deck-heart ${cooling ? "is-on" : ""}`} style={{ "--cooldown": `${(remaining / (5 * 60 * 1000)) * 360}deg` } as React.CSSProperties}>
      <Heart size={17} fill={cooling ? "currentColor" : "none"} strokeWidth={2} />
    </button>
    {!offline && <span className="text-[0.55rem] font-semibold tabular-nums tracking-[0.06em] text-current/70">{count ?? "–"}</span>}
  </div>;
}
