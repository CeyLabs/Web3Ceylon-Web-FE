"use client";

import { useEffect, useState, useMemo } from "react";

const DynamicFavicon = () => {
    const favIcons = useMemo(
        () => [
            "/assets/favicons/fav-c.png",
            "/assets/favicons/fav-e.png",
            "/assets/favicons/fav-g.png",
            "/assets/favicons/fav-k.png",
        ],
        []
    );

    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    useEffect(() => {
        const updateFavicon = (iconPath: string) => {
            const link =
                (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
                document.createElement("link");
            link.type = "image/png";
            link.rel = "icon";
            link.href = iconPath;
            document.getElementsByTagName("head")[0].appendChild(link);
        };

        // Set initial favicon
        updateFavicon(favIcons[currentIconIndex]);

        // Set up interval to change favicon
        const interval = setInterval(() => {
            setCurrentIconIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % favIcons.length;
                updateFavicon(favIcons[nextIndex]);
                return nextIndex;
            });
        }, 2000); // Change every 2 seconds

        return () => clearInterval(interval);
    }, [currentIconIndex, favIcons]);

    return null; // This component doesn't render anything
};

export default DynamicFavicon;
