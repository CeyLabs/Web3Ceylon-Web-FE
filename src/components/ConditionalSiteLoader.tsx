"use client";

import { usePathname } from "next/navigation";
import { SiteLoaderProvider } from "@/app/site-loader-provider";

interface ConditionalSiteLoaderProps {
    children: React.ReactNode;
}

export default function ConditionalSiteLoader({ children }: ConditionalSiteLoaderProps) {
    const pathname = usePathname();
    const isAlbumPath = pathname?.includes("/album");

    if (isAlbumPath) {
        return <>{children}</>;
    }

    return (
        <>
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
                <img
                    src="/Main-Logo.svg"
                    alt="Site logo"
                    style={{ height: "min(96px, 12vh)", width: "auto" }}
                    draggable={false}
                />
            </div>

            <SiteLoaderProvider>{children}</SiteLoaderProvider>
        </>
    );
}
