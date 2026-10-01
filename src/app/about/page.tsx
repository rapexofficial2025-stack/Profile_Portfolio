import { ArrowUpRight } from "lucide-react";
import { PageContent } from "@/components/content/PageContent";
import { roleFocuses } from "@/data/profile-details";

const floatingWords = ["DESIGN", "MOTION", "CREATE", "BUILD", "THINK", "EXPLORE"];

export default function AboutPage() {
  return (
    <PageContent
      eyebrow="ABOUT IRVIN"
      title="More than just design."
      description="A personal space for the story, values, interests, and experiences behind my work."
    >
      <div className="grid gap-10 pt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)]">
        <section>
          <div className="about-body-inset rounded-4xl p-7 sm:p-9">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-violet-200">ABOUT ME</p>
            <p className="mt-6 text-base leading-8 text-[#D7DCE7]">This section is ready for personal details beyond the résumé—my story, values, interests, inspirations, and life outside professional experience.</p>
            <blockquote className="mt-8 border-l border-violet-300/40 pl-4 text-lg italic text-violet-100">“Different tools. Same passion — turning ideas into experiences.”</blockquote>
          </div>
        </section>

        <aside className="about-side-stack space-y-7">
          <section className="about-side-card rounded-[1.75rem] p-7 sm:p-8">
            <div className="relative mx-auto max-w-[16rem]">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/55 bg-[radial-gradient(circle_at_50%_25%,rgba(168,85,247,0.26),rgba(14,165,233,0.06)_32%,transparent_68%)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-24 items-center justify-center rounded-full border border-violet-300/40 bg-white/40 text-lg font-semibold tracking-[0.2em] text-slate-700 shadow-[0_0_40px_rgba(139,92,246,0.22)]">IP</div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(71,79,94,0.08)_80%,rgba(71,79,94,0.3)_100%)]" />
              </div>
              {floatingWords.map((word, index) => (
                <span
                  key={word}
                  className="pointer-events-none absolute text-[10px] font-semibold tracking-[0.22em] text-slate-600/70"
                  style={{ left: `${12 + (index * 14) % 60}%`, top: `${8 + (index * 18) % 52}%`, transform: `translate3d(${index % 2 === 0 ? 0 : 10}px, ${index % 3 === 0 ? 0 : 14}px, 0)` }}
                >
                  {word}
                </span>
              ))}
            </div>
          </section>

          <section className="about-side-card rounded-2xl p-7 sm:p-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-700">ROLE FOCUS</p>
            <div className="mt-5 space-y-3">
              {roleFocuses.map((role) => (
                <p key={role} className="border-b border-slate-300/70 pb-3 text-sm leading-5 text-slate-700 last:border-0 last:pb-0">{role}</p>
              ))}
            </div>
          </section>

          <section className="about-side-card rounded-2xl p-7 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-700">READY FOR</p>
              <ArrowUpRight size={15} className="shrink-0 text-violet-600" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">Remote creative roles, multimedia teams, product design work, and digital experience projects.</p>
          </section>
        </aside>
      </div>
    </PageContent>
  );
}
