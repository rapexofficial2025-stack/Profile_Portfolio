"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Code2, X } from "lucide-react";
import { asset } from "@/lib/asset";
import type { RawFileItem } from "@/data/web-showcase";
import { InvitationAutoLoop } from "@/components/showcase/InvitationAutoLoop";

/** Grid of raw-file assets and supporting CSS-made component studies. */
export function RawGallery({ items }: { items: RawFileItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback((step: number) => setOpen((index) => index === null ? null : (index + step + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowRight") move(1); if (event.key === "ArrowLeft") move(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, move]);

  const files = items.map((item) => typeof item === "string" ? { label: item, kind: "component" as const, description: "Raw file placeholder ready for its final source asset." } : item);

  return <>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {files.map((file, index) => <button key={file.label} type="button" onClick={() => setOpen(index)} className="showcase-raw-tile group relative overflow-hidden" aria-label={`View ${file.label}`}>
        {file.preview === "invitation-auto-loop" ? <InvitationAutoLoop /> : file.kind === "image" && file.src ? <div className="absolute inset-0"><Image src={asset(file.src)} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-100" /><span className="absolute inset-0 bg-linear-to-t from-[#0b0d18]/88 via-[#0b0d18]/12 to-transparent" /></div> : <CssRawTile index={index} />}
        <span className="relative z-10 mt-auto text-[10px] font-semibold uppercase tracking-[0.16em]">{file.label}</span>
        <span className="relative z-10 mt-1 text-[9px] uppercase tracking-[0.14em] opacity-65">{file.preview === "invitation-auto-loop" ? "TSX auto loop" : file.kind === "image" ? "Image asset" : "CSS component"} · RAW {String(index + 1).padStart(2, "0")}</span>
      </button>)}
    </div>
    {open !== null && createPortal(<div className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(4,3,12,0.82)] p-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={files[open].label} onClick={close}>
      <div className="showcase-viewer" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">
          <span>{files[open].label}</span>
          <span className="opacity-60">{open + 1} / {files.length}</span>
          <button type="button" onClick={close} aria-label="Close viewer" className="showcase-viewer-btn"><X size={16} /></button>
        </div>
        <div className="showcase-viewer-image relative">{files[open].preview === "invitation-auto-loop" ? <InvitationAutoLoop expanded /> : files[open].kind === "image" && files[open].src ? <Image src={asset(files[open].src)} alt={files[open].label} fill sizes="min(56rem, 100vw)" className="object-contain" /> : <CssRawTile index={open} expanded />}<div className="absolute inset-x-4 bottom-4 rounded-xl bg-black/65 p-3 text-center backdrop-blur-md"><p className="text-[10px] font-semibold uppercase tracking-[0.16em]">{files[open].preview === "invitation-auto-loop" ? "Automated TSX movement" : files[open].kind === "image" ? "Source image asset" : "CSS-made component"}</p><p className="mt-1 text-[10px] leading-5 text-white/70">{files[open].description}</p></div></div>
        <button type="button" onClick={() => move(-1)} aria-label="Previous file" className="showcase-viewer-btn absolute left-3 top-1/2 -translate-y-1/2"><ChevronLeft size={18} /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next file" className="showcase-viewer-btn absolute right-3 top-1/2 -translate-y-1/2"><ChevronRight size={18} /></button>
      </div>
    </div>, document.body)}
  </>;
}

function CssRawTile({ index, expanded = false }: { index: number; expanded?: boolean }) {
  return <div className={`absolute inset-0 grid place-items-center overflow-hidden ${expanded ? "bg-[#17142a]" : "bg-[#11152a]"}`}><span className="absolute size-[58%] rounded-[1rem] border border-violet-200/45 bg-[linear-gradient(135deg,rgba(255,255,255,.18),rgba(124,58,237,.12))] shadow-[0_14px_28px_rgba(0,0,0,.3)]" style={{ transform: `rotate(${index % 2 ? "-7deg" : "6deg"})` }} /><span className="absolute h-px w-[68%] bg-cyan-200/60" /><Code2 className="relative z-10 text-violet-100" size={expanded ? 42 : 22} /></div>;
}
