import { HeroSection } from "@/components/home/HeroSection";
import { HeroStats } from "@/components/home/HeroStats";
import { QuoteBlock } from "@/components/home/QuoteBlock";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { HomeFooter } from "@/components/home/HomeFooter";
import { profile } from "@/data/profile";

export default function Home() {
  return <div className="relative isolate min-h-screen overflow-x-clip bg-[#070A0F]"><div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_27%,rgba(90,45,180,0.12),transparent_34%),radial-gradient(ellipse_at_8%_94%,rgba(14,165,233,0.06),transparent_28%)]" /><div className="absolute -right-40 top-24 size-[34rem] rounded-full bg-violet-600/[0.07] blur-[130px]" /><div className="absolute left-1/3 top-[42rem] size-[28rem] rounded-full bg-sky-500/[0.04] blur-[120px]" /></div><div className="mx-auto max-w-[1560px] px-6 pb-8 pt-9 sm:px-10 lg:px-14 lg:pt-12 xl:px-20"><HeroSection /><div className="mt-2 grid gap-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1fr)] lg:items-end"><QuoteBlock /><HeroStats /></div><CategoryGrid /><div className="mt-16 sm:mt-20"><div className="flex justify-start sm:justify-end"><p className="font-serif text-2xl italic leading-[0.9] text-white/55 sm:text-right sm:text-3xl">{profile.closingPhrase.map((line) => <span key={line} className="block">{line}</span>)}</p></div></div><HomeFooter /></div></div>;
}
