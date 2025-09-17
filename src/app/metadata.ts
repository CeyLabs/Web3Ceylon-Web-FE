import type { Metadata } from "next";
import {
    DESCRIPTION,
    OG_IMAGE,
    SITE_NAME,
    SITE_URL,
    ORGANIZATION_NAME,
    ORGANIZATION_URL,
    TWITTER_HANDLE,
} from "@/lib/seo";

const APPLICATION_NAME = "Web3Ceylon 2025 Tour";
const TITLE_TEMPLATE = "%s | Web3Ceylon 2025 Tour";
const KEYWORDS = [
    "Web3Ceylon 2025",
    "Sri Lanka blockchain event",
    "Web3 developer workshops",
    "crypto education Sri Lanka",
    "NFT meetup Sri Lanka",
    "Bybit Sri Lanka",
    "Colombo tech events",
    "Kandy blockchain community",
    "Galle tech meetup",
];

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    applicationName: APPLICATION_NAME,
    title: {
        default: SITE_NAME,
        template: TITLE_TEMPLATE,
    },
    description: DESCRIPTION,
    keywords: KEYWORDS,
    category: "Technology Event",
    authors: [{ name: ORGANIZATION_NAME, url: ORGANIZATION_URL }],
    creator: ORGANIZATION_NAME,
    publisher: ORGANIZATION_NAME,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: SITE_URL },
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: APPLICATION_NAME,
        title: SITE_NAME,
        description: DESCRIPTION,
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: APPLICATION_NAME,
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: TWITTER_HANDLE,
        creator: TWITTER_HANDLE,
        title: SITE_NAME,
        description: DESCRIPTION,
        images: [OG_IMAGE],
    },
};
