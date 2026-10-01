"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Auto3DSlideshowProps = {
  images: string[];
  title: string;
  resolveSrc?: (src: string) => string;
};

const transition = {
  duration: 0.9,
  ease: [0.65, 0, 0.35, 1] as const,
};

export function Auto3DSlideshow({ images, title, resolveSrc = (src) => src }: Auto3DSlideshowProps) {
  const uniqueImages = useMemo(() => [...new Set(images)], [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isPlaying || uniqueImages.length < 2 || reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % uniqueImages.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [isPlaying, reduceMotion, uniqueImages.length]);

  if (!uniqueImages.length) return null;

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + uniqueImages.length) % uniqueImages.length);
  };

  const visibleSlides = uniqueImages
    .map((src, index) => {
      let offset = (index - activeIndex + uniqueImages.length) % uniqueImages.length;
      if (offset > uniqueImages.length / 2) offset -= uniqueImages.length;
      return { src, index, offset };
    })
    .filter(({ offset }) => Math.abs(offset) <= 1);

  return (
    <section className="mt-7 border-t border-white/10 pt-7" aria-label={`${title} automated rendered-frame slideshow`}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-violet-100">Automated 3D Slideshow</p>
          <p className="mt-1 text-xs text-white/50">Rendered frame {activeIndex + 1} of {uniqueImages.length}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-pressed={isPlaying}
          className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-500/12 px-3.5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-violet-100 transition hover:border-violet-200/65 hover:bg-violet-500/20"
        >
          {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
          {isPlaying ? "Pause" : "Auto play"}
        </button>
      </div>

      <motion.div
        className="portfolio-3d-stage relative h-[18rem] cursor-grab overflow-hidden rounded-[1.5rem] border border-white/16 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.2),transparent_48%),rgba(7,8,18,0.78)] active:cursor-grabbing sm:h-[28rem]"
        style={{ perspective: "1200px", touchAction: "pan-y" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) < 55 && Math.abs(info.velocity.x) < 350) return;
          move(info.offset.x < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence initial={false}>
          {visibleSlides.map(({ src, index, offset }) => {
            const isActive = offset === 0;
            return (
              <motion.button
                key={src}
                type="button"
                aria-label={`Show ${title} rendered frame ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                onContextMenu={(event) => event.preventDefault()}
                initial={{ opacity: 0, scale: 0.68, rotateY: offset < 0 ? 48 : -48 }}
                animate={{
                  x: `${offset * 53}%`,
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.76,
                  rotateY: reduceMotion ? 0 : offset * -38,
                  z: isActive ? 0 : -160,
                }}
                exit={{ opacity: 0, scale: 0.62, rotateY: offset < 0 ? -52 : 52 }}
                transition={reduceMotion ? { duration: 0.15 } : transition}
                className={`absolute inset-y-[8%] left-[13%] w-[74%] overflow-hidden rounded-2xl border bg-black shadow-2xl sm:left-[18%] sm:w-[64%] ${isActive ? "z-20 border-violet-200/35" : "z-10 border-white/10"}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image src={resolveSrc(src)} alt={`${title} rendered architectural frame ${index + 1}`} fill sizes="(max-width: 640px) 74vw, 64vw" className="pointer-events-none select-none object-cover" priority={isActive} draggable={false} />
                <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/38 via-transparent to-white/5" />
              </motion.button>
            );
          })}
        </AnimatePresence>
        <p className="pointer-events-none absolute inset-x-0 bottom-3 z-30 text-center text-[8px] font-semibold uppercase tracking-[0.2em] text-white/42">Drag or swipe to explore</p>
      </motion.div>

      <div className="mt-7">
        <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-violet-100">Rendered Frames & Floor Plans</p>
        <div className="portfolio-gallery-rail flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl border border-white/14 bg-black/18 p-3 pb-4">
          {uniqueImages.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${title} gallery image ${index + 1}`}
              onContextMenu={(event) => event.preventDefault()}
              className={`group w-44 shrink-0 snap-center overflow-hidden rounded-xl border bg-black/35 text-left transition sm:w-56 ${activeIndex === index ? "border-violet-300/70 shadow-[0_0_24px_rgba(139,92,246,0.24),inset_0_0_12px_rgba(139,92,246,0.16)]" : "border-white/10 hover:border-white/30"}`}
            >
              <span className="relative block aspect-4/3 overflow-hidden">
                <Image src={resolveSrc(src)} alt={`${title} supporting architectural frame ${index + 1}`} fill sizes="(max-width: 640px) 176px, 224px" className="pointer-events-none select-none object-cover transition duration-500 group-hover:scale-[1.035]" draggable={false} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
