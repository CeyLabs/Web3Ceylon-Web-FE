import React from "react";
import Image from "next/image";
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
        galle:
            "Sunlit ramparts and ocean air — creators gather to craft, share, and spark collaborations that travel far beyond the coast.",
        colombo:
            "Sri Lanka’s fast lane — builders ship, iterate, and connect through code labs, live demos, and ambitious launches.",
        kandy:
            "Heritage meets hustle — practical playbooks, smart deals, and resilient growth for independents and teams.",
        ella:
            "Time slows in the hills — reset, swap ideas, and open doors to global partners and long-term collaborations.",
    };

    useGSAP(() => {
        if (isMobile) return;
        const cards = gsap.utils.toArray<HTMLElement>(".city-card");
        if (!cards.length) return;

        // Stacked cards animation to mirror Services (no title pinning)
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

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, [isMobile]);

    return (
        <section id="cities" className={cn("overflow-hidden bg-sandBeige py-16 px-4", className)}>
            <div className="mx-auto max-w-3xl text-center mb-12">
                <h2 className="font-carena text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-[#0a1a5c]">
                    Cities
                </h2>
                <p className="font-secondary mt-3 text-[clamp(14px,1.5vw,18px)] font-medium text-[#667085]">
                    Four unique experiences across Sri Lanka
                </p>
            </div>
            <div className="city-cards flex flex-col gap-4 lg:gap-2 mb-12 lg:mb-56">
                {cities.map((c, index) => (
                    <div key={c.id} id={`city-card-${index}`} className="city-card relative pb-4">
                        <div className="city-card-inner relative w-full h-full rounded-xl p-6 lg:rounded-2xl lg:p-8 will-change-transform">
                            <div className="mb-8 flex items-start justify-between lg:mb-12">
                                <div>
                                    <p className="font-secondary text-xs tracking-wider text-[#7B3F00] uppercase">
                                        {c.city} – {c.group}
                                    </p>
                                    <h3 className="font-carena text-[clamp(24px,5vw,48px)] leading-tight font-semibold tracking-tight">
                                        {c.headline}
                                    </h3>
                                </div>
                                <p className="font-carena text-[clamp(16px,2.2vw,24px)] leading-none font-semibold whitespace-nowrap">
                                    (Day {String(index + 1).padStart(2, "0")})
                                </p>
                            </div>
                            <div className="flex flex-col-reverse lg:flex-row items-start justify-between">
                                <div className="flex w-full flex-col gap-6 lg:w-6/12 lg:gap-8">
                                    <p className="text-[clamp(18px,2vw,40px)] leading-tight font-semibold">
                                        {cityDescriptions[c.id]}
                                    </p>
                                    <p className="font-secondary text-[clamp(14px,1.8vw,20px)] font-medium">
                                        {c.subtitle}
                                    </p>
                                    <ul className="flex flex-wrap gap-2 lg:w-10/12 2xl:gap-3">
                                        {c.tags.map(t => (
                                            <li key={`${c.id}-${t}`} className="font-secondary rounded-full bg-white/70 px-4 py-1.5 text-[clamp(11px,1.1vw,15px)] font-medium">
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-2">
                                        <a href="#register" className="font-secondary inline-flex items-center gap-2 rounded-full bg-[#0a1a5c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0c237e]">
                                            {c.bottomLine} <span aria-hidden>→</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="relative mb-4 lg:mb-0 h-[250px] w-full overflow-hidden rounded-lg lg:h-[clamp(350px,25vw,600px)] lg:w-5/12 lg:rounded-2xl">
                                    <Image src={c.imageUrl} alt={`${c.city} stamp`} fill className="pointer-events-none select-none object-contain object-center drop-shadow-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Cities;
