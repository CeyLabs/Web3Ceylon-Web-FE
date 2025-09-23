"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRoadmapModalStore } from "@/lib/zustand/stores";
import { cities } from "@/data/cities";
import { cityEvents } from "@/lib/events";
import type { City } from "@/data/cities";

type CityTheme = {
    background: string;
    border: string;
    accent: string;
    heading: string;
    body: string;
    muted: string;
    buttonText: string;
    buttonShadow: string;
    closeText: string;
    stampShadow: string;
};

const cityThemes: Record<City["id"], CityTheme> = {
    colombo: {
        background: "#DFEFFF",
        border: "rgba(25, 118, 210, 0.35)",
        accent: "#1976D2",
        heading: "#0F3D85",
        body: "#264577",
        muted: "#3B5A80",
        buttonText: "#F5FAFF",
        buttonShadow: "0 18px 45px rgba(25, 118, 210, 0.28)",
        closeText: "#E6F1FF",
        stampShadow: "rgba(25, 118, 210, 0.35)",
    },
    kandy: {
        background: "#FFF2E4",
        border: "rgba(198, 40, 40, 0.32)",
        accent: "#C62828",
        heading: "#B73028",
        body: "#7D3B36",
        muted: "#94413D",
        buttonText: "#FFECE7",
        buttonShadow: "0 18px 45px rgba(198, 40, 40, 0.26)",
        closeText: "#FFECE7",
        stampShadow: "rgba(210, 84, 74, 0.35)",
    },
    galle: {
        background: "#F6F4D5",
        border: "rgba(245, 124, 0, 0.28)",
        accent: "#F57C00",
        heading: "#C86A00",
        body: "#8C5400",
        muted: "#A96608",
        buttonText: "#FFF8ED",
        buttonShadow: "0 18px 45px rgba(245, 124, 0, 0.24)",
        closeText: "#FFF7EB",
        stampShadow: "rgba(245, 124, 0, 0.32)",
    },
    ella: {
        background: "#DEFFE0",
        border: "rgba(56, 142, 60, 0.28)",
        accent: "#388E3C",
        heading: "#2F6D33",
        body: "#2D5A35",
        muted: "#387244",
        buttonText: "#F3FFEF",
        buttonShadow: "0 18px 45px rgba(56, 142, 60, 0.24)",
        closeText: "#F3FFEF",
        stampShadow: "rgba(56, 142, 60, 0.3)",
    },
};

export default function RoadmapModal() {
    const { isModalOpen, activeCityId, closeModal } = useRoadmapModalStore();

    const activeCity = activeCityId ? cities.find((city) => city.id === activeCityId) : undefined;

    const activeEvent = activeCityId ? cityEvents.find((event) => event.id === activeCityId) : undefined;

    const mapLocations = [
        {
            id: "colombo" as const,
            stampImage: "/assets/stamps/Stamp - Colombo.png",
            mapSvg: "/assets/maps/Colombo_Map_Dark.svg",
        },
        {
            id: "kandy" as const,
            stampImage: "/assets/stamps/Stamp - Kandy.png",
            mapSvg: "/assets/maps/Kandy_Map_Dark.svg",
        },
        {
            id: "galle" as const,
            stampImage: "/assets/stamps/Stamp - Galle.png",
            mapSvg: "/assets/maps/Galle_Map_Dark.svg",
        },
        {
            id: "ella" as const,
            stampImage: "/assets/stamps/Stamp - Ella.png",
            mapSvg: "/assets/maps/Ella_Map_Dark.svg",
        },
    ];

    const activeLocation = activeCityId
        ? mapLocations.find((location) => location.id === activeCityId)
        : undefined;

    if (!isModalOpen || !activeCity || !activeLocation) return null;

    const theme = cityThemes[activeCity.id] ?? cityThemes.kandy;

    const isPast = activeEvent ? new Date() > new Date(activeEvent.endsAt) : false;

    return (
        <>
            <motion.div
                key="map-overlay"
                className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closeModal}
            />
            <div className="pointer-events-none fixed inset-0 z-[10000] flex items-stretch justify-between gap-6 px-4 py-4">
                <motion.aside
                    key="map-modal"
                    style={{
                        width: "min(30rem, calc(100vw - 2rem))",
                        backgroundColor: theme.background,
                        borderColor: theme.border,
                        boxShadow: "0 34px 120px rgba(15, 23, 42, 0.45)",
                        color: theme.body,
                    }}
                    className="pointer-events-auto relative flex h-full flex-col overflow-hidden rounded-[36px] border px-8 py-10 text-left backdrop-blur-xl"
                    initial={{ x: "-120%", opacity: 0 }}
                    animate={{ x: "0%", opacity: 1 }}
                    exit={{ x: "-120%", opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.74, 0.04, 0.24, 1] }}
                >
                    <button
                        type="button"
                        onClick={closeModal}
                        style={{
                            backgroundColor: theme.accent,
                            color: theme.closeText,
                            boxShadow: theme.buttonShadow,
                        }}
                        className="absolute top-8 right-8 flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-[1.08]"
                        aria-label="Close city details"
                    >
                        <span className="text-2xl leading-none font-semibold">×</span>
                    </button>

                    <div className="flex h-full flex-col overflow-y-auto pr-1">
                        <div className="mt-1 flex flex-1 flex-col gap-6 pr-6 pb-10">
                            <div className="space-y-3">
                                <p
                                    className="font-secondary text-xs font-semibold tracking-[0.32em] uppercase"
                                    style={{ color: theme.accent }}
                                >
                                    {activeCity.group}
                                </p>
                                <h3
                                    className="font-carena text-[clamp(26px,2.4vw,34px)] leading-tight font-semibold tracking-tight"
                                    style={{ color: theme.heading }}
                                >
                                    {activeCity.headline}
                                </h3>
                                <p
                                    className="font-secondary text-sm leading-relaxed md:text-base"
                                    style={{ color: theme.muted }}
                                >
                                    {activeCity.subtitle}
                                </p>
                            </div>
                            <dl className="grid grid-cols-1 gap-4 text-sm">
                                <div className="flex flex-col">
                                    <dt
                                        className="font-secondary text-xs font-semibold tracking-[0.2em] uppercase"
                                        style={{ color: theme.accent }}
                                    >
                                        City
                                    </dt>
                                    <dd
                                        className="font-secondary text-base"
                                        style={{ color: theme.body }}
                                    >
                                        {activeCity.city}
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt
                                        className="font-secondary text-xs font-semibold tracking-[0.2em] uppercase"
                                        style={{ color: theme.accent }}
                                    >
                                        Date
                                    </dt>
                                    <dd
                                        className="font-secondary text-base"
                                        style={{ color: theme.body }}
                                    >
                                        {activeCity.date}
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt
                                        className="font-secondary text-xs font-semibold tracking-[0.2em] uppercase"
                                        style={{ color: theme.accent }}
                                    >
                                        Focus
                                    </dt>
                                    <dd
                                        className="font-secondary text-base"
                                        style={{ color: theme.body }}
                                    >
                                        {activeCity.bottomLine}
                                    </dd>
                                </div>
                            </dl>
                            {isPast ? (
                                <span
                                    className="font-secondary inline-flex cursor-not-allowed items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold opacity-50"
                                    style={{
                                        backgroundColor: theme.accent,
                                        color: theme.buttonText,
                                        boxShadow: theme.buttonShadow,
                                    }}
                                >
                                    Event Ended
                                </span>
                            ) : (
                                <a
                                    href={activeCity.eventUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-secondary inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition hover:translate-y-[-2px]"
                                    style={{
                                        backgroundColor: theme.accent,
                                        color: theme.buttonText,
                                        boxShadow: theme.buttonShadow,
                                    }}
                                >
                                    Reserve Your Spot
                                </a>
                            )}
                            {isPast && (
                                <p
                                    className="font-secondary mt-4 text-sm leading-relaxed"
                                    style={{ color: theme.muted }}
                                >
                                    Thank you for joining with Web3Ceylon - {activeCity.city}{" "}
                                    {activeCity.id !== "ella" ? "journey will see you in next stop 🚀" : ""}
                                </p>
                            )}
                        </div>
                        <motion.div
                            className="pointer-events-none relative mt-8 flex h-36 w-36 items-end self-center lg:hidden"
                            initial={{ rotate: -10, y: -12 }}
                            animate={{ rotate: [-10, -6, -10], y: [-12, -18, -12] }}
                            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
                        >
                            <Image
                                src={activeLocation.stampImage}
                                alt={`${activeCity.city} event stamp`}
                                fill
                                sizes="(min-width: 1280px) 18vw, 60vw"
                                className="object-contain"
                                style={{ filter: `drop-shadow(0 18px 55px ${theme.stampShadow})` }}
                            />
                        </motion.div>
                    </div>
                </motion.aside>
                <motion.div
                    key={`map-visual-${activeLocation.id}`}
                    layoutId={`city-map-${activeLocation.id}`}
                    initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.55, rotate: 6 }}
                    transition={{ duration: 0.55, ease: [0.4, 0.14, 0.3, 1] }}
                    style={{ flexBasis: "min(32vw, 360px)" }}
                    className="pointer-events-none hidden h-full flex-1 items-center justify-center lg:flex"
                >
                    <div
                        className="animate-gentle-bounce relative w-full max-w-[360px]"
                        style={{ aspectRatio: "1 / 1" }}
                    >
                        <Image
                            src={activeLocation.mapSvg}
                            alt={`${activeCity.city} map illustration`}
                            fill
                            sizes="(min-width: 1280px) 20vw, 45vw"
                            className="object-contain"
                            style={{
                                filter: "drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px #fff) drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.6))",
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </>
    );
}
