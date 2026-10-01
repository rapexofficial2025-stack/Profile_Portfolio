import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { PageContent } from "@/components/content/PageContent";
import { FrostProjectThumbnail } from "@/components/showcase/frost/FrostProjectThumbnail";
import { RapexDashThumbnail } from "@/components/showcase/rapex-dash/RapexDashPreview";
import { portfolioCategories } from "@/data/categories";
import { portfolioProjects } from "@/data/projects";
import { getWebShowcase } from "@/data/web-showcase";
import { asset } from "@/lib/asset";

const selectedWebSlugs = ["invitation-paper-engine", "frost-twin-wms", "rapex-dash"] as const;

const selectedWorks = [
  ...portfolioProjects.map((project) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    year: project.year,
    description: project.description,
    tools: project.tools,
    href: `/work/${project.slug}`,
    thumbnail: project.cover ? "image" as const : "placeholder" as const,
    cover: project.cover,
  })),
  ...selectedWebSlugs.flatMap((slug) => {
    const category = portfolioCategories.find((item) => item.samples.some((sample) => sample.slug === slug));
    const sample = category?.samples.find((item) => item.slug === slug);
    const showcase = getWebShowcase(slug);

    if (!category || !sample || !showcase) return [];

    return [{
      id: `showcase-${slug}`,
      title: sample.title,
      category: sample.type,
      year: slug === "frost-twin-wms" ? "2026" : "2025",
      description: sample.description,
      tools: showcase.stack,
      href: slug === "rapex-dash" ? "/work/rapex-dash" : `${category.href}/${slug}`,
      thumbnail: sample.cover ? "image" as const : slug === "frost-twin-wms" ? "frost" as const : slug === "rapex-dash" ? "rapex-dash" as const : "placeholder" as const,
      cover: sample.cover,
    }];
  }),
];

export default function WorkPage() {
  return <PageContent
    eyebrow="SELECTED TOP WORKS"
    title="Ten selected projects across design, motion, technology and visual communication."
    description="A curated selection from the full Explore My Works & Reference collections. Open any project to view its existing case study or interactive detail screen."
  >
    <div className="pt-10">
      <div className="grid gap-6 xl:grid-cols-2">
        {selectedWorks.map((project, index) => <article key={project.id} className="selected-work-card group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0F1620]/75 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-violet-300/25">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-200">{String(index + 1).padStart(2, "0")}</p>
            <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-medium tracking-[0.16em] text-white/55">{project.year}</div>
          </div>
          {project.thumbnail === "frost"
            ? <FrostProjectThumbnail />
            : project.thumbnail === "rapex-dash"
              ? <RapexDashThumbnail />
              : project.thumbnail === "image" && project.cover
                ? <Link href={project.href} aria-label={`Open ${project.title}`} className="selected-work-thumbnail group/cover relative block aspect-16/10 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#090b11]">
                    <Image src={asset(project.cover)} alt={`${project.title} project thumbnail`} fill sizes="(max-width: 1280px) 100vw, 50vw" className="object-cover transition duration-700 group-hover/cover:scale-[1.02]" />
                    <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-white/8" />
                  </Link>
              : <ImagePlaceholder title={project.title} subtitle={project.category} />}
          <div className="selected-work-copy mt-5">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white">{project.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#A7AFBF]">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tools.slice(0, 4).map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] text-slate-300">{tool}</span>)}
            </div>
            <Link href={project.href} className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-violet-100 transition hover:border-violet-200/60 hover:bg-violet-500/15">
              <span>VIEW CASE STUDY</span><ArrowUpRight size={14} />
            </Link>
          </div>
        </article>)}
      </div>

      <section className="mt-8 rounded-[1.8rem] border border-white/10 bg-[#0F1620]/78 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-200">MORE WEB PROJECTS</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">Continue exploring at PROGREX</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#A7AFBF]">Discover additional websites, software, product experiences and creative-technology work directly on PROGREX.</p>
        </div>
        <a href="https://www.progrex.cloud/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-violet-300/30 bg-violet-500/12 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-100 transition hover:border-violet-200/65 hover:bg-violet-500/20 sm:mt-0">
          GO TO PROGREX <ArrowUpRight size={15} />
        </a>
      </section>
    </div>
  </PageContent>;
}
