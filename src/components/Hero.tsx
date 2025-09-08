import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Sparkles } from "lucide-react";
import CountdownTicker from "./CountdownTicker";

interface HeroProps {
    className?: string;
}

type CSSVars = React.CSSProperties & { [key: string]: string | number };

const Hero: React.FC<HeroProps> = ({ className }) => {
    return (
        <section
            className={cn("relative flex min-h-screen items-center overflow-hidden", className)}
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="/assets/hero-cover.webp"
                    alt="Sri Lanka landscape"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Centered Glass/Blur Information Card */}
            <div className="relative z-10 container mx-auto flex flex-col items-center px-4 py-20 md:px-6 md:py-32">
                <div className="w-[92vw] max-w-3xl">
                    <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
                        <div className="text-center">
                            <FadeIn delay={150}>
                                <h1 className="font-instrument mb-4 text-4xl leading-tight font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
                                    Web3Ceylon 2025
                                </h1>
                            </FadeIn>
                            <FadeIn delay={250}>
                                <p className="text-lg font-medium text-white/95 md:text-xl">
                                    Sri Lanka's Largest Web3 Developer & Community Tour
                                </p>
                            </FadeIn>
                            {/* Partner strip moved outside the main card for prominence */}

                            {/* Divider */}
                            <FadeIn delay={450}>
                                <div className="mx-auto mt-6 h-px w-24 bg-white/20 md:mt-8" />
                            </FadeIn>

                            {/* CTA */}
                            <FadeIn delay={550}>
                                <div className="mt-6 md:mt-8">
                                    {(() => {
                                        const shimmerVars: CSSVars = {
                                            "--spread": "90deg",
                                            "--shimmer-color": "#ffffff",
                                            "--radius": "90px",
                                            "--speed": "3s",
                                            "--cut": "0.05em",
                                            "--bg": "#000000",
                                        };
                                        return (
                                            <a
                                                href="https://lu.ma/CeyCashEvents"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={shimmerVars}
                                                className="group relative z-0 mx-auto flex w-[210px] transform-gpu cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 text-sm font-medium whitespace-nowrap text-white transition-transform duration-300 ease-in-out [background:var(--bg)] active:translate-y-px"
                                                role="button"
                                                aria-label="Apply for whitelist"
                                            >
                                                <div className="[container-type:size] absolute inset-0 -z-30 overflow-visible blur-[2px]">
                                                    <div className="animate-shimmer-slide absolute inset-0 [aspect-ratio:1] h-[100cqh] [border-radius:0] [mask:none]">
                                                        <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]"></div>
                                                    </div>
                                                </div>
                                                <Sparkles className="mr-2 h-4 w-4" />
                                                Apply for Whitelist
                                                <div className="insert-0 absolute size-full transform-gpu rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"></div>
                                                <div className="absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]"></div>
                                            </a>
                                        );
                                    })()}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
                {/* Partner logos: two equal large blurred cards with an × between */}
                <FadeIn delay={400}>
                    <div className="mt-6 w-[92vw] max-w-3xl md:mt-8">
                        <p className="mb-3 text-center text-sm text-white/80 md:mb-4 md:text-base">
                            Powered by
                        </p>
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4">
                            <div className="flex h-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl md:h-28">
                                <img
                                    src="/assets/Ceylon_Cash_White-01.png"
                                    alt="CeylonCash"
                                    className="max-h-12 w-auto max-w-[80%] object-contain md:max-h-16"
                                    loading="eager"
                                    decoding="async"
                                />
                            </div>
                            <span className="text-lg text-white/80 md:text-xl">×</span>
                            <div className="flex h-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-xl md:h-28">
                                <img
                                    src="/assets/Bybit_Logotype_250x250_Transparent_Darkmode-Duo.png"
                                    alt="Bybit"
                                    className="h-28 max-h-full w-auto object-contain md:h-28"
                                    loading="eager"
                                    decoding="async"
                                />
                            </div>
                        </div>
                    </div>
                </FadeIn>
                {/* Rotating countdown ticker for city events (original position) */}
                <FadeIn delay={500}>
                    <div className="mt-4 w-[92vw] max-w-3xl">
                        <CountdownTicker />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Hero;
