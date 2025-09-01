export const SITE_URL = "https://web3ceylon.com/";
export const SITE_NAME = "Web3Ceylon 2025 - Sri Lanka's Largest Web3 Developer & Community Tour";
export const OG_IMAGE = "/og-image.png";

export const EVENT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Web3Ceylon 2025",
  description:
    "Sri Lanka's largest Web3 developer and community tour covering blockchain development, crypto education, and NFT creation across four cities",
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  location: {
    "@type": "Place",
    name: "Sri Lanka",
    address: { "@type": "PostalAddress", addressCountry: "LK" },
  },
  organizer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  image: {
    "@type": "ImageObject",
    url: OG_IMAGE,
    width: 1200,
    height: 630,
  },
  
};
