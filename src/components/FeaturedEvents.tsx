import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import LazyImage from "@/components/reusable/LazyImage";

type Project = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    color: string; // Tailwind bg/gradient classes
    link: string; // can be external or in-page anchor
};

const FeaturedEvents: React.FC = () => {
    // Use brand-aligned gradients (blue ⇄ orange) used across the site
    const featuredProjects: Project[] = useMemo(
        () => [
            {
                id: "colombo",
                title: "Colombo — Web3 Dev Fest",
                subtitle: "Smart contracts, DeFi protocols, and hands-on workshops",
                image: "/lovable-uploads/34a58283-8b82-48f9-88f4-2c88b069921d.png",
                color: "bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500",
                link: "#cities",
            },
            {
                id: "galle",
                title: "Galle — Creators & Entrepreneurs",
                subtitle: "NFTs, DAOs, and the growing creator economy",
                image: "/lovable-uploads/47f9a1d0-4458-400a-8fc0-79adf093cf18.png",
                color: "bg-gradient-to-br from-orange-500 via-orange-500 to-blue-600",
                link: "#cities",
            },
            {
                id: "ella",
                title: "Ella — Community Retreat",
                subtitle: "Network, unwind, and build with the community",
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
        <section className="px-6 pt-32 pb-16">
            <div className="mx-auto max-w-7xl">
                {/* Featured Projects Grid */}
                <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.7,
                                ease: "easeOut",
                            }}
                            className="group cursor-pointer"
                            onClick={() => handleNavigation(project.link)}
                        >
                            <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-3xl">
                                <div className={`absolute inset-0 ${project.color} opacity-80`} />
                                <LazyImage
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                                    wrapperClassName="h-full w-full"
                                />
                                <div className="absolute right-8 bottom-8 left-8">
                                    <h3 className="font-primary mb-2 text-2xl font-bold text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mb-6 text-white/85">{project.subtitle}</p>
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="text-sm text-white/70"
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
        </section>
    );
};

export default FeaturedEvents;
