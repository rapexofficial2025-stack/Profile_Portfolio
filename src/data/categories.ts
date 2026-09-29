export type CategoryIconName = "product" | "graphic" | "motion" | "audio" | "visual" | "web" | "mobile" | "photo";

export type PortfolioSample = {
  title: string;
  type: string;
  description: string;
  /** set when the sample has its own detail screen at /work/category/[category]/[slug] */
  slug?: string;
};

export type PortfolioCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: CategoryIconName;
  image: string;
  samples: PortfolioSample[];
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "product-design",
    title: "Product Design",
    description: "RAPEX & Digital Products",
    href: "/work/category/product-design",
    icon: "product",
    image: "/images/work/work-ui-design.png",
    samples: [
      { title: "RAPEX Marketplace", type: "UX System", description: "Marketplace, rider, and merchant platform flow." },
      { title: "Merch Portal", type: "Dashboard", description: "Merchant operations and revenue management UX." },
      { title: "Delivery OS", type: "Workflow", description: "Operational logic, route, and fulfillment interface." },
      { title: "Store POS", type: "UI Concept", description: "Mini POS, checkout, and transaction experience." },
      { title: "App Store Concept", type: "Launch Page", description: "Google Play-style feature showcase and product presentation." },
    ],
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Branding & Marketing",
    href: "/work/category/graphic-design",
    icon: "graphic",
    image: "/images/work/work-digital-art.png",
    samples: [
      { title: "Nova Coffee", type: "Brand Campaign", description: "Identity system, packaging, and social campaign art." },
      { title: "City Line Poster", type: "Print Design", description: "Poster series for launch and digital promos." },
      { title: "Property Promo", type: "Ad Creative", description: "Real-estate ad layouts for digital and print assets." },
      { title: "Retail Banner", type: "Display", description: "Marketing visual designed for storefront and online promotion." },
      { title: "Offer Creative", type: "Social Set", description: "Product-driven promo design with clear hierarchy and CTA." },
    ],
  },
  {
    id: "motion",
    title: "Motion Graphics",
    description: "Video & Animation",
    href: "/work/category/motion",
    icon: "motion",
    image: "/images/work/work-video-production.png",
    samples: [
      { title: "Velocity Reel", type: "Commercial", description: "15s and 30s product launch visuals with motion typography." },
      { title: "Brand Reveal", type: "Logo Motion", description: "Animated identity intro and transition treatment." },
      { title: "Property Walkthrough", type: "Real Estate", description: "Animated visual story for homes and condo features." },
      { title: "Promo Sequence", type: "Social Ad", description: "Short-form vertical ad with text animation and product emphasis." },
      { title: "Transition Pack", type: "Motion FX", description: "Business-ready format for transitions and visual effects." },
    ],
  },
  {
    id: "audio",
    title: "Audio & Music",
    description: "Editing & Production",
    href: "/work/category/audio",
    icon: "audio",
    image: "/images/work/work-music-production.png",
    samples: [
      { title: "Brand Jingle", type: "Audio Intro", description: "Short-form sound identity for campaigns and promos." },
      { title: "Podcast Edit", type: "Audio Cleanup", description: "Clean narration, noise reduction, and pacing adjustments." },
      { title: "Launch Mix", type: "Music Bed", description: "Modern intro track with commercial energy and polish." },
      { title: "Promo Sound", type: "SFX Design", description: "Short transitional sound design for online media pieces." },
      { title: "Narration Draft", type: "Voiceover", description: "Voice-led content for product stories and walkthroughs." },
    ],
  },
  {
    id: "visual-art",
    title: "Visual Art",
    description: "Illustration, Mural, 3D",
    href: "/work/category/visual-art",
    icon: "visual",
    image: "/images/work/work-architecture-3d.png",
    samples: [
      { title: "Architect View", type: "3D Renders", description: "Concept render and spatial design for real-estate ideas." },
      { title: "Mural Study", type: "Illustration", description: "Large-format concept and mood exploration for events." },
      { title: "Product Concept", type: "3D Pack", description: "Packaging and campaign concept visual development." },
      { title: "Sketchbook", type: "Idea Board", description: "Character, scene, and product mood board explorations." },
      { title: "Scene Frame", type: "Environment", description: "Visual storytelling set for motion and promotional content." },
    ],
  },
 {
    id: "web-development",
    title: "Web Development",
    description: "Front-End & Web Apps",
    href: "/work/category/web-development",
    icon: "web",
    image: "/images/work/work-web-development.png",
    samples: [
      { slug: "rapex-admin-saas", title: "RAPEX Admin SaaS", type: "Platform", description: "Operations dashboard for the RAPEX marketplace: orders, merchants, riders and live KPIs." },
      { slug: "business-website", title: "Business Website", type: "Marketing Site", description: "Responsive company site with services, pricing, testimonials and a validated contact form." },
      { slug: "invitation-paper-engine", title: "Invitation Card Paper Engine", type: "Web App", description: "Design an invitation on real-looking paper: pick a template, type the details, open the card." },
      { slug: "component-library", title: "Component Library", type: "UI Kit", description: "Reusable buttons, inputs, toggles, tabs and toasts with states, variants and copyable usage." },
      { slug: "react-native-welcome", title: "React Native Welcome & Splash", type: "Mobile UI/UX", description: "Animated splash, onboarding carousel and sign-in flow designed for a React Native app." },
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description: "App UI & Prototypes",
    href: "/work/category/mobile-apps",
    icon: "mobile",
    image: "/images/work/work-mobile-apps.png",
    samples: [
      { title: "Food Ordering App", type: "Customer App", description: "Menu browsing, cart, and checkout flow for quick ordering." },
      { title: "Rider Companion", type: "Driver App", description: "Job queue, navigation hand-off, and delivery status updates." },
      { title: "Merchant Mobile", type: "Store App", description: "Orders, stock, and sales at a glance for shop owners." },
      { title: "Glide Field App", type: "No-Code App", description: "Checklists and reports for on-site teams built in Glide." },
      { title: "App Store Screens", type: "Store Listing", description: "Feature screenshots and preview frames for app launch." },
    ],
  },
  {
    id: "photography",
    title: "Photography",
    description: "Photo Editing & Retouch",
    href: "/work/category/photography",
    icon: "photo",
    image: "/images/work/work-photography.png",
    samples: [
      { title: "Property Shoot", type: "Real Estate", description: "Bright, straightened interior and exterior photos for listings." },
      { title: "Product Photos", type: "E-commerce", description: "Clean backgrounds and consistent color for online stores." },
      { title: "Before / After", type: "Retouching", description: "Color correction, cleanup, and enhancement of raw shots." },
      { title: "Event Coverage", type: "Photo Set", description: "Selected and graded highlights from events and launches." },
      { title: "Social Crops", type: "Content Pack", description: "Photos cropped and graded for feed, story, and banner sizes." },
    ],
  },
];
