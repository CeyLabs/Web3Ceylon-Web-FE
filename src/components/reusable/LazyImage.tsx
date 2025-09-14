"use client";

import Image, { ImageProps } from "next/image";
import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlMmUyZTIiLz48L3N2Zz4=";

export interface LazyImageProps extends ImageProps {
    wrapperClassName?: string;
}

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
    ({ wrapperClassName, className, ...props }, ref) => {
        const [loaded, setLoaded] = useState(false);

        return (
            <div className={cn("relative", wrapperClassName)}>
                <Image
                    {...props}
                    ref={ref}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    onLoadingComplete={() => setLoaded(true)}
                    className={cn(
                        "transition-opacity duration-300",
                        loaded ? "opacity-100" : "opacity-0",
                        className
                    )}
                />
                {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
            </div>
        );
    }
);

LazyImage.displayName = "LazyImage";

export default LazyImage;
