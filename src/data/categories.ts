export type CategoryIconName = "product" | "graphic" | "motion" | "audio" | "visual";

export type PortfolioCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: CategoryIconName;
};

export const portfolioCategories: PortfolioCategory[] = [
  { id: "product-design", title: "Product Design", description: "RAPEX & Digital Products", href: "/work?category=product-design", icon: "product" },
  { id: "graphic-design", title: "Graphic Design", description: "Branding & Marketing", href: "/work?category=graphic-design", icon: "graphic" },
  { id: "motion", title: "Motion Graphics", description: "Video & Animation", href: "/work?category=motion", icon: "motion" },
  { id: "audio", title: "Audio & Music", description: "Editing & Production", href: "/work?category=audio", icon: "audio" },
  { id: "visual-art", title: "Visual Art", description: "Illustration, Mural, 3D", href: "/work?category=visual-art", icon: "visual" },
];
