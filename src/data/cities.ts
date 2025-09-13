export type City = {
  id: string;
  city: string;
  group: string;
  headline: string;
  subtitle: string;
  bottomLine: string;
  imageUrl: string;
  tags: string[];
  date: string;
};

export const cities: City[] = [
  {
    id: "colombo",
    city: "Colombo",
    group: "Developers & Builders",
    headline: "Code, Build, and Innovate",
    subtitle: "Building the future with Developers & Builders in Colombo",
    bottomLine: "Let’s Create!",
    imageUrl: "/assets/stamps/Stamp - Colombo.png",
    tags: ["Colombo", "Developers", "Builders"],
    date: "September 20, 2025",
  },
  {
    id: "kandy",
    city: "Kandy",
    group: "Businesses & Freelancers",
    headline: "Learn, Explore, and Grow",
    subtitle: "Unlocking opportunities for Businesses & Freelancers in Kandy",
    bottomLine: "Let’s Grow!",
    imageUrl: "/assets/stamps/Stamp - Kandy.png",
    tags: ["Kandy", "Businesses", "Freelancers"],
    date: "September 28, 2025",
  },
   {
    id: "galle",
    city: "Galle",
    group: "Creators & Storytellers",
    headline: "Create, Connect, and Inspire",
    subtitle: "Celebrating creativity with Creators & Storytellers in Galle",
    bottomLine: "Let’s Connect!",
    imageUrl: "/assets/stamps/Stamp - Galle.png",
    tags: ["Galle", "Creators", "Storytellers"],
    date: "October 08, 2025",
  },
  {
    id: "ella",
    city: "Ella",
    group: "Retreat & Global Connect",
    headline: "Relax, Network, and Collaborate",
    subtitle: "A special Retreat & Global Connect with community leaders in Ella",
    bottomLine: "Let’s Unwind!",
    imageUrl: "/assets/stamps/Stamp - Ella.png",
    tags: ["Ella", "Retreat", "Global Connect"],
    date: "October 12, 2025",
  },
];
