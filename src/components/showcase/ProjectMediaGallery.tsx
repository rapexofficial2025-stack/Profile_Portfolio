"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { PortfolioProjectMedia } from "@/data/projects";
import { asset } from "@/lib/asset";

export function ProjectMediaGallery({ items }: { items: PortfolioProjectMedia[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback((step: number) => setOpen((index) => index === null ? null : (index + step + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, move]);

  return <>
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => <figure key={item.src} className="work-media-card overflow-hidden rounded-[1.4rem]">
        <button type="button" onClick={() => setOpen(index)} className="group/media relative block aspect-16/10 w-full overflow-hidden bg-[#090b11] text-left" aria-label={`Open ${item.title}`}>
          <Image src={asset(item.src)} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover/media:scale-[1.025]" />
          <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-white/6" />
          <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/85 backdrop-blur-md"><Expand size={15} /></span>
        </button>
        <figcaption className="p-4">
          <p className="text-sm font-semibold text-white">{item.title}</p>
          <p className="mt-2 text-xs leading-5 text-[#A7AFBF]">{item.caption}</p>
        </figcaption>
      </figure>)}
    </div>

    {open !== null && createPortal(<div className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(3,4,9,0.9)] p-4 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-label={items[open].title} onClick={close}>
      <div className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#090b11] shadow-[0_30px_90px_rgba(0,0,0,0.65)]" onClick={(event) => event.stopPropagation()}>
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3 text-white">
          <div><p className="text-sm font-semibold">{items[open].title}</p><p className="mt-1 text-[10px] tracking-[0.14em] text-white/45">{open + 1} / {items.length}</p></div>
          <button type="button" onClick={close} aria-label="Close image viewer" className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"><X size={17} /></button>
        </header>
        <div className="relative min-h-0 flex-1 bg-black">
          <Image src={asset(items[open].src)} alt={items[open].title} fill sizes="100vw" className="object-contain" priority />
          <button type="button" onClick={() => move(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next image" className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"><ChevronRight size={20} /></button>
        </div>
        <p className="border-t border-white/10 px-5 py-3 text-xs leading-5 text-white/60">{items[open].caption}</p>
      </div>
    </div>, document.body)}
  </>;
}
