"use client";

import { useState } from "react";
import { Layers3 } from "lucide-react";
import { PremiumVideoPlayer } from "@/components/showcase/PremiumVideoPlayer";
import { ProjectMediaGallery } from "@/components/showcase/ProjectMediaGallery";
import type { PortfolioProjectCollection } from "@/data/projects";

export function ProjectCollectionTabs({ collections, poster }: { collections: PortfolioProjectCollection[]; poster?: string }) {
  const [activeId, setActiveId] = useState(collections[0]?.id ?? "");
  const active = collections.find((collection) => collection.id === activeId) ?? collections[0];

  if (!active) return null;

  return (
    <div className="work-detail-glass-card overflow-hidden rounded-[1.8rem] p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Layers3 size={15} className="text-violet-300" />
        <p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">ARCHITECTURAL COLLECTION</p>
      </div>

      <div role="tablist" aria-label="Architecture project stages" className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {collections.map((collection) => (
          <button
            key={collection.id}
            type="button"
            role="tab"
            aria-selected={active.id === collection.id}
            onClick={() => setActiveId(collection.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${active.id === collection.id ? "border-violet-300/50 bg-[#090a0e] text-white shadow-[0_8px_18px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]" : "border-white/8 bg-black/15 text-white/55 hover:border-white/20 hover:text-white"}`}
          >
            {collection.tab}
          </button>
        ))}
      </div>

      <div className="mt-5 border-t border-white/8 pt-5">
        <p className="text-2xl font-semibold tracking-[-0.035em] text-white">{active.title}</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-[#A7AFBF]">{active.description}</p>
        <div className="mt-6">
          {active.video ? <PremiumVideoPlayer {...active.video} poster={poster} /> : active.media?.length ? <ProjectMediaGallery items={active.media} /> : null}
        </div>
      </div>
    </div>
  );
}
