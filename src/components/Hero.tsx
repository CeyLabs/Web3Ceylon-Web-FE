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
      className={cn(
        "relative min-h-screen flex items-center overflow-hidden",
        className
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/hero-cover.webp"
          alt="Sri Lanka landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Centered Glass/Blur Information Card */}
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 flex flex-col items-center">
        <div className="w-[92vw] max-w-3xl">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-6 sm:p-8">
            <div className="text-center">
              <FadeIn delay={150}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-instrument font-medium tracking-tight text-white leading-tight mb-4">
                  Web3Ceylon 2025
                </h1>
              </FadeIn>
              <FadeIn delay={250}>
                <p className="text-lg md:text-xl text-white/95 font-medium">
                  Sri Lanka's Largest Web3 Developer & Community Tour
                </p>
              </FadeIn>
              {/* Partner strip moved outside the main card for prominence */}

              {/* Divider */}
              <FadeIn delay={450}>
                <div className="mt-6 md:mt-8 mx-auto h-px w-24 bg-white/20" />
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
                        className="group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 text-white [background:var(--bg)] [border-radius:var(--radius)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px w-[210px] mx-auto px-6 py-3 text-sm font-medium"
                        role="button"
                        aria-label="Apply for whitelist"
                      >
                        <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
                          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
                            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"></div>
                          </div>
                        </div>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Apply for Whitelist
                        <div className="insert-0 absolute size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"></div>
                        <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"></div>
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
          <div className="mt-6 md:mt-8 w-[92vw] max-w-3xl">
            <p className="text-center text-white/80 text-sm md:text-base mb-3 md:mb-4">
              Powered by
            </p>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4">
              <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl h-24 md:h-28 shadow-[0_8px_32px_rgba(0,0,0,0.28)] flex items-center justify-center">
                <img
                  src="/assets/Ceylon_Cash_White-01.png"
                  alt="CeylonCash"
                  className="h-[60%] md:h-[60%] w-auto object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="text-white/80 text-lg md:text-xl">×</span>
              <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl h-24 md:h-28 shadow-[0_8px_32px_rgba(0,0,0,0.28)] flex items-center justify-center">
                <img
                  src="/assets/Bybit_Logotype_250x250_Transparent_Darkmode-Duo.png"
                  alt="Bybit"
                  className="h-[70%] md:h-[70%] w-auto "
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
