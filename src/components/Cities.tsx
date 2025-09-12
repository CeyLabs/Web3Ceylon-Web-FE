import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CitiesProps {
    className?: string;
}

const Cities: React.FC<CitiesProps> = ({ className }) => {
    const cities = [
        {
            id: "galle",
            city: "Galle",
            group: "Creators & Storytellers",
            headline: "Create, Connect, and Inspire",
            subtitle: "Celebrating creativity with Creators & Storytellers in Galle",
            bottomLine: "Let’s Connect!",
            imageUrl: "/assets/stamps/Stamp - Galle.png",
            tags: ["Galle", "Creators", "Storytellers"],
        },
        {
            id: "colombo",
            city: "Colombo",
            group: "Developers & Builders",
            headline: "Code, Build, and Innovate",
            subtitle: "Building the future with Developers & Builders in Colombo",
            bottomLine: "Let’s Create!",
            imageUrl: "/assets/stamps/Stamp - Colombo.png",
            tags: ["Colombo", "Developers", "Builders"],
        },
        {
            id: "kandy",
            city: "Kandy",
            group: "Businesses & Freelancers",
            headline: "Learn, Explore, and Grow",
            subtitle: "Unlocking opportunities for Businesses & Freelancers in Kandy",
            bottomLine: "Let’s Grow!",
            imageUrl: "/assets/stamps/Stamp - Kandy.png",
            tags: ["Kandy", "Businesses", "Freelancers"],
        },
        {
            id: "ella",
            city: "Ella",
            group: "Retreat & Global Connect",
            headline: "Relax, Network, and Collaborate",
            subtitle: "A special Retreat & Global Connect with community leaders in Ella",
            bottomLine: "Let’s Unwind!",
            imageUrl: "/assets/stamps/Stamp - Ella.png",
            tags: ["Ella", "Retreat", "Global Connect"],
        },
    ];

    // Static version: no animations

    return (
        <section id="cities" className={cn("bg-sandBeige overflow-hidden py-20", className)}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="font-carena text-[clamp(28px,4vw,48px)] font-semibold tracking-tight text-[#0a1a5c]">
                        Cities
                    </h2>
                    <p className="font-secondary mt-3 text-[clamp(14px,1.5vw,18px)] font-medium text-[#667085]">
                        Four unique experiences across Sri Lanka
                    </p>
                </div>

                <div className="mx-auto mb-16 flex max-w-6xl flex-col gap-6 lg:gap-8">
                    {cities.map((c, index) => (
                        <Card
                            key={c.id}
                            className="bg-ivoryCream relative rounded-2xl border-0 shadow-sm ring-1 ring-black/5"
                        >
                            <CardContent className="p-6 lg:p-8">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <p className="font-secondary text-xs tracking-wider text-[#7B3F00] uppercase">
                                            {c.city} – {c.group}
                                        </p>
                                        <h3 className="font-carena text-[clamp(28px,6vw,56px)] leading-tight font-semibold tracking-tight text-[#0a1a5c]">
                                            {c.headline}
                                        </h3>
                                    </div>
                                    <p className="font-carena text-[clamp(18px,2.5vw,28px)] leading-none font-semibold text-[#0a1a5c]/60 whitespace-nowrap shrink-0">
                                        (Day {String(index + 1).padStart(2, "0")})
                                    </p>
                                </div>

                                <div className="flex flex-col-reverse items-start justify-between gap-4 lg:flex-row lg:gap-8">
                                    <div className="flex w-full flex-col gap-4 lg:w-7/12">
                                        <p className="font-secondary text-[clamp(16px,2vw,22px)] font-medium text-[#3b3b3b]">
                                            {c.subtitle}
                                        </p>
                                        <ul className="flex flex-wrap gap-2 lg:gap-3">
                                            {c.tags.map((t) => (
                                                <li
                                                    key={`${c.id}-${t}`}
                                                    className="font-secondary rounded-full bg-[#ebe9e4] px-4 py-1.5 text-[clamp(12px,1.2vw,16px)] font-medium text-[#4a4a4a]"
                                                >
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-2">
                                            <a
                                                href="#register"
                                                className="font-secondary inline-flex items-center gap-2 rounded-full bg-[#0a1a5c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0c237e]"
                                            >
                                                {c.bottomLine} <span aria-hidden>→</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="relative h-[220px] w-full lg:h-[clamp(300px,24vw,420px)] lg:w-5/12">
                                        <Image
                                            src={c.imageUrl}
                                            alt={`${c.city} stamp`}
                                            fill
                                            className="pointer-events-none object-contain object-center drop-shadow-md select-none"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cities;
