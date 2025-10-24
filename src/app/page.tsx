"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import WaitlistModal from "@/components/modal/WaitlistModal";
import { useWaitlistModalStore } from "@/lib/zustand/stores";

const thankYouCopy = {
    headline: "Thanks for joining us, see you next year!",
    subheading:
        "Web3Ceylon will be back with a fresh tour in 2026. Stay tuned for the next chapter.",
};

export default function ThankYouPage() {
    const [play, { sound }] = useSound("/assets/sounds/tap-sound-02.mp3", {
        preload: true,
    });
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const toggleWaitlistModal = useWaitlistModalStore((state) => state.toggleModal);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                event.preventDefault();
                setIsSpacePressed(true);
                play();
            } else {
                play();
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                setIsSpacePressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [play]);

    return (
        <main className="relative min-h-screen overflow-hidden bg-black text-zinc-100 antialiased">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-[-10%] left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,rgba(0,0,0,0)_60%)] blur-3xl" />
                <div className="absolute bottom-[-30%] left-1/2 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.08)_0%,rgba(0,0,0,0)_55%)] blur-3xl" />
            </div>

            <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6">
                {/* Hero keycap button */}
                <div
                    className="group relative mx-auto h-[260px] w-[320px] focus-within:outline-none md:h-[320px] md:w-[420px]"
                    onMouseEnter={() => play()}
                    onTouchStart={() => play()}
                >
                    <div
                        className="absolute inset-x-10 bottom-4 h-10 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_70%)] opacity-80 blur-2xl transition-all duration-500 ease-out group-hover:scale-[1.05] group-hover:opacity-95"
                        style={isSpacePressed ? { transform: "scale(1.05)", opacity: 0.95 } : {}}
                    />

                    <div className="absolute inset-x-4 top-14 bottom-0 rounded-[28px] bg-gradient-to-b from-neutral-900 to-black shadow-[0_40px_120px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-8px_16px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                        <div className="pointer-events-none absolute inset-x-2 top-0 h-8 rounded-t-[26px] bg-gradient-to-b from-white/12 to-transparent" />
                        <div className="pointer-events-none absolute inset-x-2 bottom-1 h-6 rounded-b-[26px] bg-gradient-to-t from-white/5 to-transparent" />
                        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/5" />
                    </div>

                    <div
                        className="absolute inset-x-8 top-0 bottom-16 [transform:perspective(1200px)_rotateX(22deg)] rounded-[26px] bg-gradient-to-b from-zinc-800 to-zinc-950 shadow-[inset_0_2px_0_rgba(255,255,255,0.08),0_30px_80px_rgba(0,0,0,0.75)] ring-1 ring-white/10 transition-all duration-500 ease-out group-hover:-translate-y-[16px] group-hover:[transform:perspective(1200px)_rotateX(18deg)] group-active:translate-y-[10px]"
                        aria-hidden
                        style={
                            isSpacePressed
                                ? {
                                      transform:
                                          "perspective(1200px) rotateX(18deg) translateY(-16px)",
                                  }
                                : {}
                        }
                    >
                        <div className="pointer-events-none absolute -top-7 right-10 left-10 h-16 rounded-full bg-white/12 blur-2xl" />
                        <div className="pointer-events-none absolute inset-x-2 top-0 h-10 rounded-t-[24px] bg-gradient-to-b from-white/15 to-transparent" />
                        <div
                            className="pointer-events-none absolute inset-0 rounded-[26px] bg-white/10 [mask-image:linear-gradient(120deg,transparent_35%,white_50%,transparent_65%)] opacity-20 blur-sm transition-opacity duration-500 group-hover:opacity-30"
                            style={isSpacePressed ? { opacity: 0.3 } : {}}
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-white/10" />
                        <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.45)]" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src="/2025/Main_BBG.png"
                                alt="Web3Ceylon logo"
                                width={128}
                                height={128}
                                className="h-24 w-24 rounded-xl object-contain shadow-[0_6px_20px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/15 md:h-32 md:w-32"
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    </div>

                    <div
                        className="absolute inset-x-10 bottom-[70px] h-10 rounded-[26px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_70%)] opacity-80 blur-xl transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-95"
                        style={isSpacePressed ? { transform: "scale(1.04)", opacity: 0.95 } : {}}
                    />

                    <span className="absolute bottom-9 left-10 font-mono text-[10px] tracking-[0.18em] text-amber-400 select-none">
                        Q4 2026
                    </span>
                </div>

                <h1 className="mt-12 text-center text-[21px] font-semibold tracking-tight text-zinc-200 md:text-[24px]">
                    {thankYouCopy.headline}
                </h1>
                <p className="mt-4 max-w-xl text-center text-sm text-zinc-400 md:text-base">
                    {thankYouCopy.subheading}
                </p>

                <div className="mt-12 flex gap-4">
                    <button
                        onClick={toggleWaitlistModal}
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                    >
                        Join '26 Waitlist
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <Link
                        href="/2025/"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                    >
                        See 2025 Archive
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </section>

            <WaitlistModal />
        </main>
    );
}
