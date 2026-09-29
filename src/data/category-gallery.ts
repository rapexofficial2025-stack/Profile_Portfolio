import type { PortfolioSample } from "@/data/categories";
import type { VisualArtProject } from "@/data/visual-art-gallery";

type GalleryCategoryId = "product-design" | "graphic-design" | "motion" | "audio" | "web-development" | "mobile-apps" | "photography";

const tabBanks: Record<GalleryCategoryId, string[]> = {
  "product-design": ["Overview", "User Flow", "Wireframes", "UI Design", "Prototype", "Design System"],
  "graphic-design": ["Creative Brief", "Concept", "Typography", "Color System", "Campaign", "Final Artwork"],
  motion: ["Storyboard", "Style Frames", "Animation", "Transitions", "Sound Design", "Final Cut"],
  audio: ["Creative Direction", "Composition", "Recording", "Sound Design", "Final Mix", "Master"],
  "web-development": ["Overview", "UX Flow", "Interface", "Components", "Responsive", "Live Demo"],
  "mobile-apps": ["User Flow", "Wireframes", "Interface", "Prototype", "Motion", "Handoff"],
  photography: ["Contact Sheet", "Selection", "Color Grade", "Retouch", "Final Set"],
};

const tabCounts = [3, 5, 2, 4, 6];

function idFrom(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function buildCategoryProject(categoryId: GalleryCategoryId, sample: PortfolioSample, index: number): VisualArtProject {
  const bank = tabBanks[categoryId];
  const count = Math.min(tabCounts[index % tabCounts.length], bank.length);
  const tabs = Array.from({ length: count }, (_, tabIndex) => bank[(tabIndex + index) % bank.length]);

  return {
    id: idFrom(sample.title),
    title: sample.title,
    type: sample.type,
    description: sample.description,
    items: tabs.map((tab) => ({
      id: `${idFrom(sample.title)}-${idFrom(tab)}`,
      tab,
      title: tab === "Overview" ? `${sample.title} — Project Overview` : `${sample.title} — ${tab}`,
      description: `${tab} presentation for ${sample.title}. This section is prepared for the final project story, visuals, decisions, and supporting details.`,
      medium: tab.includes("Sound") || tab.includes("Mix") || tab.includes("Master") || tab.includes("Recording") ? "Audio presentation" : tab.includes("Animation") || tab.includes("Final Cut") || tab.includes("Motion") ? "Video presentation" : "Image presentation",
      tools: [sample.type, tab, "Portfolio Case Study"],
      mediaType: tab.includes("Animation") || tab.includes("Final Cut") || tab.includes("Motion") || tab.includes("Live Demo") ? "video" : "image",
    })),
  };
}

export function isGalleryCategory(categoryId: string): categoryId is GalleryCategoryId {
  return categoryId in tabBanks;
}
