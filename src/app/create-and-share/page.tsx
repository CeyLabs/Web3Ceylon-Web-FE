"use client";

import { useState } from "react";
import Link from "next/link";
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
import { useCompletion } from "ai/react";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const socialCaptions = [
    "Just wrapped up an inspiring day at #Web3Ceylon Galle 2025 🚀 Huge thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for creating an incredible space for creators and storytellers to dive into #Web3 and #Blockchain 🔥 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Thrilled to be part of the #Web3Ceylon Galle event today! 🙌 Big shoutout to @web3ceylontour, @CeylonCash & @BybitSriLanka for empowering creators and storytellers to explore #Web3 opportunities! #CeylonCash #Blockchain #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Had a fantastic time at #Web3Ceylon Galle 2025! 🎉 Thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for bringing together #creators & #storytellers to explore the power of #Web3 and #Blockchain! 💡🚀 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Exploring the future of #Web3 at #Web3Ceylon Galle 2025! Grateful for @web3ceylontour, @CeylonCash & @BybitSriLanka for bringing together creators, storytellers, and blockchain innovators to shape the future of Sri Lanka 🇱🇰✨ #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Just participated in the #Web3Ceylon Galle event! 💻 The power of blockchain and #Web3 for creators and storytellers is incredible! 🚀 Thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for the amazing experience! #Blockchain #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "What an exciting day at #Web3Ceylon Galle 2025! 🤩 Huge thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for an event that bridges creators, storytellers, and #Web3. The future is bright! 💡🚀 #Blockchain #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "An unforgettable experience at #Web3Ceylon Galle 2025 🎉 Thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for hosting an event where creators and storytellers explore the future of #Web3 and #Blockchain! 🌍✨ #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "So grateful to have attended #Web3Ceylon Galle 2025 today! 🙌 A big thank you to @web3ceylontour, @CeylonCash & @BybitSriLanka for helping creators & storytellers discover new #Web3 and #Blockchain opportunities 🌟 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Exploring the potential of #Web3 and #Blockchain with creators and storytellers at #Web3Ceylon Galle 2025! 🚀 Big thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for bringing us all together for a transformative experience! 💡 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Had an incredible time at #Web3Ceylon Galle 2025 today! 🚀 Thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for creating such an inspiring event for creators & storytellers to dive into the world of #Web3 and #Blockchain! 🔥 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Learning and growing with fellow creators and storytellers at #Web3Ceylon Galle 2025 🌱 A huge thank you to @web3ceylontour, @CeylonCash & @BybitSriLanka for an event packed with #Web3 and #Blockchain knowledge! 🚀 #CeylonCash #BlockchainInnovation #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "What a day at #Web3Ceylon Galle 2025! 🏆 Thank you to @web3ceylontour, @CeylonCash & @BybitSriLanka for bringing creators and storytellers together to explore the exciting world of #Web3 and #Blockchain! 🔥💡 #FutureOfTech #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Had the chance to network and learn with creators & storytellers at #Web3Ceylon Galle 2025! 🌍 Big thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for hosting such an impactful event about #Web3 and #Blockchain! 🚀 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "What an amazing experience at #Web3Ceylon Galle 2025! 🙏 Thank you to @web3ceylontour, @CeylonCash & @BybitSriLanka for creating an event where creators & storytellers explore the limitless possibilities of #Web3 and #Blockchain! 🌟 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Just finished a fantastic day at #Web3Ceylon Galle 2025! 🎉 Grateful to @web3ceylontour, @CeylonCash & @BybitSriLanka for organizing such an amazing space for creators and storytellers to learn, grow, and explore #Web3! 🌐🚀 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
    "Exploring new creative opportunities with #Web3Ceylon Galle 2025! Thanks to @web3ceylontour, @CeylonCash & @BybitSriLanka for giving creators and storytellers the tools to thrive in the #Blockchain era! 🚀🌟 #Web3 #CeylonCash #BybitSriLanka #Galle #CreatorsAndStorytellers",
];

const supportQuestions = [
    {
        id: "bybit-card",
        label: "How to use Bybit Card",
        prompt: "Explain how a new Bybit Sri Lanka customer can start using their Bybit Card for everyday purchases. Include activation steps, funding tips, fees to watch for, and any local compliance reminders.",
    },
    {
        id: "p2p",
        label: "How to buy P2P on Bybit?",
        prompt: "Walk through the process of buying crypto via Bybit's P2P marketplace for a user in Sri Lanka. Cover how to pick a seller, payment safety, release of funds, and dispute options.",
    },
    {
        id: "trading",
        label: "How to trade in Bybit?",
        prompt: "Outline how to place a spot and derivatives trade on Bybit as a beginner. Highlight account security, order types, and risk management best practices.",
    },
    {
        id: "set-lkr",
        label: "How to set LKR in Bybit?",
        prompt: "Describe how to set Sri Lankan Rupees (LKR) as the reference or display currency in Bybit, including any limitations for deposits or conversions.",
    },
    {
        id: "netflix",
        label: "How to get a free Netflix subscription using Bybit?",
        prompt: "Explain how Bybit promotions or reward programs might offer perks like Netflix subscriptions. Clarify typical eligibility, how to redeem rewards, and any cautions about unofficial offers.",
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
    const [captionIndex, setCaptionIndex] = useState(0);
    const [isTextRed, setIsTextRed] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [customMessage, setCustomMessage] = useState<string | null>(null);

    const {
        completion,
        complete,
        isLoading: isAssistantGenerating,
        error: assistantError,
        setCompletion,
    } = useCompletion({
        api: "/api/web3ceylon-ai-assistant",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Common hashtags and mentions to append
    const tagsAndMentions =
        "@web3ceylontour, @CeylonCash & @BybitSriLanka #Web3Ceylon #CeylonCash #BybitSriLanka";

    // Use custom message if available, otherwise use the static caption
    const baseMessage = customMessage || socialCaptions[captionIndex];
    const shareMessage = baseMessage;
    const encodedMessage = encodeURIComponent(shareMessage);
    const showAssistantError = Boolean(assistantError) && !isAssistantGenerating;
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
        setCustomMessage(null);
        setSelectedQuestion(null);
        setCompletion("");
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

    const handleAssistantQuestion = async (question: (typeof supportQuestions)[number]) => {
        setSelectedQuestion(question.label);
        setCompletion("");
        setCustomMessage(""); // Clear message immediately to show generating state

        await complete(question.prompt, {
            body: {
                question: question.label,
                prompt: question.prompt,
            },
        });
    };

    // Update custom message when completion changes
    if (completion && selectedQuestion) {
        const messageWithTags = `${completion.trim()}\n\n${tagsAndMentions}`;
        if (customMessage !== messageWithTags) {
            setCustomMessage(messageWithTags);
        }
    }

    return (
        <>
            <main
                style={{
                    backgroundImage: "url(/assets/Pattern_Watermark.png)",
                    backgroundRepeat: "repeat",
                    color: "#F57C00",
                }}
                className="relative overflow-hidden pt-10 pb-16"
            >
                <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10 lg:px-16">
                    <header className="pt-6 text-center">
                        <img
                            src="/assets/maps/Galle_Map_Dark.svg"
                            className="mx-auto h-56 w-auto"
                        />
                        <h1 className="font-primary mt-4 text-3xl leading-tight text-[#F57C00] sm:text-4xl">
                            Create! Share! Inspire!
                        </h1>
                        <p className="font-secondary mx-auto mt-4 max-w-2xl text-base text-[#345252] sm:text-lg">
                            Share your creative journey at Web3Ceylon Galle! Customize the message
                            or post it straight to your socials with one click.
                        </p>
                    </header>

                    <section
                        className="relative rounded-3xl border-[3px] bg-white/70 p-6 shadow-xl backdrop-blur-sm sm:p-8"
                        style={{ borderColor: "#F57C00" }}
                    >
                        {/* Stamp offset outline */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-[inherit]"
                            style={{
                                boxShadow: `4px 4px 0 0 #F57C00 inset, 4px 4px 0 0 #F57C00`,
                                mixBlendMode: "multiply",
                                opacity: 0.18,
                            }}
                        />
                        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="font-secondary text-sm text-[#F57C00] uppercase">
                                    Your Creator's Story
                                </p>
                                <p className="mt-1 text-sm text-[#476060]">
                                    Refresh if you want a clean slate before crafting your
                                    narrative.
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleShuffle}
                                    className="hidden items-center gap-2 rounded-full border border-[#F57C00] px-3 py-2 text-sm font-semibold text-[#F57C00] shadow-sm transition hover:bg-[#F57C00] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57C00] sm:inline-flex"
                                >
                                    <IconArrowsShuffle size={18} stroke={2} />
                                    <span className="hidden sm:inline">Shuffle</span>
                                    <span className="sm:hidden">Shuffle</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="hidden items-center gap-2 rounded-full bg-[#F57C00] px-4 py-2 text-sm font-semibold text-white shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#295746] sm:inline-flex"
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
                            <article className="relative rounded-2xl border border-[#f2d6ac]/60 bg-[#FFF2E4] p-6 pb-16 shadow-inner sm:p-8 sm:pb-20">
                                {isAssistantGenerating && !completion ? (
                                    <div className="flex items-center gap-2 text-[#F57C00]">
                                        <span className="inline-block h-4 w-0.5 animate-pulse bg-[#F57C00]" />
                                        <p className="font-secondary text-sm">
                                            Generating your personalized message…
                                        </p>
                                    </div>
                                ) : showAssistantError ? (
                                    <div className="space-y-3">
                                        <p className="font-secondary text-sm text-red-600">
                                            We couldn&apos;t generate the message. Please try again
                                            or use the shuffle button for a preset message.
                                        </p>
                                        <p className="font-primary text-base leading-relaxed whitespace-pre-line text-[#F57C00] sm:text-lg">
                                            {socialCaptions[captionIndex]}
                                        </p>
                                    </div>
                                ) : (
                                    <p
                                        className={`font-primary text-base leading-relaxed whitespace-pre-line sm:text-lg ${isTextRed ? "text-[#F57C00]" : "text-black"}`}
                                    >
                                        {shareMessage}
                                        {isAssistantGenerating && completion && (
                                            <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-[#F57C00]" />
                                        )}
                                    </p>
                                )}
                            </article>
                        </div>
                        <div className="mt-6 rounded-2xl border border-[#f2d6ac]/60 bg-white/80 p-4 shadow-inner sm:p-6">
                            <p className="font-secondary text-sm text-[#476060]">
                                Want to share Bybit knowledge? Pick a question below and our AI will
                                generate a personalized message above with all the hashtags ready to
                                post!
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {supportQuestions.map((question) => {
                                    const isActive = selectedQuestion === question.label;
                                    return (
                                        <button
                                            key={question.id}
                                            type="button"
                                            onClick={() => handleAssistantQuestion(question)}
                                            aria-pressed={isActive}
                                            disabled={isAssistantGenerating}
                                            className={`rounded-full border border-[#F57C00]/50 px-3 py-1.5 text-xs font-semibold text-[#F57C00] transition hover:bg-[#F57C00] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57C00] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm ${isActive ? "bg-[#F57C00] text-white shadow-md" : ""}`}
                                        >
                                            {question.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
                            <button
                                type="button"
                                onClick={handleShuffle}
                                className="inline-flex items-center gap-2 rounded-full border border-[#F57C00] px-4 py-2 text-sm font-semibold text-[#F57C00] shadow-sm transition hover:bg-[#F57C00] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F57C00]"
                            >
                                <IconArrowsShuffle size={18} stroke={2} />
                                Shuffle
                            </button>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 rounded-full bg-[#F57C00] px-4 py-2 text-sm font-semibold text-white shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#295746]"
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
                            Tip: add a photo or a creative takeaway from your Galle journey to make
                            the post feel even more authentic and engaging.
                        </p>
                    </section>

                    <section
                        className="relative rounded-3xl border-[3px] bg-white/60 p-6 shadow-lg backdrop-blur-sm sm:p-8"
                        style={{ borderColor: "#F57C00" }}
                    >
                        {/* Stamp offset outline */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-[inherit]"
                            style={{
                                boxShadow: `4px 4px 0 0 #F57C00 inset, 4px 4px 0 0 #F57C00`,
                                mixBlendMode: "multiply",
                                opacity: 0.18,
                            }}
                        />
                        <div className="relative z-10">
                            <h2 className="font-primary text-2xl text-[#F57C00]">
                                Share your story
                            </h2>
                            <p className="mt-2 text-sm text-[#476060]">
                                Each button opens in a new tab with your creative message queued up
                                and ready to inspire others.
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
