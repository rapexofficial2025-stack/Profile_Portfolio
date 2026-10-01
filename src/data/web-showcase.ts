export type ShowcaseMock = "portal" | "business" | "invitation" | "library" | "splash" | "frost" | "airholo" | "game";

export type RawFileItem = string | {
  label: string;
  kind: "image" | "component";
  src?: string;
  preview?: "invitation-auto-loop";
  description: string;
};

export type WebShowcase = {
  slug: string;
  mock: ShowcaseMock;
  /** frame the live mockup opens in */
  defaultDevice: "web" | "mobile";
  url: string;
  summary: string;
  stack: string[];
  interactions: string[];
  /** source assets and CSS-made supporting component studies */
  rawFiles: RawFileItem[];
  beforeAfter: { label: string; before: string; after: string }[];
  videos?: { src: string; label: string }[];
  gallery?: { src: string; title: string; caption: string }[];
  challenge?: string;
  solution?: string;
  keyFeatures?: string[];
};

export const webShowcases: WebShowcase[] = [
  {
    slug: "ecommerce-portal",
    mock: "portal",
    defaultDevice: "web",
    url: "commerce.portal/dashboard",
    summary: "A full ecommerce portal spanning the customer marketplace and merchant operations. The system brings product discovery, catalog management, orders, inventory, promotions, storefront customization and performance analytics into one connected web experience.",
    challenge: "Customers and merchants need different interfaces, but both sides must share one understandable commerce journey from discovery and checkout to catalog control, fulfillment and business growth.",
    solution: "A coordinated portal system pairs a polished customer storefront with an operational merchant dashboard, consistent navigation, commerce status feedback and campaign-ready promotional visuals.",
    keyFeatures: ["Customer marketplace and product discovery", "Merchant dashboard and sales analytics", "Product, order and inventory management", "Store customization and promotions", "Connected customer-to-merchant commerce flow"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Ecommerce UX", "Figma"],
    interactions: ["Browse marketplace categories and featured products", "Review individual product and cart layouts", "Manage merchant products, orders and inventory", "Track sales, customers and channel performance"],
    gallery: [
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/web-portal.webp", title: "Merchant Product Management", caption: "Unified product catalog, order queue, inventory, promotions and storefront controls." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/web-portal-2.webp", title: "Merchant Commerce Dashboard", caption: "Sales, customer, channel, stock and marketing performance in one operational view." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/web-portal-3.webp", title: "Connected Commerce Ecosystem", caption: "Customer shopping and merchant fulfillment presented as one end-to-end workflow." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/web-portal-4.webp", title: "Marketplace Home", caption: "Category navigation, campaign storytelling and featured-product discovery." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/web-portal-5.webp", title: "Product Detail and Cart", caption: "Product gallery, variants, purchasing controls, recommendations and checkout summary." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/web-portal-6.webp", title: "Merchant Growth Portal", caption: "Store customization, commerce KPIs, orders, stock alerts and quick business actions." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/web-portal-7.webp", title: "Customer Storefront", caption: "A refined ecommerce landing page for categories, campaigns and product conversion." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/portal-promotion/portal-1.webp", title: "Portal Promotion 01", caption: "Campaign-ready ecommerce portal presentation artwork." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/portal-promotion/portal-2.webp", title: "Portal Promotion 02", caption: "Promotional composition highlighting the digital storefront experience." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/portal-promotion/portal-3.webp", title: "Portal Promotion 03", caption: "Commerce platform visual prepared for product and campaign storytelling." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/portal-promotion/portal-4.webp", title: "Portal Promotion 04", caption: "Marketing visual presenting the portal across a premium digital environment." },
      { src: "/images/projects/full-stack-web-development/business-portal-commerce/portal-promotion/portal-5.webp", title: "Portal Promotion 05", caption: "Final promotional frame for the ecommerce portal collection." },
    ],
    rawFiles: ["Customer marketplace flow", "Merchant operations dashboard", "Product and checkout screens", "Commerce system map", "Promotional campaign set"],
    beforeAfter: [
      { label: "Commerce operations", before: "Disconnected store-management tasks", after: "Unified merchant portal" },
      { label: "Customer journey", before: "Separate product pages and promotions", after: "Connected marketplace experience" },
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
    rawFiles: [
      { label: "Paper texture", kind: "image", src: "/images/projects/interactive-ui-design/invitation-paper-engine/table.webp", description: "The wooden presentation surface used below the layered invitation." },
      { label: "Invitation composition", kind: "image", src: "/images/projects/interactive-ui-design/invitation-paper-engine/interactive-invitation-asset/1st generate.webp", description: "Source composition showing the full christening invitation, photo frame, note and church artwork." },
      { label: "Frame background", kind: "image", src: "/images/projects/interactive-ui-design/invitation-paper-engine/interactive-invitation-asset/frame-background.webp", description: "The decorative frame layer for the card artwork." },
      { label: "Cover artwork", kind: "image", src: "/images/projects/interactive-ui-design/invitation-paper-engine/interactive-invitation-asset/cover.webp", description: "Front cover image used by the physical card reveal." },
      { label: "Inside page artwork", kind: "image", src: "/images/projects/interactive-ui-design/invitation-paper-engine/interactive-invitation-asset/inside.webp", description: "Interior page layer for the card-opening sequence." },
      { label: "Left page layer", kind: "image", src: "/images/projects/interactive-ui-design/invitation-paper-engine/interactive-invitation-asset/left-page.webp", description: "Left page artwork supporting the message and video moment." },
      { label: "Invitation editor wireframe", kind: "image", src: "/images/projects/interactive-ui-design/invitation-paper-engine/invitation wire frame.webp", description: "Annotated wireframe for the invitation builder, editor controls, live two-page canvas and preview actions." },
      { label: "Automated card movement", kind: "component", preview: "invitation-auto-loop", description: "A presentation-only TSX animation that automatically opens, holds and closes the layered invitation in a continuous loop." },
    ],
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
    slug: "frost-twin-wms",
    mock: "frost",
    defaultDevice: "web",
    url: "twin-wms.local/operations",
    summary: "TWIN WMS is an interactive warehouse digital twin concept that connects daily operations, precise pallet locations and a lightweight spatial view in one polished desktop-first interface.",
    challenge: "Warehouse teams need to understand room capacity, pallet condition and exact rack locations without translating between disconnected spreadsheets, printed maps and complex 3D tools.",
    solution: "A front-end prototype that begins with an operational overview, opens a precise 2D rack board for daily work, and provides a separate procedural 3D twin for spatial inspection.",
    keyFeatures: ["10-room operations overview", "840-cell Room 1 rack board", "Procedural cold and dry 3D twins", "Mock QR center", "Withdrawal and relocation simulations"],
    stack: ["Next.js", "React", "TypeScript", "React Three Fiber", "Drei", "Mock data"],
    interactions: ["Select any room to open its 2D rack board", "Search and select pallet locations", "Open the procedural 3D twin", "Generate or scan a mock QR", "Simulate withdrawal and relocation"],
    gallery: [
      { src: "/images/projects/full-stack-web-development/frost-twin-wms/dashboard.webp", title: "Operations Overview", caption: "Warehouse dashboard showing capacity, occupancy, daily movements and cold-room status." },
      { src: "/images/projects/full-stack-web-development/frost-twin-wms/front-end.webp", title: "Front-End Operations Experience", caption: "The complete desktop operations interface connecting room monitoring, stock visibility and warehouse actions." },
      { src: "/images/projects/full-stack-web-development/frost-twin-wms/column-grid.webp", title: "Cold Room Column Grid", caption: "Detailed rack-column board for locating stock, reading pallet quantities and opening room operations." },
      { src: "/images/projects/full-stack-web-development/frost-twin-wms/column-grid-1.webp", title: "Rack Location Detail", caption: "High-detail digital rack interface with pallet status, room utilization and precise location information." },
      { src: "/images/projects/full-stack-web-development/frost-twin-wms/digital-twin.webp", title: "Dark Digital Twin", caption: "Interactive three-dimensional cold-room view with operational metrics, occupancy and pallet inspection." },
      { src: "/images/projects/full-stack-web-development/frost-twin-wms/digital-twin-2.webp", title: "Light Digital Twin", caption: "Presentation-ready warehouse twin showing rack depth, selected locations and product details." },
      { src: "/images/projects/full-stack-web-development/frost-twin-wms/mobileextension.webp", title: "TWIN WMS Mobile Extension", caption: "Role-based mobile workflows for receiving, pull-out, transfer, repallet, QR scanning and pallet verification." },
    ],
    rawFiles: ["Warehouse information architecture", "Rack location convention", "Operations wireframe", "Cold storage palette", "Digital twin scene map", "Pallet status matrix", "QR flow", "Interaction notes"],
    beforeAfter: [
      { label: "Room operations", before: "Spreadsheet and printed rack map", after: "Searchable 2D operations board" },
      { label: "Spatial inspection", before: "Location code only", after: "Linked procedural 3D twin" },
    ],
  },
  {
    slug: "rapex-dash",
    mock: "game",
    defaultDevice: "web",
    url: "rapex-dash.local/play",
    summary: "RAPEX DASH is a neon 3D browser arcade game where a courier rider accepts pickup missions, dodges city traffic, manages speed and nitro, and completes timed deliveries across a tactical route.",
    challenge: "Turn the RAPEX delivery idea into an immediately readable arcade experience while keeping mission details, route awareness, vehicle feedback and touch controls visible at high speed.",
    solution: "A cinematic third-person courier runner with a compact HUD, tactical GPS, responsive steering controls, boost and brake feedback, delivery rewards, garage progression and a mobile-friendly control system.",
    keyFeatures: ["3D neon city courier route", "Pickup and delivery mission loop", "Tactical GPS and traffic indicators", "Speed, nitro, brake and boost controls", "Vehicle garage and rider progression"],
    stack: ["React", "TypeScript", "WebGL", "Three.js", "Game UI/UX", "Responsive Controls"],
    interactions: ["Start a delivery shift", "Steer left and right", "Brake or trigger nitro boost", "Complete the pickup checkpoint to earn a payout"],
    rawFiles: ["Four gameplay screenshots", "Start-screen capture", "HUD and tactical GPS design", "Vehicle garage", "Tech specifications", "Gameplay recording slot", "Playable browser build slot"],
    beforeAfter: [
      { label: "Courier concept", before: "Static delivery route idea", after: "Playable neon arcade mission" },
      { label: "Mission feedback", before: "Basic score display", after: "Tactical HUD, GPS, payout and vehicle telemetry" },
    ],
  },
  {
    slug: "airholo-gesture-lab",
    mock: "airholo",
    defaultDevice: "web",
    url: "airholo.local/gesture-lab",
    summary: "AIRHOLO Prototype v 1.0 is a futuristic holographic interface concept. It explores how a user can control digital surfaces through live hand and fingertip movement, with private client-side computer vision translating pointing and pinch gestures into responsive interaction.",
    challenge: "Turning noisy, frame-by-frame hand-landmark coordinates into an interaction model that feels deliberate rather than jittery, without any server round-trip, and without exposing raw video or landmark data.",
    solution: "A dedicated gesture engine smooths every distance signal (EMA) before it's ever thresholded, adds hysteresis and a minimum hold time to each pinch-like gesture, and renders live geometric fingertip markers that turn green the instant two fingers are recognized as \"attached\" — the same signal that drives the actual interaction, so the feedback is never just decorative.",
    keyFeatures: ["Fully client-side hand tracking (MediaPipe Tasks Vision)", "Smoothed, hysteresis-debounced pinch/gesture detection", "Live geometric fingertip markers with pinch-attach feedback", "Air Draw, Image pan/zoom and Google Maps gesture modes", "Holographic HUD UI with Demo Mode (works without a camera)"],
    stack: ["Next.js", "React", "TypeScript", "MediaPipe Tasks Vision", "Canvas", "Google Maps JS API", "Tailwind CSS", "Framer Motion"],
    interactions: ["Enable your camera for live tracking", "Point to move the air cursor", "Pinch thumb + index to grab, draw or drag", "Watch fingertip markers turn green when a pinch is recognized"],
    rawFiles: ["Gesture engine architecture notes", "Hysteresis/threshold tuning log", "Hologram UI style sheet", "Onboarding + calibration flow", "Demo Mode script"],
    beforeAfter: [
      { label: "Pinch detection", before: "Raw per-frame threshold (flickers on webcam noise)", after: "Smoothed + hysteresis-debounced PairTracker" },
      { label: "Map navigation", before: "Mouse-only pan/zoom", after: "Two-finger pan, pinch-to-zoom gestures" },
    ],
  },
];

export const getWebShowcase = (slug: string) => webShowcases.find((showcase) => showcase.slug === slug);
