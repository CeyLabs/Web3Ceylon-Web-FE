import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";

interface LogoItem {
    name: string;
    src?: string; // path under /public
    className?: string;
}

interface PartnersProps {
    className?: string;
}

// Generic single logo display block
const LogoCard: React.FC<{ item: LogoItem; size?: "sm" | "md" | "lg"; noBorder?: boolean }> = ({
    item,
    size = "md",
    noBorder = false,
}) => {
    const sizes = { sm: "h-8 md:h-10", md: "h-14 md:h-16", lg: "h-20 md:h-24" } as const;
    return (
        <div
            className={cn(
                "flex h-full w-full items-center justify-center rounded-2xl px-4 py-3 md:px-6 md:py-6",
                !noBorder && "border border-black/5 bg-white/30 backdrop-blur-3xl",
                noBorder && ""
            )}
        >
            {item.src ? (
                <img
                    src={item.src}
                    alt={item.name}
                    className={cn("object-contain", sizes[size], item.className)}
                    loading="lazy"
                    decoding="async"
                />
            ) : (
                <span
                    className={cn(
                        "font-secondary text-center text-gray-600",
                        size === "lg" ? "text-xl" : "text-sm md:text-base"
                    )}
                >
                    {item.name}
                </span>
            )}
        </div>
    );
};

const Partners: React.FC<PartnersProps> = ({ className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Responsive items per view
    const getItemsPerView = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth < 640) return 3; // Mobile: 3 items
            if (window.innerWidth < 768) return 3; // Small tablet: 3 items
            if (window.innerWidth < 1024) return 4; // Tablet: 4 items
            return 6; // Desktop: 6 items
        }
        return 3; // Default fallback
    };

    const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

    // Handle responsive items per view
    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Colors for partner names
    const nameColors = [
        "text-blue-600",
        "text-green-600",
        "text-purple-600",
        "text-red-600",
        "text-orange-600",
        "text-teal-600",
        "text-pink-600",
        "text-indigo-600",
    ];

    // Organized & Sponsored logos
    const organizedBy: LogoItem = {
        name: "Ceylon Cash",
        src: "/assets/partners/CeyCash_LongLight.png",
    };
    const sponsoredBy: LogoItem = {
        name: "Bybit",
        src: "/assets/partners/ByBit_Black.png",
    };

    // Community partners (SVG logos only)
    const communityPartners: LogoItem[] = [
        { name: "Colombo Crypto Club", src: "/assets/partners/svg/ccc.svg" },
        { name: "Crypto Cirqle", src: "/assets/partners/svg/cryptocirqle.svg" },
        { name: "Crypto Lanka", src: "/assets/partners/svg/cryptolanka.svg" },
        { name: "Crypto With Duni", src: "/assets/partners/svg/cryptowithduni.svg" },
        { name: "Digital Asset Lanka", src: "/assets/partners/svg/dal.svg" },
        { name: "FounderFlow", src: "/assets/partners/svg/founderflow.svg" },
        { name: "GDG Sri Lanka", src: "/assets/partners/svg/gdgsrilanka.svg" },
        { name: "Solana Sri Lanka", src: "/assets/partners/svg/solanasl.svg" },
        { name: "Spike", src: "/assets/partners/svg/spike.svg" },
        { name: "TechNews LK", src: "/assets/partners/svg/technewslk.svg" },
        { name: "TON Connect", src: "/assets/partners/svg/tonconnect.svg" },
        { name: "TON Sri Lanka", src: "/assets/partners/svg/tonsl.svg" },
    ];

    // Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex >= communityPartners.length ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [communityPartners.length]);

    return (
        <section id="partners" className={cn("bg-background py-24", className)}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
                    <FadeIn className="max-w-2xl">
                        <div>
                            <span className="font-secondary mb-4 inline-block rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur-sm md:text-sm">
                                Partners
                            </span>
                            <h2 className="font-primary mb-6 text-3xl font-medium tracking-tight md:text-5xl">
                                Collaborating to advance Sri Lanka's Web3 ecosystem
                            </h2>

                            <p className="font-secondary text-lg text-gray-700">
                                A collective effort powered by organizers, sponsors and communities
                                who believe in open innovation, education and meaningful connections
                                across the island.
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={100}>
                        <a
                            href="mailto:partnerships@web3ceylon.com"
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white shadow-lg transition-all outline-none hover:bg-black/90 focus-visible:ring-[3px] focus-visible:ring-white/50"
                        >
                            <span className="flex items-center text-xs tracking-tight md:text-sm">
                                Become a Partner
                                <ArrowUpRight className="ml-1 inline-block" size={16} />
                            </span>
                        </a>
                    </FadeIn>
                </div>

                {/* Organized & Sponsored */}
                <div className="grid gap-6 md:grid-cols-2">
                    <FadeIn>
                        <div className="rounded-3xl bg-white/30 p-8 backdrop-blur-3xl md:p-10">
                            <p className="mb-6 text-center text-xs font-semibold tracking-[0.25em] text-gray-500 md:text-sm lg:text-base">
                                ORGANIZED BY
                            </p>
                            <div className="mx-auto flex max-w-xs items-center justify-center">
                                <LogoCard item={organizedBy} size="lg" noBorder />
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={80}>
                        <div className="rounded-3xl bg-white/30 p-8 backdrop-blur-3xl md:p-10">
                            <p className="mb-6 text-center text-xs font-semibold tracking-[0.25em] text-gray-500 md:text-sm lg:text-base">
                                SPONSORED BY
                            </p>
                            <div className="mx-auto flex max-w-xs items-center justify-center">
                                <LogoCard item={sponsoredBy} size="lg" noBorder />
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Community Partners Carousel */}
                <FadeIn delay={140}>
                    <div className="mt-6 rounded-3xl bg-white/30 p-6 backdrop-blur-3xl md:mt-8 md:p-10">
                        <p className="mb-6 text-center text-xs font-semibold tracking-[0.25em] text-gray-500 md:text-sm lg:text-base">
                            COMMUNITY PARTNERS
                        </p>
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-1000 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                                }}
                            >
                                {communityPartners
                                    .concat(communityPartners.slice(0, itemsPerView))
                                    .map((partner, i) => (
                                        <div
                                            key={`${partner.name}-${i}`}
                                            className="flex w-1/3 flex-shrink-0 flex-col items-center gap-2 px-2 sm:w-1/3 md:w-1/4 lg:w-1/6"
                                        >
                                            <div className="flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24">
                                                <img
                                                    src={partner.src}
                                                    alt={partner.name}
                                                    className="h-12 w-12 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <span
                                                className={`font-primary max-w-[80px] text-center text-xs leading-tight sm:max-w-[100px] sm:text-sm ${nameColors[i % nameColors.length]}`}
                                            >
                                                {partner.name}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Partners;
