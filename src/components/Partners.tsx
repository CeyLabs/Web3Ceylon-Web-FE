import React, { useEffect, useRef } from "react";
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
const LogoCard: React.FC<{
    items: LogoItem | LogoItem[];
    size?: "sm" | "md" | "lg";
    noBorder?: boolean;
}> = ({ items, size = "md", noBorder = false }) => {
    const sizes = { sm: "h-8 md:h-10", md: "h-14 md:h-16", lg: "h-20 md:h-24" } as const;
    const itemsArray = Array.isArray(items) ? items : [items];
    const isMultiple = itemsArray.length > 1;
    return (
        <div
            className={cn(
                "flex h-full w-full items-center justify-center rounded-2xl px-4 py-3 md:px-6 md:py-6",
                !noBorder && "border border-black/5 bg-white/30 backdrop-blur-3xl",
                noBorder && "",
                isMultiple && "flex-row gap-4"
            )}
        >
            {itemsArray.map((item, index) => (
                <div
                    key={index}
                    className={cn("flex items-center justify-center", isMultiple && "flex-1")}
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
            ))}
        </div>
    );
};

const Partners: React.FC<PartnersProps> = ({ className }) => {
    // References for community partners carousel
    const carouselRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollStart = useRef(0);

    // Continuous auto scroll
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        let frame: number;
        const step = () => {
            if (!isDragging.current) {
                el.scrollLeft += 1;
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                }
            }
            frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, []);

    // Drag handlers for mouse and touch
    const startDrag = (clientX: number) => {
        const el = carouselRef.current;
        if (!el) return;
        isDragging.current = true;
        startX.current = clientX;
        scrollStart.current = el.scrollLeft;
        el.classList.add("cursor-grabbing");
    };
    const duringDrag = (clientX: number) => {
        const el = carouselRef.current;
        if (!el || !isDragging.current) return;
        const walk = clientX - startX.current;
        el.scrollLeft = scrollStart.current - walk;
    };
    const endDrag = () => {
        const el = carouselRef.current;
        if (!el) return;
        isDragging.current = false;
        el.classList.remove("cursor-grabbing");
    };

    // Organized & Sponsored logos
    const organizedBy: LogoItem = {
        name: "Ceylon Cash",
        src: "/assets/partners/CeyCash_LongLight.png",
    };
    const sponsoredBy: LogoItem = {
        name: "Bybit",
        src: "/assets/partners/ByBit_Black.png",
    };

    const knowledgePartners: LogoItem[] = [
        { name: "GDG Colombo", src: "/assets/partners/gdglk_logo.png" },
        { name: "Metana", src: "/assets/partners/Metana-Logo.png" },
    ];

    const ecosystemPartner: LogoItem = {
        name: "Rotaract Mora",
        src: "/assets/partners/Rotaract_Mora_Full_color.png",
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
        { name: "Solana Sri Lanka Community", src: "/assets/partners/svg/solanasl.svg" },
        { name: "Spike Community", src: "/assets/partners/svg/spike.svg" },
        { name: "TechNews.LK", src: "/assets/partners/svg/technewslk.svg" },
        { name: "Telegram Creators", src: "/assets/partners/svg/tonconnect.svg" },
        { name: "TON Sri Lanka", src: "/assets/partners/svg/tonsl.svg" },
        { name: "Cosmos Sri Lanka", src: "/assets/partners/svg/cosmossrilanka.svg" },
        { name: "Crypto Anbu", src: "/assets/partners/svg/cryptoanbu.svg" },
        { name: "Metana", src: "/assets/partners/svg/metana.svg" },
    ];

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
                                <LogoCard items={organizedBy} size="lg" noBorder />
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={80}>
                        <div className="rounded-3xl bg-white/30 p-8 backdrop-blur-3xl md:p-10">
                            <p className="mb-6 text-center text-xs font-semibold tracking-[0.25em] text-gray-500 md:text-sm lg:text-base">
                                SPONSORED BY
                            </p>
                            <div className="mx-auto flex max-w-xs items-center justify-center">
                                <LogoCard items={sponsoredBy} size="lg" noBorder />
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Knowledge & Ecosystem Partners */}
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <FadeIn delay={160}>
                        <div className="rounded-3xl bg-white/30 p-8 backdrop-blur-3xl md:p-10">
                            <p className="mb-6 text-center text-xs font-semibold tracking-[0.25em] text-gray-500 md:text-sm lg:text-base">
                                KNOWLEDGE PARTNERS
                            </p>
                            <div className="mx-auto flex items-center justify-center">
                                <LogoCard items={knowledgePartners} size="lg" noBorder />
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={240}>
                        <div className="rounded-3xl bg-white/30 p-8 backdrop-blur-3xl md:p-10">
                            <p className="mb-6 text-center text-xs font-semibold tracking-[0.25em] text-gray-500 md:text-sm lg:text-base">
                                ECOSYSTEM PARTNER - COLOMBO
                            </p>
                            <div className="mx-auto flex max-w-xs items-center justify-center">
                                <LogoCard items={ecosystemPartner} size="lg" noBorder />
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
                        <div
                            ref={carouselRef}
                            className="flex cursor-grab overflow-hidden select-none"
                            onMouseDown={(e) => startDrag(e.pageX)}
                            onMouseMove={(e) => duringDrag(e.pageX)}
                            onMouseUp={endDrag}
                            onMouseLeave={endDrag}
                            onTouchStart={(e) => startDrag(e.touches[0].pageX)}
                            onTouchMove={(e) => duringDrag(e.touches[0].pageX)}
                            onTouchEnd={endDrag}
                        >
                            {communityPartners.concat(communityPartners).map((partner, i) => (
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
                                            style={{ clipPath: "circle(calc(50% - 5px))" }}
                                        />
                                    </div>
                                    <span className="font-secondary max-w-[80px] text-center text-xs leading-tight text-gray-800 sm:max-w-[100px] sm:text-sm">
                                        {partner.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Partners;
