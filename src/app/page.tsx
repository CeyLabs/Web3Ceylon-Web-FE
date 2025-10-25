"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import WaitlistModal from "@/components/modal/WaitlistModal";
import { useWaitlistModalStore } from "@/lib/zustand/stores";
import HeroKeycap from "@/components/HeroKeycap";

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
            // Don't prevent space key if user is typing in an input field
            const activeElement = document.activeElement;
            if (
                event.code === "Space" &&
                (activeElement?.tagName === "INPUT" ||
                    activeElement?.tagName === "TEXTAREA" ||
                    (activeElement as HTMLElement)?.contentEditable === "true")
            ) {
                return;
            }

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
                <HeroKeycap isPressed={isSpacePressed} onInteract={play} />

                <h1 className="mt-12 text-center text-[21px] font-semibold tracking-tight text-zinc-200 md:text-[24px]">
                    {thankYouCopy.headline}
                </h1>
                <p className="font-secondary mt-4 max-w-xl text-center text-sm text-zinc-400 md:text-base">
                    {thankYouCopy.subheading}
                </p>

                <div className="mt-12 flex gap-4">
                    <button
                        onClick={toggleWaitlistModal}
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium whitespace-nowrap text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                    >
                        Join '26 Waitlist
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <Link
                        href="/2025/"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium whitespace-nowrap text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
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
