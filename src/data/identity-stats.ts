/** Content for the home stats bar and the detail modal each stat opens. */

export type IdentityStatId = "experience" | "rapex" | "progrex" | "projects" | "ideas";

/** mainSuffix: the rest of a name, shown smaller under `main` (e.g. RAPEX / Technologies) */
export type IdentityStat = { id: IdentityStatId; main: string; mainSuffix?: string; label: string; sublabel: string };

export const identityStats: IdentityStat[] = [
  { id: "experience", main: "13+", label: "Years Experience", sublabel: "Creative • Technical • Operations" },
  { id: "rapex", main: "RAPEX", mainSuffix: "Technologies", label: "Founder / Product Development", sublabel: "Marketplace • Logistics • Digital Product" },
  { id: "progrex", main: "PROGREX", label: "Co-Founder / Creative Product Lead", sublabel: "Technology • Product • Creative Solutions" },
  { id: "projects", main: "68+", label: "Projects Completed", sublabel: "Development • Multimedia Clients" },
  { id: "ideas", main: "∞", label: "Ideas to Create", sublabel: "Design • Motion • Technology" },
];

export const experienceTimeline = [
  { period: "2010–2014", title: "BS Information Technology", place: "Ateneo de Zamboanga University" },
  { period: "2015–2016", title: "Administrative & Facility Project Support" },
  { period: "2016–2017", title: "Warehouse Operations / Technical & Maintenance Support" },
  { period: "2017–Present", title: "Building Administration / Operations / Technical Coordination" },
];

export const experienceTracks = [
  { title: "Creative Development", items: ["Graphic Design", "Photo Editing", "Video Editing", "Music", "Mural Art", "Tattoo Art", "Multimedia"] },
  { title: "Digital Product Development", items: ["UI/UX", "Web Interfaces", "Mobile Interfaces", "Workflow Planning", "RAPEX"] },
];

export const rapexDetails = {
  title: "Hyperlocal Marketplace & Logistics Platform",
  description: "RAPEX is an ongoing digital marketplace ecosystem designed around customers, merchants, riders, stores, products, delivery operations and administrative workflows.",
  role: ["Founder", "Product Development", "UI/UX", "Front-End UI", "Workflow Design", "Business Logic Planning", "Digital Product Strategy"],
  features: ["Customer", "Merchant", "Rider", "Marketplace", "Delivery", "Store", "POS", "Admin"],
  caseStudyHref: "/work/rapex-marketplace-ecosystem",
  /** TODO: paste the live/staging RAPEX customer demo URL here; while empty the demo button shows "coming soon". */
  customerDemoUrl: "",
  exploreMoreHref: "/work/category/web-development/rapex-admin-saas",
};

export const progrexDetails = {
  url: "https://www.progrex.cloud/",
  title: "Technology & Digital Solutions",
  subtitle: "Build faster. Scale smarter. Create better digital experiences.",
  description: "PROGREX provides technology and digital solutions across websites, software, product experiences and creative technology.",
  role: ["Co-Founder", "Creative Product Lead"],
  focus: ["Product Direction", "Client Solutions", "UI/UX", "Multimedia", "Creative Technology", "Digital Product Planning", "Business Development"],
  services: ["Web", "Software", "Mobile", "UI/UX", "Product", "Multimedia", "Digital Solutions"],
};
