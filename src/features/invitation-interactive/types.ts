export type InvitationTab = {
  id: string;
  label: string;
  mediaType: "image" | "video";
  src: string;
  title: string;
  description: string;
  tools: string[];
};

export type InvitationMetadata = {
  slug: string;
  categoryId: string;
  title: string;
  type: string;
  description: string;
  cover: string;
  tabs: InvitationTab[];
};
