import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Sparkles } from "lucide-react";
import CountdownTicker from "./CountdownTicker";
import { Noise } from "@/components/ui/shadcn-io/noise";
import LazyImage from "@/components/reusable/LazyImage";

interface HeroProps {
    className?: string;
}

type CSSVars = React.CSSProperties & { [key: string]: string | number };

const Hero: React.FC<HeroProps> = ({ className }) => {
    return (
        <section
            className={cn(
                "relative flex min-h-screen items-center overflow-hidden pb-20",
                className
            )}
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <LazyImage
                    src="/assets/hero-cover.png"
                    alt="Sri Lanka landscape"
                    fill
                    className="object-cover object-left md:object-center"
                    wrapperClassName="h-full w-full"
                />
                {/* Sand beige fading from top */}
                <div className="absolute top-0 right-0 left-0 h-1/2 bg-gradient-to-b from-[#F6F4D5] to-transparent md:h-1/3 md:from-[#F6F4D5]/60"></div>
                {/* Sand beige fading from bottom */}
                <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t from-[#F6F4D5] to-transparent md:h-1/3 md:from-[#F6F4D5]/60"></div>
                {/* Sand beige fading from left */}
                <div className="absolute top-0 bottom-0 left-0 w-3/5 bg-gradient-to-r from-[#F6F4D5] to-transparent md:w-1/6 md:rounded-none md:from-[#F6F4D5]/40 md:to-[#F6F4D5]/10"></div>
                {/* Sand beige fading from right */}
                <div className="absolute top-0 right-0 bottom-0 w-3/5 bg-gradient-to-l from-[#F6F4D5] to-transparent md:w-1/6 md:rounded-none md:from-[#F6F4D5]/40 md:to-[#F6F4D5]/10"></div>
            </div>

            {/* Noise overlay for texture */}
            <div className="absolute inset-0 -z-10 mix-blend-overlay">
                <Noise
                    patternSize={200}
                    patternScaleX={2}
                    patternScaleY={2}
                    patternRefreshInterval={4}
                    patternAlpha={40}
                />
            </div>

            {/* Centered Glass/Blur Information Card */}
            <div className="relative z-10 container mx-auto flex flex-col items-center px-4 py-20 md:px-6 md:py-32">
                <div className="w-[92vw] max-w-3xl">
                    <div className="sm:p-8">
                        <div className="text-center">
                            <FadeIn delay={150}>
                                <h1 className="font-primary mb-4 text-3xl leading-tight tracking-tight text-black sm:text-xl md:text-5xl lg:text-6xl">
                                    Web3Ceylon 2025
                                </h1>
                            </FadeIn>
                            <FadeIn delay={250}>
                                <p className="font-secondary text-lg font-normal text-black/95 sm:text-base md:text-lg">
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
                                            "--bg": "#F8931A",
                                        };
                                        return (
                                            <a
                                                href="https://lu.ma/CeyCashEvents"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={shimmerVars}
                                                className="group font-secondary relative z-0 mx-auto flex w-[210px] transform-gpu cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 text-sm font-medium whitespace-nowrap text-white transition-transform duration-300 ease-in-out [background:var(--bg)] active:translate-y-px"
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
                {/* Rotating countdown ticker for city events (original position) */}
                <FadeIn delay={500}>
                    <div className="mt-4 w-[92vw] max-w-3xl">
                        <CountdownTicker showMultiple={true} />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Hero;
