import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import Web3CircuitRoadmap from "./Web3CircuitRoadmap";

interface AboutProps {
    className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
    return (
        <section id="about" className={cn("bg-background py-20 md:py-32", className)}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid items-start gap-12 md:grid-cols-12 md:gap-20">
                    <FadeIn className="md:col-span-5">
                        <div className="flex flex-col space-y-6">
                            <div>
                                <span className="font-secondary mb-2 inline-block text-sm font-medium text-blue-600 md:text-base">
                                    Why Web3Ceylon?
                                </span>
                                <h2 className="font-primary mb-6 text-3xl font-medium tracking-tight md:text-5xl">
                                    Connecting global knowledge with local innovation
                                </h2>
                            </div>

                            <p className="font-secondary text-lg text-gray-700">
                                Sri Lanka is a digitally vibrant, emerging market with high mobile
                                adoption, a growing developer community, and rising curiosity about
                                blockchain.
                            </p>
                            <p className="font-secondary text-lg text-gray-700">
                                Web3Ceylon empowers developers, creators, and entrepreneurs through
                                workshops, talks, and community bonding — bridging the gap between
                                global Web3 trends and local innovation opportunities.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-white p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">4</div>
                                    <div className="text-sm text-gray-600">Cities</div>
                                </div>
                                <div className="rounded-lg bg-white p-4 text-center">
                                    <div className="text-2xl font-bold text-orange-600">500+</div>
                                    <div className="text-sm text-gray-600">Expected Attendees</div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={150} className="md:col-span-7">
                        <div className="h-[500px] w-full lg:h-[600px]">
                            <Web3CircuitRoadmap className="h-full w-full" />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default About;
