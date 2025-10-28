import type { AlbumHeroContent } from "@/lib/gallery/types";

export interface GalleryEvent {
    slug: string;
    name: string;
    folder: string;
    summary: string;
    hero: AlbumHeroContent;
    imageAlt?: string;
    metaDescription?: string;
}

const defaultCtaLabel = "View in Google Photos";

export const galleryEvents: GalleryEvent[] = [
    {
        slug: "colombo",
        name: "Colombo",
        folder: "Colombo",
        summary: "Kickoff night with founders, builders, and artists at Trace Expert City.",
        hero: {
            eyebrow: "City Gallery",
            title: "Web3Ceylon Colombo",
            titleClassName: "font-primary mt-8 mb-4 text-2xl font-semibold text-[#1976D2]",
            description:
                "Relive the energy from our Colombo launch — a packed house of creators, founders, and community leaders kicking off the 2025 tour.",
            descriptionClassName: "max-w-[40ch] text-white/75 sm:max-w-[32ch]",
            ctaLabel: defaultCtaLabel,
            ctaHref: "https://photos.app.goo.gl/tk8rANvV27jq5Jts5",
            image: {
                src: "/assets/maps/Colombo_Map.svg",
                alt: "Stylized map illustration of Colombo, Sri Lanka.",
                width: 220,
                height: 220,
            },
        },
        imageAlt: "Web3Ceylon Colombo event photo",
        metaDescription: "Browse highlights from the Web3Ceylon 2025 tour stop in Colombo.",
    },
    {
        slug: "kandy",
        name: "Kandy",
        folder: "Kandy",
        summary: "Builders summit in the hill country with campus founders and student clubs.",
        hero: {
            eyebrow: "City Gallery",
            title: "Web3Ceylon Kandy",
            titleClassName: "font-primary mt-8 mb-4 text-2xl font-semibold text-[#C62828]",
            description:
                "Snapshots from our Kandy builders summit — workshops, student demos, and evenings diving deep into decentralized tech.",
            descriptionClassName: "max-w-[40ch] text-white/75 sm:max-w-[32ch]",
            ctaLabel: defaultCtaLabel,
            ctaHref: "https://photos.app.goo.gl/KTSAkNc4W2Zay4BG9",
            image: {
                src: "/assets/maps/Kandy_Map.svg",
                alt: "Stylized map illustration of Kandy, Sri Lanka.",
                width: 220,
                height: 220,
            },
        },
        imageAlt: "Web3Ceylon Kandy event photo",
        metaDescription: "Explore photos from the Web3Ceylon 2025 builders summit in Kandy.",
    },
    {
        slug: "galle",
        name: "Galle",
        folder: "Galle",
        summary: "Beachside unconference sessions with builders, investors, and artists.",
        hero: {
            eyebrow: "City Gallery",
            title: "Web3Ceylon Galle",
            titleClassName: "font-primary mt-8 mb-4 text-2xl font-semibold text-[#F57C00]",
            description:
                "Golden hour meetups and seaside conversations with founders and collectors during our Galle stop.",
            descriptionClassName: "max-w-[40ch] text-white/75 sm:max-w-[32ch]",
            ctaLabel: defaultCtaLabel,
            ctaHref: "https://photos.app.goo.gl/L1PQ2Sf6bFUDMbaS8",
            image: {
                src: "/assets/maps/Galle_Map.svg",
                alt: "Stylized map illustration of Galle, Sri Lanka.",
                width: 220,
                height: 220,
            },
        },
        imageAlt: "Web3Ceylon Galle event photo",
        metaDescription: "See the highlights from Web3Ceylon’s 2025 beachside sessions in Galle.",
    },
    {
        slug: "ella",
        name: "Ella",
        folder: "Ella",
        summary: "Retreat in the mountains with founders, storytellers, and DAO leads.",
        hero: {
            eyebrow: "City Gallery",
            title: "Web3Ceylon Ella",
            titleClassName: "font-primary mt-8 mb-4 text-2xl font-semibold text-[#388E3C]",
            description:
                "Morning hikes, fireside chats, and intimate workshops from the Ella retreat leg of the tour.",
            descriptionClassName: "max-w-[40ch] text-white/75 sm:max-w-[32ch]",
            ctaLabel: defaultCtaLabel,
            ctaHref: "https://photos.google.com/u/1/share/AF1QipOYEyX8D6MZpQ6qCYuQqb_sJClzPwjxxtmIyqewxqWSUfugOP9bFhtlEdfDsAfVWQ?key=Q0lzSE9ucTdMVXNKdy1Ub2k2MVRuWHZMdDVyQ25B",
            image: {
                src: "/assets/maps/Ella_Map.svg",
                alt: "Stylized map illustration of Ella, Sri Lanka.",
                width: 220,
                height: 220,
            },
        },
        imageAlt: "Web3Ceylon Ella event photo",
        metaDescription: "Immerse yourself in the Web3Ceylon 2025 retreat experience from Ella.",
    },
];

export const galleryEventMap = new Map(galleryEvents.map((event) => [event.slug, event]));

export function getGalleryEvent(slug: string): GalleryEvent | undefined {
    return galleryEventMap.get(slug);
}
