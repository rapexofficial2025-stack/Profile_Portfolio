import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase, CalendarDays, Layers3, Sparkles } from "lucide-react";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { EcommerceUiPreview } from "@/components/showcase/EcommerceUiPreview";
import { getProjectBySlug, portfolioProjects } from "@/data/projects";

const ecommerceViews = ["marketplace", "merchant", "admin", "mobile", "workflow"] as const;

export const dynamicParams = false;
export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isEcommerceProject = project.id === "digital-ecommerce";

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_10%,rgba(124,58,237,0.12),transparent_28%),radial-gradient(ellipse_at_8%_90%,rgba(14,165,233,0.08),transparent_22%)]" />
      <div className="mx-auto max-w-375 px-6 pb-16 pt-12 sm:px-10 lg:px-14 xl:px-20">
        <Link href="/work" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/2 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white/70 transition hover:border-violet-300/35 hover:text-white"><ArrowLeft size={14} /> BACK TO WORK</Link>

        <header className="mt-8 border-b border-white/10 pb-10">
          <p className="text-[10px] font-semibold tracking-[0.28em] text-violet-200">{project.category}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tighter text-white sm:text-5xl lg:text-6xl">{project.title}</h1>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#D7DCE7]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5"><CalendarDays size={13} className="text-violet-300" /> {project.year}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5"><Briefcase size={13} className="text-sky-300" /> {project.role}</span>
          </div>
        </header>

        <main className="space-y-12 pt-10">
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)]">
            <div className="rounded-[1.8rem] border border-white/10 bg-[#0F1620]/75 p-6">
              <p className="text-[10px] font-semibold tracking-[0.26em] text-violet-200">PROJECT OVERVIEW</p>
              <p className="mt-5 text-base leading-8 text-[#D7DCE7]">{project.description}</p>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-[#0F1620]/75 p-6">
              <p className="text-[10px] font-semibold tracking-[0.26em] text-violet-200">TOOLS</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1.5 text-[11px] text-slate-200">{tool}</span>)}</div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.8rem] border border-white/10 bg-[#0F1620]/75 p-6">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">CHALLENGE</p>
              <p className="mt-4 text-base leading-8 text-[#A7AFBF]">{project.challenge}</p>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-[#0F1620]/75 p-6">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">OBJECTIVE</p>
              <p className="mt-4 text-base leading-8 text-[#A7AFBF]">{project.objective}</p>
            </div>
          </section>

          <section className="rounded-[1.8rem] border border-white/10 bg-[#0F1620]/75 p-6">
            <div className="mb-5 flex items-center gap-2"><Sparkles size={15} className="text-violet-300" /><p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">PROCESS</p></div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{project.process.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-white/2 p-4"><p className="text-[10px] font-semibold tracking-[0.18em] text-white/35">0{index + 1}</p><p className="mt-3 text-sm font-medium text-white">{step}</p></div>)}</div>
          </section>

          <section className="space-y-5">
            <div className="flex items-center gap-2"><Layers3 size={15} className="text-violet-300" /><p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">CREATIVE DEVELOPMENT</p></div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {project.images.map((image, index) => (
                <div key={`${project.id}-${index}`} className="space-y-3">
                  {isEcommerceProject ? <EcommerceUiPreview view={ecommerceViews[index] ?? "marketplace"} /> : <ImagePlaceholder title={image} subtitle="Project Media" />}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.8rem] border border-white/10 bg-[#0F1620]/75 p-6">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">FINAL OUTPUT</p>
            {isEcommerceProject ? <div className="mt-5"><EcommerceUiPreview view="final" /></div> : <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <ImagePlaceholder title="Final Presentation" subtitle="Large gallery" />
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/2 p-6 text-sm leading-7 text-[#A7AFBF]">The final output is built to be ready for image, video or motion asset upload without changing the overall structure. Each media slot is prepared for future replacement while keeping the portfolio polished and professional.</div>
            </div>}
          </section>

          <section className="flex items-center justify-between gap-4 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,0.14),rgba(14,165,233,0.08))] p-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">NEXT PROJECT</p>
              <p className="mt-2 text-xl font-semibold text-white">Continue to the next case study</p>
            </div>
            <Link href={`/work/${project.nextProject}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#070A0F] transition hover:-translate-y-0.5"><span>VIEW NEXT</span><ArrowRight size={14} /></Link>
          </section>
        </main>
      </div>
    </div>
  );
}
