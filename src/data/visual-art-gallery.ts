export type VisualArtMediaItem = {
  id: string;
  tab: string;
  title: string;
  description: string;
  medium: string;
  tools: string[];
  mediaType: "image" | "video" | "audio";
  src?: string;
  sources?: string[];
  /** Video starts automatically when its output slide is opened. */
  autoPlay?: boolean;
  poster?: string;
  supportingImages?: string[];
  action?: {
    label: string;
    href: string;
  };
  comparison?: {
    before: string;
    after: string;
    title?: string;
    detail?: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
};

export type VisualArtProject = {
  id: string;
  title: string;
  type: string;
  description: string;
  cover?: string;
  backgroundAudio?: {
    src: string;
    title: string;
    subtitle: string;
    cover?: string;
    backgroundImage?: string;
  };
  items: VisualArtMediaItem[];
};

export const visualArtProjects: VisualArtProject[] = (() => {
  const projects: VisualArtProject[] = [
  {
    id: "bunny-cyborg-3d-modeling",
    title: "Bunny Cyborg — 3D Modeling",
    type: "Character Mesh · Blender Modeling · Turnaround Study",
    description: "A character-modeling collection documenting the Bunny Cyborg from concept direction and component studies to multi-angle mesh review and a Blender motion output.",
    cover: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-model.png",
    items: [
      {
        id: "mesh-turnaround",
        tab: "Mesh Turnaround",
        title: "Bunny Cyborg Mesh Study",
        description: "A multi-view Blender mesh inspection showing the character silhouette, proportion, joints and surface flow from front, side, back and perspective angles.",
        medium: "3D character mesh",
        tools: ["Blender", "3D Modeling", "Topology Review"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-model.png",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-model.png",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/Turn around View.PNG",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/#60 View.png",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/84dad0c5-9b00-41cf-b39e-9b15118cf1dd.png",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/mesh.png",
        ],
      },
      {
        id: "character-concept",
        tab: "Concept",
        title: "Cyborg Character Direction",
        description: "Concept and sketch material used to establish the character language before the full mesh is refined into separate parts and forms.",
        medium: "Character concept development",
        tools: ["Concept Art", "Character Design", "Form Study"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/PROJECT REX Final Sketch.png",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/PROJECT REX Final Sketch.png",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/REX SKETCH.png",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/professional_robotics_concep.png",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/Rapex Model V1.png",
        ],
      },
      {
        id: "component-parts",
        tab: "Parts",
        title: "Model Parts and Mechanical Detail",
        description: "A component-level view of the Bunny Cyborg, separating major forms and mechanical details for clearer modeling and later refinement.",
        medium: "3D component study",
        tools: ["Blender", "Hard Surface Detail", "Model Breakdown"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/REX Parts Sheet 3D V1.9.png",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/REX Parts Sheet 3D V1.9.png",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/Model Parts.png",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-mesh-frame.png",
        ],
      },
      {
        id: "blender-output",
        tab: "Blender Output",
        title: "Bunny Cyborg Blender Motion",
        description: "A recorded Blender output showing the model in a moving presentation format.",
        medium: "3D modeling output video",
        tools: ["Blender", "3D Animation", "Viewport Capture"],
        mediaType: "video",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/Project REX MESH Model Blender.mp4",
      },
    ],
  },
  {
    id: "mesh-modeling-helmet",
    title: "Mesh Modeling Helmet",
    type: "Hard-Surface Mesh · Helmet Study · Blender Output",
    description: "A hard-surface helmet collection focused on silhouette, mechanical joins, textured detail and modeling output views.",
    cover: "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/rendered.jfif",
    items: [
      {
        id: "helmet-render",
        tab: "Rendered View",
        title: "Helmet Surface and Sensor Detail",
        description: "A rendered study presenting the helmet form, visor, panel construction and mechanical connection details.",
        medium: "Hard-surface render",
        tools: ["Blender", "Hard Surface Modeling", "Texturing"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/rendered.jfif",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/rendered.jfif",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/rendered-v1.2.jfif",
        ],
      },
      {
        id: "helmet-angles",
        tab: "Mesh Angles",
        title: "Helmet Modeling Angles",
        description: "Alternate mesh and angle studies used to inspect the helmet volume, panel transitions and edge treatment.",
        medium: "3D mesh review",
        tools: ["Blender", "Mesh Study", "Surface Detail"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head.png",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head.png",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head-2.png",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head-3.png",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head-4.png",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head-5.png",
        ],
      },
      {
        id: "helmet-output",
        tab: "Blender Output",
        title: "Helmet Modeling Output",
        description: "A Blender modeling video documenting the helmet in a presentation-ready output view.",
        medium: "3D modeling output video",
        tools: ["Blender", "3D Modeling", "Viewport Capture"],
        mediaType: "video",
        src: "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/blender-model-helmet.mp4",
      },
    ],
  },
  {
    id: "product-model",
    title: "Product Model",
    type: "Product Visualization · Character Product Study · Detail Views",
    description: "A product-model visual collection with multiple presentation angles for reviewing the character, mounted device and surrounding product context.",
    cover: "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-17-567.jpg",
    items: [
      {
        id: "product-hero",
        tab: "Hero View",
        title: "Product Model Hero Composition",
        description: "A hero visual used to present the model in a real-world context with the device mount and product details visible together.",
        medium: "Product visualization",
        tools: ["Product Art", "Composition", "Visual Direction"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-17-567.jpg",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-17-567.jpg",
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-17-943.jpg",
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-18-081.jpg",
        ],
      },
      {
        id: "product-details",
        tab: "Detail Views",
        title: "Product Model Detail Angles",
        description: "Supporting detail views for inspecting the model presentation, the device relationship and the visual treatment from multiple angles.",
        medium: "Product detail study",
        tools: ["Product Visualization", "Detail Study", "Art Direction"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-18-218.jpg",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-18-218.jpg",
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-18-971.jpg",
        ],
      },
    ],
  },
  {
    id: "heart-of-architecture",
    title: "Heart of Architecture",
    type: "3D Renders · Floor Plans · Interior Design · SketchUp Drafting",
    description: "Spatial ideas shaped from the first measured line to atmospheric architectural visualization.",
    cover: "/images/projects/THUMBNAIL/heart-of-architecture.jpg",
    items: [
      {
        id: "interior-design",
        tab: "Interior Design",
        title: "A Warm, Natural Interior System",
        description: "The complete interior-design container: planning, SketchUp development, raw references, material direction and final rendered views.",
        medium: "Interior planning and art direction",
        tools: ["SketchUp", "AutoCAD", "Materials", "Furniture Styling", "Rendering"],
        mediaType: "image",
        src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/sketch-up.png",
        sources: [
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/sketch-up.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/floor-plan.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/design-clips.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/design-clips-2.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/design-clips-3.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/775360099_29206154575640338_8630300074215210215_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/777868518_29206153898973739_3767836390393080771_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/779945728_29206154695640326_1314492857614542224_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-files/sketch-draft-3.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-1.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-2.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-3.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/sketch-draft.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/sketch-draft-2.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/vray.jfif",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/design-1.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/design-2.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/design-3.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/rendered-2.jfif",
        ],
        comparison: {
          before: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/raw-1.jfif",
          after: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/rendered-2.jfif",
        },
      },
      {
        id: "walkthrough-animation",
        tab: "Walkthrough Animation",
        title: "Animated Architectural Walkthrough",
        description: "A continuous Lumion walkthrough that brings the architectural sequence and interior atmosphere into motion.",
        medium: "Architectural walkthrough video",
        tools: ["Lumion", "Animation", "Video Editing"],
        mediaType: "video",
        src: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/lumion-walktrought-output.mp4",
        autoPlay: true,
        poster: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247858724_3122562078019263_7063230755393566376_n.jpg",
        supportingImages: [
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247875156_354343786544556_6665165074099985871_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247954221_321516673325539_3468332502867239449_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/248170117_1021943678418140_3064316473029042339_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/257717348_494056598727460_5555034233193482798_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/258880999_1630693557311546_4072557585897973725_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259042199_694055611751787_2377242551136467128_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259225208_304114428413237_7596397517963255955_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259243539_3199450940335190_7411947841581094377_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259292219_627993514926584_2003896986973134810_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259356620_1006758969918999_2704820268567890947_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259631104_3325114404279659_2879381154155089619_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259673593_1011295529801803_2384111163317468066_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259879384_1321940291566464_7652675005990826403_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260158821_460908652156497_2474107417861669468_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260473432_4965861116813617_5118858795320172493_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260724055_3149270151986940_760414576581566583_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260732763_359089222446647_7914020899982571882_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260740032_1790020667853161_3406884916002712671_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/270800330_432393928634011_6045747371774699378_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272102891_3070614653176510_4709170262160190944_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272185956_4781849941910173_6307410594149698353_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272633441_401184915096906_5138427783982819588_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272702916_270329748544394_7214637078577885724_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272813764_233988912274571_5709282010254562856_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272862505_4349423325162092_7390184249700103781_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/273000587_1120916835116598_2698551303370956781_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/259292341_224643766543824_4774168378243215632_n.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/334993766_743359610753332_822553600631269861_n.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335028137_3411178112465346_6350909412602315574_n.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335160357_1419924772081318_5023941522012233726_n.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335435118_906558313890501_2467496699965878479_n.png",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335586426_879602216593590_7096570922401511867_n.png",
        ],
      },
    ],
  },
  {
    id: "farm-draft-concept",
    title: "Farm Draft and Concept",
    type: "Architectural Draft · Farm Facility Concept · Design Development",
    description: "A farm-facility study developed from field sketches and roof planning into a coordinated architectural concept presentation.",
    cover: "/images/projects/design-architecture/architecture-sketch/farm/F1.png",
    items: [
      {
        id: "farm-draft",
        tab: "Draft",
        title: "Farm Facility Draft Studies",
        description: "Hand-drawn structural notes, roof studies, measurements, and working sketches document the practical design decisions behind the facility.",
        medium: "Architectural draft and field sketch",
        tools: ["Drafting", "Structural Study", "Roof Planning", "Site Notes"],
        mediaType: "image",
        src: "/images/projects/design-architecture/architecture-sketch/farm/farm-1.jpg",
        sources: [
          "/images/projects/design-architecture/architecture-sketch/farm/farm-1.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/393476598_303782715754124_9168920187711006577_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/393895552_1032901757861117_7805415106057950472_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/393969114_284133057916562_8939381508620963229_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/394021977_1974014649639080_7666743670110151803_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/394029968_1766384690470142_317680770483972132_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/394042182_1016394842743032_1895719750905120674_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/394137469_1160375984920631_1070121640534650896_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/394348251_3559875774287892_7258427031869954851_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/394491305_350189757368595_8621329773174332939_n.jpg",
          "/images/projects/design-architecture/architecture-sketch/farm/395530347_1262489371116919_4962628074569834311_n.jpg",
        ],
      },
      {
        id: "farm-concept",
        tab: "Concept",
        title: "Farm Facility Architectural Concept",
        description: "The coordinated concept sheets combine the floor plan, roof form, structural details, material direction, circulation, and finished facility views.",
        medium: "Architectural concept presentation",
        tools: ["AutoCAD", "SketchUp", "Concept Design", "Presentation Layout"],
        mediaType: "image",
        src: "/images/projects/design-architecture/architecture-sketch/farm/F1.png",
        sources: [
          "/images/projects/design-architecture/architecture-sketch/farm/F1.png",
          "/images/projects/design-architecture/architecture-sketch/farm/F2.png",
          "/images/projects/design-architecture/architecture-sketch/farm/F3.png",
          "/images/projects/design-architecture/architecture-sketch/farm/F4.png",
          "/images/projects/design-architecture/architecture-sketch/farm/F5.png",
          "/images/projects/design-architecture/architecture-sketch/farm/F6.png",
        ],
      },
    ],
  },
  {
    id: "art-on-walls",
    title: "Mural Concept and Draft Design",
    type: "Mural Concept · Draft Design · Environmental Graphics",
    description: "Large-scale visual stories developed from blank-wall references through mural concepts, grid studies, and final presentation designs.",
    cover: "/images/projects/visual-art/art-on-walls/output-wall-2.png",
    items: [
      {
        id: "empty-wall",
        tab: "Empty Wall",
        title: "The Space Before the Artwork",
        description: "The original blank-wall references establish the dimensions, viewing angles, and environmental context for the mural concept.",
        medium: "Site reference photography",
        tools: ["Site Study", "Photography", "Scale Planning"],
        mediaType: "image",
        src: "/images/projects/visual-art/art-on-walls/empty-wall-1.png",
        sources: [
          "/images/projects/visual-art/art-on-walls/empty-wall-1.png",
          "/images/projects/visual-art/art-on-walls/empty-wall-2.png",
        ],
      },
      {
        id: "draft-grid",
        tab: "Draft & Grid",
        title: "Drafting the Wall Composition",
        description: "Early draft and grid studies translate the artwork onto the wall while preserving proportion, rhythm, and focal points.",
        medium: "Mural planning and grid study",
        tools: ["Illustration", "Grid Transfer", "Composition"],
        mediaType: "image",
        src: "/images/projects/visual-art/art-on-walls/draft-1.png",
        sources: [
          "/images/projects/visual-art/art-on-walls/draft-1.png",
          "/images/projects/visual-art/art-on-walls/grid-wall-2.png",
        ],
      },
      {
        id: "wall-layout",
        tab: "Layout Design",
        title: "Artwork Placed in Context",
        description: "Progressive layout options explore scale, placement, and visual balance across the architectural surface.",
        medium: "Environmental graphic mockup",
        tools: ["Layout", "Photo Mockup", "Environmental Graphics"],
        mediaType: "image",
        src: "/images/projects/visual-art/art-on-walls/design-wall-2.png",
        sources: [
          "/images/projects/visual-art/art-on-walls/design-wall-2.png",
          "/images/projects/visual-art/art-on-walls/layout-3.png",
          "/images/projects/visual-art/art-on-walls/layout-4.png",
          "/images/projects/visual-art/art-on-walls/wall-4.png",
        ],
      },
      {
        id: "wall-output",
        tab: "Final Output",
        title: "Completed Art-on-Walls Presentation",
        description: "The final output set presents the finished visual direction across multiple wall views and display contexts.",
        medium: "Final mural presentation",
        tools: ["Art Direction", "Mockup", "Presentation Design"],
        mediaType: "image",
        src: "/images/projects/visual-art/art-on-walls/output-wall-2.png",
        sources: [
          "/images/projects/visual-art/art-on-walls/output-1.png",
          "/images/projects/visual-art/art-on-walls/output-4.png",
          "/images/projects/visual-art/art-on-walls/output-5.png",
          "/images/projects/visual-art/art-on-walls/output-wall-2.png",
        ],
      },
    ],
  },
  {
    id: "product-brand-promotion",
    title: "Product & Brand Promotion",
    type: "Product Art · Brand Identity · Campaign Design",
    description: "Product-focused visuals that unite brand identity, storytelling, and promotion into one campaign-ready system.",
    cover: "/images/projects/design-architecture/product-and-brand-promotion/architecture-feature.png",
    items: [
      {
        id: "architecture-campaign",
        tab: "Architecture Campaign",
        title: "Architecture and Interior Promotion",
        description: "Campaign-ready hero visuals combining architectural drawing, interiors, rendering, and design services into a clear promotional story.",
        medium: "Architecture campaign design",
        tools: ["Art Direction", "Layout", "Photo Compositing", "Typography"],
        mediaType: "image",
        src: "/images/projects/design-architecture/product-and-brand-promotion/architecture-feature.png",
        sources: [
          "/images/projects/design-architecture/product-and-brand-promotion/architecture-feature.png",
          "/images/projects/design-architecture/product-and-brand-promotion/interior-design.png",
        ],
      },
      {
        id: "interactive-component-promotion",
        tab: "Interactive Component",
        title: "Interactive Card Component Promotion",
        description: "A colorful product visual that presents an interactive interface component as a focused digital-design feature.",
        medium: "Digital product promotion",
        tools: ["UI Design", "Graphic Design", "Campaign Layout"],
        mediaType: "image",
        src: "/images/projects/design-architecture/product-and-brand-promotion/interactive COmponent.png",
      },
      {
        id: "digital-product-campaign",
        tab: "Digital Product Campaign",
        title: "Software and Digital Twin Promotion",
        description: "Promotional graphics for creative tools and the FROST TWIN WMS product, shaped for portfolio and campaign presentation.",
        medium: "Technology campaign visuals",
        tools: ["Product Marketing", "Compositing", "Presentation Design"],
        mediaType: "image",
        src: "/images/projects/design-architecture/product-and-brand-promotion/twin-wms.png",
        sources: [
          "/images/projects/design-architecture/product-and-brand-promotion/twin-wms.png",
          "/images/projects/design-architecture/product-and-brand-promotion/tools.jfif",
        ],
      },
    ],
  },
  {
    id: "imagination-beyond-dimensions",
    title: "Imagination Beyond Dimensions",
    type: "Sketchbook · Character Art · 3D Exploration",
    description: "A working laboratory where sketches, characters, forms, and digital experiments evolve beyond the page.",
    cover: "/images/projects/design-architecture/sketchbook/rex-model.png",
    items: [
      {
        id: "concept-sketch",
        tab: "Concept Sketch",
        title: "The First Visible Thought",
        description: "An early visual study that captures gesture, personality, and direction before refinement begins.",
        medium: "Digital concept sketch",
        tools: ["Sketching", "Ideation", "Form Study"],
        mediaType: "image",
        src: "/images/projects/design-architecture/sketchbook/84dad0c5-9b00-41cf-b39e-9b15118cf1dd.png",
      },
      {
        id: "character-design",
        tab: "Character Design",
        title: "Building a Visual Personality",
        description: "A character study focused on silhouette, expression, recognizable features, and storytelling potential.",
        medium: "Character development",
        tools: ["Character Design", "Digital Art"],
        mediaType: "image",
        src: "/images/projects/design-architecture/sketchbook/bit-head.png",
      },
      {
        id: "environment",
        tab: "Environment",
        title: "A World Around the Idea",
        description: "A spatial experiment exploring how atmosphere, structure, and surrounding forms reinforce a visual narrative.",
        medium: "Environment study",
        tools: ["World Building", "Composition"],
        mediaType: "image",
        src: "/images/projects/design-architecture/sketchbook/mesh.png",
      },
      {
        id: "3d-study",
        tab: "3D Study",
        title: "Form Beyond the Flat Page",
        description: "A dimensional model study examining volume, topology, lighting response, and a character's presence in space.",
        medium: "3D character study",
        tools: ["3D Modeling", "Form", "Lighting"],
        mediaType: "image",
        src: "/images/projects/design-architecture/sketchbook/rex-model.png",
      },
      {
        id: "experiments",
        tab: "Experiments",
        title: "Ideas Without Boundaries",
        description: "An open collection of mesh, frame, material, and rendering tests where unexpected directions can emerge.",
        medium: "Digital experiment",
        tools: ["Mesh Study", "Rendering", "Iteration"],
        mediaType: "image",
        src: "/images/projects/design-architecture/sketchbook/rex-mesh-frame.png",
      },
    ],
  },
  {
    id: "products-become-headlines",
    title: "Products Become Headlines",
    type: "Hero Visuals · Editorial Art · Advertising Frames",
    description: "Cinematic product frames composed to stop the scroll, lead the story, and turn attention into interest.",
    cover: "/images/projects/design-architecture/architecture-sketch/property walkthrough/259292341_224643766543824_4774168378243215632_n.png",
    items: [
      { id: "storyboard", tab: "Storyboard", title: "The Property Story Begins", description: "Selected stills establish the architectural sequence, viewpoints and pacing before the walkthrough is assembled.", medium: "Property visualization", tools: ["Storyboarding", "Composition"], mediaType: "image", src: "/images/projects/design-architecture/architecture-sketch/property walkthrough/247858724_3122562078019263_7063230755393566376_n.jpg", sources: [
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/247858724_3122562078019263_7063230755393566376_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/247875156_354343786544556_6665165074099985871_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/247954221_321516673325539_3468332502867239449_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/248170117_1021943678418140_3064316473029042339_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/257717348_494056598727460_5555034233193482798_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/258880999_1630693557311546_4072557585897973725_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259042199_694055611751787_2377242551136467128_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259225208_304114428413237_7596397517963255955_n.jpg",
      ] },
      { id: "exterior", tab: "Exterior", title: "Architecture with Presence", description: "Exterior frames introduce the property through strong perspective, material contrast and an inviting approach.", medium: "Exterior visualization", tools: ["3D Rendering", "Lighting"], mediaType: "image", src: "/images/projects/design-architecture/architecture-sketch/property walkthrough/259292341_224643766543824_4774168378243215632_n.png", sources: [
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259243539_3199450940335190_7411947841581094377_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259292219_627993514926584_2003896986973134810_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259292341_224643766543824_4774168378243215632_n.png",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259356620_1006758969918999_2704820268567890947_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259631104_3325114404279659_2879381154155089619_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259673593_1011295529801803_2384111163317468066_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/259879384_1321940291566464_7652675005990826403_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/260158821_460908652156497_2474107417861669468_n.jpg",
      ] },
      { id: "interior", tab: "Interior", title: "The Experience Inside", description: "Interior frames continue the story through room-to-room movement, atmosphere and spatial detail.", medium: "Interior visualization", tools: ["Interior Design", "Camera Blocking"], mediaType: "image", src: "/images/projects/design-architecture/architecture-sketch/property walkthrough/334993766_743359610753332_822553600631269861_n.png", sources: [
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/260473432_4965861116813617_5118858795320172493_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/260724055_3149270151986940_760414576581566583_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/260732763_359089222446647_7914020899982571882_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/260740032_1790020667853161_3406884916002712671_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/270800330_432393928634011_6045747371774699378_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/272102891_3070614653176510_4709170262160190944_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/272185956_4781849941910173_6307410594149698353_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/272633441_401184915096906_5138427783982819588_n.jpg",
      ] },
      { id: "rendered-frames", tab: "Rendered Frames", title: "A Complete Visual Sequence", description: "Final rendered views form the image set used to shape the property's cinematic presentation.", medium: "Rendered property campaign", tools: ["Rendering", "Post-production"], mediaType: "image", src: "/images/projects/design-architecture/architecture-sketch/property walkthrough/335586426_879602216593590_7096570922401511867_n.png", sources: [
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/272702916_270329748544394_7214637078577885724_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/272813764_233988912274571_5709282010254562856_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/272862505_4349423325162092_7390184249700103781_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/273000587_1120916835116598_2698551303370956781_n.jpg",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/334993766_743359610753332_822553600631269861_n.png",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/335028137_3411178112465346_6350909412602315574_n.png",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/335160357_1419924772081318_5023941522012233726_n.png",
        "/images/projects/design-architecture/architecture-sketch/property walkthrough/335586426_879602216593590_7096570922401511867_n.png",
      ] },
    ],
  },
  ];

  const bunnyCyborg = projects.find((project) => project.id === "bunny-cyborg-3d-modeling");
  const imaginationBeyondDimensions = projects.find((project) => project.id === "imagination-beyond-dimensions");

  if (bunnyCyborg && imaginationBeyondDimensions) {
    bunnyCyborg.items.push(...imaginationBeyondDimensions.items);
  }

  return projects.filter(
    (project) => project.id !== "imagination-beyond-dimensions",
  );
})();
