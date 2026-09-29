export type ShowcaseMock = "admin" | "business" | "invitation" | "library" | "splash" | "frost";

export type WebShowcase = {
  slug: string;
  mock: ShowcaseMock;
  /** frame the live mockup opens in */
  defaultDevice: "web" | "mobile";
  url: string;
  summary: string;
  stack: string[];
  interactions: string[];
  /** placeholder labels until the real raw files are added */
  rawFiles: string[];
  beforeAfter: { label: string; before: string; after: string }[];
  videos?: { src: string; label: string }[];
  challenge?: string;
  solution?: string;
  keyFeatures?: string[];
};

export const webShowcases: WebShowcase[] = [
  {
    slug: "rapex-admin-saas",
    mock: "admin",
    defaultDevice: "web",
    url: "admin.rapex.app/overview",
    summary: "An admin console for the RAPEX delivery marketplace. Operators watch the day's numbers, filter live orders, switch merchants on or off and see which riders are online, on desktop or on the go.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma"],
    interactions: ["Switch between Overview, Orders, Merchants and Riders", "Filter orders by status", "Toggle merchants and riders on and off", "Hover the weekly chart for daily totals"],
    rawFiles: ["Figma dashboard file", "Wireframes", "Order flow map", "Icon set", "Color and type tokens", "Desktop export", "Mobile export", "Data table spec"],
    beforeAfter: [
      { label: "Orders table", before: "Spreadsheet export", after: "Filterable live table" },
      { label: "Overview", before: "First wireframe", after: "Final KPI dashboard" },
    ],
  },
  {
    slug: "business-website",
    mock: "business",
    defaultDevice: "web",
    url: "northwind.studio",
    summary: "A marketing website for a small creative studio. It explains the services, compares plans, shows client quotes and turns visitors into leads with a contact form that checks input before sending.",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "SEO"],
    interactions: ["Open the mobile menu", "Switch pricing between monthly and yearly", "Step through testimonials", "Submit the contact form (validates fields)"],
    rawFiles: ["Brand moodboard", "Sitemap", "Homepage wireframe", "Photography picks", "Logo files", "Desktop comps", "Mobile comps", "Copy deck"],
    beforeAfter: [
      { label: "Homepage", before: "Old template site", after: "Redesigned landing page" },
      { label: "Contact", before: "Email link only", after: "Validated lead form" },
    ],
  },
  {
    slug: "invitation-paper-engine",
    mock: "invitation",
    defaultDevice: "web",
    url: "paper.rapex.app/editor",
    summary: "A browser-based invitation maker that renders cards on realistic paper. Guests' details are typed into a form and appear on the card instantly, and the finished card opens like the real thing.",
    stack: ["React", "TypeScript", "CSS 3D transforms", "Canvas export"],
    interactions: ["Choose a paper template", "Type names, date and venue to update the card live", "Open and close the card"],
    rawFiles: ["Paper textures", "Template sketches", "Typography pairings", "Floral ornaments", "Envelope mockup", "Print proof", "Export sizes", "Editor wireframe"],
    beforeAfter: [
      { label: "Card render", before: "Flat PDF template", after: "Textured paper engine" },
      { label: "Editor", before: "Manual Photoshop edit", after: "Live form editor" },
    ],
  },
  {
    slug: "component-library",
    mock: "library",
    defaultDevice: "web",
    url: "ui.rapex.app/components",
    summary: "A shared set of interface components used across RAPEX products, so every screen looks and behaves the same. Each component documents its variants, states and how to use it.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Figma tokens"],
    interactions: ["Browse Buttons, Inputs and Feedback", "Try variants, sizes and loading states", "Flip toggles, checkboxes and radios", "Trigger a toast and copy usage code"],
    rawFiles: ["Figma component sheet", "Design tokens", "Spacing scale", "Icon grid", "State matrix", "Accessibility checklist", "Storybook screenshots", "Usage docs"],
    beforeAfter: [
      { label: "Buttons", before: "Inconsistent one-offs", after: "Unified variants" },
      { label: "Forms", before: "Unstyled inputs", after: "Accessible form set" },
    ],
  },
  {
    slug: "react-native-welcome",
    mock: "splash",
    defaultDevice: "mobile",
    url: "RAPEX app · onboarding",
    summary: "The first minute of a mobile app: an animated splash screen, a three-step welcome carousel and a clean sign-in, designed and built for React Native.",
    stack: ["React Native", "Expo", "Reanimated", "Figma", "Motion design"],
    interactions: ["Watch the splash animation", "Swipe through onboarding with Next and Skip", "Fill in the sign-in screen", "Restart the flow"],
    rawFiles: ["Splash storyboard", "Logo animation frames", "Onboarding illustrations", "Screen flow", "Figma prototype", "App icon set", "Lottie exports", "Device captures"],
    beforeAfter: [
      { label: "Splash", before: "Static logo", after: "Animated splash" },
      { label: "Onboarding", before: "Text-only screens", after: "Illustrated carousel" },
    ],
    videos: [
      { src: "/videos/Splash Screen.mp4", label: "Splash screen" },
      { src: "/videos/welcome-screen-ui.mp4", label: "Welcome screen UI" },
    ],
  },
  {
    slug: "frost-twin-wms",
    mock: "frost",
    defaultDevice: "web",
    url: "frost-twin.local/operations",
    summary: "FROST TWIN WMS is an interactive warehouse digital twin concept that connects fast daily operations, precise pallet locations and a lightweight spatial view in one desktop-first interface.",
    challenge: "Warehouse teams need to understand room capacity, pallet condition and exact rack locations without translating between disconnected spreadsheets, printed maps and complex 3D tools.",
    solution: "A front-end prototype that begins with an operational overview, opens a precise 2D rack board for daily work, and provides a separate procedural 3D twin for spatial inspection.",
    keyFeatures: ["10-room operations overview", "840-cell Room 1 rack board", "Procedural cold and dry 3D twins", "Mock QR center", "Withdrawal and relocation simulations"],
    stack: ["Next.js", "React", "TypeScript", "React Three Fiber", "Drei", "Mock data"],
    interactions: ["Select any room to open its 2D rack board", "Search and select pallet locations", "Open the procedural 3D twin", "Generate or scan a mock QR", "Simulate withdrawal and relocation"],
    rawFiles: ["Warehouse information architecture", "Rack location convention", "Operations wireframe", "Cold storage palette", "Digital twin scene map", "Pallet status matrix", "QR flow", "Interaction notes"],
    beforeAfter: [
      { label: "Room operations", before: "Spreadsheet and printed rack map", after: "Searchable 2D operations board" },
      { label: "Spatial inspection", before: "Location code only", after: "Linked procedural 3D twin" },
    ],
  },
];

export const getWebShowcase = (slug: string) => webShowcases.find((showcase) => showcase.slug === slug);
