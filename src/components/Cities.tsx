import React, { useState } from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CitiesProps {
    className?: string;
}

const Cities: React.FC<CitiesProps> = ({ className }) => {
    const cities = [
        {
            name: "Colombo",
            title: "Web3 Dev Fest",
            tagline: "Sri Lanka's commercial heart turns into a Web3 innovation hub",
            icon: "🏙️",
            description:
                "Comprehensive developer workshops, technical sessions, and blockchain fundamentals",
            highlights: [
                "Smart Contract Development",
                "DeFi Protocols",
                "Developer Networking",
                "Tech Talks",
            ],
        },
        {
            name: "Kandy",
            title: "Blockchain Fundamentals & Crypto Essentials",
            tagline: "Web3 meets the hill capital",
            icon: "🏛️",
            description: "Essential crypto knowledge, wallet setup, and blockchain basics",
            highlights: [
                "Wallet Security",
                "Bitcoin Basics",
                "Stablecoin Education",
                "Crypto Trading",
            ],
        },
        {
            name: "Galle",
            title: "Web3 for Creators & Entrepreneurs",
            tagline: "Coastal vibes, creative minds",
            icon: "🎨",
            description: "NFT creation, DAO governance, and creator economy exploration",
            highlights: ["NFT Creation", "Creator Economy", "DAO Governance", "Digital Art"],
        },
        {
            name: "Ella",
            title: "Web3 Community Retreat",
            tagline: "Unwind, connect, and build in Sri Lanka's scenic highlands",
            icon: "🏔️",
            description: "Fireside chats, networking sessions, and community bonding",
            highlights: [
                "Fireside Chats",
                "Network Building",
                "Community Bonding",
                "Scenic Workshops",
            ],
        },
    ];

    return (
        <section id="cities" className={cn("bg-gray-50 py-20", className)}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto mb-16 max-w-3xl">
                    <FadeIn>
                        <h2 className="font-primary mb-8 text-center text-3xl md:text-4xl">
                            Tour Cities
                        </h2>
                    </FadeIn>

                    <FadeIn delay={100}>
                        <p className="font-secondary mb-8 text-center text-xl text-gray-700">
                            Four unique experiences across Sri Lanka's most beautiful destinations
                        </p>
                    </FadeIn>
                </div>

                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
                    {cities.map((city, index) => (
                        <FadeIn key={index} delay={150 + index * 100}>
                            <Card className="h-full border-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                <CardContent className="p-8">
                                    <div className="mb-4 flex items-center">
                                        <span className="mr-4 text-4xl">{city.icon}</span>
                                        <div>
                                            <h3 className="font-primary mb-1 text-2xl font-normal">
                                                {city.name}
                                            </h3>
                                            <h4 className="font-secondary text-lg font-medium text-blue-600">
                                                {city.title}
                                            </h4>
                                        </div>
                                    </div>

                                    <p className="mb-4 text-sm text-gray-600 italic">
                                        {city.tagline}
                                    </p>
                                    <p className="mb-6 text-gray-700">{city.description}</p>

                                    <div className="grid grid-cols-2 gap-2">
                                        {city.highlights.map((highlight, idx) => (
                                            <div key={idx} className="flex items-center text-sm">
                                                <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-blue-600"></span>
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <a
                                            href="#register"
                                            className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                                        >
                                            Join {city.name} Session →
                                        </a>
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

export default Cities;
