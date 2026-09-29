"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { portfolioCategories } from "@/data/categories";
import { workDetails, type WorkDetail } from "@/data/profile-details";

export function WorkExperience() {
  const params = useSearchParams();
  const selectedId = params.get("category");
  const selected = selectedId ? workDetails[selectedId] : undefined;

  if (!selected) return <section className="pt-10"><p className="text-sm text-[#A7AFBF]">Choose one of the category cards to view the related capabilities and editable project slots.</p><div className="mt-7 grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">{portfolioCategories.map((category) => <Link key={category.id} href={category.href} className="rounded-2xl border border-white/10 bg-[#0F1620]/80 p-5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-[#141C28]/90">{category.title}<span className="mt-2 block text-xs font-normal text-[#8E98A9]">{category.description}</span></Link>)}</div></section>;

  return <CategoryDetail key={selectedId} detail={selected} />;
}

function CategoryDetail({ detail }: { detail: WorkDetail }) {
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(() => !shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setTimeout(() => setIsLoading(false), 760);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  return <section className="pt-10" aria-live="polite"><Link href="/work" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/45 transition hover:text-white"><ChevronLeft size={15} /> All categories</Link><AnimatePresence mode="wait">{isLoading ? <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-100 flex-col items-center justify-center text-center"><div className="relative flex size-20 items-center justify-center rounded-full border border-violet-300/25 bg-violet-400/10"><motion.div className="absolute inset-2 rounded-full border border-t-violet-300/90 border-r-transparent border-b-transparent border-l-transparent" animate={shouldReduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /><Sparkles size={22} className="text-violet-200" /></div><p className="mt-6 text-[10px] font-semibold tracking-[0.28em] text-violet-200">LOADING {detail.title.toUpperCase()}</p><p className="mt-2 text-sm text-white/45">Preparing capability details and project slots</p></motion.div> : <motion.div key={detail.title} initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}><p className="text-[10px] font-semibold tracking-[0.25em] text-violet-200">{detail.eyebrow}</p><div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(17rem,0.9fr)]"><div><h2 className="text-3xl font-semibold tracking-tight text-white">{detail.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#A7AFBF]">{detail.summary}</p><ul className="mt-6 space-y-3">{detail.strengths.map((strength) => <li key={strength} className="flex gap-3 text-sm leading-6 text-slate-300"><Check size={16} className="mt-1 shrink-0 text-violet-300" />{strength}</li>)}</ul></div><aside className="rounded-2xl border border-white/10 bg-[#0F1620]/70 p-5"><p className="text-[10px] font-semibold tracking-[0.2em] text-white/50">TOOLS AND METHODS</p><div className="mt-4 flex flex-wrap gap-2">{detail.tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-300">{tool}</span>)}</div></aside></div><div className="mt-10 border-t border-white/10 pt-7"><p className="text-[10px] font-semibold tracking-[0.25em] text-white/50">EDITABLE PORTFOLIO SLOTS</p><div className="mt-4 grid gap-3 md:grid-cols-3">{detail.placeholders.map((placeholder) => <button key={placeholder} type="button" className="group flex min-h-30 flex-col justify-between rounded-2xl border border-dashed border-white/15 bg-white/2 p-5 text-left transition hover:border-violet-300/35 hover:bg-violet-400/5"><Plus size={18} className="text-violet-200/80" /><span className="mt-6 text-sm font-medium text-white/75">{placeholder}</span><span className="mt-1 text-xs text-white/35">Content placeholder</span></button>)}</div></div></motion.div>}</AnimatePresence></section>;
}
