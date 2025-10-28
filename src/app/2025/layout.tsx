import { SiteLoaderProvider } from "@/app/site-loader-provider";
import DynamicFavicon from "@/components/DynamicFavicon";
import ConditionalSiteLoader from "@/components/ConditionalSiteLoader";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <DynamicFavicon />
            <ConditionalSiteLoader>{children}</ConditionalSiteLoader>
        </>
    );
}
