"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, PencilLine, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { FrostProjectThumbnail } from "@/components/showcase/frost/FrostProjectThumbnail";
import { PortfolioProjectModal } from "@/components/showcase/visual-art/VisualArtGallery";
import type { PortfolioCategory } from "@/data/categories";
import { buildCategoryProject, isGalleryCategory } from "@/data/category-gallery";
import type { VisualArtProject } from "@/data/visual-art-gallery";

export function CategoryCollectionGallery({ category }: { category: PortfolioCategory }) {
  const [selectedProject, setSelectedProject] = useState<VisualArtProject | null>(null);
  const galleryProjects = useMemo(() => {
    if (!isGalleryCategory(category.id)) return [];
    const categoryId = category.id;
    return category.samples.map((sample, index) => buildCategoryProject(categoryId, sample, index));
  }, [category]);

  return (
    <>
      <main className="grid gap-6 pt-10 md:grid-cols-2 xl:grid-cols-3">
        {category.samples.map((sample, index) => {
          const detailHref = sample.slug ? `${category.href}/${sample.slug}` : null;
          const project = galleryProjects[index];

          return (
            <article key={sample.title} className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0F1620]/78 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:border-violet-300/30">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-200">0{index + 1}</p>
                <div className="flex items-center gap-2">
                  <button type="button" aria-label={`Add image to ${sample.title}`} className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/2 text-white/60 transition hover:border-white/25 hover:text-white"><Plus size={14} /></button>
                  <button type="button" aria-label={`Edit ${sample.title}`} className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/2 text-white/60 transition hover:border-white/25 hover:text-white"><PencilLine size={14} /></button>
                </div>
              </div>

              {detailHref ? (
                <Link href={detailHref} aria-label={`See ${sample.title}`} className="block transition duration-300 hover:scale-[1.015]">
                  {sample.slug === "frost-twin-wms" ? <FrostProjectThumbnail /> : <ImagePlaceholder title={sample.title} subtitle="Click to open the live mockup" />}
                </Link>
              ) : (
                <button type="button" onClick={() => setSelectedProject(project)} aria-label={`Open ${sample.title} collection`} className="block w-full text-left transition duration-300 hover:scale-[1.015]">
                  <ImagePlaceholder title={sample.title} subtitle={`${project?.items.length ?? 0} collection tabs`} />
                </button>
              )}

              <div className="mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/80">{sample.type}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{sample.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#A7AFBF]">{sample.description}</p>
                {detailHref ? (
                  <Link href={detailHref} className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-violet-100 transition hover:border-violet-200/60 hover:bg-violet-500/15">SEE PORTFOLIO <ArrowUpRight size={14} /></Link>
                ) : (
                  <button type="button" onClick={() => setSelectedProject(project)} className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-violet-100 transition hover:border-violet-200/60 hover:bg-violet-500/15">OPEN COLLECTION <ArrowUpRight size={14} /></button>
                )}
              </div>
            </article>
          );
        })}
      </main>

      <AnimatePresence>{selectedProject && <PortfolioProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </>
  );
}
