import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { portfolioCategories } from "@/data/categories";
import { getWebShowcase } from "@/data/web-showcase";
import { BeforeAfter } from "@/components/showcase/BeforeAfter";
import { DevicePreview } from "@/components/showcase/DevicePreview";
import { RawGallery } from "@/components/showcase/RawGallery";
import { asset } from "@/lib/asset";

export const dynamicParams = false;
export function generateStaticParams() {
  return portfolioCategories.flatMap((category) => category.samples.filter((sample) => sample.slug && getWebShowcase(sample.slug)).map((sample) => ({ category: category.id, sample: sample.slug as string })));
}

export default async function SampleDetailPage({ params }: { params: Promise<{ category: string; sample: string }> }) {
  const { category: categoryId, sample: sampleSlug } = await params;
  const category = portfolioCategories.find((item) => item.id === categoryId);
  const linked = category?.samples.filter((item) => item.slug) ?? [];
  const index = linked.findIndex((item) => item.slug === sampleSlug);
  const sample = linked[index];
  const showcase = sample?.slug ? getWebShowcase(sample.slug) : undefined;
  if (!category || !sample || !showcase) notFound();

  const previous = linked[(index - 1 + linked.length) % linked.length];
  const next = linked[(index + 1) % linked.length];
  const sectionTitle = "text-[10px] font-semibold tracking-[0.28em] text-violet-200";

  return <div className="relative min-h-screen overflow-x-clip">
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_8%,rgba(124,58,237,0.13),transparent_30%),radial-gradient(ellipse_at_8%_92%,rgba(14,165,233,0.07),transparent_24%)]" />
    <div className="mx-auto max-w-375 px-6 pb-16 pt-12 sm:px-10 lg:px-14 xl:px-20">
      <Link href={category.href} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/2 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white/70 transition hover:border-violet-300/35 hover:text-white"><ArrowLeft size={14} /> BACK TO {category.title.toUpperCase()}</Link>

      <header className="mt-8 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(16rem,0.7fr)]">
        <div>
          <p className={sectionTitle}>{category.title.toUpperCase()} / 0{index + 1} · {sample.type.toUpperCase()}</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tighter text-white sm:text-5xl">{sample.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#A7AFBF]">{showcase.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">{showcase.stack.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-white/75">{tool}</span>)}</div>
          {showcase.mock === "frost" && <div className="mt-7 flex flex-wrap gap-3">
            <a href="#interactive-demo" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-xs font-bold tracking-[0.12em] text-white shadow-lg transition hover:bg-blue-500">OPEN INTERACTIVE DEMO <ExternalLink size={15} /></a>
            <a href="https://rapexofficial2025-stack.github.io/Prototype-twin-WMS/#/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-blue-500/35 bg-white/70 px-5 py-3 text-xs font-bold tracking-[0.12em] text-blue-700 shadow-lg transition hover:border-blue-500/70 hover:bg-white">VIEW ACTUAL DEMO <ExternalLink size={15} /></a>
          </div>}
        </div>
        <aside className="rounded-2xl border border-white/10 bg-white/2 p-5">
          <p className={sectionTitle}>TRY IT</p>
          <ul className="mt-4 space-y-2.5">{showcase.interactions.map((line) => <li key={line} className="flex gap-2.5 text-sm leading-6 text-white/80"><Check size={15} className="mt-1 shrink-0 text-violet-300" />{line}</li>)}</ul>
          <p className="mt-4 text-[11px] leading-5 text-white/45">Front-end mockup only: no backend, all data is sample data.</p>
        </aside>
      </header>

      {showcase.challenge && showcase.solution && <section className="grid gap-5 border-b border-white/10 py-10 lg:grid-cols-3">
        <article className="rounded-2xl border border-white/10 bg-white/2.5 p-6"><p className={sectionTitle}>CHALLENGE</p><p className="mt-4 text-sm leading-7 text-[#A7AFBF]">{showcase.challenge}</p></article>
        <article className="rounded-2xl border border-white/10 bg-white/2.5 p-6"><p className={sectionTitle}>SOLUTION</p><p className="mt-4 text-sm leading-7 text-[#A7AFBF]">{showcase.solution}</p></article>
        <article className="rounded-2xl border border-white/10 bg-white/2.5 p-6"><p className={sectionTitle}>KEY FEATURES</p><ul className="mt-4 space-y-2">{showcase.keyFeatures?.map((feature) => <li key={feature} className="flex gap-2 text-sm text-[#A7AFBF]"><Check size={14} className="mt-1 shrink-0 text-blue-400" />{feature}</li>)}</ul></article>
      </section>}

      <section id="interactive-demo" className="scroll-mt-8 pt-10">
        <p className={`${sectionTitle} mb-5 text-center`}>LIVE FRONT-END MOCKUP · WEB / MOBILE</p>
        <DevicePreview mock={showcase.mock} url={showcase.url} defaultDevice={showcase.defaultDevice} />
      </section>

      {showcase.videos && <section className="pt-14">
        <p className={`${sectionTitle} mb-5`}>SCREEN RECORDINGS</p>
        <div className="grid gap-5 md:grid-cols-2">{showcase.videos.map((video) => <figure key={video.src}><video src={encodeURI(asset(video.src))} controls muted loop playsInline preload="metadata" className="aspect-video w-full rounded-2xl border border-white/10 bg-[#05070b] object-contain" /><figcaption className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">{video.label}</figcaption></figure>)}</div>
      </section>}

      <section className="pt-14">
        <div className="mb-5 flex items-end justify-between gap-4"><p className={sectionTitle}>RAW FILES</p><p className="text-[10px] tracking-[0.14em] text-white/40">PLACEHOLDERS · CLICK TO VIEW</p></div>
        <RawGallery items={showcase.rawFiles} />
      </section>

      <section className="pt-14">
        <div className="mb-5 flex items-end justify-between gap-4"><p className={sectionTitle}>BEFORE / AFTER</p><p className="text-[10px] tracking-[0.14em] text-white/40">DRAG THE HANDLE</p></div>
        <div className="grid gap-6 md:grid-cols-2">{showcase.beforeAfter.map((pair) => <BeforeAfter key={pair.label} {...pair} />)}</div>
      </section>

      <nav className="mt-16 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2" aria-label="More projects">
        <Link href={`${category.href}/${previous.slug}`} className="group rounded-2xl border border-white/10 p-5 transition hover:border-violet-300/35"><p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-white/45"><ArrowLeft size={13} /> PREVIOUS</p><p className="mt-2 text-lg font-semibold text-white">{previous.title}</p></Link>
        <Link href={`${category.href}/${next.slug}`} className="group rounded-2xl border border-white/10 p-5 text-right transition hover:border-violet-300/35"><p className="flex items-center justify-end gap-2 text-[10px] font-semibold tracking-[0.2em] text-white/45">NEXT <ArrowRight size={13} /></p><p className="mt-2 text-lg font-semibold text-white">{next.title}</p></Link>
      </nav>
    </div>
  </div>;
}
