"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import LazyImage from "@/components/reusable/LazyImage";
import { gsap } from "gsap";

type SiteLoaderProps = {
    images: string[]; // public paths like "/images/.." or "/lovable-uploads/..."
    titleLines?: [string, string];
    subtitle?: string;
    className?: string;
    /** Rotate group continuously (default true) */
    loopRotate?: boolean;
    /** Enable subtle random card flips (default true) */
    randomFlip?: boolean;
    /** Optional center logo image (e.g., "/Main-Logo.svg"). If provided, replaces text headings. */
    logoSrc?: string;
    /** Called once the initial intro animation finishes (before infinite loops). */
    onIntroComplete?: () => void;
    /** When true, plays an exit animation (Netflix-like zoom) then calls onExitComplete. */
    exit?: boolean;
    onExitComplete?: () => void;
};

export default function SiteLoader({
    images,
    titleLines = ["Web3Ceylon", "Tour"],
    subtitle = "2025",
    className = "",
    loopRotate = true,
    randomFlip = true,
    logoSrc,
    onIntroComplete,
    exit,
    onExitComplete,
}: SiteLoaderProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const groupRef = useRef<HTMLDivElement | null>(null);
    const centerRef = useRef<HTMLDivElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const logoRef = useRef<HTMLImageElement | null>(null);

    // Preload images (including background-image usage)
    useEffect(() => {
        let cancelled = false;

        const preload = async () => {
            const toLoad = [...images];
            if (logoSrc) toLoad.push(logoSrc);
            await Promise.all(
                toLoad.map(
                    (src) =>
                        new Promise<void>((resolve) => {
                            const img = new Image();
                            img.onload = () => resolve();
                            img.onerror = () => resolve();
                            img.src = encodeURI(src);
                        })
                )
            );
            if (!cancelled) setLoaded(true);
        };
        preload();

        return () => {
            cancelled = true;
        };
    }, [images]);

    const cards = useMemo(() => images.slice(0, Math.max(1, images.length)), [images]);

    useEffect(() => {
        if (!loaded) return;
        const group = groupRef.current;
        const root = rootRef.current;
        const centerEl = centerRef.current;
        if (!group || !root) return;

        const cardList = Array.from(group.querySelectorAll<HTMLDivElement>("[data-card]"));
        if (cardList.length === 0) return;

        const imageEl = cardList[0].querySelector<HTMLDivElement>("[data-card-img]");
        if (!imageEl) return;

        const mm = gsap.matchMedia();
        const breakPoint = 53 * 16; // 53em
        const ctx = gsap.context(() => {
            mm.add(
                {
                    isDesktop: `(min-width: ${breakPoint}px)`,
                    isMobile: `(max-width: ${breakPoint}px)`,
                },
                (c) => {
                    const count = cardList.length;
                    const sliceAngle = (2 * Math.PI) / count;

                    const imgH = imageEl.clientHeight || 180; // fallback
                    const radius1 = 50 + imgH / 2; // distance from image center to screen center
                    const isDesktop = c.conditions?.isDesktop;
                    const radius2 = isDesktop ? 250 - radius1 : 180 - radius1;

                    const tl = gsap
                        .timeline({ defaults: { ease: "power1.out" } })
                        // reveal group at the exact moment the timeline starts to avoid pre-paint flicker
                        .set(group, { autoAlpha: 1, visibility: "visible" })
                        .from(cardList, {
                            y: window.innerHeight / 2 + imgH * 1.5,
                            rotateX: -180,
                            stagger: 0.1,
                            duration: 0.5,
                            opacity: 0.8,
                            scale: 3,
                        })
                        .set(cardList, {
                            transformOrigin: `center ${radius1 + imgH / 2}px`,
                        })
                        .set(group, { transformStyle: "preserve-3d" })
                        .to(cardList, { y: -radius1, duration: 0.5 })
                        .to(
                            cardList,
                            {
                                rotation: (index) => (index * 360) / count,
                                rotateY: 15,
                                duration: 1,
                            },
                            "<"
                        )
                        .to(cardList, {
                            x: (index) =>
                                Math.round(radius2 * Math.cos(sliceAngle * index - Math.PI / 4)),
                            y: (index) =>
                                Math.round(radius2 * Math.sin(sliceAngle * index - Math.PI / 4)) -
                                radius1,
                            rotation: (index) => (index + 1) * (360 / count),
                        })
                        .to(
                            cardList,
                            {
                                rotateY: 180,
                                opacity: 0.8,
                                duration: 1,
                            },
                            "<"
                        );

                    if (centerEl) {
                        tl.fromTo(
                            centerEl,
                            { autoAlpha: 0, filter: "blur(60px)" },
                            { autoAlpha: 1, filter: "blur(0px)", duration: 1 },
                            "<"
                        );
                    }

                    // Signal that the intro portion has completed
                    tl.call(() => {
                        onIntroComplete?.();
                    });

                    // fun loops
                    if (randomFlip) {
                        tl.to(cardList, {
                            repeat: -1,
                            duration: 2,
                            onRepeat: () => {
                                gsap.to(cardList[Math.floor(Math.random() * count)], {
                                    rotateY: "+=180",
                                });
                            },
                        });
                    }

                    if (loopRotate) {
                        tl.to(
                            group,
                            { rotation: 360, duration: 20, repeat: -1, ease: "none" },
                            "<-=2"
                        );
                    }

                    return () => {
                        tl.kill();
                    };
                }
            );
        }, root);

        return () => {
            ctx.revert();
            mm.kill();
        };
    }, [loaded]);

    // Exit animation: scale the logo to fill viewport and fade cards
    useEffect(() => {
        if (!exit) return;
        const center = centerRef.current;
        const logo = logoRef.current;
        const group = groupRef.current;
        if (!center || !group) return;

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

        // Compute scale needed to cover viewport based on logo size
        let scaleTo = 8;
        if (logo) {
            const rect = logo.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const scaleW = rect.width ? (vw / rect.width) * 1.2 : 8;
            const scaleH = rect.height ? (vh / rect.height) * 1.2 : 8;
            scaleTo = Math.max(scaleW, scaleH);
        }

        tl.to(group.querySelectorAll("[data-card]"), { opacity: 0, duration: 0.35 }, 0).to(
            logo || center,
            {
                scale: scaleTo,
                duration: 0.85,
                transformOrigin: "center center",
                onComplete: () => onExitComplete?.(),
            },
            0
        );

        return () => {
            tl.kill();
        };
    }, [exit, onExitComplete]);

    return (
        <div
            ref={rootRef}
            className={[
                "relative flex h-[100svh] w-full items-center justify-center overflow-hidden",
                className,
            ].join(" ")}
        >
            {/* Background like original: subtle radial with noise can be themed via parent */}

            {/* Scene container */}
            <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center [perspective:1000px]">
                <div
                    ref={groupRef}
                    className="relative h-full w-full"
                    style={{ opacity: 0, visibility: "hidden" }}
                >
                    {cards.map((src, i) => (
                        <div
                            key={i}
                            data-card
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                        >
                            <div
                                data-card-img
                                className="aspect-[2/3] w-20 rounded-md bg-cover bg-center md:w-24"
                                style={{
                                    backgroundImage: `url("${encodeURI(src)}")`,
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    willChange: "transform, opacity",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Center content: logo or text headings */}
            <div
                ref={centerRef}
                className="relative z-10 flex flex-col items-center justify-center text-center"
                style={{ opacity: 0, visibility: "hidden", willChange: "transform, opacity" }}
            >
                {logoSrc ? (
                    // Use a plain img to avoid requiring Next/Image in downstream envs
                    <LazyImage
                        src={logoSrc}
                        alt="Site logo"
                        width={96}
                        height={96}
                        className="h-[clamp(3rem,2rem+8vw,6rem)] w-auto will-change-transform select-none"
                        draggable={false}
                        wrapperClassName="h-[clamp(3rem,2rem+8vw,6rem)] w-auto"
                        ref={logoRef}
                    />
                ) : (
                    <>
                        <h1 className="font-instrument text-[clamp(2.5rem,1.59rem+3.883vw,6.25rem)] leading-[0.5] text-black uppercase">
                            {titleLines[0]}
                        </h1>
                        <h1 className="font-instrument text-[clamp(2.5rem,1.59rem+3.883vw,6.25rem)] leading-[0.5] text-black uppercase">
                            {titleLines[1]}
                        </h1>
                        {!!subtitle && (
                            <h5 className="font-instrument text-[clamp(1rem,0.757rem+1.036vw,2rem)] leading-[0.5] text-black uppercase">
                                {subtitle}
                            </h5>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
