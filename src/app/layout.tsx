import type { Metadata } from "next";
import "@/styles/theme.css";
import { AppProviders } from "@/app/providers";
import { figtree, instrumentSerif, carena, fredoka } from "@/app/fonts";
import { SiteLoaderProvider } from "@/app/site-loader-provider";
import JsonLd from "@/components/seo/JsonLd";
import { EVENT_JSONLD } from "@/lib/seo";
import DynamicFavicon from "@/components/DynamicFavicon";
import LazyImage from "@/components/reusable/LazyImage";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${figtree.variable} ${instrumentSerif.variable} ${carena.variable} ${fredoka.variable}`}
        >
            <body className="font-sans antialiased">
                <JsonLd id="event-jsonld" data={EVENT_JSONLD} />
                <DynamicFavicon />
                {/* SSR overlay to prevent initial flash before client hydration */}
                <div
                    id="ssr-site-loader"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9998,
                        pointerEvents: "none",
                        // Match sitewide background
                        background: "hsl(var(--background))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <LazyImage
                        src="/Main-Logo.svg"
                        alt="Site logo"
                        width={96}
                        height={96}
                        style={{ height: "min(96px, 12vh)", width: "auto" }}
                        draggable={false}
                    />
                </div>

                <AppProviders>
                    <SiteLoaderProvider>{children}</SiteLoaderProvider>
                </AppProviders>
            </body>
        </html>
    );
}
