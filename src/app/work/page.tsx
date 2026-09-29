import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { PageContent } from "@/components/content/PageContent";
import { FrostProjectThumbnail } from "@/components/showcase/frost/FrostProjectThumbnail";
import { portfolioCategories } from "@/data/categories";
import { portfolioProjects } from "@/data/projects";
import { getWebShowcase } from "@/data/web-showcase";

const selectedWebSlugs = ["rapex-admin-saas", "invitation-paper-engine", "frost-twin-wms"] as const;
const webCategory = portfolioCategories.find((category) => category.id === "web-development");

const selectedWorks = [
  ...portfolioProjects.map((project) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    year: project.year,
    description: project.description,
    tools: project.tools,
    href: `/work/${project.slug}`,
    thumbnail: "placeholder" as const,
  })),
  ...selectedWebSlugs.flatMap((slug) => {
    const sample = webCategory?.samples.find((item) => item.slug === slug);
    const showcase = getWebShowcase(slug);

    if (!sample || !showcase) return [];

    return [{
      id: `showcase-${slug}`,
      title: sample.title,
      category: sample.type,
      year: slug === "frost-twin-wms" ? "2026" : "2025",
      description: sample.description,
      tools: showcase.stack,
      href: `/work/category/web-development/${slug}`,
      thumbnail: slug === "frost-twin-wms" ? "frost" as const : "placeholder" as const,
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
        {selectedWorks.map((project, index) => <article key={project.id} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0F1620]/75 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-violet-300/25">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-200">{String(index + 1).padStart(2, "0")}</p>
            <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-medium tracking-[0.16em] text-white/55">{project.year}</div>
          </div>
          {project.thumbnail === "frost"
            ? <FrostProjectThumbnail />
            : <ImagePlaceholder title={project.title} subtitle={project.category} />}
          <div className="mt-5">
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
    </div>
  </PageContent>;
}
