import type { InvitationMetadata } from "./types";

export const featureMetadata: InvitationMetadata = {
  slug: "invitation-interactive",
  categoryId: "interactive-ui-design",
  title: "Ravian Interactive Invitation",
  type: "Interactive Web Experience",
  description: "A tactile digital invitation with a draggable cover, peelable note, video message, and responsive mobile-first interactions.",
  cover: "/images/projects/interactive-ui-design/invitation-paper-engine/cover.png",
  tabs: [
    {
      id: "overview",
      label: "Overview",
      mediaType: "image",
      src: "/images/projects/interactive-ui-design/invitation-paper-engine/inside-background.png",
      title: "Paper-engine invitation",
      description: "A layered card experience designed to feel physical while remaining accessible in a browser.",
      tools: ["Next.js", "React", "TypeScript"],
    },
    {
      id: "demo",
      label: "Demo",
      mediaType: "video",
      src: "/images/projects/interactive-ui-design/invitation-paper-engine/demo.mp4",
      title: "Interactive demonstration",
      description: "A short demonstration of the card reveal and embedded video moment.",
      tools: ["Framer Motion", "CSS 3D", "Responsive UI"],
    },
  ],
};
