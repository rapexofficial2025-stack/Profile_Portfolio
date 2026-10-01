export type InteriorComparisonSet = {
  id: string;
  label: string;
  title: string;
  rawImages: string[];
  finalImage: string;
};

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
  pingPongAmbient?: boolean;
  poster?: string;
  supportingImages?: string[];
  highlightImages?: {
    src: string;
    label: string;
  }[];
  comparisonSets?: InteriorComparisonSet[];
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
    cover: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-model.webp",
    items: [
      {
        id: "mesh-turnaround",
        tab: "Mesh Turnaround",
        title: "Bunny Cyborg Mesh Study",
        description: "A multi-view Blender mesh inspection showing the character silhouette, proportion, joints and surface flow from front, side, back and perspective angles.",
        medium: "3D character mesh",
        tools: ["Blender", "3D Modeling", "Topology Review"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-model.webp",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-model.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/Turn around View.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/#60 View.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/84dad0c5-9b00-41cf-b39e-9b15118cf1dd.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/mesh.webp",
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
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/PROJECT REX Final Sketch.webp",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/PROJECT REX Final Sketch.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/REX SKETCH.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/professional_robotics_concep.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/Rapex Model V1.webp",
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
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/REX Parts Sheet 3D V1.9.webp",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/REX Parts Sheet 3D V1.9.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/Model Parts.webp",
          "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-mesh-frame.webp",
        ],
      },
      {
        id: "bunny-parts-recording",
        tab: "Parts Recording",
        title: "Bunny Cyborg Exploded Parts Study",
        description: "A recorded 3D viewport study showing the Bunny Cyborg assembled and exploded into its modeled components for inspection.",
        medium: "3D modeling process recording",
        tools: ["3D Modeling", "Component Breakdown", "Viewport Capture"],
        mediaType: "video",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/bunny-cyborg-parts-recording.mp4",
        autoPlay: true,
        poster: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/REX Parts Sheet 3D V1.9.webp",
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
    cover: "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/rendered.webp",
    items: [
      {
        id: "helmet-render",
        tab: "Rendered View",
        title: "Helmet Surface and Sensor Detail",
        description: "A rendered study presenting the helmet form, visor, panel construction and mechanical connection details.",
        medium: "Hard-surface render",
        tools: ["Blender", "Hard Surface Modeling", "Texturing"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/rendered.webp",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/rendered.webp",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/rendered-v1.2.webp",
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
        src: "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head.webp",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head.webp",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head-2.webp",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head-3.webp",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head-4.webp",
          "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head-5.webp",
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
        autoPlay: true,
        pingPongAmbient: true,
      },
    ],
  },
  {
    id: "product-model",
    title: "Product Model",
    type: "Product Visualization · Character Product Study · Detail Views",
    description: "A product-model visual collection with multiple presentation angles for reviewing the character, mounted device and surrounding product context.",
    cover: "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-17-567.webp",
    items: [
      {
        id: "product-hero",
        tab: "Hero View",
        title: "Product Model Hero Composition",
        description: "A hero visual used to present the model in a real-world context with the device mount and product details visible together.",
        medium: "Product visualization",
        tools: ["Product Art", "Composition", "Visual Direction"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-17-567.webp",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-17-567.webp",
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-17-943.webp",
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-18-081.webp",
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
        src: "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-18-218.webp",
        sources: [
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-18-218.webp",
          "/images/projects/visual-art/Design-mesh-modeling/product-model/viber_image_2026-07-15_15-49-18-971.webp",
        ],
      },
    ],
  },
  {
    id: "heart-of-architecture",
    title: "Heart of Architecture",
    type: "3D Renders · Floor Plans · Interior Design · SketchUp Drafting",
    description: "Spatial ideas shaped from the first measured line to atmospheric architectural visualization.",
    cover: "/images/projects/THUMBNAIL/architectural-design-thumbnail.webp",
    items: [
      {
        id: "interior-design",
        tab: "Interior Design",
        title: "A Warm, Natural Interior System",
        description: "The complete interior-design container: planning, SketchUp development, raw references, material direction and final rendered views.",
        medium: "Interior planning and art direction",
        tools: ["SketchUp", "AutoCAD", "Materials", "Furniture Styling", "Rendering"],
        mediaType: "image",
        src: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/final-output.webp",
        comparisonSets: [
          {
            id: "final-output-1",
            label: "Final Output 1",
            title: "Warm Staircase Living Interior",
            rawImages: [
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/01-raw-space.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/02-raw-reference.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/03-sketch-draft.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/04-rendering-draft.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/05-final-render-draft.webp",
            ],
            finalImage: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/final-output.webp",
          },
          {
            id: "final-output-2",
            label: "Final Output 2",
            title: "Natural Rattan Living Interior",
            rawImages: [
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/01-raw-space.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/02-raw-reference.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/03-sketch-draft.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/04-vray-draft.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/05-render-draft.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/06-design-render.webp",
            ],
            finalImage: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-2/final-output.webp",
          },
          {
            id: "final-output-3",
            label: "Final Output 3",
            title: "Compact Natural Living and Kitchen Interior",
            rawImages: [
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-3/01-raw-space.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-3/02-furniture-material-sketch.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-3/03-render-draft.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-3/04-vray-draft.webp",
              "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-3/05-design-render.webp",
            ],
            finalImage: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-3/final-output.webp",
          },
        ],
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
        poster: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247858724_3122562078019263_7063230755393566376_n.webp",
        supportingImages: [
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247875156_354343786544556_6665165074099985871_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247954221_321516673325539_3468332502867239449_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/248170117_1021943678418140_3064316473029042339_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/257717348_494056598727460_5555034233193482798_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/258880999_1630693557311546_4072557585897973725_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259042199_694055611751787_2377242551136467128_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259225208_304114428413237_7596397517963255955_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259243539_3199450940335190_7411947841581094377_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259292219_627993514926584_2003896986973134810_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259356620_1006758969918999_2704820268567890947_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259631104_3325114404279659_2879381154155089619_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259673593_1011295529801803_2384111163317468066_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259879384_1321940291566464_7652675005990826403_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260158821_460908652156497_2474107417861669468_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260473432_4965861116813617_5118858795320172493_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260724055_3149270151986940_760414576581566583_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260732763_359089222446647_7914020899982571882_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260740032_1790020667853161_3406884916002712671_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/270800330_432393928634011_6045747371774699378_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272102891_3070614653176510_4709170262160190944_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272185956_4781849941910173_6307410594149698353_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272633441_401184915096906_5138427783982819588_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272702916_270329748544394_7214637078577885724_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272813764_233988912274571_5709282010254562856_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272862505_4349423325162092_7390184249700103781_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/273000587_1120916835116598_2698551303370956781_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/259292341_224643766543824_4774168378243215632_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/334993766_743359610753332_822553600631269861_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335028137_3411178112465346_6350909412602315574_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335160357_1419924772081318_5023941522012233726_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335435118_906558313890501_2467496699965878479_n.webp",
          "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335586426_879602216593590_7096570922401511867_n.webp",
        ],
      },
    ],
  },
  {
    id: "farm-draft-concept",
    title: "Farm Draft and Concept",
    type: "Architectural Draft · Farm Facility Concept · Design Development",
    description: "A farm-facility study developed from field sketches and roof planning into a coordinated architectural concept presentation.",
    cover: "/images/projects/design-architecture/architecture-sketch/farm/F1.webp",
    items: [
      {
        id: "farm-draft",
        tab: "Draft",
        title: "Farm Facility Draft Studies",
        description: "Hand-drawn structural notes, roof studies, measurements, and working sketches document the practical design decisions behind the facility.",
        medium: "Architectural draft and field sketch",
        tools: ["Drafting", "Structural Study", "Roof Planning", "Site Notes"],
        mediaType: "image",
        src: "/images/projects/design-architecture/architecture-sketch/farm/farm-1.webp",
        sources: [
          "/images/projects/design-architecture/architecture-sketch/farm/farm-1.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/393476598_303782715754124_9168920187711006577_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/393895552_1032901757861117_7805415106057950472_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/393969114_284133057916562_8939381508620963229_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/394021977_1974014649639080_7666743670110151803_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/394029968_1766384690470142_317680770483972132_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/394042182_1016394842743032_1895719750905120674_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/394137469_1160375984920631_1070121640534650896_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/394348251_3559875774287892_7258427031869954851_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/394491305_350189757368595_8621329773174332939_n.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/395530347_1262489371116919_4962628074569834311_n.webp",
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
        src: "/images/projects/design-architecture/architecture-sketch/farm/F1.webp",
        sources: [
          "/images/projects/design-architecture/architecture-sketch/farm/F1.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/F2.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/F3.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/F4.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/F5.webp",
          "/images/projects/design-architecture/architecture-sketch/farm/F6.webp",
        ],
      },
    ],
  },
  {
    id: "art-on-walls",
    title: "Mural Concept and Draft Design",
    type: "Mural Concept · Draft Design · Environmental Graphics",
    description: "Large-scale visual stories developed from blank-wall references through mural concepts, grid studies, and final presentation designs.",
    cover: "/images/projects/visual-art/art-on-walls/output-wall-2.webp",
    items: [
      {
        id: "empty-wall",
        tab: "Empty Wall",
        title: "The Space Before the Artwork",
        description: "The original blank-wall references establish the dimensions, viewing angles, and environmental context for the mural concept.",
        medium: "Site reference photography",
        tools: ["Site Study", "Photography", "Scale Planning"],
        mediaType: "image",
        src: "/images/projects/visual-art/art-on-walls/empty-wall-1.webp",
        sources: [
          "/images/projects/visual-art/art-on-walls/empty-wall-1.webp",
          "/images/projects/visual-art/art-on-walls/empty-wall-2.webp",
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
        src: "/images/projects/visual-art/art-on-walls/draft-1.webp",
        sources: [
          "/images/projects/visual-art/art-on-walls/draft-1.webp",
          "/images/projects/visual-art/art-on-walls/grid-wall-2.webp",
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
        src: "/images/projects/visual-art/art-on-walls/design-wall-2.webp",
        sources: [
          "/images/projects/visual-art/art-on-walls/design-wall-2.webp",
          "/images/projects/visual-art/art-on-walls/layout-3.webp",
          "/images/projects/visual-art/art-on-walls/layout-4.webp",
          "/images/projects/visual-art/art-on-walls/wall-4.webp",
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
        src: "/images/projects/visual-art/art-on-walls/output-wall-2.webp",
        sources: [
          "/images/projects/visual-art/art-on-walls/output-1.webp",
          "/images/projects/visual-art/art-on-walls/output-4.webp",
          "/images/projects/visual-art/art-on-walls/output-5.webp",
          "/images/projects/visual-art/art-on-walls/output-wall-2.webp",
        ],
      },
    ],
  },
  {
    id: "product-brand-promotion",
    title: "Product & Brand Promotion",
    type: "Product Art · Brand Identity · Campaign Design",
    description: "Product-focused visuals that unite brand identity, storytelling, and promotion into one campaign-ready system.",
    cover: "/images/projects/design-architecture/product-and-brand-promotion/architecture-feature.webp",
    items: [
      {
        id: "architecture-campaign",
        tab: "Architecture Campaign",
        title: "Architecture and Interior Promotion",
        description: "Campaign-ready hero visuals combining architectural drawing, interiors, rendering, and design services into a clear promotional story.",
        medium: "Architecture campaign design",
        tools: ["Art Direction", "Layout", "Photo Compositing", "Typography"],
        mediaType: "image",
        src: "/images/projects/design-architecture/product-and-brand-promotion/architecture-feature.webp",
        sources: [
          "/images/projects/design-architecture/product-and-brand-promotion/architecture-feature.webp",
          "/images/projects/design-architecture/product-and-brand-promotion/interior-design.webp",
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
        src: "/images/projects/design-architecture/product-and-brand-promotion/interactive COmponent.webp",
      },
      {
        id: "digital-product-campaign",
        tab: "Digital Product Campaign",
        title: "Software and Digital Twin Promotion",
        description: "Promotional graphics for creative tools and the FROST TWIN WMS product, shaped for portfolio and campaign presentation.",
        medium: "Technology campaign visuals",
        tools: ["Product Marketing", "Compositing", "Presentation Design"],
        mediaType: "image",
        src: "/images/projects/design-architecture/product-and-brand-promotion/twin-wms.webp",
        sources: [
          "/images/projects/design-architecture/product-and-brand-promotion/twin-wms.webp",
          "/images/projects/design-architecture/product-and-brand-promotion/tools.webp",
        ],
      },
    ],
  },
  {
    id: "imagination-beyond-dimensions",
    title: "Imagination Beyond Dimensions",
    type: "Sketchbook · Character Art · 3D Exploration",
    description: "A working laboratory where sketches, characters, forms, and digital experiments evolve beyond the page.",
    cover: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-model.webp",
    items: [
      {
        id: "concept-sketch",
        tab: "Concept Sketch",
        title: "The First Visible Thought",
        description: "An early visual study that captures gesture, personality, and direction before refinement begins.",
        medium: "Digital concept sketch",
        tools: ["Sketching", "Ideation", "Form Study"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/84dad0c5-9b00-41cf-b39e-9b15118cf1dd.webp",
      },
      {
        id: "character-design",
        tab: "Character Design",
        title: "Building a Visual Personality",
        description: "A character study focused on silhouette, expression, recognizable features, and storytelling potential.",
        medium: "Character development",
        tools: ["Character Design", "Digital Art"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/mesh-modeling-helmet/bit-head.webp",
      },
      {
        id: "environment",
        tab: "Environment",
        title: "A World Around the Idea",
        description: "A spatial experiment exploring how atmosphere, structure, and surrounding forms reinforce a visual narrative.",
        medium: "Environment study",
        tools: ["World Building", "Composition"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/mesh.webp",
      },
      {
        id: "3d-study",
        tab: "3D Study",
        title: "Form Beyond the Flat Page",
        description: "A dimensional model study examining volume, topology, lighting response, and a character's presence in space.",
        medium: "3D character study",
        tools: ["3D Modeling", "Form", "Lighting"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-model.webp",
      },
      {
        id: "experiments",
        tab: "Experiments",
        title: "Ideas Without Boundaries",
        description: "An open collection of mesh, frame, material, and rendering tests where unexpected directions can emerge.",
        medium: "Digital experiment",
        tools: ["Mesh Study", "Rendering", "Iteration"],
        mediaType: "image",
        src: "/images/projects/visual-art/Design-mesh-modeling/3d-modeling/rex-mesh-frame.webp",
      },
    ],
  },
  {
    id: "products-become-headlines",
    title: "Products Become Headlines",
    type: "Hero Visuals · Editorial Art · Advertising Frames",
    description: "Cinematic product frames composed to stop the scroll, lead the story, and turn attention into interest.",
    cover: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/259292341_224643766543824_4774168378243215632_n.webp",
    items: [
      { id: "storyboard", tab: "Storyboard", title: "The Property Story Begins", description: "Selected stills establish the architectural sequence, viewpoints and pacing before the walkthrough is assembled.", medium: "Property visualization", tools: ["Storyboarding", "Composition"], mediaType: "image", src: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247858724_3122562078019263_7063230755393566376_n.webp", sources: [
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247858724_3122562078019263_7063230755393566376_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247875156_354343786544556_6665165074099985871_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/247954221_321516673325539_3468332502867239449_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/248170117_1021943678418140_3064316473029042339_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/257717348_494056598727460_5555034233193482798_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/258880999_1630693557311546_4072557585897973725_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259042199_694055611751787_2377242551136467128_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259225208_304114428413237_7596397517963255955_n.webp",
      ] },
      { id: "exterior", tab: "Exterior", title: "Architecture with Presence", description: "Exterior frames introduce the property through strong perspective, material contrast and an inviting approach.", medium: "Exterior visualization", tools: ["3D Rendering", "Lighting"], mediaType: "image", src: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/259292341_224643766543824_4774168378243215632_n.webp", sources: [
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259243539_3199450940335190_7411947841581094377_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259292219_627993514926584_2003896986973134810_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/259292341_224643766543824_4774168378243215632_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259356620_1006758969918999_2704820268567890947_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259631104_3325114404279659_2879381154155089619_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259673593_1011295529801803_2384111163317468066_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/259879384_1321940291566464_7652675005990826403_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260158821_460908652156497_2474107417861669468_n.webp",
      ] },
      { id: "interior", tab: "Interior", title: "The Experience Inside", description: "Interior frames continue the story through room-to-room movement, atmosphere and spatial detail.", medium: "Interior visualization", tools: ["Interior Design", "Camera Blocking"], mediaType: "image", src: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/334993766_743359610753332_822553600631269861_n.webp", sources: [
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260473432_4965861116813617_5118858795320172493_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260724055_3149270151986940_760414576581566583_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260732763_359089222446647_7914020899982571882_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/260740032_1790020667853161_3406884916002712671_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/270800330_432393928634011_6045747371774699378_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272102891_3070614653176510_4709170262160190944_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272185956_4781849941910173_6307410594149698353_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272633441_401184915096906_5138427783982819588_n.webp",
      ] },
      { id: "rendered-frames", tab: "Rendered Frames", title: "A Complete Visual Sequence", description: "Final rendered views form the image set used to shape the property's cinematic presentation.", medium: "Rendered property campaign", tools: ["Rendering", "Post-production"], mediaType: "image", src: "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335586426_879602216593590_7096570922401511867_n.webp", sources: [
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272702916_270329748544394_7214637078577885724_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272813764_233988912274571_5709282010254562856_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/272862505_4349423325162092_7390184249700103781_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/273000587_1120916835116598_2698551303370956781_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/334993766_743359610753332_822553600631269861_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335028137_3411178112465346_6350909412602315574_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335160357_1419924772081318_5023941522012233726_n.webp",
        "/images/projects/design-architecture/architecture-sketch/Architectural-Walkthrough-residential/vray-rendered/floorplan/335586426_879602216593590_7096570922401511867_n.webp",
      ] },
    ],
  },
  ];

  const heartOfArchitecture = projects.find((project) => project.id === "heart-of-architecture");
  const productsBecomeHeadlines = projects.find((project) => project.id === "products-become-headlines");
  const bunnyCyborg = projects.find((project) => project.id === "bunny-cyborg-3d-modeling");
  const meshModelingHelmet = projects.find((project) => project.id === "mesh-modeling-helmet");
  const imaginationBeyondDimensions = projects.find((project) => project.id === "imagination-beyond-dimensions");
  const productModel = projects.find((project) => project.id === "product-model");
  const farmDraftConcept = projects.find((project) => project.id === "farm-draft-concept");
  const muralConcept = projects.find((project) => project.id === "art-on-walls");
  const interiorDesign = heartOfArchitecture?.items.find((item) => item.id === "interior-design");

  if (heartOfArchitecture && productsBecomeHeadlines) {
    heartOfArchitecture.items = [
      ...heartOfArchitecture.items.filter((item) => item.id !== "interior-design"),
      ...productsBecomeHeadlines.items,
    ];
  }

  if (bunnyCyborg) {
    bunnyCyborg.id = "mesh-modeling";
    bunnyCyborg.title = "Mesh Modeling";
    bunnyCyborg.type = "Character Mesh · Hard-Surface Modeling · Blender Output";
    bunnyCyborg.description = "A consolidated mesh-modeling collection covering character topology, mechanical parts, helmet studies, concept development, and Blender outputs.";
    bunnyCyborg.cover = "/images/projects/THUMBNAIL/mesh-modeling-thumbnail-v2.webp";
    bunnyCyborg.items = [
      ...bunnyCyborg.items,
      ...(meshModelingHelmet?.items ?? []),
      ...(imaginationBeyondDimensions?.items ?? []),
    ];
  }

  const interiorDesignProject: VisualArtProject | undefined = interiorDesign ? {
    id: "interior-design-projects",
    title: "Interior Design Projects",
    type: "Interior Planning · SketchUp · AutoCAD · Rendering",
    description: "Interior-design projects developed from measured plans, raw references, and material studies into presentation-ready rendered spaces.",
    cover: "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo/interior desgin/final-output-1/final-output.webp",
    items: [interiorDesign],
  } : undefined;

  const condoRoot = "/images/projects/design-architecture/architecture-sketch/Architectural-Interior-Condo";
  const condoFinalRender: VisualArtProject = {
    id: "condo-final-render",
    title: "Condo with Final Render",
    type: "AutoCAD · SketchUp · 3D Development · Final Rendering",
    description: "A complete condo visualization study progressing from measured planning and SketchUp blocking through staged 3D rendering, site captures, and the final presentation output.",
    cover: `${condoRoot}/final-output-sala.webp`,
    items: [
      {
        id: "condo-design-sequence",
        tab: "Design Sequence",
        title: "Condo Design Development and Final Render",
        description: "The project is presented in deliberate production order: AutoCAD planning, SketchUp spatial development, progressive 3D renders, captured site references, and the completed interior visualization.",
        medium: "Condo architectural visualization",
        tools: ["AutoCAD", "SketchUp", "3D Rendering", "Interior Visualization", "Photography"],
        mediaType: "image",
        src: `${condoRoot}/floor-plan.webp`,
        highlightImages: [
          { src: `${condoRoot}/render-7.webp`, label: "Before / Base 3D" },
          { src: `${condoRoot}/semirender-sala.webp`, label: "Development / Semi Render" },
          { src: `${condoRoot}/final-output-sala.webp`, label: "After / Final Output" },
        ],
        sources: [
          `${condoRoot}/floor-plan.webp`,
          `${condoRoot}/sketch-up.webp`,
          `${condoRoot}/render-1.webp`,
          `${condoRoot}/render-2.webp`,
          `${condoRoot}/render-3.webp`,
          `${condoRoot}/render-4.webp`,
          `${condoRoot}/render-5.webp`,
          `${condoRoot}/render-6.webp`,
          `${condoRoot}/render-7.webp`,
          `${condoRoot}/render-8.webp`,
          `${condoRoot}/render-9.webp`,
          `${condoRoot}/render-10.webp`,
          `${condoRoot}/render-11.webp`,
          `${condoRoot}/raw-a1.webp`,
          `${condoRoot}/raw-a2.webp`,
          `${condoRoot}/raw-a3.webp`,
          `${condoRoot}/raw-a4.webp`,
          `${condoRoot}/785147210_29294040943518367_6132614298407134371_n.webp`,
          `${condoRoot}/786242705_29294040376851757_7597259034490867128_n.webp`,
          `${condoRoot}/786471705_29294040363518425_6409891529341447140_n.webp`,
          `${condoRoot}/787483993_29294042790184849_3512394392516597451_n.webp`,
          `${condoRoot}/787796896_29294043336851461_3036649771445791080_n.webp`,
          `${condoRoot}/787904373_29294041570184971_5925209955096295661_n.webp`,
          `${condoRoot}/788439150_29294042780184850_1064623880779020515_n.webp`,
          `${condoRoot}/788563601_29294042113518250_3828248821049908131_n.webp`,
          `${condoRoot}/788641114_29294041506851644_3967735995842617770_n.webp`,
          `${condoRoot}/788766288_29294039216851873_4540098056076281705_n.webp`,
        ],
      },
    ],
  };

  return [
    heartOfArchitecture,
    bunnyCyborg,
    interiorDesignProject,
    condoFinalRender,
    productModel,
    farmDraftConcept,
    muralConcept,
  ].filter((project): project is VisualArtProject => Boolean(project));
})();
