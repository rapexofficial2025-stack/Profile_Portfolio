import type { PortfolioSample } from "@/data/categories";
import type { VisualArtProject } from "@/data/visual-art-gallery";

type GalleryCategoryId = "interactive-ui-design" | "motion-graphic-design" | "story-creation-video-editing" | "audio-fx-music-branding" | "full-stack-web-development" | "react-native-mobile-app" | "image-editing-gifs";

const tabBanks: Record<GalleryCategoryId, string[]> = {
  "interactive-ui-design": ["Overview", "Interaction Flow", "Components", "Animation", "Prototype", "Design System"],
  "motion-graphic-design": ["Creative Brief", "Concept", "Typography", "Color System", "Motion Visuals", "Final Artwork"],
  "story-creation-video-editing": ["Story Concept", "Storyboard", "Style Frames", "Video Edit", "Transitions", "Final Cut"],
  "audio-fx-music-branding": ["Creative Direction", "Composition", "Recording", "Sound FX", "Final Mix", "Master"],
  "full-stack-web-development": ["Overview", "UX Flow", "Front End", "Back End", "Responsive", "Live Demo"],
  "react-native-mobile-app": ["User Flow", "Wireframes", "Mobile Interface", "Prototype", "Motion", "Handoff"],
  "image-editing-gifs": ["Source Images", "Selection", "Color Grade", "Retouch", "GIF Animation", "Final Set"],
};

const tabCounts = [3, 5, 2, 4, 6];

function idFrom(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function buildCategoryProject(categoryId: GalleryCategoryId, sample: PortfolioSample, index: number): VisualArtProject {
  if (categoryId === "interactive-ui-design" && sample.title === "AI CHAT BOT") {
    const root = "/images/projects/interactive-bot";
    return {
      id: "ai-chat-bot",
      title: "Chatbot Support & GIF Loading Screen",
      type: "Conversational UI · Animated Loading Experience",
      description: "A two-part interface project combining a focused support-chatbot experience with a custom animated loading screen and branded assistant character.",
      cover: `${root}/bot-1.png`,
      items: [
        {
          id: "chatbot-support",
          tab: "Chatbot Support",
          title: "Friendly Support Through a Focused Chat Interface",
          description: "The support experience uses a recognizable assistant character, clear conversation states, and approachable visual feedback to guide users through questions and actions.",
          medium: "Conversational support interface",
          tools: ["UI/UX", "Conversation Design", "Character Design", "Support Flow"],
          mediaType: "image",
          src: `${root}/bot-1.png`,
          sources: [`${root}/bot-1.png`, `${root}/bot-2.png`, `${root}/interactive-bot-3.png`],
        },
        {
          id: "gif-loading-screen",
          tab: "GIF Loading Screen",
          title: "Animated Assistant Loading Screen",
          description: "A branded loading animation keeps the assistant visually active while the interface prepares content, processes a request, or transitions between support states.",
          medium: "Animated loading-screen output",
          tools: ["Motion Design", "GIF Concept", "Character Animation", "Loading State"],
          mediaType: "video",
          src: `${root}/loading-icon.mp4`,
          autoPlay: true,
        },
      ],
    };
  }

  if (categoryId === "interactive-ui-design" && sample.title === "Animation & 3D Modeling") {
    return {
      id: "animation-interactive",
      title: sample.title,
      type: sample.type,
      description: sample.description,
      cover: sample.cover,
      items: [
        { id: "character-concept", tab: "Character Concept", title: "From Model Idea to Animation-Ready Character", description: "The character begins as a visual and dimensional study, with silhouette, proportions, topology, and expressive range considered before the animation system is built.", medium: "3D character development", tools: ["Blender", "Character Design", "3D Modeling"], mediaType: "image", src: sample.cover },
        { id: "blender-rigging", tab: "Blender Rigging", title: "A Controllable Digital Skeleton", description: "A clean armature, named bones, inverse-kinematics controls, weight painting, and deformation checks prepare the model for repeatable poses and motion inside Blender.", medium: "Character rigging workflow", tools: ["Blender", "Armature", "IK Controls", "Weight Painting"], mediaType: "image" },
        { id: "motion-tests", tab: "Motion Tests", title: "Testing Personality Through Movement", description: "Pose-to-pose studies, walk cycles, reactions, and transition tests verify the rig while developing timing, weight, anticipation, and readable character expression.", medium: "Rig and animation tests", tools: ["Rig Tool", "Keyframe Animation", "Graph Editor"], mediaType: "video" },
        { id: "lottie-export", tab: "Lottie Export", title: "Lightweight Motion for Interfaces", description: "Selected animation is simplified and translated into a Lottie-ready asset for responsive playback, controlled states, and lightweight integration inside web or mobile interfaces.", medium: "Interactive animation export", tools: ["Lottie", "Bodymovin", "JSON Animation", "Web Integration"], mediaType: "video" },
        { id: "animation-gallery", tab: "Gallery", title: "Model, Rig, Pose and Motion Gallery", description: "This gallery is ready for character turnarounds, wireframes, bone layouts, pose sheets, key animation frames, and rendered presentation images when the final assets are added.", medium: "Development image gallery", tools: ["Model Sheets", "Rig Views", "Pose Studies"], mediaType: "image" },
        { id: "interactive-output", tab: "Interactive Output", title: "Semi-Interactive Animation Player", description: "A presentation-ready player for the final Blender render or Lottie animation. Use the playback control now to preview the interaction behavior; the finished asset can be connected later without removing this screen.", medium: "Interactive animation showcase", tools: ["Blender", "Lottie", "React", "Interactive Player"], mediaType: "video" },
      ],
    };
  }

  if (categoryId === "motion-graphic-design" && sample.title === "Motion Sisig Promotion") {
    const root = "/images/projects/motion-graphic-design/motion-Sisig";
    return {
      id: "motion-sisig-promotion",
      title: "Motion Sisig Promotion",
      type: "Food Promotion · Motion Frame Development",
      description: "A comic-inspired food campaign built as layered motion-ready frames, progressing from the sizzling plate and product elements to the complete JD's Carenderia Sisig offer.",
      cover: `${root}/clip 4.png`,
      items: [
        {
          id: "sisig-motion-frames",
          tab: "Motion Frames",
          title: "Crispy Pork Sisig Promotional Sequence",
          description: "Four transparent design stages document the visual build-up of the sizzling plate, Sisig meal, branding, headline, and ₱129 offer.",
          medium: "Layered food-promotion motion frames",
          tools: ["Motion Graphics", "Food Advertising", "Compositing", "Typography"],
          mediaType: "image",
          src: `${root}/clip-1.png`,
          sources: [`${root}/clip-1.png`, `${root}/clip-2.png`, `${root}/clip 3.png`, `${root}/clip 4.png`],
        },
      ],
    };
  }

  if (categoryId === "story-creation-video-editing" && sample.title === "Story Ads Promotion") {
    const root = "/images/projects/story-creation-video-editing/promo-sequence";
    return {
      id: "story-ads-promotion",
      title: "Story Ads Promotion",
      type: "Narrative Social Ad · Story Frames · Final Video",
      description: "A short-form advertisement shaped as a relatable everyday story, moving through time pressure, travel, food preparation, and the final branded message.",
      cover: `${root}/check time.png`,
      items: [
        {
          id: "story-ad-frames",
          tab: "Story Frames",
          title: "Narrative Advertising Sequence",
          description: "The complete frame set establishes character actions, timing, continuity, scene progression, and the visual beats used in the finished promotion.",
          medium: "Vertical social-ad storyboard",
          tools: ["Story Direction", "Shot Planning", "Advertising", "Visual Sequencing"],
          mediaType: "image",
          src: `${root}/check time.png`,
          sources: [
            `${root}/0633dd64-4ede-4c71-8be8-a8d4b48a3d06.png`,
            `${root}/0b2f1b4b-0aac-49c9-b574-a3881b8e11b0.png`,
            `${root}/651971fe-a938-49a7-91ce-8cc5d27b61f6.png`,
            `${root}/8834e2f9-49a0-497d-8b7a-2f48bb27fb4a.png`,
            `${root}/Caling 2.png`,
            `${root}/check time.png`,
            `${root}/Chopping.png`,
            `${root}/clock.png`,
            `${root}/zoom out husband.png`,
          ],
        },
        {
          id: "story-ad-video",
          tab: "Final Video",
          title: "Fast Story Branding Output",
          description: "The final MP4 combines the planned scenes into a fast, continuous branded narrative prepared for social advertising.",
          medium: "Short-form promotional video",
          tools: ["Video Editing", "Story Pacing", "Transitions", "Branding"],
          mediaType: "video",
          src: `${root}/fast-story-branding.mp4`,
          autoPlay: true,
          poster: `${root}/check time.png`,
        },
      ],
    };
  }

  if (categoryId === "story-creation-video-editing" && sample.title === "Market Ads") {
    const root = "/images/projects/story-creation-video-editing/Market-Ads";
    return {
      id: "market-ads",
      title: "Market Ads",
      type: "Content Marketing · Social Advertising · Composite Design",
      description: "A digital-content advertising study developed from isolated creator, editing, workspace, and social-media assets into a complete campaign visual.",
      cover: `${root}/finish.png`,
      items: [
        {
          id: "market-ad-development",
          tab: "Development",
          title: "Content-Creator Advertising Development",
          description: "Raw visual components and progressive campaign variations explore layout, hierarchy, device presentation, creator tools, color, and messaging.",
          medium: "Advertising design development",
          tools: ["Compositing", "Art Direction", "Social Media", "Campaign Layout"],
          mediaType: "image",
          src: `${root}/raw-files.png`,
          sources: [
            `${root}/raw-files.png`,
            `${root}/06476827-e935-4a14-9530-3754dcbdb0e9.png`,
            `${root}/3ac5853c-1e90-4f2a-b5d6-1ff6911059ff.png`,
            `${root}/4ebfe51d-1dc8-4249-a527-1935e95f3f5a.png`,
            `${root}/75fabf56-be75-4b6d-816e-e1cee618d11e.png`,
            `${root}/c220284c-cc0f-41ce-8761-b24b2a36a6d3.png`,
            `${root}/dafa60c8-106d-49f8-97ea-091830b03906.png`,
          ],
        },
        {
          id: "market-ad-final",
          tab: "Final Advertisement",
          title: "Create Amazing Content Campaign",
          description: "The final advertisement unifies the production workspace, creator tools, social platforms, and call-to-action into one polished campaign frame.",
          medium: "Final content-marketing advertisement",
          tools: ["Advertising", "Photo Manipulation", "Typography", "Campaign Design"],
          mediaType: "image",
          src: `${root}/finish.png`,
        },
      ],
    };
  }

  if (categoryId === "audio-fx-music-branding" && sample.title === "Takeshi's Jingle Song") {
    const root = "/images/projects/audio-fx-music-branding/takeshis-jingle-song";
    return {
      id: "takeshis-jingle-song",
      title: "Takeshi's Jingle Song",
      type: "Restaurant Jingle · Sakura Theme Song · Music Branding",
      description: "A Japanese-Filipino restaurant theme song developed from the raw vocal through arrangement, cleanup, mix processing, mastering, and the final branded MP3.",
      cover: `${root}/Cover-iamge.png`,
      backgroundAudio: {
        src: `${root}/Takeshi's  Resto.mp3`,
        title: "Takeshi's Resto",
        subtitle: "Sakura Theme Song · Final MP3",
        cover: `${root}/Cover-iamge.png`,
        backgroundImage: "/images/projects/audio-fx-music-branding/irvin dj.png",
      },
      items: [
        {
          id: "takeshi-cover-art",
          tab: "Cover Art",
          title: "Takeshi's Resto Sakura Theme Song",
          description: "The cover establishes the restaurant's Japanese-Filipino identity through Sakura atmosphere, warm dining imagery, and a clear theme-song presentation.",
          medium: "Music-branding cover artwork",
          tools: ["Art Direction", "Restaurant Branding", "Cover Design"],
          mediaType: "image",
          src: `${root}/Cover-iamge.png`,
        },
        {
          id: "takeshi-mix-process",
          tab: "Mix Process",
          title: "Jingle Arrangement, Mixing, and Mastering",
          description: "Five FL Studio stages document raw vocal import, rhythmic arrangement, processing, level balancing, and the completed song mix.",
          medium: "Audio-production workflow",
          tools: ["FL Studio", "Vocal Editing", "Arrangement", "Mixing", "Mastering"],
          mediaType: "image",
          src: `${root}/mix-1.png`,
          sources: [`${root}/mix-1.png`, `${root}/mix-2.png`, `${root}/mix-3.png`, `${root}/mix-4.png`, `${root}/mix-5.png`],
        },
      ],
    };
  }

  if (categoryId === "audio-fx-music-branding" && (sample.title === "Pampanga Music Fest" || sample.title === "Kaibigan ng Masa Branding")) {
    const isFestival = sample.title === "Pampanga Music Fest";
    const root = isFestival
      ? "/images/projects/audio-fx-music-branding/Pampanga Music Fest 2025"
      : "/images/projects/audio-fx-music-branding/kaibigan-ng-masa-brand-song";
    const cover = isFestival ? `${root}/pampanga-local-fest.png` : `${root}/cover photo.png`;
    return {
      id: isFestival ? "pampanga-music-fest" : "kaibigan-ng-masa-branding",
      title: sample.title,
      type: sample.type,
      description: sample.description,
      cover,
      backgroundAudio: {
        src: isFestival ? `${root}/PAMPANGA LOCAL MUSIC FEST 2025.mp3` : `${root}/Kaibigan ng Masa.mp3`,
        title: isFestival ? "Pampanga Local Music Fest 2025" : "Kaibigan ng Masa",
        subtitle: isFestival ? "Festival Master · Final MP3" : "RAPEX Brand Song · Final MP3",
        cover,
        backgroundImage: "/images/projects/audio-fx-music-branding/irvin dj.png",
      },
      items: [
        {
          id: isFestival ? "pampanga-cover-art" : "kaibigan-cover-art",
          tab: "Cover Art",
          title: isFestival ? "Pampanga Local Music Fest 2025" : "Kaibigan ng Masa Brand Song",
          description: isFestival ? "The festival artwork combines Pampanga landmarks, local culture, live performance, and an energetic night-event identity." : "The completed campaign artwork brings RAPEX riders and the Kaibigan ng Masa characters together in a vibrant local-market music identity.",
          medium: "Music-branding cover artwork",
          tools: ["Art Direction", "Campaign Branding", "Cover Design"],
          mediaType: "image",
          src: cover,
        },
        ...(isFestival ? [{
          id: isFestival ? "pampanga-final-branding" : "kaibigan-final-branding",
          tab: "Mix Process",
          title: "Festival Arrangement, Mixing, and Mastering",
          description: "Five production stages document the arrangement, processing, level balancing, refinement, and final festival master.",
          medium: "Audio-production workflow",
          tools: ["Music Editing", "Arrangement", "Mixing", "Mastering"],
          mediaType: "image",
          src: `${root}/mix-1.png`,
          sources: [`${root}/mix-1.png`, `${root}/mix-2.png`, `${root}/mix-3.png`, `${root}/mix-4.png`, `${root}/mix-5.png`],
        } satisfies VisualArtProject["items"][number]] : []),
      ],
    };
  }

  if (categoryId === "story-creation-video-editing" && sample.title === "Property Walkthrough") {
    return {
      id: "property-walkthrough",
      title: sample.title,
      type: sample.type,
      description: "A Lumion architectural walkthrough shaped through camera movement, rendered atmosphere, pacing, and video editing into one continuous property presentation.",
      cover: sample.cover,
      items: [
        {
          id: "walkthrough-overview",
          tab: "Overview",
          title: "Architectural Story in Motion",
          description: "The sequence introduces the property as a guided visual journey, using deliberate viewpoints and transitions to communicate space, scale, materials, and atmosphere.",
          medium: "Architectural visualization",
          tools: ["Lumion", "Story Planning", "Camera Direction"],
          mediaType: "image",
          src: sample.cover,
        },
        {
          id: "walkthrough-video-editing",
          tab: "Video Editing",
          title: "Pacing the Property Experience",
          description: "Rendered camera passes are organized into a clear progression, with timing and scene flow refined so the viewer can understand the property without rushing through important architectural details.",
          medium: "Walkthrough video editing",
          tools: ["Lumion", "Video Editing", "Transitions", "Pacing"],
          mediaType: "image",
          src: sample.cover,
        },
        {
          id: "walkthrough-output",
          tab: "Walkthrough Video",
          title: "Lumion Residential Walkthrough",
          description: "The finished long-form Lumion output presents the residential design as one continuous animated walkthrough.",
          medium: "Architectural walkthrough video",
          tools: ["Lumion", "3D Rendering", "Animation", "Video Editing"],
          mediaType: "video",
          src: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/lumion-walktrought-output.mp4",
          autoPlay: true,
          poster: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247858724_3122562078019263_7063230755393566376_n.jpg",
        },
      ],
    };
  }

  if (categoryId === "image-editing-gifs" && sample.title === "Property Shoot") {
    const root = "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-file";
    return {
      id: "property-shoot",
      title: "Property Shoot",
      type: "Real Estate Photography · Property Documentation",
      description: "A complete source-photo set documenting the residential exterior, interior, finishes, and property details before the final architectural design presentation.",
      cover: `${root}/772614632_29118043094451487_2513672691116936793_n.jpg`,
      items: [
        {
          id: "property-shoot-source-photos",
          tab: "Property Photography",
          title: "Residential Property Shoot",
          description: "The full set of unique property photographs is organized here as the photographic source and documentation collection. Open the linked Architectural Interior Design to see the related finished design output.",
          medium: "Real estate and architectural photography",
          tools: ["Property Photography", "Photo Selection", "Architectural Documentation", "Image Preparation"],
          mediaType: "image",
          src: `${root}/772614632_29118043094451487_2513672691116936793_n.jpg`,
          sources: [
            `${root}/772614632_29118043094451487_2513672691116936793_n.jpg`,
            `${root}/772708988_29118054774450319_2738339925194295568_n.jpg`,
            `${root}/772897518_29118051614450635_5828110186907720245_n.jpg`,
            `${root}/773252277_29118035157785614_2321778493274980389_n.jpg`,
            `${root}/773583094_29118045191117944_6812976357604247487_n.jpg`,
            `${root}/773745842_29118050204450776_1348134836764829680_n.jpg`,
            `${root}/773822803_29118056014450195_6404692502127610904_n.jpg`,
            `${root}/773971156_29118041474451649_4700590818257242921_n.jpg`,
            `${root}/774035648_29118053187783811_4682414760202930561_n.jpg`,
            `${root}/774320908_29118038904451906_8796477852174163889_n.jpg`,
            `${root}/774475685_29118036891118774_3620592978019887977_n.jpg`,
            `${root}/774595856_29118046701117793_8180376576579123396_n.jpg`,
            `${root}/785147190_29294039173518544_3248008338995872208_n.jpg`,
            `${root}/785147210_29294040943518367_6132614298407134371_n.jpg`,
            `${root}/785214461_29294042166851578_8103758393210747050_n.jpg`,
            `${root}/785605725_29294039793518482_510026309914411934_n.jpg`,
            `${root}/786242705_29294040376851757_7597259034490867128_n.jpg`,
            `${root}/786471705_29294040363518425_6409891529341447140_n.jpg`,
            `${root}/786562944_29294041000185028_5961182132428606125_n.jpg`,
            `${root}/787483993_29294042790184849_3512394392516597451_n.jpg`,
            `${root}/787796896_29294043336851461_3036649771445791080_n.jpg`,
            `${root}/787904373_29294041570184971_5925209955096295661_n.jpg`,
            `${root}/788439150_29294042780184850_1064623880779020515_n.jpg`,
            `${root}/788563601_29294042113518250_3828248821049908131_n.jpg`,
            `${root}/788641114_29294041506851644_3967735995842617770_n.jpg`,
            `${root}/788766288_29294039216851873_4540098056076281705_n.jpg`,
            `${root}/raw-3.jfif`,
          ],
          action: {
            label: "FINAL OUTPUT — CLICK HERE",
            href: "/work/category/design-architecture?project=heart-of-architecture",
          },
        },
      ],
    };
  }

  if (categoryId === "image-editing-gifs" && sample.title === "Before / After") {
    const root = "/images/projects/image-editing-gifs/before-after/Resto-menu";
    return {
      id: "restaurant-menu-layout",
      title: "Restaurant Menu Layout",
      type: "Photo Editing · Before & After · Restaurant Menu",
      description: "A restaurant menu layout developed from raw client references into a finished, print-ready MJP Restobar menu set.",
      cover: `${root}/finish-menu/Cover.jfif`,
      items: [
        {
          id: "restaurant-menu-before-after",
          tab: "Before / After",
          title: "Restaurant Menu Layout Transformation",
          description: "Raw client references and menu direction are organized into a refined restaurant-menu cover and finished page layout system.",
          medium: "Photo editing and menu layout",
          tools: ["Photo Editing", "Layout Design", "Typography", "Print Preparation"],
          mediaType: "image",
          src: `${root}/finish-menu/Cover.jfif`,
          sources: [
            `${root}/raw/1.jpg`,
            `${root}/raw/1000042491.png`,
            `${root}/raw/1000042494.png`,
            `${root}/raw/1000042802.jpg`,
            `${root}/raw/1000042803.jpg`,
            `${root}/raw/1000042922.jpg`,
            `${root}/raw/1000042925.jpg`,
            `${root}/finish-menu/Cover.jfif`,
            `${root}/finish-menu/page-1.png`,
            `${root}/finish-menu/page-2.png`,
            `${root}/finish-menu/page-3.png`,
            `${root}/finish-menu/page-5.png`,
            `${root}/finish-menu/page-6.png`,
            `${root}/finish-menu/page-7.png`,
          ],
          comparison: {
            before: `${root}/raw/1.jpg`,
            after: `${root}/finish-menu/Cover.jfif`,
            title: "Restaurant Menu Layout",
            detail: "Raw reference to final cover",
            beforeLabel: "Raw / Before",
            afterLabel: "Final Menu / After",
          },
        },
      ],
    };
  }

  if (categoryId === "react-native-mobile-app" && sample.title === "React Native Product Design") {
    const root = "/images/projects/react-native-mobile-app/category-design";
    return {
      id: "react-native-product-design",
      title: "React Native Product Design",
      type: "Merchant Mobile App · Category & Product UX",
      description: "A complete merchant-side mobile product-design study connecting the original store interface, visual category system, category-selection flow and product-management experience.",
      cover: `${root}/output-category.png`,
      items: [
        {
          id: "product-design-reference",
          tab: "Reference & Raw",
          title: "Starting Interface and Product Direction",
          description: "The original merchant screen and visual reference establish the navigation structure, store state and product-design direction before refinement.",
          medium: "Mobile UX reference study",
          tools: ["UX Audit", "Reference Study", "Merchant Workflow"],
          mediaType: "image",
          src: `${root}/raw-1.png`,
          sources: [`${root}/raw-1.png`, `${root}/806022186_1707437644721647_9136850791000651797_n.jpg`],
        },
        {
          id: "category-visual-system",
          tab: "Category Design",
          title: "Visual Category Illustration System",
          description: "Five commerce-category artworks create a clear visual language for food, essentials, specialty products, business supplies and agricultural retail.",
          medium: "Mobile category art direction",
          tools: ["Product Design", "Category System", "Visual Direction", "Image Composition"],
          mediaType: "image",
          src: `${root}/category-1.png`,
          sources: [`${root}/category-1.png`, `${root}/category-2.png`, `${root}/category-3.png`, `${root}/category-4.png`, `${root}/category-5.png`],
        },
        {
          id: "category-selection-flow",
          tab: "Category Selection UI",
          title: "Merchant Store Category Selection",
          description: "The finished mobile flow turns category choice into a guided, illustrated first step for creating and configuring a merchant store.",
          medium: "React Native mobile interface",
          tools: ["React Native", "Mobile UI/UX", "Store Setup", "Interaction Design"],
          mediaType: "image",
          src: `${root}/output-category.png`,
          sources: [`${root}/output-category.png`, `${root}/output-2.png`, `${root}/output-23.png`, `${root}/output-3.png`],
        },
        {
          id: "merchant-product-management",
          tab: "Product Management",
          title: "Merchant Product Workspace",
          description: "The final product screen supports adding products, CSV upload, category filtering, inventory visibility and publication-status management from mobile.",
          medium: "Merchant product-management UI",
          tools: ["React Native", "Product Operations", "Inventory UX", "Mobile Dashboard"],
          mediaType: "image",
          src: `${root}/my-product.png`,
        },
      ],
    };
  }

  if (categoryId === "image-editing-gifs" && sample.title === "Cold Storage Photography & Image Editing") {
    const root = "/images/projects/cold-storage";
    return {
      id: "cold-storage-photography-editing",
      title: "Cold Storage Photography & Image Editing",
      type: "Facility Photography · Image Editing · Campaign Design",
      description: "A complete cold-storage media set combining on-location facility photography with edited promotional compositions and brand presentation assets.",
      cover: `${root}/clip-1.png`,
      items: [
        {
          id: "cold-storage-photography",
          tab: "Facility Photography",
          title: "Cold Storage Operations Photography",
          description: "Exterior, interior, storage, loading, and operational views documenting the facility and its day-to-day environment.",
          medium: "Industrial and facility photography",
          tools: ["Photography", "Photo Selection", "Color Correction", "Documentation"],
          mediaType: "image",
          src: `${root}/28959020_1709468519119528_2926094393368641536_n.jpg`,
          sources: [
            `${root}/28959020_1709468519119528_2926094393368641536_n.jpg`,
            `${root}/35516112_1824373537629025_3505987309872873472_n.jpg`,
            `${root}/36303032_1838885276177851_317653513469427712_n.jpg`,
            `${root}/38791647_2284084928274994_5695195272368357376_n.jpg`,
            `${root}/38801253_2284084994941654_157597580044271616_n.jpg`,
            `${root}/514320960_24207601198879606_4430213454698328317_n.jpg`,
            `${root}/514323290_24207601322212927_9067318840272547357_n.jpg`,
            `${root}/514750757_24207601152212944_8806895323459830194_n.jpg`,
            `${root}/514865810_24207601285546264_4337417385573202792_n.jpg`,
            `${root}/514995854_24207019652271094_1518063214606296642_n.jpg`,
          ],
        },
        {
          id: "cold-storage-edited-campaign",
          tab: "Image Editing",
          title: "Cold Storage Capacity Campaign",
          description: "Operational photographs transformed into clear, branded marketing visuals for facility capacity and service promotion.",
          medium: "Photo compositing and promotional design",
          tools: ["Photo Editing", "Compositing", "Typography", "Campaign Layout"],
          mediaType: "image",
          src: `${root}/clip-1.png`,
          sources: [
            `${root}/37437b79-d202-46df-a773-a82e09edcbb2.png`,
            `${root}/clip-1.png`,
            `${root}/clip-2.png`,
          ],
        },
        {
          id: "cold-storage-brand-mark",
          tab: "Brand Identity",
          title: "Cold Storage Brand Mark",
          description: "The identity asset used to connect the photography and edited campaign materials into one presentation system.",
          medium: "Brand identity asset",
          tools: ["Branding", "Identity", "Campaign Application"],
          mediaType: "image",
          src: `${root}/logo.jpg`,
        },
      ],
    };
  }

  const bank = tabBanks[categoryId];
  const count = Math.min(tabCounts[index % tabCounts.length], bank.length);
  const tabs = Array.from({ length: count }, (_, tabIndex) => bank[(tabIndex + index) % bank.length]);

  return {
    id: idFrom(sample.title),
    title: sample.title,
    type: sample.type,
    description: sample.description,
    cover: sample.cover,
    items: tabs.map((tab, tabIndex) => ({
      id: `${idFrom(sample.title)}-${idFrom(tab)}`,
      tab,
      title: tab === "Overview" ? `${sample.title} — Project Overview` : `${sample.title} — ${tab}`,
      description: `${tab} presentation for ${sample.title}. This section is prepared for the final project story, visuals, decisions, and supporting details.`,
      medium: tab.includes("Sound") || tab.includes("Mix") || tab.includes("Master") || tab.includes("Recording") ? "Audio presentation" : tab.includes("Animation") || tab.includes("Final Cut") || tab.includes("Motion") ? "Video presentation" : "Image presentation",
      tools: [sample.type, tab, "Portfolio Case Study"],
      mediaType: tabIndex === 0 && sample.cover ? "image" : tab.includes("Animation") || tab.includes("Video") || tab.includes("Final Cut") || tab.includes("Motion") || tab.includes("Live Demo") ? "video" : "image",
      src: tabIndex === 0 ? sample.cover : undefined,
    })),
  };
}

export function isGalleryCategory(categoryId: string): categoryId is GalleryCategoryId {
  return categoryId in tabBanks;
}
