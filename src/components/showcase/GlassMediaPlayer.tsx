"use client";

import { Expand, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GlassMediaPlayerProps = {
  src: string;
  title: string;
  type: "audio" | "video";
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

export function GlassMediaPlayer({ src, title, type, poster, autoPlay = false, loop = false, className = "" }: GlassMediaPlayerProps) {
  const mediaRef = useRef<HTMLMediaElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    media.load();
    media.muted = autoPlay;
    setMuted(autoPlay);
    setCurrentTime(0);
    setDuration(0);
    if (autoPlay) void media.play().catch(() => setPlaying(false));
  }, [autoPlay, src]);

  const togglePlayback = async () => {
    const media = mediaRef.current;
    if (!media) return;
    if (media.paused) await media.play();
    else media.pause();
  };

  const toggleMute = () => {
    const media = mediaRef.current;
    if (!media) return;
    media.muted = !media.muted;
    setMuted(media.muted);
  };

  const seek = (value: number) => {
    const media = mediaRef.current;
    if (!media || !Number.isFinite(media.duration)) return;
    media.currentTime = value;
    setCurrentTime(value);
  };

  const mediaEvents = {
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onEnded: () => setPlaying(false),
    onLoadedMetadata: (event: React.SyntheticEvent<HTMLMediaElement>) => setDuration(event.currentTarget.duration),
    onTimeUpdate: (event: React.SyntheticEvent<HTMLMediaElement>) => setCurrentTime(event.currentTarget.currentTime),
  };

  return (
    <div ref={frameRef} className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      {type === "video" ? (
        <video ref={mediaRef as React.RefObject<HTMLVideoElement>} src={src} poster={poster} playsInline preload="metadata" loop={loop} muted={muted} className="h-full w-full object-contain" aria-label={`Play ${title}`} {...mediaEvents} />
      ) : (
        <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={src} preload="metadata" loop={loop} muted={muted} aria-label={`Play ${title}`} {...mediaEvents} />
      )}

      <div className={`absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 rounded-2xl border border-white/15 bg-black/48 p-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl sm:inset-x-5 sm:bottom-5 ${type === "audio" ? "top-1/2 bottom-auto -translate-y-1/2" : ""}`}>
        <button type="button" onClick={togglePlayback} aria-label={playing ? `Pause ${title}` : `Play ${title}`} className="grid size-9 shrink-0 place-items-center rounded-xl border border-violet-200/25 bg-violet-500/20 text-violet-100 shadow-[0_0_22px_rgba(139,92,246,0.2)] transition hover:bg-violet-500/30">
          {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="translate-x-px" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-white/85">{title}</p>
            <span className="shrink-0 text-[8px] tabular-nums text-white/50">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <input aria-label={`Seek ${title}`} type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} className="block h-1 w-full cursor-pointer accent-violet-400" />
        </div>
        <button type="button" onClick={toggleMute} aria-label={muted ? `Unmute ${title}` : `Mute ${title}`} className="grid size-8 shrink-0 place-items-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white">
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        {type === "video" ? <button type="button" onClick={() => frameRef.current?.requestFullscreen()} aria-label={`View ${title} fullscreen`} className="grid size-8 shrink-0 place-items-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"><Expand size={14} /></button> : null}
      </div>
    </div>
  );
}
