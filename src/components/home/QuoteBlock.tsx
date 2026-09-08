import { profile } from "@/data/profile";

export function QuoteBlock() {
  return <blockquote className="border-l border-violet-400/50 pl-4 text-2xl font-light italic leading-[1.08] tracking-tight text-white/75 sm:text-3xl">{profile.quoteLines.map((line) => <span key={line} className="block">{line}</span>)}</blockquote>;
}
