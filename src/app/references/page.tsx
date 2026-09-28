import { PageContent } from "@/components/content/PageContent";

const references = [
  {
    name: "[NAME]",
    position: "[POSITION]",
    company: "[COMPANY]",
    quote: "Reference details coming soon.",
  },
  {
    name: "[NAME]",
    position: "[POSITION]",
    company: "[COMPANY]",
    quote: "Reference details coming soon.",
  },
  {
    name: "[NAME]",
    position: "[POSITION]",
    company: "[COMPANY]",
    quote: "Reference details coming soon.",
  },
];

export default function ReferencesPage() {
  return (
    <PageContent
      eyebrow="REFERENCES"
      title="Professional references are being prepared."
      description="This section is intentionally left as a warm placeholder while final client references are collected."
    >
      <div className="grid gap-5 pt-10 md:grid-cols-2 xl:grid-cols-3">
        {references.map((reference, index) => (
          <article key={`${reference.name}-${index}`} className="rounded-[1.8rem] border border-white/10 bg-[#0F1620]/75 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full border border-dashed border-violet-300/35 bg-violet-400/5 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-violet-200/80">
                PHOTO
              </div>
              <div>
                <p className="text-base font-semibold text-white">{reference.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-violet-200/80">{reference.position}</p>
                <p className="mt-1 text-xs text-[#A7AFBF]">{reference.company}</p>
              </div>
            </div>
            <blockquote className="mt-5 border-l border-violet-300/35 pl-4 text-sm leading-7 text-[#D7DCE7]">
              “{reference.quote}”
            </blockquote>
          </article>
        ))}
      </div>
    </PageContent>
  );
}
