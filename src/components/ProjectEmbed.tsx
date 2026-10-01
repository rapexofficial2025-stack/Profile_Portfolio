"use client";

import { useRef, useState } from "react";
import { ExternalLink, Maximize2, Play } from "lucide-react";

type ProjectEmbedProps = {
  src: string;
  title: string;
  aspectRatio: string;
  minHeight: number;
  hint: string;
};

export function ProjectEmbed({ src, title, aspectRatio, minHeight, hint }: ProjectEmbedProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const activateGame = () => {
    setIsActive(true);
    window.requestAnimationFrame(() => frameRef.current?.focus());
  };

  const enterFullscreen = async () => {
    setIsActive(true);
    try {
      await wrapperRef.current?.requestFullscreen();
      frameRef.current?.focus();
    } catch {
      frameRef.current?.focus();
    }
  };

  return (
    <section className="overflow-hidden rounded-[1.8rem] border border-cyan-300/20 bg-[#050817] shadow-[0_28px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="flex flex-col gap-3 border-b border-white/10 bg-[#091126] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Playable Project</p>
          <p className="mt-1 text-sm font-semibold text-white">{title}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-2 text-[10px] font-semibold tracking-[0.1em] text-white/75 transition hover:border-cyan-300/45 hover:text-white">
            OPEN IN NEW TAB <ExternalLink size={13} />
          </a>
          <button type="button" onClick={enterFullscreen} className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-2 text-[10px] font-semibold tracking-[0.1em] text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-400/15">
            FULLSCREEN <Maximize2 size={13} />
          </button>
        </div>
      </div>

      <div ref={wrapperRef} className="relative w-full overflow-hidden bg-black" style={{ aspectRatio, minHeight }}>
        {!hasError ? (
          <iframe
            ref={frameRef}
            src={src}
            title={title}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            allow="fullscreen"
            allowFullScreen
            tabIndex={-1}
            onLoad={() => setHasLoaded(true)}
            onError={() => setHasError(true)}
            className="h-full w-full border-0 bg-black"
          />
        ) : (
          <div className="flex h-full min-h-120 flex-col items-center justify-center px-6 text-center">
            <p className="text-lg font-semibold text-white">The playable demo could not load here.</p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">Your browser or network may be blocking embedded content. You can still launch the complete game safely in a new tab.</p>
            <a href={src} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-xs font-bold text-white">OPEN RAPEX DASH <ExternalLink size={14} /></a>
          </div>
        )}

        {!hasError && !isActive && (
          <button type="button" onClick={activateGame} className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18),rgba(2,6,23,0.88)_68%)] px-6 text-center backdrop-blur-[2px]" aria-label={`Click to play ${title}`}>
            <span className="inline-flex size-16 items-center justify-center rounded-full border border-cyan-200/35 bg-cyan-500 text-white shadow-[0_0_45px_rgba(6,182,212,0.48)] transition hover:scale-105"><Play size={24} fill="currentColor" className="translate-x-0.5" /></span>
            <span className="mt-5 text-xl font-black tracking-[-0.03em] text-white">CLICK TO PLAY</span>
            <span className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{hint}</span>
            {!hasLoaded && <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-200/65">Loading game…</span>}
          </button>
        )}
      </div>
    </section>
  );
}
