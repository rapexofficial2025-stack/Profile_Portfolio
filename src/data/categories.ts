export type CategoryIconName = "product" | "graphic" | "motion" | "audio" | "visual" | "web" | "mobile" | "photo";

export type PortfolioSample = {
  title: string;
  type: string;
  description: string;
  /** optional project/reference artwork used by collection cards and viewers */
  cover?: string;
  /** set when the sample has its own detail screen at /work/category/[category]/[slug] */
  slug?: string;
  /** set when the sample reuses a project from the main /work/[slug] collection */
  workSlug?: string;
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
    id: "interactive-ui-design",
    title: "Interactive UI Design",
    description: "Interactive Components & Animation",
    href: "/work/category/interactive-ui-design",
    icon: "product",
    image: "/images/work/work-ui-design.png",
    samples: [
      { title: "AI CHAT BOT", type: "Chatbot Support · GIF Loading Screen", description: "A support-chatbot interface paired with a custom animated loading experience, responsive assistant states, and polished visual feedback.", cover: "/images/projects/interactive-bot/bot-1.png" },
      { title: "Interactive Component Lab", type: "UI Components", description: "Buttons, cards, controls, loaders, and responsive components with polished interaction states." },
      { title: "Animation & 3D Modeling", type: "Character Rigging · Blender · Lottie", description: "A model-to-motion study using Blender character rigging, rig controls, animation tests, and lightweight Lottie exports for interactive digital experiences.", cover: "/images/projects/design-architecture/sketchbook/rex-model.png" },
      { title: "Smart Dashboard Interactions", type: "Data Interface", description: "Animated panels, live status feedback, filters, charts, and operational controls." },
      { slug: "airholo-gesture-lab", title: "AIRHOLO Prototype v 1.0", type: "Experimental Interface Design", description: "A futuristic holographic interface concept where users can control digital surfaces through hand and fingertip movement.", cover: "/images/projects/THUMBNAIL/air-holo.png" },
      { slug: "invitation-paper-engine", title: "Invitation Card Paper Engine", type: "Interactive Paper UI", description: "A tactile invitation experience with realistic paper layers, editable details, a card-opening interaction and embedded media.", cover: "/images/projects/THUMBNAIL/invitation-card.png" },
    ],
  },
  {
    id: "motion-graphic-design",
    title: "Motion & Graphic Design",
    description: "Branding, Campaigns & Motion Visuals",
    href: "/work/category/motion-graphic-design",
    icon: "graphic",
    image: "/images/work/work-digital-art.png",
    samples: [
      { title: "VEANTEA Coffee & Milktea", type: "Brand Campaign", description: "Café identity, coffee and milktea promotion, and social campaign art.", cover: "/images/projects/THUMBNAIL/VEANTEA COFFEE.png" },
      { workSlug: "velocity-digital-product-campaign", title: "Product Promotion", type: "Motion · Digital Product Campaign", description: "A complete product-promotion campaign combining cinematic visuals, motion graphics, social media frames, and a finished product demonstration video.", cover: "/images/projects/THUMBNAIL/thumbnail.png" },
      { title: "Property Promo", type: "Ad Creative", description: "Real-estate ad layouts for digital and print assets." },
      { title: "Retail Banner", type: "Display", description: "Marketing visual designed for storefront and online promotion." },
      { title: "Motion Sisig Promotion", type: "Food Promotion · Motion Frames", description: "A bold, comic-inspired Sisig promotion assembled through layered food, steam, brand, typography, and price frames.", cover: "/images/projects/motion-graphic-design/motion-Sisig/clip 4.png" },
    ],
  },
  {
    id: "story-creation-video-editing",
    title: "Story Creation & Video Editing",
    description: "Storytelling, Editing & Animation",
    href: "/work/category/story-creation-video-editing",
    icon: "motion",
    image: "/images/work/work-video-production.png",
    samples: [
      { title: "Velocity Reel", type: "Commercial", description: "15s and 30s product launch visuals with motion typography." },
      { title: "Market Ads", type: "Content Marketing · Social Advertising", description: "A content-creator advertising system developed from separated visual assets into a polished campaign composition.", cover: "/images/projects/story-creation-video-editing/Market-Ads/finish.png" },
      { title: "Property Walkthrough", type: "Real Estate", description: "Animated visual story for homes and condo features.", cover: "/images/projects/story-creation-video-editing/property-walkthrough/cover-content-editing.png" },
      { title: "Story Ads Promotion", type: "Story-Based Social Ad", description: "A short-form promotional story developed through staged narrative frames, visual pacing, and a finished branded video sequence.", cover: "/images/projects/story-creation-video-editing/promo-sequence/check time.png" },
      { title: "Transition Pack", type: "Motion FX", description: "Business-ready format for transitions and visual effects." },
    ],
  },
  {
    id: "audio-fx-music-branding",
    title: "Audio FX & Music Branding",
    description: "Sound Identity, Editing & Production",
    href: "/work/category/audio-fx-music-branding",
    icon: "audio",
    image: "/images/work/work-music-production.png",
    samples: [
      { title: "Takeshi's Jingle Song", type: "Restaurant Jingle · Music Branding", description: "A Sakura-themed restaurant jingle developed through vocal editing, arrangement, mixing, mastering, and final branded audio output.", cover: "/images/projects/audio-fx-music-branding/takeshis-jingle-song/Cover-iamge.png" },
      { title: "Pampanga Music Fest", type: "Festival Music Editing · Event Branding", description: "A complete local-festival music production presented through cover artwork, five mix-development stages, and the final mastered MP3.", cover: "/images/projects/audio-fx-music-branding/Pampanga Music Fest 2025/pampanga-local-fest.png" },
      { title: "Kaibigan ng Masa Branding", type: "Campaign Music · Audio Branding", description: "A high-energy RAPEX campaign identity pairing the Kaibigan ng Masa brand artwork with its completed original theme song.", cover: "/images/projects/audio-fx-music-branding/kaibigan-ng-masa-brand-song/cover photo.png" },
      { title: "Promo Sound", type: "SFX Design", description: "Short transitional sound design for online media pieces." },
      { title: "Narration Draft", type: "Voiceover", description: "Voice-led content for product stories and walkthroughs." },
    ],
  },
  {
    id: "design-architecture",
    title: "Design & Architecture",
    description: "Architecture, Mural, Illustration & 3D",
    href: "/work/category/design-architecture",
    icon: "visual",
    image: "/images/work/work-architecture-3d.png",
    samples: [
      { title: "Heart of Architecture", type: "3D Renders · Floor Plans · Interior Design · SketchUp Drafting", description: "Spatial ideas shaped from the first measured line to atmospheric architectural visualization." },
      { title: "Mural Concept and Draft Design", type: "Mural Concept · Draft Design", description: "Large-scale visual stories developed from blank-wall references through mural concepts, grid studies, and final presentation designs.", cover: "/images/projects/visual-art/art-on-walls/output-wall-2.png" },
      { title: "Product & Brand Promotion", type: "Product Art · Campaign Design", description: "Product-focused visuals that unite brand identity, storytelling, and promotion into one campaign-ready system.", cover: "/images/projects/design-architecture/product-and-brand-promotion/architecture-feature.png" },
      { title: "Imagination Beyond Dimensions", type: "Sketchbook · 3D Exploration", description: "A working laboratory where sketches, characters, forms, and digital experiments evolve beyond the page." },
      { title: "Products Become Headlines", type: "Hero Visuals · Advertising", description: "Cinematic product frames composed to stop the scroll, lead the story, and turn attention into interest." },
    ],
  },
 {
    id: "full-stack-web-development",
    title: "Full-Stack Web Development",
    description: "Front-End, Back-End & Web Applications",
    href: "/work/category/full-stack-web-development",
    icon: "web",
    image: "/images/work/work-web-development.png",
    samples: [
      { slug: "ecommerce-portal", title: "Ecommerce Portal", type: "Merchant Portal · Marketplace Commerce", description: "A complete ecommerce ecosystem connecting customer storefronts with merchant product, order, inventory, promotion, analytics and store-management tools.", cover: "/images/projects/full-stack-web-development/business-portal-commerce/web-portal.png" },
      { slug: "business-website", title: "Business Website", type: "Marketing Site", description: "Responsive company site with services, pricing, testimonials and a validated contact form.", cover: "/images/projects/THUMBNAIL/business-website.png" },
      { slug: "component-library", title: "Component Library", type: "UI Kit", description: "Reusable buttons, inputs, toggles, tabs and toasts with states, variants and copyable usage." },
      { slug: "react-native-welcome", title: "React Native Welcome & Splash", type: "Mobile UI/UX", description: "Animated splash, onboarding carousel and sign-in flow designed for a React Native app.", cover: "/images/references/783028333_1682308237234588_3432252115736004498_n.jpg" },
      { slug: "frost-twin-wms", title: "TWIN WMS", type: "Interactive Warehouse Digital Twin", description: "A light, desktop-first warehouse operations prototype with a 2D rack board, procedural 3D twin, QR mockup and browser-only workflows.", cover: "/images/projects/THUMBNAIL/twin-WMS.png" },
      { slug: "rapex-dash", title: "RAPEX DASH", type: "Interactive 3D Browser Game", description: "A neon arcade courier runner with pickup missions, tactical GPS, traffic, vehicle progression, boost controls, and a portfolio-ready playable preview.", cover: "/images/projects/THUMBNAIL/rapex-dash.png" },
    ],
  },
  {
    id: "react-native-mobile-app",
    title: "React Native Mobile App",
    description: "Android UI, App Flows & Prototypes",
    href: "/work/category/react-native-mobile-app",
    icon: "mobile",
    image: "/images/work/work-mobile-apps.png",
    samples: [
      { title: "React Native Product Design", type: "Merchant App · Category & Product UX", description: "A merchant-focused React Native product flow covering store-category selection, visual category design, product management and mobile interface refinement.", cover: "/images/projects/react-native-mobile-app/category-design/output-category.png" },
      { title: "Food Ordering App", type: "Customer App", description: "Restaurant discovery, menu browsing, cart, payment, delivery tracking, and order history in one complete mobile flow.", cover: "/images/projects/react-native-mobile-app/food-app/796569023_1694454402686638_3407958068666393486_n.jpg" },
      { title: "AutoCare Service Booking", type: "Service App", description: "A polished vehicle-care journey from service discovery and scheduling to booking status, history, and account management.", cover: "/images/projects/react-native-mobile-app/auto-care/auto0care-refrence.jpg" },
      { title: "Hotel Booking App", type: "Travel App", description: "A mobile accommodation experience covering discovery, property details, reservations, and booking management.", cover: "/images/projects/react-native-mobile-app/book-hotel/803101716_1700410395424372_8706990411342269946_n.jpg" },
      { title: "Pet Care Companion", type: "Lifestyle App", description: "Friendly pet-care screens for daily needs, services, health reminders, profiles, and owner guidance.", cover: "/images/projects/react-native-mobile-app/pet-app/800965452_1698624305602981_7556082989992358062_n.jpg" },
      { title: "Travel & SaveIt Concepts", type: "Utility App", description: "A reference-led mobile concept set exploring travel content, saved media, downloads, browsing, and account flows.", cover: "/images/projects/react-native-mobile-app/travel-saveit/806022186_1707437644721647_9136850791000651797_n.jpg" },
    ],
  },
  {
    id: "image-editing-gifs",
    title: "Image Editing & GIFs",
    description: "Retouching, Compositing & Animated Images",
    href: "/work/category/image-editing-gifs",
    icon: "photo",
    image: "/images/work/work-photography.png",
    samples: [
      { title: "Cold Storage Photography & Image Editing", type: "Facility Photography · Marketing Composites", description: "Cold-storage facility photography developed into polished promotional visuals, campaign layouts, and branded presentation assets.", cover: "/images/projects/cold-storage/clip-1.png" },
      { title: "Property Shoot", type: "Real Estate Photography", description: "Raw property photographs prepared as a complete listing set, with a direct link to the finished Architectural Interior Design.", cover: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-file/772614632_29118043094451487_2513672691116936793_n.jpg" },
      { title: "Product Photos", type: "E-commerce", description: "Clean backgrounds and consistent color for online stores." },
      { title: "Before / After", type: "Retouching", description: "Color correction, cleanup, and enhancement of raw shots." },
      { title: "Event Coverage", type: "Photo Set", description: "Selected and graded highlights from events and launches." },
      { title: "Social Crops", type: "Content Pack", description: "Photos cropped and graded for feed, story, and banner sizes." },
    ],
  },
];
