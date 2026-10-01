"use client";

import { useEffect, useRef } from "react";

type PingPongAmbientVideoProps = {
  src: string;
  title: string;
  poster?: string;
};

export function PingPongAmbientVideo({ src, title, poster }: PingPongAmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrame = 0;
    let lastFrameTime = 0;
    let reversing = false;
    let disposed = false;

    const playForward = () => {
      if (disposed) return;
      reversing = false;
      lastFrameTime = 0;
      video.playbackRate = 1;
      void video.play().catch(() => undefined);
    };

    const reverseFrame = (time: number) => {
      if (disposed || !reversing) return;
      if (!lastFrameTime) lastFrameTime = time;
      const elapsed = Math.min((time - lastFrameTime) / 1000, 0.05);
      lastFrameTime = time;
      const nextTime = Math.max(0, video.currentTime - elapsed);

      if (nextTime <= 0.025) {
        video.currentTime = 0;
        playForward();
        return;
      }

      video.currentTime = nextTime;
      animationFrame = window.requestAnimationFrame(reverseFrame);
    };

    const startReverse = () => {
      if (disposed || reversing) return;
      reversing = true;
      video.pause();
      if (Number.isFinite(video.duration)) {
        video.currentTime = Math.max(0, Math.min(video.currentTime, video.duration - 0.01));
      }
      lastFrameTime = 0;
      animationFrame = window.requestAnimationFrame(reverseFrame);
    };

    const handleTimeUpdate = () => {
      if (!reversing && Number.isFinite(video.duration) && video.duration - video.currentTime < 0.08) {
        startReverse();
      }
    };

    const handleCanPlay = () => {
      if (!reversing) void video.play().catch(() => undefined);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", startReverse);
    video.addEventListener("canplay", handleCanPlay);
    video.load();
    video.muted = true;
    void video.play().catch(() => undefined);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", startReverse);
      video.removeEventListener("canplay", handleCanPlay);
      video.pause();
    };
  }, [src]);

  return (
    <div className="helmet-orbit-stage relative grid h-full w-full place-items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-violet-500/18 blur-3xl" />
      <div className="helmet-orbit-screen relative h-[82%] w-[82%] overflow-hidden rounded-[1.6rem] border border-violet-200/24 bg-black/82">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-label={`${title} automatic rotating helmet preview`}
          className="pointer-events-none h-full w-full select-none object-contain"
          draggable={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onContextMenu={(event) => event.preventDefault()}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_24%,transparent_74%,rgba(139,92,246,0.08))]" />
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/12 bg-black/42 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/58 backdrop-blur-xl">Automatic helmet orbit</span>
      </div>
    </div>
  );
}
