import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";

interface FooterCTAProps {
    className?: string;
}

const FooterCTA: React.FC<FooterCTAProps> = ({ className }) => {
    // Pills with emoji prefix
    const pills = [
        { label: "Build Together", emoji: "🤝" },
        { label: "Connect Learn Grow", emoji: "🔗" },
        { label: "Collaborate Create Launch", emoji: "🚀" },
        { label: "Inspire", emoji: "✨" },
        { label: "Retreat & Global Connect", emoji: "🌍" },
        { label: "Workshops", emoji: "🛠️" },
        { label: "Creators and Storytellers", emoji: "🎙️" },
        { label: "Developers & Builders", emoji: "🧑‍💻" },
        { label: "Community Growth", emoji: "🌱" },
    ];

    const rotationClasses = [
        "-rotate-3",
        "rotate-6",
        "-rotate-6",
        "rotate-2",
        "-rotate-2",
        "rotate-3",
        "-rotate-1",
        "rotate-1",
        "-rotate-4",
    ];

    return (
        <section id="footer-cta" className={cn("relative py-24 md:py-32", className)}>
            {/* Subtle radial gradient background */}
            <div className="pointer-events-none absolute inset-0 mx-auto max-w-5xl opacity-40 [background:radial-gradient(circle_at_center,#dbeafe_0%,transparent_70%)]" />
            <div className="relative container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-4xl">
                    <FadeIn>
                        <div className="text-center">
                            <div className="mb-6 flex items-center justify-center">
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm">
                                    <span className="text-2xl" aria-hidden>
                                        🚀
                                    </span>
                                </span>
                            </div>
                            <h2 className="font-primary mb-4 text-3xl leading-snug md:text-5xl">
                                What we bring to
                                <br /> the table
                            </h2>
                            <p className="font-secondary mx-auto max-w-2xl text-lg text-gray-700 md:text-xl">
                                Digital-first experiences, community energy and hands-on learning to
                                help Sri Lanka’s builders, creators & founders stand out from day
                                one.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Scattered pill cloud */}
                    <FadeIn delay={80}>
                        <div className="relative mx-auto mt-14 max-w-5xl">
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                {pills.map((p, i) => (
                                    <span
                                        key={p.label}
                                        className={cn(
                                            "inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-blue-200/70 backdrop-blur select-none ring-inset",
                                            rotationClasses[i % rotationClasses.length],
                                            "transition-transform duration-300 hover:rotate-0"
                                        )}
                                    >
                                        <span className="mr-2" aria-hidden>
                                            {p.emoji}
                                        </span>
                                        {p.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* CTA buttons */}
                    <FadeIn delay={140}>
                        <div className="mt-14 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-5">
                            <a
                                href="https://lu.ma/CeyCashEvents"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-2xl bg-black px-8 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-black/90 md:text-base"
                            >
                                Register on Luma
                            </a>
                            {/* <a
                                href="#cities"
                                className="inline-flex items-center rounded-2xl border border-black/10 bg-white px-8 py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-gray-50 md:text-base"
                            >
                                Explore Cities
                            </a> */}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default FooterCTA;
