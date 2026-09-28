import type { ReactNode } from "react";

export function PageContent({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <div className="relative min-h-screen overflow-x-clip"><div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_74%_9%,rgba(90,45,180,0.11),transparent_31%),radial-gradient(ellipse_at_8%_94%,rgba(14,165,233,0.05),transparent_27%)]" /><div className="mx-auto max-w-[1560px] px-6 pb-10 pt-12 sm:px-10 lg:px-14 lg:pt-16 xl:px-20"><header className="border-b border-white/10 pb-9"><p className="text-[10px] font-semibold tracking-[0.28em] text-violet-200/85">{eyebrow}</p><h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#A7AFBF]">{description}</p></header>{children}</div></div>;
}
