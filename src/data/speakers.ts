export type Speaker = {
  name: string;
  org?: string;
  url?: string;
  image?: string;
  pending?: boolean;
};

export type SpeakerGroupKey = "colombo" | "galle" | "panel" | "kandy";

export type SpeakerGroups = Record<SpeakerGroupKey, Speaker[]>;

export const speakers: SpeakerGroups = {
  colombo: [
    { name: "Suresh Peiris", org: "GDG Sri Lanka" },
    { name: "Dilshan Madusanka", org: "CeyLabs" },
    { name: "Imeth Vinnath", org: "Metana" },
    { name: "Buddhika Lakmal", org: "Dapptize" },
    { name: "Sanjeewa Silva", org: "FutureCX" },
  ],
  galle: [
    { name: "Dumidu Thabrew", org: "Founderflow" },
    { name: "Kasum Asanka", org: "Cosmos Sri Lanka" },
    { name: "Shaqeeq Khan", org: "Metana" },
    { name: "Prabodha Lakshan", org: "TechNews" },
    { name: "ManiyaWeb3", org: "Solana Sri Lanka" },
    { name: "Dumindu Kanishka", org: "TON Sri Lanka" },
  ],
  panel: [
    { name: "Dilshan Abeygunawardana", org: "MyHubLK" },
    { name: "Kosala Jayasekara", org: "Fixel Digital" },
    { name: "TBA", org: "TBA" },
  ],
  kandy: [
    { name: "TBA", org: "TBA" },
    { name: "TBA", org: "TBA" },
  ],
};

export const speakerGroupTitles: Record<SpeakerGroupKey, string> = {
  colombo: "Colombo — Dev Fest",
  galle: "Galle — Creators & Storytellers",
  panel: "Panel",
  kandy: "Kandy — Business & Freelancers",
};

// Optional: per-group visual theming (colors match site palette)
export const speakerGroupStyles: Record<SpeakerGroupKey, { gradient: string; border: string }> = {
  // Use brand accents blended into a dark base for good legibility with white text
  colombo: {
    gradient: "linear-gradient(145deg,#1976D2,#000000)",
    border: "#1976D2",
  },
  galle: {
    gradient: "linear-gradient(165deg,#F57C00,#000000)",
    border: "#F57C00",
  },
  panel: {
    gradient: "linear-gradient(150deg,#7C3AED,#000000)",
    border: "#7C3AED",
  },
  kandy: {
    gradient: "linear-gradient(150deg,#388E3C,#000000)",
    border: "#388E3C",
  },
};

