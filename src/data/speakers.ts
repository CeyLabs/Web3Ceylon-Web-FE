export type Speaker = {
  name: string;
  org?: string;
  url?: string;
  linkedin?: string;
  x?: string;
  telegram?: string;
  image?: string;
  pending?: boolean;
};

export type SpeakerGroupKey = "colombo" | "galle" | "panel" | "kandy";

export type SpeakerGroups = Record<SpeakerGroupKey, Speaker[]>;

export const speakers: SpeakerGroups = {
  colombo: [
    {
      name: "Suresh Peiris",
      org: "GDG Sri Lanka",
      linkedin: "https://www.linkedin.com/in/sureshpeiris",
      x: "https://x.com/sureshpeiris",
      telegram: "https://t.me/sureshpeiris",
    },
    {
      name: "Dilshan Madusanka",
      org: "CeyLabs",
      linkedin: "https://www.linkedin.com/in/dilshanmadusanka",
      x: "https://x.com/dilshanmadusanka",
      telegram: "https://t.me/dilshanmadusanka",
    },
    {
      name: "Imeth Vinnath",
      org: "Metana",
      linkedin: "https://www.linkedin.com/in/imethvinnath",
      x: "https://x.com/imethvinnath",
      telegram: "https://t.me/imethvinnath",
    },
    {
      name: "Buddhika Lakmal",
      org: "Dapptize",
      linkedin: "https://www.linkedin.com/in/buddhikalakmal",
      x: "https://x.com/buddhikalakmal",
      telegram: "https://t.me/buddhikalakmal",
    },
    {
      name: "Sanjeewa Silva",
      org: "FutureCX",
      linkedin: "https://www.linkedin.com/in/sanjeewasilva",
      x: "https://x.com/sanjeewasilva",
      telegram: "https://t.me/sanjeewasilva",
    },
  ],
  galle: [
    {
      name: "Dumidu Thabrew",
      org: "Founderflow",
      linkedin: "https://www.linkedin.com/in/dumiduthabrew",
      x: "https://x.com/dumiduthabrew",
      telegram: "https://t.me/dumiduthabrew",
    },
    {
      name: "Kasum Asanka",
      org: "Cosmos Sri Lanka",
      linkedin: "https://www.linkedin.com/in/kasumasanka",
      x: "https://x.com/kasumasanka",
      telegram: "https://t.me/kasumasanka",
    },
    {
      name: "Shaqeeq Khan",
      org: "Metana",
      linkedin: "https://www.linkedin.com/in/shaqeeqkhan",
      x: "https://x.com/shaqeeqkhan",
      telegram: "https://t.me/shaqeeqkhan",
    },
    {
      name: "Prabodha Lakshan",
      org: "TechNews",
      linkedin: "https://www.linkedin.com/in/prabodhalakshan",
      x: "https://x.com/prabodhalakshan",
      telegram: "https://t.me/prabodhalakshan",
    },
    {
      name: "ManiyaWeb3",
      org: "Solana Sri Lanka",
      linkedin: "https://www.linkedin.com/in/maniyaweb3",
      x: "https://x.com/maniyaweb3",
      telegram: "https://t.me/maniyaweb3",
    },
    {
      name: "Dumindu Kanishka",
      org: "TON Sri Lanka",
      linkedin: "https://www.linkedin.com/in/dumindukanishka",
      x: "https://x.com/dumindukanishka",
      telegram: "https://t.me/dumindukanishka",
    },
  ],
  panel: [
    {
      name: "Dilshan Abeygunawardana",
      org: "MyHubLK",
      linkedin: "https://www.linkedin.com/in/dilshanabeygunawardana",
      x: "https://x.com/dilshanabey",
      telegram: "https://t.me/dilshanabeygunawardana",
    },
    {
      name: "Kosala Jayasekara",
      org: "Fixel Digital",
      linkedin: "https://www.linkedin.com/in/kosalajayasekara",
      x: "https://x.com/kosalajay",
      telegram: "https://t.me/kosalajayasekara",
    },
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

