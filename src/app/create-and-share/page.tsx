"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandX,
    IconCheck,
    IconCopy,
} from "@tabler/icons-react";
import { SITE_URL } from "@/lib/seo";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const shareMessage = [
    "Just participated in #Web3Ceylon Kandy 2025 🚀",
    "Thanks to @web3ceylontour & @CeylonCash for bringing together builders, thinkers, and innovators to dive into #Web3, #Blockchain",
    "",
    "#BybitSriLanka #CeylonCash",
].join("\n");

const sharePageUrl = `${SITE_URL}create-and-share`;
const encodedMessage = encodeURIComponent(shareMessage);
const encodedShareUrl = encodeURIComponent(sharePageUrl);

const shareLinks = [
    {
        label: "Share on X",
        href: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedShareUrl}`,
        icon: IconBrandX,
        accentClass: "bg-black text-white hover:bg-gray-800",
    },
    {
        label: "Post to Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}&quote=${encodedMessage}`,
        icon: IconBrandFacebook,
        accentClass: "bg-[#1877F2] text-white hover:bg-[#166fe5]",
    },
    {
        label: "Share on LinkedIn",
        href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedShareUrl}&title=${encodedMessage}`,
        icon: IconBrandLinkedin,
        accentClass: "bg-[#0077B5] text-white hover:bg-[#005885]",
    },
];

const fireConfetti = () => {
    if (typeof window === "undefined") return;

    const end = Date.now() + 3000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
        if (Date.now() > end) return;

        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors,
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors,
        });

        window.requestAnimationFrame(frame);
    };

    frame();
};

export default function CreateAndShare() {
    const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareMessage);
            setCopyState("copied");
            fireConfetti();
        } catch (error) {
            console.error("Failed to copy share message", error);
            setCopyState("error");
        } finally {
            window.setTimeout(() => setCopyState("idle"), 2200);
        }
    };

    return (
        <>
            <main
                style={{
                    backgroundImage: "url(/assets/Pattern_Watermark.png)",
                    backgroundRepeat: "repeat",
                    color: "#C62828",
                }}
                className="relative overflow-hidden pt-10 pb-16"
            >
                <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10 lg:px-16">
                    <header className="pt-6 text-center">
                        <img
                            src="/assets/maps/Kandy_Map_Dark.svg"
                            className="mx-auto h-56 w-auto"
                        />
                        <h1 className="font-primary mt-4 text-3xl leading-tight text-[#C62828] sm:text-4xl">
                            Let the island know you joined the web3ceylon tour
                        </h1>
                        <p className="font-secondary mx-auto mt-4 max-w-2xl text-base text-[#345252] sm:text-lg">
                            Share your Kandy vibes! Customize the message or post it straight to
                            your socials with one click.
                        </p>
                    </header>

                    <section
                        className="relative rounded-3xl border-[3px] bg-white/70 p-6 shadow-xl backdrop-blur-sm sm:p-8"
                        style={{ borderColor: "#C62828" }}
                    >
                        {/* Stamp offset outline */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-[inherit]"
                            style={{
                                boxShadow: `4px 4px 0 0 #C62828 inset, 4px 4px 0 0 #C62828`,
                                mixBlendMode: "multiply",
                                opacity: 0.18,
                            }}
                        />
                        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="font-secondary text-sm text-[#C62828] uppercase">
                                    Your Social Shoutout
                                </p>
                                <p className="mt-1 text-sm text-[#476060]">
                                    Refresh if you want a clean slate before tweaking the wording.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="hidden items-center gap-2 rounded-full bg-[#C62828] px-4 py-2 text-sm font-semibold text-white shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#295746] sm:inline-flex"
                            >
                                {copyState === "copied" ? (
                                    <IconCheck size={18} stroke={2} />
                                ) : (
                                    <IconCopy size={18} stroke={2} />
                                )}
                                {copyState === "copied" && <span>Copied</span>}
                                {copyState === "error" && <span>Try again</span>}
                                {copyState === "idle" && <span>Copy message</span>}
                            </button>
                        </div>
                        <div className="relative mt-6">
                            <article className="relative rounded-2xl border border-[#f2d6ac]/60 bg-[#FFE5E5]/90 p-6 pb-16 shadow-inner sm:p-8 sm:pb-20">
                                <p className="font-primary text-base leading-relaxed whitespace-pre-line text-[#1f352f] sm:text-lg">
                                    {shareMessage}
                                </p>
                            </article>
                        </div>
                        <div className="mt-6 flex justify-center sm:hidden">
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 rounded-full bg-[#C62828] px-4 py-2 text-sm font-semibold text-white shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#295746]"
                            >
                                {copyState === "copied" ? (
                                    <IconCheck size={18} stroke={2} />
                                ) : (
                                    <IconCopy size={18} stroke={2} />
                                )}
                                {copyState === "copied" && <span>Copied</span>}
                                {copyState === "error" && <span>Try again</span>}
                                {copyState === "idle" && <span>Copy message</span>}
                            </button>
                        </div>
                        <p className="mt-8 text-sm text-[#3a5858]">
                            Tip: add a photo or a quick takeaway from your Kandy journey to make the
                            post feel even more personal.
                        </p>
                    </section>

                    <section
                        className="relative rounded-3xl border-[3px] bg-white/60 p-6 shadow-lg backdrop-blur-sm sm:p-8"
                        style={{ borderColor: "#C62828" }}
                    >
                        {/* Stamp offset outline */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-[inherit]"
                            style={{
                                boxShadow: `4px 4px 0 0 #C62828 inset, 4px 4px 0 0 #C62828`,
                                mixBlendMode: "multiply",
                                opacity: 0.18,
                            }}
                        />
                        <div className="relative z-10">
                            <h2 className="font-primary text-2xl text-[#C62828]">
                                Boost it on your socials
                            </h2>
                            <p className="mt-2 text-sm text-[#476060]">
                                Each button opens in a new tab with the message queued up and the
                                tour site linked for your followers.
                            </p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                {shareLinks.map(({ label, href, icon: Icon, accentClass }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${accentClass}`}
                                    >
                                        <Icon size={20} stroke={2} />
                                        <span>{label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Bottom gradient overlay to blend with footer */}
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-[#F6F4D5] to-transparent" />
            </main>
            <Footer />
        </>
    );
}
