import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useWindowSize from "@/hooks/useWindowSize";
import { cities } from "@/data/cities";

interface CitiesProps {
    className?: string;
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Cities: React.FC<CitiesProps> = ({ className }) => {
    const { width } = useWindowSize();
    const isMobile = width < 768;

    // Creative, Services-style descriptions to enrich card content
    const cityDescriptions: Record<string, string> = {
        galle: "Celebrating creativity with creators in Galle, where ideas flow and collaborations begin by the ocean.",
        colombo:
            "Building the future with developers & builders in Colombo, turning code and vision into real impact.",
        kandy: "Unlocking opportunities for businesses in Kandy, blending heritage with fresh innovation and growth.",
        ella: "A special retreat with community leaders in Ella, reconnecting, recharging, and shaping long-term bonds.",
    };

    useGSAP(() => {
        if (isMobile) return;
        const cards = gsap.utils.toArray<HTMLElement>(".city-card");
        if (!cards.length) return;

        // Stacked cards animation
        cards.forEach((card, index) => {
            const inner = card.querySelector(".city-card-inner");
            ScrollTrigger.create({
                trigger: card,
                start: "top 30%",
                endTrigger: cards[cards.length - 1],
                end: "bottom 60%",
                pin: true,
                pinSpacing: false,
            });

            gsap.to(inner, {
                y: `-${(cards.length - index) * 22}vh`,
                scale: 0.8 + index * 0.05,
                rotationZ: (Math.random() - 0.5) * 5,
                rotationX: (Math.random() - 0.5) * 5,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top 30%",
                    endTrigger: cards[cards.length - 1],
                    end: "bottom 60%",
                    scrub: true,
                },
            });
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [isMobile]);

    return (
        <section id="cities" className={cn("bg-sandBeige overflow-hidden px-4 py-16", className)}>
            <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="font-carena text-3xl font-semibold tracking-tight text-[#0a1a5c] md:text-5xl">
                    Cities
                </h2>
                <p className="font-secondary mt-3 text-[clamp(14px,1.5vw,18px)] font-medium text-[#667085]">
                    Four unique experiences across Sri Lanka
                </p>
            </div>
            <div className="city-cards mx-auto mb-12 flex max-w-5xl flex-col gap-4 lg:mb-56 lg:gap-2">
                {[
                    // Explicit display order
                    "colombo",
                    "kandy",
                    "galle",
                    "ella",
                ].map((id, index) => {
                    const c = cities.find((city) => city.id === id)!;
                    // Accent (strong) colors provided: #F57C00 , #C62828, #1976D2, #388E3C
                    // Map them to cities (ordered as data array): galle, colombo, kandy, ella
                    const bgMap: Record<string, string> = {
                        galle: "bg-sandBeige",
                        colombo: "bg-ice",
                        kandy: "bg-ivoryCream",
                        ella: "bg-mint",
                    };
                    const accentMap: Record<string, string> = {
                        galle: "#F57C00", // deep orange
                        colombo: "#1976D2", // blue
                        kandy: "#C62828", // red
                        ella: "#388E3C", // green
                    };
                    // Derived utility strings
                    const cardClasses = cn(
                        "city-card-inner group relative w-full h-full rounded-xl p-8 lg:rounded-2xl lg:p-12 will-change-transform",
                        "border-[3px]",
                        bgMap[c.id]
                    );
                    // Inline styles for dynamic accent (border + pseudo outline tone)
                    const cardStyle: React.CSSProperties = {
                        borderColor: accentMap[c.id],
                    };
                    const headingStyle: React.CSSProperties = { color: accentMap[c.id] };
                    const smallLabelStyle: React.CSSProperties = { color: accentMap[c.id] };
                    const dayStyle: React.CSSProperties = { color: accentMap[c.id] };
                    return (
                        <div
                            key={c.id}
                            id={`city-card-${index}`}
                            className="city-card relative pb-4"
                        >
                            <div className={cardClasses} style={cardStyle}>
                                {/* Stamp offset outline */}
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                                    style={{
                                        boxShadow: `4px 4px 0 0 ${accentMap[c.id]} inset, 4px 4px 0 0 ${accentMap[c.id]}`,
                                        mixBlendMode: "multiply",
                                        opacity: 0.18,
                                    }}
                                />
                                <div className="mb-6 flex items-start justify-between lg:mb-6">
                                    <div>
                                        <p
                                            className="font-secondary mb-2 text-xs tracking-wider uppercase"
                                            style={smallLabelStyle}
                                        >
                                            {c.city} – {c.group}
                                        </p>
                                        <h3
                                            className="font-carena text-xl leading-tight font-semibold tracking-tight md:text-3xl"
                                            style={headingStyle}
                                        >
                                            {c.headline}
                                        </h3>
                                        <p
                                            className="font-secondary mt-2 text-sm font-medium"
                                            style={smallLabelStyle}
                                        >
                                            {c.date}
                                        </p>
                                    </div>
                                    <p
                                        className="font-carena text-base leading-none font-semibold whitespace-nowrap md:text-xl"
                                        style={dayStyle}
                                    >
                                        (Day {String(index + 1).padStart(2, "0")})
                                    </p>
                                </div>
                                <div className="flex flex-col-reverse items-start justify-between lg:flex-row lg:items-center">
                                    <div className="flex w-full flex-col gap-4 lg:w-6/12 lg:gap-6">
                                        <p className="text-sm leading-tight font-semibold md:text-2xl">
                                            {cityDescriptions[c.id]}
                                        </p>
                                        {/* <p className="font-secondary text-xs font-medium md:text-base">
                                            {c.subtitle}
                                        </p> */}
                                        <ul className="flex flex-wrap gap-2 lg:w-10/12 2xl:gap-3">
                                            {c.tags.map((t) => (
                                                <li
                                                    key={`${c.id}-${t}`}
                                                    className="font-secondary rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium md:text-sm"
                                                >
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-2">
                                            <Link
                                                href={c.eventUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-secondary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none"
                                                style={{
                                                    backgroundColor: accentMap[c.id],
                                                    boxShadow: `0 2px 4px -1px ${accentMap[c.id]}33, 0 4px 10px -2px ${accentMap[c.id]}40`,
                                                }}
                                                onMouseEnter={(e) => {
                                                    (
                                                        e.currentTarget as HTMLAnchorElement
                                                    ).style.filter = "brightness(0.9)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (
                                                        e.currentTarget as HTMLAnchorElement
                                                    ).style.filter = "none";
                                                }}
                                            >
                                                {c.bottomLine} <span aria-hidden>→</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <Link
                                        href={c.eventUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Open ${c.city} event page`}
                                        className="relative mb-4 block h-[200px] w-full overflow-hidden transition-transform duration-300 ease-out will-change-transform hover:scale-107 hover:-rotate-2 focus:outline-none focus-visible:scale-105 focus-visible:-rotate-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:mb-0 lg:h-[clamp(280px,20vw,480px)] lg:w-5/12"
                                    >
                                        <Image
                                            src={c.imageUrl}
                                            alt={`${c.city} stamp`}
                                            fill
                                            className="pointer-events-none object-contain object-center select-none"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Cities;
