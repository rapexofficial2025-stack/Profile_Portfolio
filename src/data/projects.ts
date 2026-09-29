export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  description: string;
  challenge: string;
  objective: string;
  process: string[];
  tools: string[];
  images: string[];
  featured: boolean;
  nextProject: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "digital-ecommerce",
    slug: "react-native-digital-ecommerce",
    title: "REACT NATIVE-DIGITAL ECOMMERCE",
    subtitle: "Product Design • UI/UX • Front-End UI • Workflow Design",
    category: "Product Design • UI/UX • Front-End UI • Workflow Design",
    year: "2024",
    role: "UI/UX Designer • Product Designer • Front-End UI Developer",
    description: "A fictional digital e-commerce concept created to demonstrate customer shopping, merchant operations, responsive product discovery and mobile-first checkout experiences.",
    challenge: "Create a familiar marketplace experience inspired by modern global e-commerce patterns while keeping product discovery, cart actions and merchant tools clear and easy to use.",
    objective: "Design a polished demonstration interface across desktop and React Native mobile screens, with replaceable product-image slots ready for future portfolio assets.",
    process: ["Research", "Planning", "Concept", "Wireframe", "Design", "Production", "Development", "Testing", "Refinement"],
    tools: ["Figma", "React", "Next.js", "TypeScript", "React Native", "Expo", "AI-Assisted Development"],
    images: ["Marketplace UI", "Merchant Portal", "Admin Dashboard", "Mobile App", "Workflow Diagram"],
    featured: true,
    nextProject: "velocity-digital-product-campaign",
  },
  {
    id: "velocity",
    slug: "velocity-digital-product-campaign",
    title: "MOTION - DIGITAL PRODUCT CAMPAIGN",
    subtitle: "Video Editing • Motion Graphics • 2D Animation • Commercial Content",
    category: "Video Editing • Motion Graphics • 2D Animation • Commercial Content",
    year: "2024",
    role: "Motion Designer • Video Editor • Creative Direction Support",
    description: "A fictional launch campaign built to showcase product storytelling through short-form video, typography, motion graphics and product transitions.",
    challenge: "Present a premium digital product with strong motion energy while keeping the communication clear, cinematic and conversion-focused.",
    objective: "Develop a clear visual campaign system with social, commercial and product-focused motion media that can translate across multiple formats.",
    process: ["Research", "Planning", "Concept", "Design", "Production", "Editing", "Motion Graphics", "Review", "Refinement"],
    tools: ["Adobe Premiere Pro", "After Effects style workflow", "VEGAS Pro", "CapCut", "Photoshop", "Rive"],
    images: ["Commercial video", "Video thumbnail", "Motion graphic frame", "Social media reel", "Vertical ad"],
    featured: true,
    nextProject: "modern-cavite-residence",
  },
  {
    id: "realestate",
    slug: "modern-cavite-residence",
    title: "MODERN CAVITE RESIDENCE",
    subtitle: "Real Estate Marketing • Graphic Design • Photo Editing • Video Editing",
    category: "Real Estate Marketing • Graphic Design • Photo Editing • Video Editing",
    year: "2023",
    role: "Creative Designer • Photo Editor • Visual Storyteller",
    description: "A complete property marketing presentation designed to promote a residential concept through poster design, social media assets and walkthrough storytelling.",
    challenge: "Translate architectural features into a compelling property narrative while maintaining a premium, persuasive and highly visual property campaign.",
    objective: "Create a polished digital marketing package that can help present the property across social, print and campaign channels with consistency.",
    process: ["Research", "Planning", "Photo Enhancement", "Layout Design", "Video Production", "Social Post Design", "Final Review"],
    tools: ["Photoshop", "Lightroom", "Canva", "Premiere Pro", "CapCut", "Figma", "SketchUp"],
    images: ["Property hero", "Before / after edit", "Poster", "Social media campaign", "Property video"],
    featured: true,
    nextProject: "nova-coffee",
  },
  {
    id: "nova",
    slug: "nova-coffee",
    title: "NOVA COFFEE",
    subtitle: "Graphic Design • Branding • Marketing Content • GIF Animation",
    category: "Graphic Design • Branding • Marketing Content • GIF • Social Media",
    year: "2022",
    role: "Brand Designer • Visual Designer • Motion Creative",
    description: "A fictional coffee brand campaign focused on identity, packaging, social creative, and animated digital storytelling.",
    challenge: "Develop a strong visual personality that feels premium and memorable while keeping the brand accessible to a younger, social-first audience.",
    objective: "Design a full branded campaign system that blends print, packaging, social media and GIF animation into a recognizable creative identity.",
    process: ["Brand Exploration", "Identity Development", "Poster Design", "Packaging Concept", "Motion Asset Creation", "Campaign Review"],
    tools: ["Photoshop", "CorelDRAW", "Canva", "Figma", "Premiere Pro"],
    images: ["Logo", "Brand board", "Poster", "Packaging", "GIF animation"],
    featured: true,
    nextProject: "hotel-aurora-booking-experience",
  },
  {
    id: "hotel-aurora",
    slug: "hotel-aurora-booking-experience",
    title: "HOTEL AURORA — HOSPITALITY WEB EXPERIENCE",
    subtitle: "Hospitality UX • Booking Flow • Art Direction • Front-End UI",
    category: "Hospitality Web • Product Design • UI/UX • Front-End UI",
    year: "2025",
    role: "Product Designer • UI/UX Designer • Front-End UI Developer",
    description: "A cinematic hotel website concept that turns browsing, room discovery and booking into one calm, high-conversion guest journey.",
    challenge: "Create a premium hospitality experience that feels aspirational without making essential actions—checking availability, comparing rooms and planning a stay—hard to find.",
    objective: "Design a responsive hotel platform with a clear booking path, editorial destination storytelling and a flexible content system for rooms, experiences and guest services.",
    process: ["Hospitality Research", "Journey Mapping", "Information Architecture", "Wireframe", "Visual Direction", "Responsive UI", "Prototype", "Usability Review"],
    tools: ["Figma", "Next.js", "TypeScript", "React", "Framer Motion", "Photoshop"],
    images: ["Hotel hero and booking bar", "Room comparison experience", "Suite detail page", "Destination editorial", "Mobile booking flow"],
    featured: true,
    nextProject: "savor-house-restaurant-web-experience",
  },
  {
    id: "savor-house",
    slug: "savor-house-restaurant-web-experience",
    title: "SAVOR HOUSE — RESTAURANT WEB EXPERIENCE",
    subtitle: "Restaurant UX • Menu Design • Reservations • Brand Storytelling",
    category: "Restaurant Web • UI/UX • Brand Experience • Digital Marketing",
    year: "2025",
    role: "Experience Designer • Brand Designer • Front-End UI Developer",
    description: "A warm, editorial restaurant website concept built to make the menu feel desirable, reservations feel effortless and the brand feel memorable before the first visit.",
    challenge: "Balance appetite-led visual storytelling with practical needs such as menu scanning, location discovery, opening hours, private dining and table reservations.",
    objective: "Create a mobile-first restaurant experience with a confident visual identity, fast content scanning and clear calls to action across dine-in, takeaway and event journeys.",
    process: ["Brand Discovery", "Content Planning", "Menu Architecture", "Wireframe", "Art Direction", "Responsive UI", "Interaction Design", "Prototype Review"],
    tools: ["Figma", "React", "Next.js", "TypeScript", "Photoshop", "Lightroom"],
    images: ["Restaurant landing page", "Menu browsing interface", "Signature dish story", "Reservation flow", "Private dining page"],
    featured: true,
    nextProject: "nexus-interactive-digital-experience",
  },
  {
    id: "nexus",
    slug: "nexus-interactive-digital-experience",
    title: "NEXUS — INTERACTIVE DIGITAL EXPERIENCE",
    subtitle: "Front-End • UI/UX • Interactive Design • Web • Mobile",
    category: "Front-End • UI/UX • Interactive Design • Web • Mobile",
    year: "2025",
    role: "UI Designer • Front-End Developer • Interaction Designer",
    description: "A concept experience designed to show responsive interface design, motion-driven interaction and system thinking in a web and mobile product ecosystem.",
    challenge: "Build a polished digital experience where motion, navigation, dashboard UI and mobile responsiveness feel cohesive without sacrificing clarity.",
    objective: "Create a highly usable interface concept combining front-end UI patterns, interaction design and compelling visual hierarchy across devices.",
    process: ["Research", "Wireframe", "Component System", "Responsive Design", "Motion Refinement", "Prototype", "Testing"],
    tools: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "React Native", "Expo", "FlutterFlow", "Figma"],
    images: ["Desktop website", "Tablet view", "Mobile application", "Component system", "Interaction demo"],
    featured: true,
    nextProject: "react-native-digital-ecommerce",
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
