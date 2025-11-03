import "@/styles/theme.css";
import { AppProviders } from "@/app/providers";
import { figtree, instrumentSerif, carena, fredoka, theGoodMonolith } from "@/app/fonts";
import MetaPixel from "@/components/analytics/MetaPixel";
import JsonLd from "@/components/seo/JsonLd";
import { EVENT_JSONLD } from "@/lib/seo";

export { metadata } from "@/app/metadata";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${figtree.variable} ${instrumentSerif.variable} ${carena.variable} ${fredoka.variable} ${theGoodMonolith.variable}`}
        >
            <body className="font-sans antialiased">
                <MetaPixel />
                <JsonLd id="event-jsonld" data={EVENT_JSONLD} />

                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
