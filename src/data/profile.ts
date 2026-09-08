export type SocialIconName = "network" | "code" | "video" | "camera";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type ProfileStat = {
  label: string;
  value: string | null;
  verified: boolean;
};

export const profile = {
  monogram: "IP",
  name: "IRVIN JAY PALACIO",
  copyrightName: "Irvin Jay Palacio",
  companyAttribution: "RAPEX Technologies OPC",
  sidebarName: "IRVIN PALACIO",
  brandPhrase: "DESIGN • DEVELOP • CREATE",
  eyebrow: "WELCOME TO MY PORTFOLIO",
  roleSegments: ["PRODUCT DESIGNER", "UI/UX", "MULTIMEDIA CREATIVE"],
  description: "I design digital products, create visual experiences, and build solutions that make an impact.",
  portraitPath: `${assetBasePath}/images/profile/irvin-suit.png`,
  portraitAvailable: true,
  resumePath: "/resume",
  quoteLines: ["Ideas", "into real", "experiences."],
  creativePhrase: ["Design", "Develop", "Create"],
  creativeSubphrase: ["SAME PASSION", "DIFFERENT TOOLS"],
  closingPhrase: ["More", "Than", "Just Design"],
  stats: [
    { label: "Years Experience", value: "13+", verified: true },
    { label: "Founder / Product Development", value: "RAPEX", verified: true },
    { label: "Projects Completed", value: "50+", verified: true },
    { label: "Stories to Create", value: "∞", verified: true },
  ] satisfies ProfileStat[],
  location: "KAWIT, CAVITE, PHILIPPINES",
  socialLinks: [
    { label: "LinkedIn", href: "#social-linkedin", icon: "network", isPlaceholder: true },
    { label: "GitHub", href: "#social-github", icon: "code", isPlaceholder: true },
    { label: "YouTube", href: "#social-youtube", icon: "video", isPlaceholder: true },
    { label: "Instagram", href: "#social-instagram", icon: "camera", isPlaceholder: true },
  ] satisfies Array<{ label: string; href: string; icon: SocialIconName; isPlaceholder: boolean }>,
  collageItems: [
    { label: "DESIGN", caption: "UI / product systems", tone: "blue" },
    { label: "DEVELOP", caption: "Digital solutions", tone: "purple" },
    { label: "CREATE", caption: "Visual experiences", tone: "pink" },
    { label: "PRODUCE", caption: "Audio / video / media", tone: "orange" },
  ],
};
