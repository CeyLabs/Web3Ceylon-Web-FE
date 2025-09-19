import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { speakerSet } from "@/data/speakerSet";
import { IconBrandLinkedin, IconBrandTelegram, IconBrandX } from "@tabler/icons-react";

interface SpeakersProps {
    className?: string;
}

const Speakers: React.FC<SpeakersProps> = ({ className }) => {
    const speakers = speakerSet;

    return (
        <section id="speakers" className={cn("relative py-20", className)}>
            <div className="relative mx-auto w-full px-4 md:container md:px-6">
                <div className="mx-auto mb-16 max-w-3xl">
                    <FadeIn>
                        <h2 className="font-primary mb-8 text-center text-3xl md:text-4xl">
                            Meet the Builders & Visionaries
                        </h2>
                    </FadeIn>
                    <FadeIn delay={100}>
                        <p className="text-muted-foreground font-secondary text-center text-lg">
                            Learn from leading experts, innovators, and pioneers shaping Sri Lanka's
                            Web3 future
                        </p>
                    </FadeIn>
                </div>

                <div className="grid w-full grid-cols-2 items-start gap-1 sm:grid-cols-2 sm:gap-4 md:mx-auto md:max-w-6xl md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                    {speakers.map((speaker, index) => (
                        <FadeIn key={index} delay={150 + index * 50} className="w-full min-w-0">
                            <Card className="h-auto w-full overflow-hidden rounded-md border bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.02] sm:rounded-xl md:min-h-[240px] lg:min-h-[240px]">
                                <CardContent className="p-1 text-center sm:p-4 md:p-4">
                                    <div className="mb-0.5 sm:mb-3">
                                        <img
                                            src="/assets/profile.webp"
                                            alt={speaker.name}
                                            className="mx-auto h-6 w-6 rounded-full object-cover sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-14 lg:w-14"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="font-instrument mb-0 text-[10px] leading-tight font-medium sm:mb-1 sm:text-sm md:text-sm lg:text-sm">
                                        {speaker.name}
                                    </h3>
                                    <p className="mb-0.5 text-[9px] leading-tight font-medium text-[#0a1a5c] sm:mb-2 sm:text-xs md:text-sm lg:text-sm">
                                        {speaker.title}
                                    </p>
                                    <p className="mb-1 hidden text-xs font-medium text-gray-700 sm:mb-2 sm:block md:text-xs lg:text-sm">
                                        "{speaker.topic}"
                                    </p>
                                    <p className="text-muted-foreground hidden text-xs sm:block md:text-xs lg:text-sm">
                                        {speaker.bio}
                                    </p>
                                    <div className="mt-1 flex justify-center gap-2">
                                        {speaker.linkedin && (
                                            <a
                                                href={speaker.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={speaker.name + " on LinkedIn"}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <IconBrandLinkedin className="h-4 w-4" />
                                            </a>
                                        )}
                                        {speaker.x && (
                                            <a
                                                href={speaker.x}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={speaker.name + " on X"}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <IconBrandX className="h-4 w-4" />
                                            </a>
                                        )}
                                        {speaker.telegram && (
                                            <a
                                                href={speaker.telegram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={speaker.name + " on Telegram"}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <IconBrandTelegram className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Speakers;
