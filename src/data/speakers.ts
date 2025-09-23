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

export type SpeakerGroupKey = "colombo" | "kandy" | "galle" | "panel" | "ella";

export type SpeakerGroups = Record<SpeakerGroupKey, Speaker[]>;

export const speakers: SpeakerGroups = {
  colombo: [
    {
      name: "Suresh Peiris",
      org: "GDG Sri Lanka",
      linkedin: "https://www.linkedin.com/in/sureshmichael/",
      x: "https://x.com/TSMPeiris",
      telegram: "https://t.me/sureshpeiris",
      image: "/assets/speakers/Suresh Michael Peiris.webp",
    },
    {
      name: "Dilshan Madusanka",
      org: "CeyLabs LLC",
      linkedin: "https://www.linkedin.com/in/dilshanlk/",
      x: "https://x.com/helloscoopa",
      telegram: "https://t.me/dilshanmadusanka",
      image: "/assets/speakers/Dilshan Madusanka.webp",
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
      name: "Diyath Rajapakshe",
      org: "Future CX",
      linkedin: "https://www.linkedin.com/in/diyathsahanrajapakshe/",
      x: "https://x.com/diyathrajapakse",
      telegram: "https://t.me/diyathrajapakse",
      image: "/assets/speakers/Diyath Sahan Rajapakshe.webp",
    },
    {
      name: "Sanjeewa Silva",
      org: "Future CX",
      linkedin: "https://www.linkedin.com/in/sanjeewa-silva/",
      x: "https://x.com/ssanjeewa",
      telegram: "https://t.me/sanjeewasilva",
      image: "/assets/speakers/Sanjeewa Silva.webp",
    },
  ],
  kandy: [
    { name: "Nissanka Seneviratne", org: "Maash/Apium", linkedin: "https://www.linkedin.com/in/nissankaseneviratne/", x: "https://x.com/nissankaseneviratne", image: "/assets/speakers/Nissanka Seneviratne.webp" },
    { name: "Niranga Hettiarachchi", org: "Light Foundation", linkedin: "https://www.linkedin.com/in/indrajith-hettiarachchi/", x: "https://x.com/indrajith963", image: "/assets/speakers/Niranga Indrajith Hettiarachchi.webp" },
    {
      name: "Chirath Rajapaksha",
      org: "Digital Assets LK",
      linkedin: "https://www.linkedin.com/in/chirathrajapaksha/",
      x: "https://x.com/krazychirz",
      telegram: "#",
      image: "/assets/speakers/Chirath Rajapaksha .webp",
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
      linkedin: "https://lk.linkedin.com/in/kasum-asanka-2145761a7",
      x: "https://x.com/AsankaKasum",
      telegram: "https://t.me/kasumasanka",
      image: "/assets/speakers/Kasum Asanka.webp",
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
      org: "Technews.LK",
      linkedin: "https://www.linkedin.com/in/prabodhaonline/",
      x: "https://x.com/prabodhaonline",
      telegram: "https://t.me/prabodhalakshan",
      image: "/assets/speakers/Prabodha Lakshan.webp",
    },
    {
      name: "ManiyaWeb3",
      org: "Solana Sri Lanka",
      linkedin: "https://www.linkedin.com/in/maniyaweb3/",
      x: "https://x.com/maniyaweb3",
      telegram: "https://t.me/maniyaweb3",
      image: "/assets/speakers/ManiyaWeb3.webp",
    },
    {
      name: "Dumindu Kanishka",
      org: "Telegram Creators",
      linkedin: "https://www.linkedin.com/in/domindyou/",
      x: "https://x.com/domindyou",
      telegram: "https://t.me/dumindukanishka",
      image: "/assets/speakers/Dumindu Kanishka.webp",
    },
  ],
  // Guest Panel (placed under the Galle section in UI) — use Galle's color for visual consistency
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
    { name: "TBA", org: "TBA", linkedin: "#", x: "#", telegram: "#" },
  ],
  ella: [{ name: "TBA", org: "TBA", linkedin: "#", x: "#", telegram: "#" }, { name: "TBA", org: "TBA", linkedin: "#", x: "#", telegram: "#" }, { name: "TBA", org: "TBA", linkedin: "#", x: "#", telegram: "#" }],
};

export const speakerGroupTitles: Record<SpeakerGroupKey, string> = {
  colombo: "Colombo — Developers & Builders",
  kandy: "Kandy — Business & Freelancers",
  galle: "Galle — Creators & Storytellers",
  panel: "Galle - Guest Panel",
  ella: "Ella — Devs & Creators",
};

// Optional: per-group visual theming (colors match site palette)
export const speakerGroupStyles: Record<SpeakerGroupKey, { gradient: string; border: string }> = {
  // Use brand accents blended into a dark base for good legibility with white text
  colombo: {
    gradient: "linear-gradient(145deg,#1976D2,#000000)",
    border: "#1976D2",
  },
  kandy: {
    // Use Kandy's accent from Cities.tsx (#C62828)
    gradient: "linear-gradient(150deg,#C62828,#000000)",
    border: "#C62828",
  },
  galle: {
    gradient: "linear-gradient(165deg,#F57C00,#000000)",
    border: "#F57C00",
  },
  // Panel should visually follow Galle (placed under Galle in the layout)
  panel: {
    gradient: "linear-gradient(165deg,#F57C00,#000000)",
    border: "#F57C00",
  },
  // Ella — small standalone group (TBA)
  ella: {
    // Ella uses #388E3C in the Cities accentMap
    gradient: "linear-gradient(145deg,#388E3C,#000000)",
    border: "#388E3C",
  },
};

