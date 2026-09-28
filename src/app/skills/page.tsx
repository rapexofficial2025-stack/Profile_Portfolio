import { PageContent } from "@/components/content/PageContent";
import { skillGroups } from "@/data/profile-details";

const skillLevels = [
  { label: "Primary", classes: "border-violet-300/30 bg-violet-500/[0.08]" },
  { label: "Working Knowledge", classes: "border-sky-300/30 bg-sky-500/[0.06]" },
  { label: "Exploring", classes: "border-pink-300/30 bg-pink-500/[0.06]" },
];

export default function SkillsPage() {
  return <PageContent eyebrow="SKILLS" title="A multidisciplinary toolkit, applied with purpose." description="I design, animate, edit, build and plan digital experiences using the tools best suited for each challenge."><div className="pt-10"><div className="flex flex-wrap gap-3">{skillLevels.map((level) => <span key={level.label} className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] ${level.classes} text-white/75`}>{level.label}</span>)}</div><section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{skillGroups.map((group, groupIndex) => <article key={group.title} className="group rounded-[1.6rem] border border-white/10 bg-[#0F1620]/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:shadow-[0_18px_40px_rgba(124,58,237,0.12)]"><div className="flex items-center justify-between"><h2 className="text-base font-semibold text-white">{group.title}</h2><span className="text-[9px] font-medium tracking-[0.18em] text-white/35">0{groupIndex + 1}</span></div><div className="mt-4 flex flex-wrap gap-2">{group.tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1.5 text-[11px] text-slate-300 transition group-hover:border-violet-200/30 group-hover:text-white">{tool}</span>)}</div><p className="mt-5 text-sm leading-6 text-[#A7AFBF]">Creative systems, production workflows, and practical execution for digital content, interfaces and experiences.</p></article>)}</section></div></PageContent>;
}
