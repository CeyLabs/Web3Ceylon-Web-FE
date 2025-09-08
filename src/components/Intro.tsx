"use client";
import React, { useMemo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import ScrollReveal from "./animations/ScrollReveal";
import { motion } from "framer-motion";

interface IntroProps {
    className?: string;
}

const Intro: React.FC<IntroProps> = ({ className }) => {
    // Featured projects data (brand-aligned gradients and local images)
    const featuredProjects = useMemo(
        () => [
            {
                id: "colombo",
                emoji: "🏙️",
                title: "4 Cities",
                subtitle: "Colombo, Kandy, Galle, Ella",
                image: "/lovable-uploads/34a58283-8b82-48f9-88f4-2c88b069921d.png",
                color: "bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500",
                link: "#cities",
            },
            {
                id: "galle",
                emoji: "👥",
                title: "Community First",
                subtitle: "Developers, creators, entrepreneurs",
                image: "/lovable-uploads/47f9a1d0-4458-400a-8fc0-79adf093cf18.png",
                color: "bg-gradient-to-br from-orange-500 via-orange-500 to-blue-600",
                link: "#cities",
            },
            {
                id: "ella",
                emoji: "🚀",
                title: "Web3 Future",
                subtitle: "Blockchain innovation & education",
                image: "/lovable-uploads/af28398b-9e23-4e2b-9de1-bda457e09fd8.png",
                color: "bg-gradient-to-br from-blue-600 via-indigo-600 to-orange-500",
                link: "#register",
            },
        ],
        []
    );

    const [currentTime, setCurrentTime] = useState("");
    useEffect(() => {
        try {
            setCurrentTime(
                new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            );
        } catch {
            setCurrentTime("");
        }
    }, []);

    const handleNavigation = (link: string) => {
        if (link.startsWith("#")) {
            const id = link.slice(1);
            const el = document.getElementById(id);
            if (el) {
                window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
            } else {
                window.location.hash = link; // fallback
            }
        } else {
            window.open(link, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <section
            id="intro"
            className={cn("relative overflow-hidden bg-[#FFF2E4] py-20", className)}
        >
            {/* Background decorative SVG
            <div className="pointer-events-none absolute inset-0 -z-10 select-none">
                <img
                    src=""
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                />
            </div> */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-4xl">
                    <FadeIn>
                        <h2 className="font-instrument mb-10 text-center text-3xl md:text-4xl">
                            About Web3Ceylon
                        </h2>
                    </FadeIn>

                    <ScrollReveal
                        baseOpacity={0.2}
                        enableBlur
                        blurStrength={6}
                        containerClassName="mb-8 text-center"
                        textClassName="text-2xl font-medium font-figtree md:text-2xl text-gray-700"
                        distancePx={600}
                        start="top 85%"
                        scrub={0.6}
                    >
                        {`Web3Ceylon is a four-city educational and cultural tour across Sri Lanka. From Colombo's Web3 Dev Fest to Galle's creator showcase and Ella's community retreat, we're bringing developers, entrepreneurs, and visionaries together to shape the future of blockchain.`}
                    </ScrollReveal>
                </div>

                <FadeIn delay={200}>
                    <div className="mx-auto max-w-7xl">
                        {/* Featured Projects Grid (from provided snippet) */}
                        <div className="mt-12 mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
                            {featuredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.8 }}
                                    className="group cursor-pointer"
                                    onClick={() => handleNavigation(project.link)}
                                >
                                    <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-3xl">
                                        <div
                                            className={`absolute inset-0 ${project.color} opacity-80`}
                                        />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="h-full w-full object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute right-8 bottom-8 left-8">
                                            {"emoji" in project && (
                                                <div className="mb-2 text-4xl drop-shadow-sm">
                                                    {(project as { emoji?: string }).emoji}
                                                </div>
                                            )}
                                            <h3 className="font-instrument mb-2 text-2xl font-bold text-white">
                                                {project.title}
                                            </h3>
                                            <p className="mb-6 text-white/80">{project.subtitle}</p>
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className="text-sm text-white/60"
                                                    suppressHydrationWarning
                                                >
                                                    {currentTime} — Est. Aug
                                                </span>
                                                <div className="rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm">
                                                    <span className="text-sm text-white">
                                                        © Web3Ceylon
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Intro;
