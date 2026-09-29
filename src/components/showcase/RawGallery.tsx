"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";

/** Grid of raw-file placeholders; clicking one opens a full-screen viewer with arrows / Esc. */
export function RawGallery({ items }: { items: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback((step: number) => setOpen((index) => index === null ? null : (index + step + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, move]);

  return <>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => <button key={item} type="button" onClick={() => setOpen(index)} className="showcase-raw-tile group" aria-label={`View ${item}`}>
        <ImageIcon size={20} className="opacity-60 transition group-hover:scale-110 group-hover:opacity-90" />
        <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em]">{item}</span>
        <span className="mt-1 text-[9px] uppercase tracking-[0.14em] opacity-50">Placeholder · RAW {String(index + 1).padStart(2, "0")}</span>
      </button>)}
    </div>
    {open !== null && createPortal(<div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(4,3,12,0.82)] p-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={items[open]} onClick={close}>
      <div className="showcase-viewer" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
          <span>{items[open]}</span>
          <span className="opacity-60">{open + 1} / {items.length}</span>
          <button type="button" onClick={close} aria-label="Close viewer" className="showcase-viewer-btn"><X size={16} /></button>
        </div>
        <div className="showcase-viewer-image"><ImageIcon size={42} className="opacity-40" /><p className="mt-4 text-xs uppercase tracking-[0.2em] opacity-60">Raw file placeholder</p><p className="mt-1 text-[10px] opacity-40">Drop the real file into /public/images/projects and point this slot at it</p></div>
        <button type="button" onClick={() => move(-1)} aria-label="Previous file" className="showcase-viewer-btn absolute left-3 top-1/2 -translate-y-1/2"><ChevronLeft size={18} /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next file" className="showcase-viewer-btn absolute right-3 top-1/2 -translate-y-1/2"><ChevronRight size={18} /></button>
      </div>
    </div>, document.body)}
  </>;
}
