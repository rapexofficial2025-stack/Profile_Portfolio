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
  cover?: string;
  media?: PortfolioProjectMedia[];
  collections?: PortfolioProjectCollection[];
  finalVideo?: PortfolioProjectVideo;
  showcaseSlug?: string;
  featured: boolean;
  nextProject: string;
};

export type PortfolioProjectMedia = {
  src: string;
  title: string;
  caption: string;
};

export type PortfolioProjectVideo = {
  src: string;
  title: string;
  caption: string;
};

export type PortfolioProjectCollection = {
  id: string;
  tab: string;
  title: string;
  description: string;
  media?: PortfolioProjectMedia[];
  video?: PortfolioProjectVideo;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "digital-ecommerce",
    slug: "react-native-digital-ecommerce",
    title: "REACT NATIVE-DIGITAL ECOMMERCE",
    subtitle: "Interactive UI Design • React Native Mobile App • Workflow Design",
    category: "Interactive UI Design • React Native Mobile App • Workflow Design",
    year: "2024",
    role: "UI/UX Designer • Product Designer • Front-End UI Developer",
    description: "A fictional React Native e-commerce concept showing a synchronized order exchange between separate Customer and Merchant Android apps.",
    challenge: "Make every handoff clear as the Customer places an order, the Merchant confirms it, payment is completed, and both apps receive the final status in real time.",
    objective: "Design two polished mobile interfaces that demonstrate one shared order moving smoothly from placement to confirmation, payment, approval and completion.",
    process: ["Research", "Planning", "Concept", "Wireframe", "Design", "Production", "Development", "Testing", "Refinement"],
    tools: ["Figma", "React", "Next.js", "TypeScript", "React Native", "Expo", "AI-Assisted Development"],
    images: ["Customer places order", "Merchant confirms order", "Customer completes payment", "Merchant confirms payment", "Synchronized completion"],
    cover: "/images/projects/THUMBNAIL/reactnative-mobile.webp",
    collections: [
      {
        id: "figma-welcome-video",
        tab: "Figma Welcome",
        title: "Figma Welcome Screen Animation",
        description: "The Figma welcome-screen recording demonstrates the opening mobile interface, branded motion, and transition direction prepared for the React Native commerce experience.",
        video: {
          src: "/videos/welcome-screen-ui.mp4",
          title: "Figma Welcome Screen Animation",
          caption: "Reusable Figma welcome-screen motion for the React Native Digital Ecommerce app.",
        },
      },
      {
        id: "final-welcome-output",
        tab: "Final Welcome Output",
        title: "Final RAPEX Welcome Screen",
        description: "The final branded mobile opening combines the RAPEX character, marketplace identity, logo timing, and launch transition into a presentation-ready output.",
        video: {
          src: "/images/projects/react-native-welcome/Rapex Marketing Splash Screen 1.mp4",
          title: "Final RAPEX Welcome Screen",
          caption: "Final welcome and marketing splash output reused in the React Native Digital Ecommerce case study.",
        },
      },
    ],
    featured: true,
    nextProject: "velocity-digital-product-campaign",
  },
  {
    id: "velocity",
    slug: "velocity-digital-product-campaign",
    title: "MOTION - DIGITAL PRODUCT CAMPAIGN",
    subtitle: "Story Creation & Video Editing • Motion & Graphic Design • 2D Animation",
    category: "Story Creation & Video Editing • Motion & Graphic Design • 2D Animation",
    year: "2024",
    role: "Motion Designer • Video Editor • Creative Direction Support",
    description: "A fictional launch campaign built to showcase product storytelling through short-form video, typography, motion graphics and product transitions.",
    challenge: "Present a premium digital product with strong motion energy while keeping the communication clear, cinematic and conversion-focused.",
    objective: "Develop a clear visual campaign system with social, commercial and product-focused motion media that can translate across multiple formats.",
    process: ["Research", "Planning", "Concept", "Design", "Production", "Editing", "Motion Graphics", "Review", "Refinement"],
    tools: ["Adobe Premiere Pro", "After Effects style workflow", "VEGAS Pro", "CapCut", "Photoshop", "Rive"],
    images: ["Commercial video", "Video thumbnail", "Motion graphic frame", "Social media reel", "Vertical ad"],
    cover: "/images/projects/THUMBNAIL/thumbnail.webp",
    media: [
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/01_raw_product_table.webp", title: "Raw Product Tabletop", caption: "Original product staging frame prepared for campaign development." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/02_raw_earbuds_closeup.webp", title: "Earbuds Product Close-up", caption: "Close product composition used for detail-focused motion treatment." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/03_model_lifestyle.webp", title: "Lifestyle Model Frame", caption: "Lifestyle source image used to connect the product with its audience." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/background.webp", title: "Campaign Motion Background", caption: "Widescreen blue-and-orange environment developed as the visual foundation for the product campaign." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/clip-1.webp", title: "Audio Interface Product Panel", caption: "Curved digital panel combining the campaign palette with an animated audio-waveform concept." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/clip-2.webp", title: "Energy Ring Transition", caption: "Layered cyan and orange light trails prepared as a transition and motion-effects element." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/clip-3.webp", title: "Lifestyle Media Player", caption: "Earbud lifestyle visual presented inside a curved playback interface for the finished product story." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/graphic-motion-1.webp", title: "Motion Graphic Frame 01", caption: "Campaign frame combining product focus, typography and light effects." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/graphic-motion-2.webp", title: "Motion Graphic Frame 02", caption: "Visual development frame prepared for the short-form campaign sequence." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/graphic-motion-3.webp", title: "Motion Graphic Frame 03", caption: "Product storytelling frame with a cinematic social-ad direction." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/graphic-motion-4.webp", title: "Motion Graphic Frame 04", caption: "Motion-ready composition exploring product scale and visual energy." },
      { src: "/images/projects/visual-art/Motion-digiital Product Campaign/graphic-motion-5.webp", title: "Motion Graphic Frame 05", caption: "Final campaign still prepared for later video sequencing." },
    ],
    finalVideo: {
      src: "/videos/motion-graphic-output.mp4",
      title: "Earphone Product Demo",
      caption: "Final motion-graphics product demonstration combining cinematic product presentation, animated visual effects and campaign storytelling.",
    },
    featured: true,
    nextProject: "modern-cavite-residence",
  },
  {
    id: "realestate",
    slug: "modern-cavite-residence",
    title: "MODERN CAVITE RESIDENCE",
    subtitle: "Design & Architecture • Motion & Graphic Design • Image Editing",
    category: "Design & Architecture • Motion & Graphic Design • Image Editing",
    year: "2023",
    role: "Creative Designer • Photo Editor • Visual Storyteller",
    description: "A complete property marketing presentation designed to promote a residential concept through poster design, social media assets and walkthrough storytelling.",
    challenge: "Translate architectural features into a compelling property narrative while maintaining a premium, persuasive and highly visual property campaign.",
    objective: "Create a polished digital marketing package that can help present the property across social, print and campaign channels with consistency.",
    process: ["Research", "Planning", "Photo Enhancement", "Layout Design", "Video Production", "Social Post Design", "Final Review"],
    tools: ["Photoshop", "Lightroom", "Canva", "Premiere Pro", "CapCut", "Figma", "SketchUp"],
    images: ["Property hero", "Before / after edit", "Poster", "Social media campaign", "Property video"],
    cover: "/images/projects/THUMBNAIL/architectural-design-thumbnail.webp",
    collections: [
      {
        id: "sketchup",
        tab: "SketchUp",
        title: "From Draft Lines to Spatial Form",
        description: "The residence begins as measured drafting and a navigable three-dimensional model, establishing circulation, room relationships and scale before rendering.",
        media: [
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/sketch-up.webp", title: "SketchUp Spatial Model", caption: "Three-dimensional room planning and massing study for the two-bedroom interior." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/03-sketch-draft.webp", title: "Sketch Draft 01", caption: "Early perspective and form exploration used to define the interior direction." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/03-sketch-draft.webp", title: "Sketch Draft 02", caption: "Design development sketch refining the space, proportions and furniture placement." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/sketch-draft-3.webp", title: "Sketch Draft 03", caption: "Supporting architectural draft prepared before final visualization." },
        ],
      },
      {
        id: "interior-design",
        tab: "Interior Design",
        title: "A Warm, Natural Interior System",
        description: "Floor planning, furniture selection, natural materials and soft neutral styling are developed as one coordinated residential environment.",
        media: [
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/floor-plan.webp", title: "Dimensioned Floor Plan", caption: "AutoCAD planning study for the 32.50 sqm two-bedroom unit." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/design-clips.webp", title: "Furniture & Material Direction", caption: "Curated furniture, textile, plant and decorative references for the interior palette." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/02-raw-reference.webp", title: "Interior Design Study 02", caption: "Material and styling reference used to maintain visual consistency." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/design-clips-3.webp", title: "Interior Design Study 03", caption: "Supporting furnishing and finish direction for the residence." },
        ],
      },
      {
        id: "rendering",
        tab: "Rendering",
        title: "The Residence Brought to Life",
        description: "Finished scenes translate the technical model into warm, presentation-ready imagery with natural light, tactile surfaces and an inviting lived-in atmosphere.",
        media: [
          { src: "/images/projects/THUMBNAIL/architectural-design-thumbnail.webp", title: "Modern Cavite Residence", caption: "Primary architectural presentation cover." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/design-1.webp", title: "Living Space Render", caption: "Final warm-neutral living room visualization with natural materials and daylight." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/06-design-render.webp", title: "Interior Render 02", caption: "Presentation-ready interior view showing the completed material and lighting direction." },
          { src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-3/05-design-render.webp", title: "Interior Render 03", caption: "Final supporting view completing the residence visualization set." },
        ],
      },
      {
        id: "output",
        tab: "Output",
        title: "Interior Design Timelapse",
        description: "The final sequence presents the design development as a concise architectural visualization story.",
        video: {
          src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/timelapse-interior design.mp4",
          title: "Modern Cavite Residence — Design Timelapse",
          caption: "A visual progression from interior planning and modeling to the finished residential render.",
        },
      },
    ],
    featured: true,
    nextProject: "nova-coffee",
  },
  {
    id: "nova",
    slug: "nova-coffee",
    title: "VEANTEA COFFEE & MILKTEA",
    subtitle: "Branding • Café Promo • Social Media Design",
    category: "Branding • Café Promotion • Social Media Design",
    year: "2022",
    role: "Brand Designer • Visual Designer • Motion Creative",
    description: "A café-brand campaign for VEANTEA Coffee & Milktea, built around warm product imagery, recognizable visual identity and social-ready promotional design.",
    challenge: "Create a friendly café identity that makes milk tea and coffee products feel clear, appetizing and consistent across promotional touchpoints.",
    objective: "Develop a cohesive VEANTEA campaign direction for brand presentation, café promotion and social media artwork.",
    process: ["Brand Research", "Café Visual Direction", "Product Composition", "Color Development", "Social Creative", "Campaign Mockup"],
    tools: ["Photoshop", "CorelDRAW", "Branding", "Photo Compositing", "Social Media Design"],
    images: ["VEANTEA brand direction", "Café promo composition", "Coffee and milktea product study", "Social media campaign art", "Final campaign mockup"],
    cover: "/images/projects/THUMBNAIL/VEANTEA COFFEE.webp",
    media: [
      { src: "/images/projects/motion-graphic-design/veantea-coffee/matcha-final.webp", title: "Matcha Final Campaign", caption: "Final edited VEANTEA Matcha composition prepared for café and social promotion." },
      { src: "/images/projects/motion-graphic-design/veantea-coffee/match-1.webp", title: "Matcha Campaign 01", caption: "Edited product-promotion image from the VEANTEA Matcha campaign." },
      { src: "/images/projects/motion-graphic-design/veantea-coffee/match-2.webp", title: "Matcha Campaign 02", caption: "Supporting edited composition expanding the campaign visual system." },
      { src: "/images/projects/motion-graphic-design/veantea-coffee/match-3.webp", title: "Matcha Campaign 03", caption: "Social-ready VEANTEA product artwork with coordinated branding." },
      { src: "/images/projects/motion-graphic-design/veantea-coffee/match-4.webp", title: "Matcha Campaign 04", caption: "Edited promotional image balancing product, atmosphere, and campaign typography." },
      { src: "/images/projects/motion-graphic-design/veantea-coffee/match-5.webp", title: "Matcha Campaign 05", caption: "Additional café campaign layout prepared for digital promotion." },
      { src: "/images/projects/motion-graphic-design/veantea-coffee/match-6.webp", title: "Matcha Campaign 06", caption: "Final supporting image in the edited VEANTEA Matcha series." },
    ],
    featured: true,
    nextProject: "savor-house-restaurant-web-experience",
  },
  {
    id: "savor-house",
    slug: "savor-house-restaurant-web-experience",
    title: "SAVOR HOUSE — RESTAURANT WEB EXPERIENCE",
    subtitle: "Full-Stack Web Development • Interactive UI Design • Brand Storytelling",
    category: "Full-Stack Web Development • Interactive UI Design • Brand Experience",
    year: "2025",
    role: "Experience Designer • Brand Designer • Front-End UI Developer",
    description: "A warm, editorial restaurant website concept built to make the menu feel desirable, reservations feel effortless and the brand feel memorable before the first visit.",
    challenge: "Balance appetite-led visual storytelling with practical needs such as menu scanning, location discovery, opening hours, private dining and table reservations.",
    objective: "Create a mobile-first restaurant experience with a confident visual identity, fast content scanning and clear calls to action across dine-in, takeaway and event journeys.",
    process: ["Brand Discovery", "Content Planning", "Menu Architecture", "Wireframe", "Art Direction", "Responsive UI", "Interaction Design", "Prototype Review"],
    tools: ["Figma", "React", "Next.js", "TypeScript", "Photoshop", "Lightroom"],
    images: ["Restaurant landing page", "Menu browsing interface", "Signature dish story", "Reservation flow", "Private dining page"],
    cover: "/images/projects/image-editing-gifs/before-after/Resto-menu/finish-menu/Cover.webp",
    featured: true,
    nextProject: "airholo-v1-2-interactive-digital-experience",
  },
  {
    id: "airholo",
    slug: "airholo-v1-2-interactive-digital-experience",
    title: "AIRHOLO Prototype v 1.0",
    subtitle: "Experimental Interface Design",
    category: "Interactive UI Design • Computer Vision • Experimental Interface",
    year: "2026",
    role: "Interaction Designer • Front-End Developer • Creative Technologist",
    description: "AIRHOLO Prototype v 1.0 is a futuristic holographic interface concept that transforms live hand and fingertip movement into responsive digital control through private, client-side computer vision.",
    challenge: "Convert noisy hand-landmark data into deliberate interactions that feel stable, readable and responsive while keeping the camera feed entirely on the visitor's device.",
    objective: "Create an immersive holographic interface where hand and fingertip movement can control digital content, supported by immediate geometric feedback, clear calibration states and a futuristic visual language.",
    process: ["Interaction Research", "Gesture Mapping", "Landmark Smoothing", "Interface System", "Camera Calibration", "Prototype", "Usability Testing"],
    tools: ["Next.js", "React", "TypeScript", "MediaPipe Tasks Vision", "Canvas", "Framer Motion", "CSS"],
    images: ["Gesture calibration", "Live fingertip tracking", "Pinch interaction state", "Holographic interface system"],
    cover: "/images/projects/THUMBNAIL/air-holo.webp",
    showcaseSlug: "airholo-gesture-lab",
    featured: true,
    nextProject: "react-native-digital-ecommerce",
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
