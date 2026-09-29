export type VisualArtMediaItem = {
  id: string;
  tab: string;
  title: string;
  description: string;
  medium: string;
  tools: string[];
  mediaType: "image" | "video";
  src?: string;
};

export type VisualArtProject = {
  id: string;
  title: string;
  type: string;
  description: string;
  cover?: string;
  items: VisualArtMediaItem[];
};

const placeholder = (
  id: string,
  tab: string,
  title: string,
  description: string,
  medium: string,
  tools: string[],
  mediaType: "image" | "video" = "image",
): VisualArtMediaItem => ({ id, tab, title, description, medium, tools, mediaType });

export const visualArtProjects: VisualArtProject[] = [
  {
    id: "heart-of-architecture",
    title: "Heart of Architecture",
    type: "3D Renders · Floor Plans · Interior Design · SketchUp Drafting",
    description: "Spatial ideas shaped from the first measured line to atmospheric architectural visualization.",
    cover: "/images/projects/visual-art/architecture-sketch/condo/render-1.jpg",
    items: [
      {
        id: "floor-plan",
        tab: "Floor Plan",
        title: "Planning Space with Purpose",
        description: "A study of circulation, proportion, and usable space—the technical foundation behind every successful architectural concept.",
        medium: "Architectural planning study",
        tools: ["Space Planning", "Drafting", "Layout"],
        mediaType: "image",
        src: "/images/projects/visual-art/architecture-sketch/farm/farm-1.jpg",
      },
      {
        id: "interior-design",
        tab: "Interior Design",
        title: "Interior Atmosphere",
        description: "A visual exploration of material, lighting, furniture, and composition designed to make a space feel lived in.",
        medium: "Interior visualization",
        tools: ["Lighting", "Materials", "Composition"],
        mediaType: "image",
        src: "/images/projects/visual-art/architecture-sketch/condo/render-2.jpg",
      },
      {
        id: "sketchup",
        tab: "SketchUp",
        title: "Form and Volume Study",
        description: "An early three-dimensional study used to test massing, scale, structure, and the relationship between rooms.",
        medium: "3D drafting study",
        tools: ["SketchUp", "3D Modeling", "Massing"],
        mediaType: "image",
        src: "/images/projects/visual-art/architecture-sketch/condo/render-5.jpg",
      },
      {
        id: "rendered-design",
        tab: "Rendered Design",
        title: "Architecture Brought to Life",
        description: "A presentation-ready rendered scene translating technical decisions into a clear and emotionally engaging visual.",
        medium: "Photoreal architectural render",
        tools: ["Rendering", "Lighting", "Post-production"],
        mediaType: "image",
        src: "/images/projects/visual-art/architecture-sketch/condo/render-10.jpg",
      },
      {
        id: "autocad",
        tab: "AutoCAD",
        title: "Precision Behind the Vision",
        description: "A technical drafting view focused on accurate geometry, construction logic, and presentation clarity.",
        medium: "Technical drawing",
        tools: ["AutoCAD", "Documentation", "Detailing"],
        mediaType: "image",
        src: "/images/projects/visual-art/architecture-sketch/condo/render-11.jpg",
      },
    ],
  },
  {
    id: "art-on-walls",
    title: "Art on Walls",
    type: "Mural Art · Illustration · Environmental Graphics",
    description: "Large-scale visual stories designed to transform blank walls into memorable places and experiences.",
    items: [
      placeholder("mural-concept", "Mural Concept", "The Story Before the Wall", "A composition study balancing subject, scale, environment, and the movement of people through the space.", "Concept artwork", ["Illustration", "Composition"]),
      placeholder("color-study", "Color Study", "Color with a Sense of Place", "Palette explorations created to complement the surrounding architecture while preserving a distinct visual identity.", "Color exploration", ["Color Theory", "Mood Study"]),
      placeholder("wall-mockup", "Wall Mockup", "Artwork in Context", "A placement preview showing how the mural responds to real dimensions, sightlines, and environmental lighting.", "Environmental mockup", ["Mockup", "Scale Study"]),
      placeholder("painting-process", "Painting Process", "From Sketch to Surface", "A future process film documenting preparation, transfer, paint layers, refinement, and finishing details.", "Process video", ["Mural Painting", "Time-lapse"], "video"),
      placeholder("final-installation", "Final Installation", "The Finished Environment", "A final documentation set capturing the work, its details, and its relationship with the people and place around it.", "Installation photography", ["Documentation", "Photography"]),
    ],
  },
  {
    id: "product-brand-promotion",
    title: "Product & Brand Promotion",
    type: "Product Art · Brand Identity · Campaign Design",
    description: "Product-focused visuals that unite brand identity, storytelling, and promotion into one campaign-ready system.",
    items: [
      placeholder("product-concept", "Product Concept", "An Idea Made Tangible", "A visual product direction developed around audience, purpose, form, and a clear market position.", "Product concept", ["Art Direction", "Concept Design"]),
      placeholder("brand-identity", "Brand Identity", "A Recognizable Visual Voice", "A coordinated identity study connecting logo, typography, color, image style, and tone.", "Identity system", ["Branding", "Typography"]),
      placeholder("packaging", "Packaging", "Designed for the Shelf and Screen", "Packaging that protects the product while creating a strong, recognizable presence in physical and digital retail.", "Packaging design", ["Layout", "3D Mockup"]),
      placeholder("campaign-art", "Campaign Art", "One Product, One Clear Message", "A hero campaign composition built to communicate the product benefit quickly across advertising formats.", "Campaign key visual", ["Advertising", "Photo Compositing"]),
      placeholder("motion-promo", "Motion Promo", "The Brand in Motion", "A future full-width motion showcase for product reveals, social campaigns, and launch storytelling.", "Promotional video", ["Motion Design", "Video Editing"], "video"),
    ],
  },
  {
    id: "imagination-beyond-dimensions",
    title: "Imagination Beyond Dimensions",
    type: "Sketchbook · Character Art · 3D Exploration",
    description: "A working laboratory where sketches, characters, forms, and digital experiments evolve beyond the page.",
    cover: "/images/projects/visual-art/sketchbook/rex-model.png",
    items: [
      {
        id: "concept-sketch",
        tab: "Concept Sketch",
        title: "The First Visible Thought",
        description: "An early visual study that captures gesture, personality, and direction before refinement begins.",
        medium: "Digital concept sketch",
        tools: ["Sketching", "Ideation", "Form Study"],
        mediaType: "image",
        src: "/images/projects/visual-art/sketchbook/84dad0c5-9b00-41cf-b39e-9b15118cf1dd.png",
      },
      {
        id: "character-design",
        tab: "Character Design",
        title: "Building a Visual Personality",
        description: "A character study focused on silhouette, expression, recognizable features, and storytelling potential.",
        medium: "Character development",
        tools: ["Character Design", "Digital Art"],
        mediaType: "image",
        src: "/images/projects/visual-art/sketchbook/bit-head.png",
      },
      {
        id: "environment",
        tab: "Environment",
        title: "A World Around the Idea",
        description: "A spatial experiment exploring how atmosphere, structure, and surrounding forms reinforce a visual narrative.",
        medium: "Environment study",
        tools: ["World Building", "Composition"],
        mediaType: "image",
        src: "/images/projects/visual-art/sketchbook/mesh.png",
      },
      {
        id: "3d-study",
        tab: "3D Study",
        title: "Form Beyond the Flat Page",
        description: "A dimensional model study examining volume, topology, lighting response, and a character's presence in space.",
        medium: "3D character study",
        tools: ["3D Modeling", "Form", "Lighting"],
        mediaType: "image",
        src: "/images/projects/visual-art/sketchbook/rex-model.png",
      },
      {
        id: "experiments",
        tab: "Experiments",
        title: "Ideas Without Boundaries",
        description: "An open collection of mesh, frame, material, and rendering tests where unexpected directions can emerge.",
        medium: "Digital experiment",
        tools: ["Mesh Study", "Rendering", "Iteration"],
        mediaType: "image",
        src: "/images/projects/visual-art/sketchbook/rex-mesh-frame.png",
      },
    ],
  },
  {
    id: "products-become-headlines",
    title: "Products Become Headlines",
    type: "Hero Visuals · Editorial Art · Advertising Frames",
    description: "Cinematic product frames composed to stop the scroll, lead the story, and turn attention into interest.",
    items: [
      placeholder("hero-frame", "Hero Frame", "The Image That Leads", "A primary composition designed to establish the product, message, and visual tone at first glance.", "Hero key visual", ["Art Direction", "Composition"]),
      placeholder("editorial", "Editorial", "A Product with a Point of View", "An editorial treatment combining image, type, and pacing to create a story rather than a simple product display.", "Editorial design", ["Typography", "Layout"]),
      placeholder("social-campaign", "Social Campaign", "Built to Stop the Scroll", "A connected set of campaign frames adapted for feed, story, reel cover, and paid social placements.", "Social media campaign", ["Campaign Design", "Content System"]),
      placeholder("motion-frame", "Motion Frame", "A Headline in Motion", "A future motion frame that introduces the product through cinematic timing, transitions, and visual emphasis.", "Motion advertising", ["Motion Design", "Editing"], "video"),
      placeholder("final-advertisement", "Final Advertisement", "From Product to Headline", "The resolved advertisement combining product benefit, campaign message, brand treatment, and final call to action.", "Advertising artwork", ["Advertising", "Brand Communication"]),
    ],
  },
];
