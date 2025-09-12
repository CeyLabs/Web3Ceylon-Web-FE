import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";

interface SpeakersProps {
    className?: string;
}

const Speakers: React.FC<SpeakersProps> = ({ className }) => {
    const speakers = [
        {
            name: "To be decided",
            title: "Founder, Ceylon Cash",
            topic: "To be announced",
            image: "👨‍💼",
            bio: "Details coming soon",
        },
        {
            name: "To be decided",
            title: "CTIO, CeyLabs LLC",
            topic: "To be announced",
            image: "👩‍💻",
            bio: "Details coming soon",
        },
        {
            name: "To be decided",
            title: "CTO, Web3 Tech Startup",
            topic: "To be announced",
            image: "🚀",
            bio: "Details coming soon",
        },
        {
            name: "To be decided",
            title: "Lecturer, University of Somewhere",
            topic: "To be announced",
            image: "🎓",
            bio: "Details coming soon",
        },
        {
            name: "To be decided",
            title: "NFT Artist & Creator",
            topic: "To be announced",
            image: "🎨",
            bio: "Details coming soon",
        },
        {
            name: "To be decided",
            title: "DAO Governance Expert",
            topic: "To be announced",
            image: "🏛️",
            bio: "Details coming soon",
        },
    ];

    return (
        <section id="speakers" className={cn("bg-background py-20", className)}>
            <div className="container mx-auto px-4 md:px-6">
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

                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {speakers.map((speaker, index) => (
                        <FadeIn key={index} delay={150 + index * 50}>
                            <Card className="h-full border-0 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <CardContent className="p-6 text-center">
                                    <div className="mb-4 text-6xl">{speaker.image}</div>
                                    <h3 className="font-instrument mb-2 text-xl font-medium">
                                        {speaker.name}
                                    </h3>
                                    <p className="mb-3 font-medium text-blue-600">
                                        {speaker.title}
                                    </p>
                                    <p className="mb-3 text-sm font-medium text-gray-700">
                                        "{speaker.topic}"
                                    </p>
                                    <p className="text-muted-foreground text-sm">{speaker.bio}</p>
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
