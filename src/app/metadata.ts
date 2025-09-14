import type { Metadata } from "next";
import {
    DESCRIPTION,
    OG_IMAGE,
    SITE_NAME,
    SITE_URL,
    ORGANIZATION_NAME,
    ORGANIZATION_URL,
} from "@/lib/seo";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | Web3Ceylon`,
    },
    description: DESCRIPTION,
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
    authors: [{ name: ORGANIZATION_NAME, url: ORGANIZATION_URL }],
    creator: ORGANIZATION_NAME,
    publisher: ORGANIZATION_NAME,
    robots: { index: true, follow: true },
    alternates: { canonical: SITE_URL },
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: DESCRIPTION,
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_NAME,
        description: DESCRIPTION,
        images: [OG_IMAGE],
    },
};
