import { Download, GraduationCap, Languages } from "lucide-react";
import type { ReactNode } from "react";
import { PageContent } from "@/components/content/PageContent";
import { careerExperience, skillGroups, training } from "@/data/profile-details";

function ResumeInfoCard({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <section className={`resume-info-card ${className}`}>
      <div className="resume-info-card-title">{title}</div>
      <div className="resume-info-card-body">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <PageContent
      eyebrow="RESUME"
      title="IRVIN JAY PALACIO"
      description="Multimedia Designer | Video Editor | Motion Graphics & 2D Animator | Front-End UI Developer"
      headerAction={
        <a
          href="#"
          aria-disabled="true"
          className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-violet-300/40 hover:bg-violet-400/10"
        >
          <Download size={16} /> Resume PDF Coming Soon
        </a>
      }
    >
      <section className="resume-education-glass mt-8 rounded-2xl p-5 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-0">
          <div className="md:border-r md:border-white/15 md:pr-8">
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-violet-200"><GraduationCap size={15} /> EDUCATION</p>
            <p className="mt-3 text-sm font-semibold text-white">Bachelor of Science in Information Technology</p>
            <p className="mt-1 text-sm leading-6 text-[#A7AFBF]">Ateneo de Zamboanga University, 2010 - 2014</p>
          </div>
          <div className="border-t border-white/15 pt-6 md:border-t-0 md:pl-8 md:pt-0">
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-violet-200"><Languages size={15} /> LANGUAGES</p>
            <p className="mt-3 text-sm leading-6 text-[#A7AFBF]">English · Filipino / Tagalog · Chavacano — Conversational</p>
          </div>
        </div>
      </section>

      <ResumeInfoCard title="PROFESSIONAL SUMMARY" className="mt-10 lg:w-3/5">
        <p className="text-base leading-8 text-slate-700">
          Multidisciplinary Multimedia Designer, Video Editor, Motion Graphics Artist, 2D Animator and Front-End UI Developer experienced in creating digital content, interactive interfaces, marketing materials, videos, graphics and web application concepts.
        </p>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Combines creative design with technical and systems-oriented thinking to transform ideas into practical visual and digital experiences.
        </p>
      </ResumeInfoCard>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
        <section className="resume-glass-body rounded-[2.2rem] p-5 sm:p-7 lg:p-9">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-violet-200">EXPERIENCE</p>
          <div className="mt-6 space-y-7">
            {careerExperience.map((item) => (
              <article key={item.role} className="resume-neu-card rounded-3xl p-6 sm:p-7">
                <p className="text-xs text-white/45">{item.period}</p>
                <h2 className="mt-3 text-lg font-semibold text-white">{item.role}</h2>
                <p className="mt-1 text-sm text-violet-200/75">{item.organization}</p>
                <p className="mt-4 text-sm leading-6 text-[#D7DCE7]">{item.description}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[#A7AFBF]">
                  {item.responsibilities.map((responsibility) => <li key={responsibility}>• {responsibility}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <ResumeInfoCard title="TRAINING">
            <ul className="space-y-3 text-xs leading-5 text-slate-600">
              {training.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </ResumeInfoCard>

          <ResumeInfoCard title="CORE TOOLS">
            <div className="space-y-4">
              {skillGroups.slice(0, 6).map((group) => (
                <p key={group.title} className="text-xs leading-5 text-slate-600">
                  <span className="font-semibold text-slate-800">{group.title}:</span> {group.tools.slice(0, 4).join(" · ")}
                </p>
              ))}
            </div>
          </ResumeInfoCard>
        </aside>
      </div>

      <section className="pt-10">
        <ResumeInfoCard title="PROJECT EXPERIENCE">
          <article className="resume-info-card-inset rounded-2xl p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-800">RAPEX MARKETPLACE & LOGISTICS PLATFORM</h3>
              <p className="mt-2 text-sm font-medium text-violet-700">Founder | Product Designer | Front-End UI & Workflow Developer</p>
              <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm leading-6 text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
                <li>• Product Concept</li>
                <li>• UI/UX</li>
                <li>• Marketplace Design</li>
                <li>• Merchant Portal</li>
                <li>• Rider System</li>
                <li>• Customer Application</li>
                <li>• Admin Dashboard</li>
                <li>• POS Concept</li>
                <li>• Workflow Design</li>
                <li>• Business Logic Planning</li>
                <li>• Front-End UI</li>
                <li>• System Documentation</li>
                <li>• Testing</li>
                <li>• AI-Assisted Development</li>
              </ul>
          </article>
        </ResumeInfoCard>
      </section>
    </PageContent>
  );
}
