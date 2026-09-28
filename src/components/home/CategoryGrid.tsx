import { portfolioCategories } from "@/data/categories";
import { CategoryCard } from "./CategoryCard";

export function CategoryGrid() {
  return <section id="explore" aria-labelledby="explore-heading" className="scroll-mt-8 pt-16 sm:pt-20"><div className="mb-7 sm:mb-8"><div className="flex items-center gap-3 sm:gap-5"><span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" /><h2 id="explore-heading" className="whitespace-nowrap text-center text-[11px] font-semibold tracking-[0.28em] text-white/70 sm:tracking-[0.36em]">EXPLORE MY WORK</h2><span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" /></div><p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/30 sm:tracking-[0.28em]">Select a discipline to explore</p></div><div className="grid gap-x-3.5 gap-y-11 pt-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">{portfolioCategories.map((category, index) => <CategoryCard key={category.id} category={category} index={index} />)}</div></section>;
}
