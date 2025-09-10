import React from "react";
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
                !noBorder && "border border-black/5 bg-white shadow-sm",
                noBorder && "bg-white"
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
    // Organized & Sponsored logos
    const organizedBy: LogoItem = {
        name: "Ceylon Cash",
        src: "/assets/partners/CeyCash_LongLight.png",
    };
    const sponsoredBy: LogoItem = {
        name: "Bybit",
        src: "/assets/partners/ByBit_Black.png",
    };

    // Community partners (ordered: founderflow, GDG)
    const communityPartners: LogoItem[] = [
        { name: "FounderFlow", src: "/assets/partners/founderflow-lk.png" },
        { name: "GDG Sri Lanka", src: "/assets/partners/gdglk_cover.jpeg" },
    ];

    return (
        <section id="partners" className={cn("bg-gray-50 py-24", className)}>
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
                        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm md:p-10">
                            <p className="mb-6 text-center text-[11px] font-semibold tracking-[0.25em] text-gray-500">
                                ORGANIZED BY
                            </p>
                            <div className="mx-auto flex max-w-xs items-center justify-center">
                                <LogoCard item={organizedBy} size="lg" noBorder />
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={80}>
                        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm md:p-10">
                            <p className="mb-6 text-center text-[11px] font-semibold tracking-[0.25em] text-gray-500">
                                SPONSORED BY
                            </p>
                            <div className="mx-auto flex max-w-xs items-center justify-center">
                                <LogoCard item={sponsoredBy} size="lg" noBorder />
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Community Partners */}
                <FadeIn delay={140}>
                    <div className="mt-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:mt-8 md:p-10">
                        <p className="mb-6 text-center text-[11px] font-semibold tracking-[0.25em] text-gray-500">
                            COMMUNITY PARTNERS
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            {communityPartners.map((p, i) => (
                                <div key={i} className="w-40 md:w-52">
                                    <LogoCard item={p} size="sm" noBorder />
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
