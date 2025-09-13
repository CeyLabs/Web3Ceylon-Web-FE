import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { speakers, speakerGroupTitles, speakerGroupStyles } from "@/data/speakers";

export interface ChromaItem {
    image?: string;
    title: string;
    subtitle: string;
    handle?: string;
    location?: string;
    borderColor?: string;
    gradient?: string;
    url?: string;
}

export interface ChromaGridProps {
    items?: ChromaItem[];
    className?: string;
    radius?: number;
    damping?: number;
    fadeOut?: number;
    ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
    items,
    className = "",
    radius = 300,
    damping = 0.45,
    fadeOut = 0.6,
    ease = "power3.out",
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);
    const setX = useRef<SetterFn | null>(null);
    const setY = useRef<SetterFn | null>(null);
    const pos = useRef({ x: 0, y: 0 });

    const demo: ChromaItem[] = [
        {
            image: "https://i.pravatar.cc/300?img=8",
            title: "Alex Rivera",
            subtitle: "Full Stack Developer",
            handle: "@alexrivera",
            borderColor: "#4F46E5",
            gradient: "linear-gradient(145deg,#4F46E5,#000)",
            url: "https://github.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=11",
            title: "Jordan Chen",
            subtitle: "DevOps Engineer",
            handle: "@jordanchen",
            borderColor: "#10B981",
            gradient: "linear-gradient(210deg,#10B981,#000)",
            url: "https://linkedin.com/in/",
        },
        {
            image: "https://i.pravatar.cc/300?img=3",
            title: "Morgan Blake",
            subtitle: "UI/UX Designer",
            handle: "@morganblake",
            borderColor: "#F59E0B",
            gradient: "linear-gradient(165deg,#F59E0B,#000)",
            url: "https://dribbble.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=16",
            title: "Casey Park",
            subtitle: "Data Scientist",
            handle: "@caseypark",
            borderColor: "#EF4444",
            gradient: "linear-gradient(195deg,#EF4444,#000)",
            url: "https://kaggle.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=25",
            title: "Sam Kim",
            subtitle: "Mobile Developer",
            handle: "@thesamkim",
            borderColor: "#8B5CF6",
            gradient: "linear-gradient(225deg,#8B5CF6,#000)",
            url: "https://github.com/",
        },
        {
            image: "https://i.pravatar.cc/300?img=60",
            title: "Tyler Rodriguez",
            subtitle: "Cloud Architect",
            handle: "@tylerrod",
            borderColor: "#06B6D4",
            gradient: "linear-gradient(135deg,#06B6D4,#000)",
            url: "https://aws.amazon.com/",
        },
    ];

    const data = items?.length ? items : demo;

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
        setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
        const { width, height } = el.getBoundingClientRect();
        pos.current = { x: width / 2, y: height / 2 };
        setX.current(pos.current.x);
        setY.current(pos.current.y);
    }, []);

    const moveTo = (x: number, y: number) => {
        gsap.to(pos.current, {
            x,
            y,
            duration: damping,
            ease,
            onUpdate: () => {
                setX.current?.(pos.current.x);
                setY.current?.(pos.current.y);
            },
            overwrite: true,
        });
    };

    const handleMove = (e: React.PointerEvent) => {
        const r = rootRef.current!.getBoundingClientRect();
        moveTo(e.clientX - r.left, e.clientY - r.top);
        if (fadeRef.current) {
            gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
        }
    };

    const handleLeave = () => {
        if (fadeRef.current) {
            gsap.to(fadeRef.current, {
                opacity: 1,
                duration: fadeOut,
                overwrite: true,
            });
        }
    };

    const handleCardClick = (url?: string) => {
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
        const c = e.currentTarget as HTMLElement;
        const rect = c.getBoundingClientRect();
        c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    const initials = (name: string) =>
        name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((s) => s[0]?.toUpperCase())
            .join("") || "?";

    return (
        <div
            ref={rootRef}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={`relative flex h-full w-full flex-wrap items-start justify-center gap-2 sm:gap-3 ${className}`}
            style={
                {
                    "--r": `${radius}px`,
                    "--x": "50%",
                    "--y": "50%",
                } as React.CSSProperties
            }
        >
            {data.map((c, i) => (
                <article
                    key={`${c.title}-${i}`}
                    onMouseMove={handleCardMove}
                    onClick={() => handleCardClick(c.url)}
                    className="group relative flex h-[232px] w-full max-w-[160px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-white/70 via-white/60 to-white/50 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)] ring-1 ring-white/20 backdrop-blur-2xl transition-transform duration-300 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_65%)] before:opacity-40 hover:scale-[1.02] hover:shadow-md sm:h-[272px] sm:max-w-[280px] sm:rounded-3xl md:h-[312px] md:w-[300px]"
                    style={
                        {
                            background: c.gradient,
                            color: c.borderColor,
                            "--spotlight-color": "rgba(255,255,255,0.15)",
                        } as React.CSSProperties
                    }
                >
                    <div
                        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                            background:
                                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
                        }}
                    />
                    <div className="relative z-10 box-border min-h-[151px] p-2 sm:min-h-[182px] sm:p-[10px] md:min-h-[211px] md:p-[12px]">
                        <img
                            src="/assets/profile.webp"
                            alt={c.title}
                            loading="lazy"
                            className="h-full w-full rounded-[10px] object-cover"
                        />
                    </div>
                    <footer className="relative z-10 flex h-[60px] flex-col gap-0.5 overflow-hidden p-2 font-sans text-inherit sm:h-[71px] sm:p-3 md:h-[81px]">
                        <h3 className="m-0 text-[0.85rem] leading-tight font-semibold sm:text-[1.05rem]">
                            {c.title}
                        </h3>
                        {c.handle && (
                            <span className="text-[0.75rem] leading-tight opacity-80 sm:text-right sm:text-[0.95rem]">
                                {c.handle}
                            </span>
                        )}
                        <p className="m-0 text-[0.75rem] leading-tight opacity-85 sm:text-[0.9rem]">
                            {c.subtitle}
                        </p>
                        {c.location && (
                            <span className="text-[0.7rem] leading-tight opacity-85 sm:text-right sm:text-[0.85rem]">
                                {c.location}
                            </span>
                        )}
                    </footer>
                </article>
            ))}
            {/* Removed the grey vignette overlays for a clean look */}
        </div>
    );
};

export default ChromaGrid;

// Section wrapper composing grouped speaker lists with brand-aligned styling
export const SpeakersSection: React.FC<{ className?: string }> = ({ className }) => {
    // Map grouped data to ChromaGrid items + city card theming
    const toItems = (group: keyof typeof speakers): ChromaItem[] => {
        const cityCardColors = {
            colombo: {
                bg: "linear-gradient(145deg, rgba(223, 239, 255, 0.7) 0%, rgba(226, 235, 240, 0.6) 50%, rgba(223, 233, 243, 0.5) 100%)",
                text: "#1976D2",
            },
            galle: {
                bg: "linear-gradient(145deg, rgba(255, 229, 229, 0.7) 0%, rgba(255, 235, 240, 0.6) 50%, rgba(255, 233, 243, 0.5) 100%)",
                text: "#C62828",
            },
            panel: {
                bg: "linear-gradient(145deg, rgba(255, 242, 228, 0.7) 0%, rgba(253, 236, 200, 0.6) 50%, rgba(249, 224, 168, 0.5) 100%)",
                text: "#F57C00",
            },
            kandy: {
                bg: "linear-gradient(145deg, rgba(222, 255, 224, 0.7) 0%, rgba(240, 255, 240, 0.6) 50%, rgba(224, 255, 224, 0.5) 100%)",
                text: "#388E3C",
            },
        };
        const colors = cityCardColors[group];
        return speakers[group].map((s) => ({
            title: s.name + (s.pending ? " (Pending)" : ""),
            subtitle: s.org ?? "",
            image: s.image, // optional
            url: s.url,
            borderColor: colors.text,
            gradient: colors.bg,
        }));
    };

    return (
        <section id="speakers" className={"py-20 " + (className ?? "")}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <h2 className="font-primary mb-4 text-3xl md:text-4xl">Meet the Speakers</h2>
                    <p className="font-secondary text-muted-foreground text-lg">
                        Builders, creators, and community leaders across Sri Lanka
                    </p>
                </div>

                {/* Colombo */}
                <div className="mx-auto mb-12 max-w-6xl">
                    <h3 className="font-primary mb-4 text-center text-xl font-semibold text-[#0a1a5c]">
                        {speakerGroupTitles.colombo}
                    </h3>
                    <ChromaGrid items={toItems("colombo")} className="justify-center" />
                </div>

                {/* Galle */}
                <div className="mx-auto mb-12 max-w-6xl">
                    <h3 className="font-primary mb-4 text-center text-xl font-semibold text-[#0a1a5c]">
                        {speakerGroupTitles.galle}
                    </h3>
                    <ChromaGrid items={toItems("galle")} className="justify-center" />
                </div>

                {/* Panel */}
                <div className="mx-auto mb-12 max-w-6xl">
                    <h3 className="font-primary mb-4 text-center text-xl font-semibold text-[#0a1a5c]">
                        {speakerGroupTitles.panel}
                    </h3>
                    <ChromaGrid items={toItems("panel")} className="justify-center" />
                </div>

                {/* Kandy */}
                <div className="mx-auto max-w-6xl">
                    <h3 className="font-primary mb-4 text-center text-xl font-semibold text-[#0a1a5c]">
                        {speakerGroupTitles.kandy}
                    </h3>
                    <ChromaGrid items={toItems("kandy")} className="justify-center" />
                </div>
            </div>
        </section>
    );
};
