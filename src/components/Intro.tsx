"use client";
import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import ScrollReveal from "./animations/ScrollReveal";

interface IntroProps {
    className?: string;
}

const Intro: React.FC<IntroProps> = ({ className }) => {
    return (
        <section
            id="intro"
            className={cn("bg-background relative overflow-hidden py-20", className)}
        >
            {/* Subtle radial gradient background */}
            <div className="pointer-events-none absolute inset-0 mx-auto max-w-5xl opacity-40 [background:radial-gradient(circle_at_center,#dbeafe_0%,transparent_70%)]" />
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-4xl">
                    <FadeIn>
                        <h2 className="font-primary mb-10 text-center text-3xl md:text-4xl">
                            About Web3Ceylon
                        </h2>
                    </FadeIn>

                    <ScrollReveal
                        baseOpacity={0.2}
                        enableBlur
                        blurStrength={6}
                        containerClassName="mb-8 text-center"
                        textClassName="text-2xl font-medium font-secondary md:text-2xl text-gray-700"
                        distancePx={600}
                        start="top 85%"
                        scrub={0.6}
                    >
                        {`Web3Ceylon is a four-city educational and cultural tour across Sri Lanka. From Colombo's Web3 Dev Fest to Galle's creator showcase and Ella's community retreat, we're bringing developers, entrepreneurs, and visionaries together to shape the future of blockchain.`}
                    </ScrollReveal>
                </div>

                <FadeIn delay={200}>
                    <div className="mx-auto mt-14 max-w-5xl">
                        {/* Fanned / stacked cards (now also on mobile) */}
                        <div className="relative flex justify-center">
                            {/* Responsive wrapper: slightly smaller on very small screens */}
                            <div className="xs:h-[210px] xs:w-[360px] relative h-[200px] w-[340px] origin-top transition-all sm:h-[240px] sm:w-[460px] md:h-64 md:w-[544px]">
                                {/* Card 1 */}
                                <div className="xs:h-[190px] xs:w-36 xs:px-4 absolute top-4 left-0 z-10 flex h-[180px] w-36 -rotate-6 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-[#fdfcfb]/70 via-[#e2ebf0]/60 to-[#dfe9f3]/50 px-3 text-center shadow-[0_3px_14px_-4px_rgba(0,0,0,0.25)] ring-1 ring-white/20 backdrop-blur-2xl before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,#f9e8d2_0%,transparent_65%)] before:opacity-40 sm:h-[220px] sm:w-48 sm:rounded-3xl sm:px-6 md:top-6 md:h-64 md:w-56">
                                    <span
                                        className="xs:text-4xl relative mb-3 text-3xl sm:mb-4 sm:text-5xl"
                                        aria-hidden
                                    >
                                        🏙️
                                    </span>
                                    <h3 className="font-carena xs:text-base relative mb-1 text-sm font-semibold tracking-tight text-[#0a1a5c] sm:text-lg">
                                        4 Cities
                                    </h3>
                                    <p className="font-secondary xs:text-[10px] relative text-[9px] leading-snug text-[#0a1a5c]/70 sm:text-xs">
                                        Colombo, Kandy, Galle, Ella
                                    </p>
                                </div>
                                {/* Card 2 (center) */}
                                <div className="xs:left-28 xs:h-[190px] xs:w-36 xs:px-4 absolute top-0 left-24 z-20 flex h-[180px] w-36 rotate-2 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-[#eef2ff]/70 via-[#dde7ff]/60 to-[#cfd9ff]/50 px-3 text-center shadow-[0_3px_16px_-4px_rgba(0,0,0,0.30)] ring-1 ring-white/20 backdrop-blur-2xl before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_70%_30%,#d7e3ff_0%,transparent_65%)] before:opacity-50 sm:left-36 sm:h-[220px] sm:w-48 sm:rounded-3xl sm:px-6 md:left-40 md:h-64 md:w-56">
                                    <span
                                        className="xs:text-4xl relative mb-3 text-3xl sm:mb-4 sm:text-5xl"
                                        aria-hidden
                                    >
                                        👥
                                    </span>
                                    <h3 className="font-carena xs:text-base relative mb-1 text-sm font-semibold tracking-tight text-[#0a1a5c] sm:text-lg">
                                        Community First
                                    </h3>
                                    <p className="font-secondary xs:text-[10px] relative text-[9px] leading-snug text-[#0a1a5c]/70 sm:text-xs">
                                        Developers, creators, entrepreneurs
                                    </p>
                                </div>
                                {/* Card 3 */}
                                <div className="xs:left-[196px] xs:top-5 xs:h-[190px] xs:w-36 xs:px-4 absolute top-5 left-[184px] z-30 flex h-[180px] w-36 rotate-6 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-[#fff7e6]/70 via-[#fdecc8]/60 to-[#f9e0a8]/50 px-3 text-center shadow-[0_3px_18px_-2px_rgba(0,0,0,0.35)] ring-1 ring-white/20 backdrop-blur-2xl before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_70%,#ffe3a3_0%,transparent_65%)] before:opacity-50 sm:top-6 sm:left-[272px] sm:h-[220px] sm:w-48 sm:rounded-3xl sm:px-6 md:top-8 md:left-[320px] md:h-64 md:w-56">
                                    <span
                                        className="xs:text-4xl relative mb-3 text-3xl sm:mb-4 sm:text-5xl"
                                        aria-hidden
                                    >
                                        🚀
                                    </span>
                                    <h3 className="font-carena xs:text-base relative mb-1 text-sm font-semibold tracking-tight text-[#0a1a5c] sm:text-lg">
                                        Web3 Future
                                    </h3>
                                    <p className="font-secondary xs:text-[10px] relative text-[9px] leading-snug text-[#0a1a5c]/70 sm:text-xs">
                                        Blockchain innovation & education
                                    </p>
                                </div>
                                {/* Soft gradient halo behind cards */}
                                <div className="pointer-events-none absolute inset-0 -z-10 rounded-[50px] opacity-35 [background:radial-gradient(circle_at_center,#dbeafe_0%,transparent_75%)] sm:rounded-[60px] sm:opacity-40 md:rounded-[80px] md:opacity-50" />
                            </div>
                        </div>
                        {/* Removed separate mobile list; unified design */}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Intro;
