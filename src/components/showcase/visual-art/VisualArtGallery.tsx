"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, ImageIcon, Play, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { visualArtProjects, type VisualArtProject } from "@/data/visual-art-gallery";

function MediaPlaceholder({ type, title }: { type: "image" | "video"; title: string }) {
  const Icon = type === "video" ? Play : ImageIcon;

  return (
    <div className="flex h-full min-h-72 w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(139,92,246,0.2),transparent_32%),linear-gradient(135deg,#151321,#090b11)] px-6 text-center sm:min-h-96">
      <span className="mb-5 inline-flex size-16 items-center justify-center rounded-full border border-violet-200/20 bg-white/5 text-violet-100 shadow-[0_0_35px_rgba(139,92,246,0.22)]">
        <Icon size={25} />
      </span>
      <p className="text-[10px] font-semibold tracking-[0.26em] text-violet-200">{type.toUpperCase()} PLACEHOLDER</p>
      <p className="mt-3 max-w-md text-sm leading-6 text-white/50">{title} is ready for your final {type} asset.</p>
    </div>
  );
}

export function PortfolioProjectModal({ project, onClose }: { project: VisualArtProject; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = project.items[activeIndex];

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

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + project.items.length) % project.items.length);
  };

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#05050a]/82 p-3 backdrop-blur-xl sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="visual-art-dialog-title"
        className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-4xl border border-white/14 bg-[#0c0d14]/95 shadow-[0_35px_120px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]"
        initial={{ opacity: 0, y: 24, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 z-20 border-b border-white/8 bg-[#0c0d14]/90 px-5 py-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-violet-200">Visual Art Collection</p>
              <h2 id="visual-art-dialog-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{project.title}</h2>
            </div>
            <button type="button" onClick={onClose} aria-label="Close gallery" className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/70 transition hover:border-violet-200/40 hover:bg-white/10 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div role="tablist" aria-label={`${project.title} media`} className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {project.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${activeIndex === index ? "border-violet-300/60 bg-violet-400/18 text-white shadow-[0_0_24px_rgba(139,92,246,0.16)]" : "border-white/10 bg-white/3 text-white/48 hover:border-white/25 hover:text-white/80"}`}
              >
                {item.tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.25 }}>
              <div className="relative aspect-video w-full overflow-hidden rounded-[1.45rem] border border-white/10 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                {active.src && active.mediaType === "image" ? (
                  <Image src={active.src} alt={active.title} fill sizes="(max-width: 768px) 100vw, 1100px" className="object-contain" priority />
                ) : active.src && active.mediaType === "video" ? (
                  <video src={active.src} controls playsInline className="h-full w-full object-contain">Your browser does not support this video.</video>
                ) : (
                  <MediaPlaceholder type={active.mediaType} title={active.title} />
                )}

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button type="button" onClick={() => move(-1)} aria-label="Previous media" className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:bg-violet-500/45"><ChevronLeft size={18} /></button>
                  <button type="button" onClick={() => move(1)} aria-label="Next media" className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:bg-violet-500/45"><ChevronRight size={18} /></button>
                </div>
              </div>

              <div className="grid gap-7 px-2 py-7 sm:px-4 lg:grid-cols-[1fr_18rem]">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-violet-200">{active.tab}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{active.title}</h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#A7AFBF] sm:text-base">{active.description}</p>
                </div>
                <aside className="rounded-2xl border border-white/8 bg-white/3 p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/42">Medium</p>
                  <p className="mt-2 text-sm text-white/80">{active.medium}</p>
                  <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/42">Details</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[9px] text-white/65">{tool}</span>)}
                  </div>
                </aside>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>
    </motion.div>
  );
}

export function VisualArtGallery() {
  const [selectedProject, setSelectedProject] = useState<VisualArtProject | null>(null);

  return (
    <>
      <main className="grid gap-6 pt-10 md:grid-cols-2 xl:grid-cols-3">
        {visualArtProjects.map((project, index) => (
          <article key={project.id} className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0F1620]/78 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:border-violet-300/30">
            <button type="button" onClick={() => setSelectedProject(project)} className="block w-full text-left" aria-label={`Open ${project.title} gallery`}>
              <div className="relative aspect-16/10 overflow-hidden rounded-[1.25rem] border border-white/8 bg-[#090b11]">
                {project.cover ? (
                  <Image src={project.cover} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
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

      <AnimatePresence>{selectedProject && <PortfolioProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </>
  );
}

function ArrowIcon() {
  return <ChevronRight size={14} aria-hidden="true" />;
}
