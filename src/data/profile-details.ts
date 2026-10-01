export type WorkDetail = {
  title: string;
  eyebrow: string;
  summary: string;
  strengths: string[];
  tools: string[];
  placeholders: string[];
};

export const workDetails: Record<string, WorkDetail> = {
  "interactive-ui-design": {
    title: "Interactive UI Design",
    eyebrow: "INTERACTIVE COMPONENTS AND ANIMATION",
    summary: "I design responsive interface components, animated states, conversational experiences, and interactive product concepts. This collection includes the REX AI Chatbot, motion-driven controls, dashboards, and experimental interface systems.",
    strengths: ["Interactive UI components and state design", "REX AI Chatbot and conversational interface concepts", "Microinteractions, transitions, and responsive animation", "Dashboard, spatial, glass, and experimental interface systems"],
    tools: ["Figma", "React", "Framer Motion", "TypeScript", "CSS Animation", "Prototyping"],
    placeholders: ["Add REX Chatbot interaction", "Add animated component system", "Add experimental interface design"],
  },
  "motion-graphic-design": {
    title: "Motion & Graphic Design",
    eyebrow: "BRANDING CAMPAIGNS AND MOTION VISUALS",
    summary: "I create promotional materials, posters, tarpaulins, social media graphics, layouts, photo enhancements, and visual assets that support communication and campaign needs. I can also build a visual story from a marketing brief, product reference, or simple concept direction.",
    strengths: ["Graphic design and layout development", "Marketing and social content support", "Photo editing, retouching, and asset preparation", "Campaign storytelling from product, character, or scene references"],
    tools: ["Adobe Photoshop", "CorelDRAW", "Adobe Creative Apps", "Canva"],
    placeholders: ["Add brand or poster artwork", "Add social media campaign set", "Add product or character-driven concept story"],
  },
  "story-creation-video-editing": {
    title: "Story Creation & Video Editing",
    eyebrow: "STORYTELLING VIDEO AND ANIMATION",
    summary: "I develop short-form video edits, GIF animations, visual presentations, subtitles, transitions, motion effects, and content treatments for digital platforms. I can shape a commercial story from a product list, a basic scene brief, or a reference moodboard and turn it into a polished motion sequence.",
    strengths: ["Video editing and visual sequencing", "GIF animation and interactive motion concepts", "Short-form promotional content", "Commercial storytelling, product scenes, and motion-first visual direction"],
    tools: ["Adobe Premiere Pro", "CapCut", "VEGAS Pro", "Filmora", "2D Animation"],
    placeholders: ["Add motion reel", "Add GIF animation", "Add commercial story sequence"],
  },
  "audio-fx-music-branding": {
    title: "Audio FX & Music Branding",
    eyebrow: "SOUND IDENTITY EDITING AND PRODUCTION",
    summary: "I work with music production, audio editing, instrumental tracks, jingle creation, sound enhancement, and basic mixing and mastering for creative media. This supports branded promos, social ads, walkthrough videos, and commercial story pacing.",
    strengths: ["Audio editing and sound enhancement", "Instrumental and jingle creation", "Basic mixing and mastering", "Music performance experience in drums, keyboard, and guitar"],
    tools: ["FL Studio", "Audio Editing", "Music Production", "Basic Mixing and Mastering"],
    placeholders: ["Add audio sample", "Add jingle or instrumental", "Add promo sound treatment"],
  },
  "design-architecture": {
    title: "Design & Architecture",
    eyebrow: "ARCHITECTURE MURAL ILLUSTRATION AND 3D",
    summary: "I explore visual studies through illustration, mural and large-scale painting, charcoal sketching, 3D concepts, CAD layouts, and architectural drafting. This includes real-estate sales visuals, 2D/3D rendition concepts, and animated visual storytelling for property marketing.",
    strengths: ["Mural art and large-scale painting", "Painting and charcoal sketching", "CAD floor plan layout and architectural drafting", "Real-estate motion visual concepts, 2D/3D rendition, and VFX support"],
    tools: ["AutoCAD", "SketchUp", "Blender", "Architectural Drafting", "CAD Floor Plan Layout"],
    placeholders: ["Add art or mural study", "Add CAD or SketchUp layout", "Add property motion concept"],
  },
  "full-stack-web-development": {
    title: "Full-Stack Web Development",
    eyebrow: "FRONT-END BACK-END AND WEB APPLICATIONS",
    summary: "I build responsive websites and web apps, from marketing pages to operational dashboards, turning designs and workflows into working tools that run in the browser.",
    strengths: ["Responsive front-end builds from Figma designs", "Next.js and React interfaces with motion and theming", "Django back ends for business workflows", "Dashboards, forms, and internal tools that replace manual processes"],
    tools: ["VS Code", "Next.js", "React", "Django", "Python", "Workflow Design"],
    placeholders: ["Add website build", "Add web app dashboard", "Add code or component showcase"],
  },
  "react-native-mobile-app": {
    title: "React Native Mobile App",
    eyebrow: "ANDROID UI APP FLOWS AND PROTOTYPES",
    summary: "I design and prototype mobile app experiences for customers, riders, and merchants, and build working no-code apps when a fast, practical tool is needed.",
    strengths: ["Mobile UI flows for ordering, delivery, and store management", "Clickable prototypes for testing before development", "No-code and low-code apps in Glide", "App-store screenshots and launch visuals"],
    tools: ["Figma", "Glide", "Workflow Design", "Process Mapping"],
    placeholders: ["Add mobile app flow", "Add Glide app screens", "Add app-store screenshot set"],
  },
  "image-editing-gifs": {
    title: "Image Editing & GIFs",
    eyebrow: "RETOUCHING COMPOSITING AND ANIMATED IMAGES",
    summary: "I edit and retouch photos for property listings, products, events, and social content, with consistent color and clean, ready-to-post exports.",
    strengths: ["Color correction and RAW processing", "Retouching, cleanup, and background removal", "Real-estate and product photo enhancement", "Cropping and grading for every social format"],
    tools: ["Adobe Photoshop", "Adobe Lightroom", "Canva"],
    placeholders: ["Add before / after edit", "Add property photo set", "Add product photo set"],
  },
};

export const careerExperience = [
  {
    role: "Building Administrator",
    organization: "Antarctica Cold Storage",
    period: "April 2017 - Present",
    description: "Coordinates daily operational and administrative activities across departments while supporting facility operations, maintenance, records, and compliance work.",
    responsibilities: ["Maintenance coordination, asset monitoring, and contractor or vendor coordination", "Sanitation inspections and food safety compliance support", "Operational issue investigation, documentation, and practical solution support", "Communication between management, employees, and cross-functional teams"],
  },
  {
    role: "IT Support, Web Development & Inventory",
    organization: "Antarctica Cold Storage",
    period: "June 2016 - March 2017",
    description: "Supported warehouse startup operations through technical support, inventory system encoding, web-based workflow development, documentation, and maintenance coordination.",
    responsibilities: ["Inventory location encoding and FIFO-based assignment", "IT troubleshooting, workstation, and network support", "Web development and digital workflow support for warehouse operations", "Warehouse documentation, maintenance, and issue coordination"],
  },
  {
    role: "Checker and Administrative Coordinator",
    organization: "Enasia Import Export Corporation",
    period: "September 2015 - May 2016",
    description: "Supported permit processing, government documentation, utility coordination, and construction-project administration.",
    responsibilities: ["Business permit and government documentation support", "Utility and facility-related coordination", "Administrative support during facility construction operations"],
  },
];

export const skillGroups = [
  { title: "Creative and Brand", tools: ["Adobe Photoshop", "CorelDRAW", "Adobe Creative Apps", "Canva", "Graphic Design", "Visual Merchandising"] },
  { title: "Motion and Video", tools: ["Adobe Premiere Pro", "CapCut", "VEGAS Pro", "Filmora", "GIF Animation", "2D Animation"] },
  { title: "Audio and Music", tools: ["FL Studio", "Audio Editing", "Music Production", "Jingle Creation", "Basic Mixing and Mastering"] },
  { title: "Product and Development", tools: ["Figma", "VS Code", "Django", "Glide", "Workflow Design", "Process Mapping"] },
  { title: "Spatial and 3D", tools: ["AutoCAD", "SketchUp", "Blender", "Architectural Drafting", "CAD Floor Plan Layout"] },
  { title: "Operations and Support", tools: ["Technical Troubleshooting", "Vendor Coordination", "Asset Monitoring", "Inventory Support", "Microsoft Office", "Google Workspace"] },
  { title: "AI Assistive Tools", tools: ["ChatGPT", "Claude", "Perplexity", "AI-assisted planning", "Prompt design"] },
];

export const roleFocuses = [
  "Full-Stack Web Developer and Graphic Designer",
  "Front-End Mobile and Web Developer",
  "Motion Graphic Artist MP4 and GIF",
  "Digital Marketing Officer",
  "Graphic Artist Visual Merchandising",
  "AutoCAD Specialist and Architectural Drafter",
  "Technical Operations Manager",
  "Interactive Animation and 2D Animator",
  "General Virtual Assistant and Phone Manager",
  "Troubleshooting and Technical Support Services",
];

export const training = [
  "Basic Training Course for Pollution Control Officers, DENR EMB PCAPI, 40 Hours",
  "HACCP and Sanitation Standard Operating Procedures, NMIS",
  "Reach Truck Safety Operation Program",
  "Solar Home Design Installation and Maintenance",
  "Loscam Pallet Care and Handling Training",
  "Pest Management Awareness Training",
];

export type CapabilityLabel = "DESIGN" | "DEVELOP" | "CREATE" | "PRODUCE";

export type CapabilityDetail = {
  headline: string;
  intro: string;
  create: string[];
  produce: string[];
  tools: string[];
};

export const capabilityMatrix: Record<CapabilityLabel, CapabilityDetail> = {
  DESIGN: {
    headline: "What I design",
    intro: "Interfaces, flows, and visual systems that make a product easy to understand and good to look at, from the first sketch to a handoff-ready screen.",
    create: ["Web and mobile UI screens", "User flows and navigation maps", "Operational dashboards", "Brand kits, posters, and social graphics", "App-store style product showcases", "CAD floor plans and layout drafts"],
    produce: ["A clickable prototype you can test before building", "A consistent look across every screen and post", "Launch visuals that explain your product at a glance", "Print-ready and screen-ready asset packs"],
    tools: ["Figma", "Adobe Photoshop", "CorelDRAW", "Canva", "AutoCAD", "SketchUp"],
  },
  DEVELOP: {
    headline: "What I develop",
    intro: "Working digital solutions built around real business workflows: websites, web apps, and internal tools that people actually use every day.",
    create: ["Responsive portfolio and business websites", "Web apps with Django back ends", "No-code and low-code apps in Glide", "Merchant, rider, and customer workflows", "Process maps turned into working tools", "Front-end builds from Figma designs"],
    produce: ["A live site your customers can visit", "Internal tools that replace spreadsheets and paper", "Automated steps that save your team time", "A clean codebase you can keep growing"],
    tools: ["VS Code", "Django", "Next.js", "Glide", "Workflow Design", "Process Mapping"],
  },
  CREATE: {
    headline: "What I create",
    intro: "Visual experiences that tell a story, from motion graphics and GIFs to murals, illustration, and 3D concepts.",
    create: ["Short-form promo videos and reels", "GIF animations and motion loops", "2D animation and explainer scenes", "Illustration, mural, and charcoal work", "3D concepts and property renditions", "Commercial story sequences from a brief"],
    produce: ["Scroll-stopping content for social platforms", "A visual story built from your product list or moodboard", "Real-estate and product visuals that sell the space", "Subtitled, platform-ready video exports"],
    tools: ["Adobe Premiere Pro", "CapCut", "VEGAS Pro", "Filmora", "Blender", "2D Animation"],
  },
  PRODUCE: {
    headline: "What I produce",
    intro: "Audio, video, and media production that gives your brand a sound and a pace, from jingles to finished promo edits.",
    create: ["Jingles and instrumental tracks", "Background music for promos and ads", "Voice and audio clean-up", "Basic mixing and mastering", "Sound design for walkthrough videos", "Full audio-plus-video promo packages"],
    produce: ["A signature sound your audience remembers", "Clear, balanced audio on every video", "Music timed to your commercial story", "Finished media ready to publish"],
    tools: ["FL Studio", "Audio Editing", "Music Production", "Mixing and Mastering", "Drums, Keys, Guitar"],
  },
};
