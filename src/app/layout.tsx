import type { Metadata } from "next";
import "@/styles/theme.css";
import { AppProviders } from "@/app/providers";
import { figtree, instrumentSerif, carena, fredoka } from "@/app/fonts";
import { SiteLoaderProvider } from "@/app/site-loader-provider";
import JsonLd from "@/components/seo/JsonLd";
import { EVENT_JSONLD } from "@/lib/seo";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <html lang="en" className={`${figtree.variable} ${instrumentSerif.variable} ${carena.variable} ${fredoka.variable}`}>
            <body className="font-sans antialiased">
                <JsonLd id="event-jsonld" data={EVENT_JSONLD} />
                {/* SSR overlay to prevent initial flash before client hydration */}
                <div
                    id="ssr-site-loader"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9998,
                        pointerEvents: "none",
                        background:
                            "radial-gradient(circle, hsl(38 55% 94%) 0%, hsl(30 35% 82%) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="/Main-Logo.svg"
                        alt="Site logo"
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
