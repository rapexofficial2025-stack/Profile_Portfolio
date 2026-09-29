import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { CategoryCollectionGallery } from "@/components/showcase/CategoryCollectionGallery";
import { VisualArtGallery } from "@/components/showcase/visual-art/VisualArtGallery";
import { portfolioCategories } from "@/data/categories";

export const dynamicParams = false;
export function generateStaticParams() {
  return portfolioCategories.map((category) => ({ category: category.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params;
  const category = portfolioCategories.find((item) => item.id === categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_8%,rgba(124,58,237,0.13),transparent_30%),radial-gradient(ellipse_at_8%_92%,rgba(14,165,233,0.07),transparent_24%)]" />
      <div className="mx-auto max-w-375 px-6 pb-16 pt-12 sm:px-10 lg:px-14 xl:px-20">
        <Link href="/#explore" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/2 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white/70 transition hover:border-violet-300/35 hover:text-white">
          <ArrowLeft size={14} /> BACK TO MY WORK
        </Link>

        <header className="mt-8 border-b border-white/10 pb-10">
          <p className="text-[10px] font-semibold tracking-[0.28em] text-violet-200">EXPLORE MY WORK / {category.title}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tighter text-white sm:text-5xl lg:text-6xl">{category.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#A7AFBF]">{category.description}. Explore {category.samples.length} editable sample portfolio directions prepared for your future images, descriptions and final case studies.</p>
        </header>

        {category.id === "visual-art" ? <VisualArtGallery /> : <CategoryCollectionGallery category={category} />}
      </div>
    </div>
  );
}
