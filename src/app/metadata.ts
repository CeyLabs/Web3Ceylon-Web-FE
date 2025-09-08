import type { Metadata } from "next";

const siteUrl = "https://web3ceylon.com/";
const title = "Web3Ceylon 2025 - Sri Lanka's Largest Web3 Developer & Community Tour";
const description =
    "Join Web3Ceylon 2025, a four-city educational tour across Colombo, Kandy, Galle & Ella. Learn blockchain development, crypto essentials, NFT creation & connect with Sri Lanka's Web3 community. Powered by Ceylon Cash × Bybit.";

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        "Web3Ceylon",
        "blockchain Sri Lanka",
        "crypto education",
        "Web3 developer",
        "NFT creation",
        "Ceylon Cash",
        "Bybit",
        "Colombo tech events",
        "blockchain workshops",
    ],
    authors: [{ name: "Web3Ceylon" }],
    robots: { index: true, follow: true },
    alternates: { canonical: siteUrl },
    openGraph: {
        type: "website",
        url: siteUrl,
        title,
        description:
            "Join Sri Lanka's premier Web3 education tour across 4 cities. Learn blockchain, crypto, and NFTs with industry experts. Free registration now open!",
        images: [{ url: "/og-image.png" }],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description:
            "Join Sri Lanka's premier Web3 education tour across 4 cities. Learn blockchain, crypto, and NFTs with industry experts. Free registration now open!",
        images: ["/og-image.png"],
    },
};