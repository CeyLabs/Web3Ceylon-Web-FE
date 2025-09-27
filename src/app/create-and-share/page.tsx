"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
    IconArrowsShuffle,
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandX,
    IconCheck,
    IconCopy,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const socialCaptions = [
    "Just wrapped up an inspiring day at #Web3Ceylon Kandy 2025 🚀 Huge thanks to @web3ceylontour & @CeylonCash for creating an incredible space for businesses and freelancers to dive into #Web3 and #Blockchain 🔥 #CeylonCash #BybitSriLanka",
    "Thrilled to be part of the #Web3Ceylon Kandy event today! 🙌 Big shoutout to @web3ceylontour & @CeylonCash for empowering businesses and freelancers to explore #Web3 opportunities! #CeylonCash #Blockchain #BybitSriLanka",
    "Had a fantastic time at #Web3Ceylon Kandy 2025! 🎉 Thanks to @web3ceylontour & @CeylonCash for bringing together #businesses & #freelancers to explore the power of #Web3 and #Blockchain! 💡🚀 #CeylonCash #BybitSriLanka",
    "Exploring the future of #Web3 at #Web3Ceylon Kandy 2025! Grateful for @web3ceylontour & @CeylonCash for bringing together businesses, freelancers, and blockchain innovators to shape the future of Sri Lanka 🇱🇰✨ #CeylonCash #BybitSriLanka",
    "Just participated in the #Web3Ceylon Kandy event! 💻 The power of blockchain and #Web3 for businesses and freelancers is incredible! 🚀 Thanks to @web3ceylontour & @CeylonCash for the amazing experience! #Blockchain #CeylonCash #BybitSriLanka",
    "What an exciting day at #Web3Ceylon Kandy 2025! 🤩 Huge thanks to @web3ceylontour & @CeylonCash for an event that bridges businesses, freelancers, and #Web3. The future is bright! 💡🚀 #Blockchain #CeylonCash #BybitSriLanka",
    "An unforgettable experience at #Web3Ceylon Kandy 2025 🎉 Thanks to @web3ceylontour & @CeylonCash for hosting an event where businesses and freelancers explore the future of #Web3 and #Blockchain! 🌍✨ #CeylonCash #BybitSriLanka",
    "So grateful to have attended #Web3Ceylon Kandy 2025 today! 🙌 A big thank you to @web3ceylontour & @CeylonCash for helping businesses & freelancers discover new #Web3 and #Blockchain opportunities 🌟 #CeylonCash #BybitSriLanka",
    "Exploring the potential of #Web3 and #Blockchain with businesses and freelancers at #Web3Ceylon Kandy 2025! 🚀 Big thanks to @web3ceylontour & @CeylonCash for bringing us all together for a transformative experience! 💡 #CeylonCash #BybitSriLanka",
    "Had an incredible time at #Web3Ceylon Kandy 2025 today! 🚀 Thanks to @web3ceylontour & @CeylonCash for creating such an inspiring event for businesses & freelancers to dive into the world of #Web3 and #Blockchain! 🔥 #CeylonCash #BybitSriLanka",
    "Learning and growing with fellow businesses and freelancers at #Web3Ceylon Kandy 2025 🌱 A huge thank you to @web3ceylontour & @CeylonCash for an event packed with #Web3 and #Blockchain knowledge! 🚀 #CeylonCash #BlockchainInnovation #BybitSriLanka",
    "What a day at #Web3Ceylon Kandy 2025! 🏆 Thank you to @web3ceylontour & @CeylonCash for bringing entrepreneurs and freelancers together to explore the exciting world of #Web3 and #Blockchain! 🔥💡 #FutureOfTech #CeylonCash #BybitSriLanka",
    "Had the chance to network and learn with businesses & freelancers at #Web3Ceylon Kandy 2025! 🌍 Big thanks to @web3ceylontour & @CeylonCash for hosting such an impactful event about #Web3 and #Blockchain! 🚀 #CeylonCash #BybitSriLanka",
    "What an amazing experience at #Web3Ceylon Kandy 2025! 🙏 Thank you to @web3ceylontour & @CeylonCash for creating an event where businesses & freelancers explore the limitless possibilities of #Web3 and #Blockchain! 🌟 #CeylonCash #BybitSriLanka",
    "Just finished a fantastic day at #Web3Ceylon Kandy 2025! 🎉 Grateful to @web3ceylontour & @CeylonCash for organizing such an amazing space for businesses and freelancers to learn, grow, and explore #Web3! 🌐🚀 #CeylonCash #BybitSriLanka",
    "Exploring new business opportunities with #Web3Ceylon Kandy 2025! Thanks to @web3ceylontour & @CeylonCash for giving freelancers and businesses the tools to thrive in the #Blockchain era! 🚀🌟 #Web3 #CeylonCash #BybitSriLanka",
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
    const [captionIndex, setCaptionIndex] = useState(0);
    const [isTextRed, setIsTextRed] = useState(true);

    const shareMessage = socialCaptions[captionIndex];
    const encodedMessage = encodeURIComponent(shareMessage);
    const shareLinks = [
        {
            label: "Share on X",
            href: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
            icon: IconBrandX,
            accentClass: "bg-black text-white hover:bg-gray-800",
        },
        {
            label: "Post to Facebook",
            href: `https://www.facebook.com/sharer/sharer.php?quote=${encodedMessage}`,
            icon: IconBrandFacebook,
            accentClass: "bg-[#1877F2] text-white hover:bg-[#166fe5]",
        },
        {
            label: "Share on LinkedIn",
            href: `https://www.linkedin.com/feed/?shareActive=true&text=${encodedMessage}`,
            icon: IconBrandLinkedin,
            accentClass: "bg-[#0077B5] text-white hover:bg-[#005885]",
        },
    ];

    const handleShuffle = () => {
        if (socialCaptions.length <= 1) return;

        setCaptionIndex((current) => {
            let next = Math.floor(Math.random() * socialCaptions.length);
            if (next === current) {
                next = (next + 1) % socialCaptions.length;
            }
            return next;
        });
        setIsTextRed((prev) => !prev);
        setCopyState("idle");
    };

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
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleShuffle}
                                    className="hidden items-center gap-2 rounded-full border border-[#C62828] px-3 py-2 text-sm font-semibold text-[#C62828] shadow-sm transition hover:bg-[#C62828] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62828] sm:inline-flex"
                                >
                                    <IconArrowsShuffle size={18} stroke={2} />
                                    <span className="hidden sm:inline">Shuffle</span>
                                    <span className="sm:hidden">Shuffle</span>
                                </button>
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
                                    {copyState === "idle" && <span>Copy</span>}
                                </button>
                            </div>
                        </div>
                        <div className="relative mt-6">
                            <article className="relative rounded-2xl border border-[#f2d6ac]/60 bg-[#FFE5E5]/90 p-6 pb-16 shadow-inner sm:p-8 sm:pb-20">
                                <p
                                    className={`font-primary text-base leading-relaxed whitespace-pre-line sm:text-lg ${isTextRed ? "text-[#C62828]" : "text-black"}`}
                                >
                                    {shareMessage}
                                </p>
                            </article>
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
                            <button
                                type="button"
                                onClick={handleShuffle}
                                className="inline-flex items-center gap-2 rounded-full border border-[#C62828] px-4 py-2 text-sm font-semibold text-[#C62828] shadow-sm transition hover:bg-[#C62828] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62828]"
                            >
                                <IconArrowsShuffle size={18} stroke={2} />
                                Shuffle
                            </button>
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
                                Each button opens in a new tab with the message queued up and ready
                                to share.
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
