export const SITE_URL = "https://web3ceylon.com/";
export const SITE_NAME = "Web3Ceylon 2025 - Sri Lanka's Largest Web3 Developer & Community Tour";
export const ORGANIZATION_NAME = "Ceylon Cash";
export const ORGANIZATION_URL = "https://ceyloncash.com/";
export const DESCRIPTION =
    "Ceylon Cash presents Web3Ceylon 2025, a four-city educational tour across Colombo, Kandy, Galle & Ella. Learn blockchain development, crypto essentials, NFT creation & connect with Sri Lanka's Web3 community. Powered by Bybit.";
export const OG_IMAGE = `${SITE_URL}og-image.png`;

export const EVENT_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Web3Ceylon 2025",
    description: DESCRIPTION,
    startDate: "2025-09-20T00:00:00+05:30",
    endDate: "2025-10-12T23:59:59+05:30",
    location: {
        "@type": "Place",
        name: "Sri Lanka",
        address: { "@type": "PostalAddress", addressCountry: "LK" },
    },
    organizer: {
        "@type": "Organization",
        name: ORGANIZATION_NAME,
        url: ORGANIZATION_URL,
    },
    image: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: 1200,
        height: 630,
    },
};
