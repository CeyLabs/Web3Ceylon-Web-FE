import { SiteLoaderProvider } from "@/app/site-loader-provider";
import DynamicFavicon from "@/components/DynamicFavicon";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
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
