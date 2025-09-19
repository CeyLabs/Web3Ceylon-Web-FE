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
      linkedin: "https://www.linkedin.com/in/sureshmichael/",
      x: "https://x.com/sureshpeiris",
      telegram: "https://t.me/sureshpeiris",
      image: "/assets/speakers/Suresh Peiris.webp",
    },
    {
      name: "Dilshan Madusanka",
      org: "CeyLabs",
      linkedin: "https://www.linkedin.com/in/dilshanlk/",
      x: "https://x.com/helloscoopa",
      telegram: "https://t.me/dilshanmadusanka",
      image: "/assets/speakers/Dilshan Madushanka.webp",
    },
    {
      name: "Imeth Vinnath",
      org: "Metana",
      linkedin: "https://www.linkedin.com/in/imeth-vinnath/",
      x: "https://x.com/ImethVinnath",
      telegram: "https://t.me/imethvinnath",
      image: "/assets/speakers/Imeth Vinnath.webp",
    },
    {
      name: "Buddhika Lakmal",
      org: "Dapptize",
      linkedin: "https://www.linkedin.com/in/itslakmal/",
      x: "https://x.com/buddhikalakmal",
      telegram: "https://t.me/buddhikalakmal",
      image: "/assets/speakers/Buddhika Lakmal.webp",
    },
    {
      name: "Sanjeewa Silva",
      org: "FutureCX",
      linkedin: "https://www.linkedin.com/in/sanjeewa-silva/",
      x: "https://x.com/ssanjeewa",
      telegram: "https://t.me/sanjeewasilva",
      image: "/assets/speakers/Sanjeewa Silva.webp",
    },
  ],
  galle: [
    {
      name: "Dumidu Thabrew",
      org: "Founderflow",
      linkedin: "https://www.linkedin.com/in/dumidu-thabrew/",
      x: "https://x.com/DumiduThabrew",
      telegram: "https://t.me/dumiduthabrew",
      image: "/assets/speakers/Dumidu Thabrew.webp",
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
      linkedin: "https://www.linkedin.com/in/shaqeeqkhan/",
      x: "https://x.com/ShaqeeqKhan",
      telegram: "https://t.me/shaqeeqkhan",
      image: "/assets/speakers/Shaqeeq Khan.webp",
    },
    {
      name: "Prabodha Lakshan",
      org: "TechNews",
      linkedin: "https://www.linkedin.com/in/prabodhaonline/",
      x: "https://x.com/prabodhaonline",
      telegram: "https://t.me/prabodhalakshan",
      image: "/assets/speakers/Prabodha Lakshan.webp",
    },
    {
      name: "ManiyaWeb3",
      org: "Solana Sri Lanka",
      linkedin: "https://www.linkedin.com/in/sheranga-maneesha-maniya-b491a3200/",
      x: "https://x.com/maniyaweb3",
      telegram: "https://t.me/maniyaweb3",
    },
    {
      name: "Dumindu Kanishka",
      org: "TON Sri Lanka",
      linkedin: "https://www.linkedin.com/in/domindyou/",
      x: "https://x.com/domindyou",
      telegram: "https://t.me/dumindukanishka",
    },
  ],
  panel: [
    {
      name: "Dilshan Abeygunawardana",
      org: "MyHubLK",
      linkedin: "https://www.linkedin.com/in/dilshanabey/",
      x: "https://x.com/xdilshanabey",
      telegram: "https://t.me/dilshanabeygunawardana",
      image: "/assets/speakers/Dilshan Abeygunawardana.webp",
    },
    {
      name: "Kosala Jayasekara",
      org: "Fixel Digital",
      linkedin: "https://www.linkedin.com/in/kosalajayasekara/",
      x: "https://x.com/kjayasekara",
      telegram: "https://t.me/kosalajayasekara",
      image: "/assets/speakers/Kosala Jayasekara.webp",
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

