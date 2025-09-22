"use client";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import useWindowSize from "@/hooks/useWindowSize";
import { cities } from "@/data/cities";
import type { City } from "@/data/cities";
import { cityEvents } from "@/lib/events";
import { useRoadmapModalStore } from "@/lib/zustand/stores";
interface Web3CircuitRoadmapProps {
    className?: string;
}
type MapLocation = {
    id: City["id"];
    label: string;
    mapSvg: string;
    stampImage: string;
    accent: string;
    /** percentage values (0-1) relative to the roadmap bounds */
    position: { x: number; y: number };
    /** width sizing hint expressed in viewport widths for responsive clamp */
    sizeVw: number;
    aspectRatio: number;
};
const mapLocations: MapLocation[] = [
    {
        id: "colombo",
        label: "Colombo",
        mapSvg: "/assets/maps/Colombo_Map.svg",
        stampImage: "/assets/stamps/Stamp - Colombo.png",
        accent: "#0EA5E9",
        position: { x: 0.348, y: 0.63 },
        sizeVw: 7,
        aspectRatio: 506 / 412,
    },
    {
        id: "kandy",
        label: "Kandy",
        mapSvg: "/assets/maps/Kandy_Map.svg",
        stampImage: "/assets/stamps/Stamp - Kandy.png",
        accent: "#FB923C",
        position: { x: 0.49, y: 0.5 },
        sizeVw: 7,
        aspectRatio: 500 / 370,
    },
    {
        id: "galle",
        label: "Galle",
        mapSvg: "/assets/maps/Galle_Map.svg",
        stampImage: "/assets/stamps/Stamp - Galle.png",
        accent: "#F97316",
        position: { x: 0.446, y: 0.86 },
        sizeVw: 7.5,
        aspectRatio: 551 / 356,
    },
    {
        id: "ella",
        label: "Ella",
        mapSvg: "/assets/maps/Ella_Map.svg",
        stampImage: "/assets/stamps/Stamp - Ella.png",
        accent: "#22C55E",
        position: { x: 0.596, y: 0.58 },
        sizeVw: 7,
        aspectRatio: 517 / 382,
    },
];
const spring = { type: "spring", stiffness: 320, damping: 26 } as const;

const isEventEnded = (cityId: string): boolean => {
    const event = cityEvents.find((e) => e.id === cityId);
    if (!event) return false;
    const now = Date.now();
    const endsAt = new Date(event.endsAt).getTime();
    return now > endsAt;
};

const Web3CircuitRoadmap: React.FC<Web3CircuitRoadmapProps> = ({ className }) => {
    const { width } = useWindowSize();
    const isDesktop = width >= 1024;
    const { openModal, closeModal, activeCityId } = useRoadmapModalStore();
    // Map city data for quick lookup inside render
    const cityRecord = useMemo(() => {
        const record: Record<string, City> = {};
        for (const city of cities) {
            record[city.id] = city;
        }
        return record;
    }, []);
    useEffect(() => {
        if (!isDesktop && activeCityId) {
            closeModal();
        }
    }, [isDesktop, activeCityId, closeModal]);
    useEffect(() => {
        if (!activeCityId) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeCityId, closeModal]);
    return (
        <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
            <div className="relative h-full w-full">
                {isDesktop && (
                    <div className="absolute top-4 right-4 z-10">
                        <div className="group relative inline-block">
                            <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl">
                                <Info className="h-4 w-4 text-slate-600" />
                                <span>Click cities to register</span>
                            </div>
                            <div className="absolute top-full right-0 mt-2 hidden w-48 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                                Click on any city marker to open event details and registration
                                <div className="absolute -top-1 right-4 h-2 w-2 rotate-45 bg-slate-800"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="relative mx-auto h-full w-full"
                    style={{
                        aspectRatio: "1831 / 2807",
                        maxWidth: 780,
                        maxHeight: "100%",
                    }}
                >
                    <Image
                        src={
                            isDesktop
                                ? "/assets/maps/Roadmap_Web.svg"
                                : "/assets/maps/Roadmap_Web_Full.svg"
                        }
                        alt="Sri Lanka roadmap"
                        fill
                        priority
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        className="pointer-events-none object-contain select-none"
                    />

                    {isDesktop && (
                        <div className="pointer-events-none absolute inset-0">
                            {mapLocations.map((location) => {
                                const city = cityRecord[location.id];
                                const isActive = activeCityId === location.id;
                                const isDimmed = Boolean(activeCityId && !isActive);
                                const ended = isEventEnded(location.id);
                                return (
                                    <motion.button
                                        key={location.id}
                                        type="button"
                                        onClick={() => {
                                            if (isActive) {
                                                closeModal();
                                            } else {
                                                openModal(location.id);
                                            }
                                        }}
                                        whileHover={{ scale: isActive ? 1.18 : 1.06 }}
                                        animate={
                                            isActive
                                                ? { scale: 1.14, opacity: 1, zIndex: 40 }
                                                : isDimmed
                                                  ? { scale: 0.86, opacity: 0.55, zIndex: 10 }
                                                  : { scale: 1, opacity: 1, zIndex: 20 }
                                        }
                                        transition={spring}
                                        aria-pressed={isActive}
                                        aria-label={`Learn more about ${location.label}`}
                                        className={cn(
                                            "pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-3 rounded-3xl p-2 text-center outline-none",
                                            "focus-visible:ring-2 focus-visible:ring-[#0EA5E9]/70 focus-visible:ring-offset-2"
                                        )}
                                        style={{
                                            top: `${location.position.y * 100}%`,
                                            left: `${location.position.x * 100}%`,
                                            width: `clamp(124px, ${location.sizeVw}vw, 220px)`,
                                        }}
                                    >
                                        {isActive ? (
                                            <div
                                                className="relative w-full overflow-visible"
                                                style={{ aspectRatio: location.aspectRatio }}
                                            />
                                        ) : (
                                            <motion.div
                                                layoutId={`city-map-${location.id}`}
                                                className="relative w-full overflow-visible"
                                                style={{ aspectRatio: location.aspectRatio }}
                                            >
                                                <Image
                                                    src={location.mapSvg}
                                                    alt={`${location.label} map illustration`}
                                                    fill
                                                    sizes="(min-width: 1280px) 14vw, 20vw"
                                                    className={cn(
                                                        "object-contain drop-shadow-[0_24px_45px_rgba(15,23,42,0.25)] transition-all duration-300",
                                                        (isDimmed || ended) &&
                                                            "opacity-70 contrast-75 grayscale",
                                                        ended &&
                                                            "animate-pulse drop-shadow-[0_0_20px_rgba(107,114,128,0.5)]"
                                                    )}
                                                />
                                            </motion.div>
                                        )}
                                        {/* <span
                                            className="rounded-full bg-white/90 px-5 py-1 text-xs font-semibold tracking-[0.18em] text-slate-800 uppercase shadow-md backdrop-blur"
                                            style={{ border: `1px solid ${location.accent}30` }}
                                        >
                                            {city?.city ?? location.label}
                                        </span> */}
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Web3CircuitRoadmap;
