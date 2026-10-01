"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Expand, ImageIcon, Music, Pause, Play, Sparkles, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { visualArtProjects, type VisualArtProject } from "@/data/visual-art-gallery";
function withBasePath(src?: string) {
  if (!src) return "";

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!basePath) return src;

  if (src.startsWith(`${basePath}/`)) {
    return src;
  }

  if (src.startsWith("/")) {
    return `${basePath}${src}`;
  }

  return `${basePath}/${src}`;
}
function MediaPlaceholder({ type, title }: { type: "image" | "video" | "audio"; title: string }) {
  const Icon = type === "video" ? Play : type === "audio" ? Music : ImageIcon;
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative flex h-full min-h-72 w-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(139,92,246,0.2),transparent_32%),linear-gradient(135deg,#151321,#090b11)] px-6 text-center sm:min-h-96">
      {type === "video" && <div className="pointer-events-none absolute inset-0 opacity-65">
        <motion.span className="absolute left-[30%] top-[29%] size-5 rounded-full border border-violet-200/45 bg-violet-300/15" animate={playing ? { y: [0, -9, 0], rotate: [0, 8, 0] } : {}} transition={{ duration: 1.1, repeat: Infinity }} />
        <motion.span className="absolute left-[39%] top-[37%] h-24 w-1 origin-top rounded-full bg-linear-to-b from-violet-300/60 to-cyan-300/20" animate={playing ? { rotate: [-18, 22, -18] } : { rotate: -8 }} transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }} />
        <motion.span className="absolute right-[39%] top-[37%] h-24 w-1 origin-top rounded-full bg-linear-to-b from-violet-300/60 to-cyan-300/20" animate={playing ? { rotate: [18, -22, 18] } : { rotate: 8 }} transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }} />
        <span className="absolute left-1/2 top-[31%] h-32 w-px -translate-x-1/2 bg-linear-to-b from-cyan-200/70 to-violet-300/25" />
        <span className="absolute left-1/2 top-[42%] h-px w-44 -translate-x-1/2 bg-linear-to-r from-transparent via-violet-200/50 to-transparent" />
      </div>}
      <button type="button" onClick={() => type === "video" && setPlaying((current) => !current)} className={`relative mb-5 inline-flex size-16 items-center justify-center rounded-full border border-violet-200/20 bg-[#11101a]/78 text-violet-100 shadow-[0_0_35px_rgba(139,92,246,0.22)] backdrop-blur-md ${type === "video" ? "cursor-pointer transition hover:scale-105" : "cursor-default"}`} aria-label={type === "video" ? (playing ? `Pause ${title} preview` : `Play ${title} preview`) : undefined}>
        {type === "video" && playing ? <Pause size={25} fill="currentColor" /> : <Icon size={25} fill={type === "video" ? "currentColor" : "none"} />}
      </button>
      <p className="text-[10px] font-semibold tracking-[0.26em] text-violet-200">{type.toUpperCase()} PLACEHOLDER</p>
      <p className="mt-3 max-w-md text-sm leading-6 text-white/80">{title} is ready for your final {type} asset.{type === "video" ? " The preview control demonstrates the future player interaction." : ""}</p>
      {type === "video" && <div className="relative mt-6 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-white/8"><motion.span className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-violet-500 to-cyan-300" initial={false} animate={{ width: playing ? ["0%", "100%"] : "0%" }} transition={{ duration: 5, repeat: playing ? Infinity : 0, ease: "linear" }} /></div>}
    </div>
  );
}

function Mp4Player({ src, title, autoPlay = false, poster }: { src: string; title: string; autoPlay?: boolean; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    if (autoPlay) {
      video.muted = true;
      void video.play().catch(() => undefined);
    }
  }, [autoPlay, src]);

  return <div className="relative h-full w-full bg-black">
    <video ref={videoRef} controls playsInline preload="auto" autoPlay={autoPlay} muted={autoPlay} loop={autoPlay} poster={poster ? withBasePath(poster) : undefined} onCanPlay={(event) => { if (autoPlay) void event.currentTarget.play().catch(() => undefined); }} className="h-full w-full object-contain" aria-label={`Play ${title} MP4 video`}>
      <source src={withBasePath(src)} type="video/mp4" />
      Your browser does not support MP4 video playback.
    </video>
    <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[9px] font-semibold tracking-[0.16em] text-white/85 backdrop-blur-md">MP4 PLAYER · MEDIA OUTPUT</span>
  </div>;
}

function AudioPlayer({ src, title, poster }: { src: string; title: string; poster?: string }) {
  return <div className="relative flex h-full w-full items-end overflow-hidden bg-[#08090d] p-5 sm:p-8">
    {poster ? <Image src={withBasePath(poster)} alt="" fill sizes="(max-width: 768px) 100vw, 1100px" className="object-cover opacity-55" /> : null}
    <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/10" />
    <div className="relative z-10 w-full rounded-2xl border border-white/15 bg-black/65 p-4 backdrop-blur-xl sm:p-5">
      <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-100">Final Audio Output</p>
      <audio controls preload="metadata" className="w-full" aria-label={`Play ${title} audio`}>
        <source src={withBasePath(src)} type="audio/mpeg" />
        Your browser does not support MP3 audio playback.
      </audio>
    </div>
  </div>;
}

function NeomorphicMusicPlayer({ track }: { track: NonNullable<VisualArtProject["backgroundAudio"]> }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [levelDb, setLevelDb] = useState(-60);
  const [beatLevel, setBeatLevel] = useState(0);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (!audioContextRef.current) {
        const context = new AudioContext();
        const analyser = context.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.78;
        const source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        audioContextRef.current = context;
        analyserRef.current = analyser;
        sourceRef.current = source;
      }
      if (audioContextRef.current.state === "suspended") await audioContextRef.current.resume();
      await audio.play();
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const analyser = analyserRef.current;
    const frequencyData = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let lastMeterUpdate = 0;

    const draw = (time: number) => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(bounds.width * pixelRatio));
      const height = Math.max(1, Math.floor(bounds.height * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.clearRect(0, 0, width, height);
      if (analyser && frequencyData && isPlaying) analyser.getByteFrequencyData(frequencyData);

      const bars = 48;
      const gap = 3 * pixelRatio;
      const barWidth = Math.max(2 * pixelRatio, (width - gap * (bars - 1)) / bars);
      const gradient = context.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, "#7c3aed");
      gradient.addColorStop(0.55, "#a78bfa");
      gradient.addColorStop(1, "#67e8f9");
      context.fillStyle = gradient;

      let total = 0;
      let bass = 0;
      for (let index = 0; index < bars; index += 1) {
        const value = frequencyData && isPlaying ? frequencyData[Math.min(index, frequencyData.length - 1)] : 18 + Math.sin(index * 0.8) * 8;
        total += value;
        if (index < 8) bass += value;
        const normalized = Math.max(0.08, value / 255);
        const barHeight = normalized * height;
        const x = index * (barWidth + gap);
        context.globalAlpha = isPlaying ? 0.62 + normalized * 0.38 : 0.2;
        context.beginPath();
        context.roundRect(x, (height - barHeight) / 2, barWidth, barHeight, barWidth / 2);
        context.fill();
      }
      context.globalAlpha = 1;

      if (isPlaying && time - lastMeterUpdate > 90) {
        const average = total / bars;
        const decibels = Math.max(-60, 20 * Math.log10(Math.max(1, average) / 255));
        setLevelDb(Math.round(decibels));
        setBeatLevel(Math.min(1, bass / (8 * 190)));
        lastMeterUpdate = time;
      }
      if (isPlaying) animationFrameRef.current = window.requestAnimationFrame(draw);
    };

    draw(performance.now());
    return () => {
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };
  }, [isPlaying]);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    sourceRef.current?.disconnect();
    analyserRef.current?.disconnect();
    void audioContextRef.current?.close();
  }, []);

  const progress = duration ? Math.min(100, (currentTime / duration) * 100) : 0;

  return <section className="relative isolate w-full overflow-hidden rounded-[1.65rem] border border-white/22 bg-[#080b13] p-2 shadow-[0_22px_65px_rgba(0,0,0,0.7),0_0_30px_rgba(139,92,246,0.13),inset_0_1px_0_rgba(255,255,255,0.16)]" aria-label={`${track.title} background music player`}>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(5,8,15,0.98)_8%,rgba(10,13,24,0.88)_48%,rgba(5,8,15,0.96)_100%)]" />
    {track.backgroundImage ? <Image src={withBasePath(track.backgroundImage)} alt="" fill sizes="(max-width: 768px) 100vw, 1400px" className="pointer-events-none -z-10 object-cover opacity-10" /> : null}
    <div className="rounded-[1.3rem] border border-white/12 bg-[#111521]/82 px-4 py-5 shadow-[inset_7px_7px_18px_rgba(0,0,0,0.48),inset_-4px_-4px_14px_rgba(255,255,255,0.035)] backdrop-blur-md sm:px-6">
      <div className="grid items-center gap-4 sm:grid-cols-[5.5rem_minmax(0,1fr)_4rem] sm:gap-6">
        <audio
          ref={audioRef}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onDurationChange={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        >
          <source src={withBasePath(track.src)} type="audio/mpeg" />
          Your browser does not support MP3 audio playback.
        </audio>

        <div className="relative size-22 overflow-hidden rounded-2xl border border-white/18 bg-black/40 shadow-[9px_9px_20px_rgba(0,0,0,0.55),-3px_-3px_10px_rgba(255,255,255,0.05)]">
          {track.cover ? <Image src={withBasePath(track.cover)} alt="" fill sizes="88px" className="object-cover" /> : <Music className="absolute inset-0 m-auto text-violet-200" size={28} />}
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-violet-300">{isPlaying ? "Now Playing" : "Ready to Play"} · Background Music</p>
          <h3 className="mt-1 truncate text-xl font-bold tracking-[-0.025em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{track.title}</h3>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/72">{track.subtitle}</p>
          <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3" aria-label="Live frequency spectrum and decibel meter">
            <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-cyan-200/80">60 Hz</span>
            <canvas ref={canvasRef} className="h-11 w-full" aria-hidden="true" />
            <div className="min-w-12 text-right"><p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">Level</p><p className="text-[10px] font-bold tabular-nums text-cyan-100">{levelDb} dB</p></div>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="w-9 text-right text-[9px] font-semibold tabular-nums text-white/65">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                if (audioRef.current) audioRef.current.currentTime = nextTime;
                setCurrentTime(nextTime);
              }}
              aria-label={`Seek ${track.title}`}
              style={{ background: `linear-gradient(90deg, #8b5cf6 0%, #a78bfa ${progress}%, rgba(255,255,255,0.16) ${progress}%, rgba(255,255,255,0.16) 100%)` }}
              className="h-2 min-w-0 flex-1 cursor-pointer appearance-none rounded-full accent-violet-400 shadow-[inset_3px_3px_7px_rgba(0,0,0,0.65),inset_-1px_-1px_3px_rgba(255,255,255,0.08)]"
            />
            <span className="w-9 text-[9px] font-semibold tabular-nums text-white/65">{formatTime(duration)}</span>
          </div>
        </div>

        <button type="button" onClick={() => void togglePlayback()} aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`} style={{ transform: isPlaying ? `scale(${1 + beatLevel * 0.07})` : undefined, boxShadow: isPlaying ? `0 0 ${20 + beatLevel * 28}px rgba(139,92,246,${0.28 + beatLevel * 0.35}), 8px 8px 18px rgba(0,0,0,0.62), -3px -3px 10px rgba(255,255,255,0.06)` : undefined }} className="mx-auto inline-flex size-16 items-center justify-center rounded-full border border-white/16 bg-linear-to-br from-[#262c3a] to-[#0b0e16] text-white shadow-[8px_8px_18px_rgba(0,0,0,0.62),-3px_-3px_10px_rgba(255,255,255,0.06)] transition-[transform,box-shadow] duration-75 active:translate-y-px active:shadow-[inset_5px_5px_11px_rgba(0,0,0,0.7),inset_-3px_-3px_8px_rgba(255,255,255,0.05)] sm:mx-0">
          {isPlaying ? <Pause size={21} fill="currentColor" /> : <Play size={21} fill="currentColor" className="translate-x-0.5" />}
        </button>

        <div className="flex items-center gap-2 sm:col-start-2">
          <Volume2 size={14} className={isPlaying ? "text-cyan-200" : "text-white/45"} />
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/58">Live Hz spectrum · Beat response · Music continues during slideshow</span>
        </div>
      </div>
    </div>
  </section>;
}

export function PortfolioProjectModal({ project, onClose, categoryTitle = "Explore My Works" }: { project: VisualArtProject; onClose: () => void; categoryTitle?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);
  const active = project.items[activeIndex];
  const activeSources = active.sources?.length ? active.sources : active.src ? [active.src] : [];
  const activeSrc = activeSources[activeMediaIndex] ?? activeSources[0];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!isSlideshowPlaying || active.mediaType !== "image") return;

    const timer = window.setInterval(() => {
      if (activeSources.length > 1) {
        setActiveMediaIndex((current) => (current + 1) % activeSources.length);
      } else {
        setActiveIndex((current) => (current + 1) % project.items.length);
        setActiveMediaIndex(0);
      }
    }, 2000);

    return () => window.clearInterval(timer);
  }, [active.id, active.mediaType, activeSources.length, isSlideshowPlaying, project.items.length]);

  const move = (direction: -1 | 1) => {
    if (activeSources.length > 1) {
      setActiveMediaIndex((current) => (current + direction + activeSources.length) % activeSources.length);
      return;
    }
    setActiveIndex((current) => (current + direction + project.items.length) % project.items.length);
    setActiveMediaIndex(0);
  };

  return createPortal(
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="visual-art-dialog-title"
        data-project={project.id}
        className="portfolio-slide-screen showcase-screen fixed inset-0 z-[120] overflow-y-auto bg-[#0b0d12] text-white shadow-[0_-30px_100px_rgba(0,0,0,0.8)]"
        style={{ backgroundColor: "#0b0d12" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 z-20 border-b border-white/12 bg-black/72 px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-8">
          <div className="mx-auto max-w-375">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-violet-100">EXPLORE MY WORKS <span className="px-2 text-white/45">/</span> {categoryTitle} <span className="px-2 text-white/45">/</span> {project.title}</p>
              <h2 id="visual-art-dialog-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{project.title}</h2>
            </div>
            <button type="button" onClick={onClose} aria-label="Slide down and return to projects" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-2.5 text-[9px] font-semibold tracking-[0.14em] text-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition hover:border-violet-200/40 hover:bg-white/10 hover:text-white">
              <ChevronDown size={17} /> <span className="hidden sm:inline">BACK TO PROJECTS</span>
            </button>
          </div>

          <div role="tablist" aria-label={`${project.title} media`} className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {project.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                onClick={() => { setActiveIndex(index); setActiveMediaIndex(0); }}
                className={`shrink-0 rounded-full border px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${activeIndex === index ? "border-violet-300/70 bg-violet-400/22 text-white shadow-[0_0_24px_rgba(139,92,246,0.2)]" : "border-white/15 bg-white/5 text-white/75 hover:border-white/35 hover:bg-white/9 hover:text-white"}`}
              >
                {item.tab}
              </button>
            ))}
          </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-375 p-4 pb-16 sm:p-8 sm:pb-20 lg:px-14">
          {project.backgroundAudio ? <div className="mb-8"><NeomorphicMusicPlayer track={project.backgroundAudio} /></div> : null}
          <div className="mb-8 grid gap-5 border-b border-white/8 pb-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-violet-100">PROJECT OVERVIEW</p><p className="mt-4 max-w-4xl text-base leading-8 text-white/90">{project.description}</p></div>
            <aside className="work-detail-tools-card rounded-2xl border-white/15 bg-white/7 p-5 backdrop-blur-xl"><p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65">Portfolio format</p><p className="mt-3 text-sm leading-6 text-white/90">Premium full-screen case study with tabbed media, gallery navigation, project details and an output-ready player.</p></aside>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.25 }}>
              {active.mediaType === "image" && activeSources.length > 1 && <div className="mb-4 flex items-center gap-3">
                <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 py-1">
                  {activeSources.map((src, index) => <button key={src} type="button" onClick={() => setActiveMediaIndex(index)} aria-label={`View ${active.title} image ${index + 1}`} className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border bg-black transition ${activeMediaIndex === index ? "border-violet-300/70 shadow-[0_0_20px_rgba(139,92,246,0.2)]" : "border-white/10 opacity-60 hover:opacity-100"}`}><Image src={withBasePath(src)} alt="" fill sizes="96px" className="object-cover" /></button>)}
                </div>
                <button type="button" onClick={() => setIsSlideshowPlaying((playing) => !playing)} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-violet-300/30 bg-violet-500/12 px-3.5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-violet-100 transition hover:border-violet-200/65 hover:bg-violet-500/20" aria-pressed={isSlideshowPlaying}>
                  {isSlideshowPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />} {isSlideshowPlaying ? "Pause" : "Auto play"}
                </button>
              </div>}

              <div className="relative aspect-video w-full overflow-hidden rounded-[1.45rem] border border-white/10 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                {activeSrc && active.mediaType === "image" ? (
                  <Image src={withBasePath(activeSrc)} alt={`${active.title} ${activeMediaIndex + 1}`} fill sizes="(max-width: 768px) 100vw, 1100px" className="object-contain" priority />
                ) : activeSrc && active.mediaType === "video" ? (
                  <Mp4Player src={activeSrc} title={active.title} autoPlay={active.autoPlay} poster={active.poster} />
                ) : activeSrc && active.mediaType === "audio" ? (
                  <AudioPlayer src={activeSrc} title={active.title} poster={active.poster} />
                ) : (
                  <MediaPlaceholder type={active.mediaType} title={active.title} />
                )}

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
              </div>

              {active.supportingImages?.length ? <section className="mt-6" aria-label="Architectural walkthrough rendered frames">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-violet-100">Rendered Frames & Floor Plans</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {active.supportingImages.map((src, index) => <figure key={src} className="overflow-hidden rounded-xl border border-white/10 bg-black/35"><div className="relative aspect-4/3"><Image src={withBasePath(src)} alt={`${active.title} supporting architectural frame ${index + 1}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover" /></div></figure>)}
                </div>
              </section> : null}

              {active.comparison && <section className="mt-8 border-t border-white/10 pt-8" aria-label="Interior design before and after">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div><p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-violet-100">BEFORE / AFTER</p><h4 className="mt-2 text-lg font-semibold text-white">{active.comparison.title ?? "Raw space to rendered interior"}</h4></div>
                  <p className="text-right text-[9px] uppercase tracking-[0.16em] text-white/45">{active.comparison.detail ?? "Same viewpoint"}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <figure className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    <div className="relative aspect-square"><Image src={withBasePath(active.comparison.before)} alt={`${active.comparison.beforeLabel ?? "Raw"} before image`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
                    <figcaption className="border-t border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">{active.comparison.beforeLabel ?? "Raw / Before"}</figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-2xl border border-violet-300/25 bg-black/30 shadow-[0_0_28px_rgba(139,92,246,0.12)]">
                    <div className="relative aspect-square"><Image src={withBasePath(active.comparison.after)} alt={`${active.comparison.afterLabel ?? "Rendered"} after image`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
                    <figcaption className="border-t border-violet-300/20 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-100">{active.comparison.afterLabel ?? "Rendered / After"}</figcaption>
                  </figure>
                </div>
              </section>}

              <div className="grid gap-7 px-2 py-7 sm:px-4 lg:grid-cols-[1fr_18rem]">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-violet-100">{active.tab}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{active.title}</h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/88 sm:text-base">{active.description}</p>
                  {active.action && <a href={active.action.href} className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-300/35 bg-violet-500/15 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-100 transition hover:border-violet-200/70 hover:bg-violet-500/25">{active.action.label} <ArrowUpRight size={14} /></a>}
                </div>
                <aside className="portfolio-slide-detail-card rounded-2xl border border-white/15 bg-white/7 p-5 backdrop-blur-xl">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65">Medium</p>
                  <p className="mt-2 text-sm text-white">{active.medium}</p>
                  <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65">Details</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.tools.map((tool) => <span key={tool} className="rounded-full border border-white/16 bg-black/35 px-3 py-1.5 text-[9px] text-white/90">{tool}</span>)}
                  </div>
                </aside>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button type="button" onClick={() => move(-1)} aria-label="Previous media" className="fixed left-3 top-1/2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-violet-200/65 hover:bg-violet-500/45 sm:left-6 sm:size-12"><ChevronLeft size={22} /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next media" className="fixed right-3 top-1/2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-violet-200/65 hover:bg-violet-500/45 sm:right-6 sm:size-12"><ChevronRight size={22} /></button>
      </motion.section>,
    document.body,
  );
}

export function VisualArtGallery() {
  const [selectedProject, setSelectedProject] = useState<VisualArtProject | null>(null);

  useEffect(() => {
    const projectId = new URLSearchParams(window.location.search).get("project");
    if (!projectId) return;
    const linkedProject = visualArtProjects.find((project) => project.id === projectId);
    if (!linkedProject) return;
    const frame = window.requestAnimationFrame(() => setSelectedProject(linkedProject));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <main className="grid gap-6 pt-10 md:grid-cols-2 xl:grid-cols-3">
        {visualArtProjects.map((project, index) => (
          <article key={project.id} className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0F1620]/78 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:border-violet-300/30">
            <button type="button" onClick={() => setSelectedProject(project)} className="block w-full text-left" aria-label={`Open ${project.title} gallery`}>
              <div className="relative aspect-16/10 overflow-hidden rounded-[1.25rem] border border-white/8 bg-[#090b11]">
                {project.cover ? (
                  <Image src={withBasePath(project.cover)} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                ) : (
                  <div className="flex h-full min-h-56 items-center justify-center bg-[radial-gradient(circle_at_68%_28%,rgba(167,139,250,0.22),transparent_27%),linear-gradient(145deg,#171421,#090b11)]">
                    <Sparkles className="text-violet-200/65" size={34} strokeWidth={1.4} />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/74 via-transparent to-white/4" />
                <span className="absolute left-4 top-4 text-[9px] font-semibold tracking-[0.22em] text-white/75">0{index + 1}</span>
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-[9px] font-semibold tracking-[0.15em] text-white backdrop-blur-md">
                  OPEN VIEWER <Expand size={13} />
                </span>
              </div>

              <div className="px-1 pb-2 pt-5">
                <p className="text-[9px] font-semibold uppercase leading-5 tracking-[0.17em] text-violet-200/80">{project.type}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{project.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#A7AFBF]">{project.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-violet-100">EXPLORE COLLECTION <ArrowIcon /></span>
              </div>
            </button>
          </article>
        ))}
      </main>

      <AnimatePresence>{selectedProject && <PortfolioProjectModal project={selectedProject} categoryTitle="Design & Architecture" onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </>
  );
}

function ArrowIcon() {
  return <ChevronRight size={14} aria-hidden="true" />;
}
