"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLastViewedPhoto } from "@/hooks/useLastViewedPhoto";
import type { AlbumHeroContent, ImageProps } from "@/lib/gallery/types";
import GooglePhotosIcon from "@/components/gallery/icons/GooglePhotos";
import Modal from "./Modal";

interface AlbumGalleryProps {
    images: ImageProps[];
    hero?: AlbumHeroContent;
    imageAlt?: string;
}

const defaultHero: AlbumHeroContent = {
    eyebrow: "Tour Gallery",
    title: "Web3Ceylon 2025",
    description:
        "Explore highlights from the Web3Ceylon 2025 tour. Builders, founders, and creators bringing Sri Lanka's Web3 ecosystem together.",
    ctaLabel: "View in Google Photos",
    ctaHref: "#",
};

const defaultImageAlt = "Web3Ceylon event photo";

export default function AlbumGallery({ images, hero, imageAlt }: AlbumGalleryProps) {
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const photoIdParam = searchParams.get("photoId");
    const photoId = photoIdParam ? Number(photoIdParam) : null;

    const lastViewedPhotoRef = useRef<HTMLAnchorElement | null>(null);

    // Infinite scroll functionality
    const [visibleImages, setVisibleImages] = useState(50); // Start with 50 images
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const loadMoreImages = useCallback(() => {
        if (isLoadingMore || visibleImages >= images.length) return;

        setIsLoadingMore(true);
        // Simulate loading delay for better UX
        setTimeout(() => {
            setVisibleImages((prev) => Math.min(prev + 50, images.length));
            setIsLoadingMore(false);
        }, 500);
    }, [isLoadingMore, visibleImages, images.length]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const currentRef = loadMoreRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !isLoadingMore && visibleImages < images.length) {
                    loadMoreImages();
                }
            },
            {
                rootMargin: "100px", // Start loading 100px before the element comes into view
                threshold: 0.1,
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isLoadingMore, visibleImages, images.length, loadMoreImages]);

    const hasMoreImages = visibleImages < images.length;

    useEffect(() => {
        if (typeof lastViewedPhoto === "number" && photoId === null) {
            lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
            setLastViewedPhoto(null);
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

    useEffect(() => {
        router.prefetch("/2025/album");
    }, [router]);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                router.push("/2025/album");
            }
        };

        window.addEventListener("keydown", handleEscapeKey);
        return () => {
            window.removeEventListener("keydown", handleEscapeKey);
        };
    }, [router]);

    const heroContent = hero ?? defaultHero;
    const galleryImageAlt = imageAlt ?? defaultImageAlt;
    const heroImage = heroContent.image;
    const showCta = Boolean(heroContent.ctaHref && heroContent.ctaLabel);
    const ctaTarget = heroContent.ctaTarget ?? "_blank";

    return (
        <>
            <main className="mx-auto max-w-[1960px] p-4">
                {photoId !== null && !Number.isNaN(photoId) && (
                    <Modal
                        images={images}
                        imageAlt={galleryImageAlt}
                        onClose={(lastViewed) => {
                            if (typeof lastViewed === "number") {
                                setLastViewedPhoto(lastViewed);
                            }
                        }}
                    />
                )}
                <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                    <div className="after:content shadow-highlight after:shadow-highlight relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pt-64 pb-16 text-center text-white after:pointer-events-none after:absolute after:inset-0 after:rounded-lg lg:pt-0">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <span className="absolute right-0 bottom-0 left-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black" />
                        </div>
                        {heroImage ? (
                            <Image
                                src={heroImage.src}
                                alt={heroImage.alt}
                                width={heroImage.width ?? 220}
                                height={heroImage.height ?? 220}
                                className={heroImage.className}
                                priority
                            />
                        ) : null}
                        {heroContent.eyebrow && (
                            <p className="text-xs font-semibold tracking-[0.35em] text-white/70 uppercase">
                                {heroContent.eyebrow}
                            </p>
                        )}
                        <h1
                            className={
                                heroContent.titleClassName ??
                                "mt-8 mb-4 text-base font-bold tracking-widest uppercase"
                            }
                        >
                            {heroContent.title}
                        </h1>
                        <p
                            className={
                                heroContent.descriptionClassName ??
                                "max-w-[40ch] text-white/75 sm:max-w-[32ch]"
                            }
                        >
                            {heroContent.description}
                        </p>
                        {showCta && (
                            <div className="flex gap-4">
                                <button
                                    onClick={() => router.push("/2025/album")}
                                    className="pointer z-10 mt-6 rounded-lg border border-white bg-transparent px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:mt-4"
                                >
                                    Back
                                </button>
                                <a
                                    className="pointer z-10 mt-6 flex items-center gap-2 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                                    href={heroContent.ctaHref}
                                    target={ctaTarget}
                                    rel="noreferrer"
                                >
                                    <GooglePhotosIcon className="h-4 w-4" />
                                    {heroContent.ctaLabel}
                                </a>
                            </div>
                        )}
                        <p className="text-sm text-white/50">Press Esc to exit</p>
                    </div>
                    {images
                        .slice(0, visibleImages)
                        .map(({ id, public_id, format, blurDataUrl, width, height }) => (
                            <Link
                                key={id}
                                href={{ pathname, query: { photoId: id } }}
                                ref={id === lastViewedPhoto ? lastViewedPhotoRef : null}
                                scroll={false}
                                className="after:content group after:shadow-highlight relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
                            >
                                <Image
                                    alt={galleryImageAlt}
                                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                    style={{
                                        transform: "translate3d(0, 0, 0)",
                                        width: "100%",
                                        height: "auto",
                                    }}
                                    placeholder={blurDataUrl ? "blur" : "empty"}
                                    blurDataURL={blurDataUrl}
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                                    width={width}
                                    height={height}
                                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                                />
                            </Link>
                        ))}
                    {hasMoreImages && (
                        <div ref={loadMoreRef} className="flex items-center justify-center py-8">
                            {isLoadingMore ? (
                                // Single skeleton loading card
                                <div className="flex w-full justify-center">
                                    <div className="after:content group after:shadow-highlight relative mb-5 block w-full max-w-sm animate-pulse cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg">
                                        <div className="aspect-[3/4] w-full rounded-lg bg-white/10 shadow-lg"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-4 text-sm text-white/50">
                                    Scroll for more photos
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <footer className="p-6 text-center text-white/80 sm:p-12">
                Share the vibe on socials using the hashtags #Web3Ceylon, @web3ceylontour,
                @CeylonCash & @BybitSriLanka #Web3 #CeylonCash #BybitSriLanka
            </footer>
        </>
    );
}
