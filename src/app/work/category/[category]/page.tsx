import Link from "next/link";
import { ArrowLeft, ArrowUpRight, PencilLine, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { ImagePlaceholder } from "@/components/content/ImagePlaceholder";
import { portfolioCategories } from "@/data/categories";

export const dynamicParams = false;
export function generateStaticParams() {
  return portfolioCategories.map((category) => ({ category: category.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params;
  const category = portfolioCategories.find((item) => item.id === categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_8%,rgba(124,58,237,0.13),transparent_30%),radial-gradient(ellipse_at_8%_92%,rgba(14,165,233,0.07),transparent_24%)]" />
      <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-12 sm:px-10 lg:px-14 xl:px-20">
        <Link href="/#explore" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white/70 transition hover:border-violet-300/35 hover:text-white">
          <ArrowLeft size={14} /> BACK TO MY WORK
        </Link>

        <header className="mt-8 border-b border-white/10 pb-10">
          <p className="text-[10px] font-semibold tracking-[0.28em] text-violet-200">EXPLORE MY WORK / {category.title}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">{category.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#A7AFBF]">{category.description}. Explore five editable sample portfolio directions prepared for your future images, descriptions and final case studies.</p>
        </header>

        <main className="grid gap-6 pt-10 md:grid-cols-2 xl:grid-cols-3">
          {category.samples.map((sample, index) => (
            <article key={sample.title} className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0F1620]/78 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-violet-300/30">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-200">0{index + 1}</p>
                <div className="flex items-center gap-2">
                  <button type="button" aria-label={`Add image to ${sample.title}`} className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition hover:border-white/25 hover:text-white"><Plus size={14} /></button>
                  <button type="button" aria-label={`Edit ${sample.title}`} className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition hover:border-white/25 hover:text-white"><PencilLine size={14} /></button>
                </div>
              </div>
              {sample.slug
                ? <Link href={`${category.href}/${sample.slug}`} aria-label={`See ${sample.title}`} className="block transition duration-300 hover:scale-[1.015]"><ImagePlaceholder title={sample.title} subtitle="Click to open the live mockup" /></Link>
                : <ImagePlaceholder title={sample.title} subtitle={sample.type} />}
              <div className="mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/80">{sample.type}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{sample.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#A7AFBF]">{sample.description}</p>
                {sample.slug
                  ? <Link href={`${category.href}/${sample.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-violet-100 transition hover:border-violet-200/60 hover:bg-violet-500/15">SEE PORTFOLIO <ArrowUpRight size={14} /></Link>
                  : <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-violet-100 transition hover:border-violet-200/60 hover:bg-violet-500/15">EDIT PORTFOLIO <ArrowUpRight size={14} /></button>}
              </div>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
}
