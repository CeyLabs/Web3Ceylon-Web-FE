import React, { useMemo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
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
      className={cn("relative overflow-hidden py-20 bg-white", className)}
    >
      {/* Background decorative SVG */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none">
        <img
          src="/assets/Group-427318255-1.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-instrument mb-10 text-center">
              About Web3Ceylon
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="text-2xl font-medium font-figtree md:text-2xl mb-8 text-center text-gray-700">
              Web3Ceylon is a four-city educational and cultural tour across Sri
              Lanka. <br /> From Colombo's Web3 Dev Fest to Galle's creator
              showcase and Ella's community retreat, we're bringing developers,
              entrepreneurs, and visionaries together to shape the future of
              blockchain.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={200}>
          <div className="max-w-7xl mx-auto">
            {/* Featured Projects Grid (from provided snippet) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-24">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group cursor-pointer"
                  onClick={() => handleNavigation(project.link)}
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-[3/4] mb-6">
                    <div
                      className={`absolute inset-0 ${project.color} opacity-80`}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-8 left-8 right-8">
                      {"emoji" in project && (
                        <div className="text-4xl mb-2 drop-shadow-sm">
                          {(project as { emoji?: string }).emoji}
                        </div>
                      )}
                      <h3 className="text-2xl font-instrument font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/80 mb-6">{project.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm" suppressHydrationWarning>
                          {currentTime} — Est. Aug
                        </span>
                        <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-white text-sm">
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
