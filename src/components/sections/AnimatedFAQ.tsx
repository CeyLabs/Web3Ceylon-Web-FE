"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import LazyImage from "@/components/reusable/LazyImage";

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        id: "1",
        question: "What is Web3Ceylon?",
        answer: "A Sri Lanka-wide Web3 tour powered by Ceylon Cash × Bybit—bringing developers, creators & entrepreneurs together across four cities.",
    },
    {
        id: "2",
        question: "Which cities are in the tour?",
        answer: "•\tColombo: Web3 Dev Fest (smart contracts, DeFi, tech talks)\n•\tKandy: Crypto 101 (wallets, Bitcoin, stablecoins, trading)\n•\tGalle: Creator hub (NFTs, DAO, digital art)\n•\tElla: Retreat (fireside chats, bonding, scenic workshops)",
    },
    {
        id: "3",
        question: "Who can join?",
        answer: "Anyone into Web3—developers, artists, startups, students. All levels welcome!",
    },
    {
        id: "4",
        question: "What will I learn?",
        answer: "🔧 Hands-on workshops | 🤝 Network opportunities | 🎨 Creative tools | ⛰️ Highland inspiration",
    },
    {
        id: "5",
        question: "Why is this important for Sri Lanka?",
        answer: "Because Sri Lanka is mobile-first and digitally curious—Web3Ceylon brings global blockchain trends right into local innovation.",
    },
    {
        id: "6",
        question: "How do I join?",
        answer: "Go to the Web3Ceylon site and click “Join [City] Session” for the city you like. It’s that easy!",
    },
    {
        id: "7",
        question: "How can I volunteer or contribute?",
        answer: "Want to help out or share your skills? Whether it’s guiding attendees, hosting a session, helping with logistics, or speaking—reach out through the “Volunteer or Contribute” section on the Web3Ceylon site and get involved!",
    },
];

export default function AnimatedFAQ() {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setOpenId((prevId) => (prevId === id ? null : id));
    };

    return (
        <>
            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                @keyframes gentleBounce {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-6px);
                    }
                }
                .animate-gentle-bounce {
                    animation: gentleBounce 2.5s ease-in-out infinite;
                }
            `}</style>
            <div className="mx-auto max-w-3xl px-4 py-16">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <LazyImage
                            src="/faq.webp"
                            alt="FAQ Mascot"
                            width={350}
                            height={100}
                            className="animate-gentle-bounce"
                        />
                    </div>
                    <h1 className="font-primary text-4xl font-bold text-gray-900 md:text-5xl">
                        FAQ
                    </h1>
                </div>

                {/* Conversation List */}
                <div className="space-y-4">
                    {faqData.map((item) => {
                        const isOpen = openId === item.id;

                        if (isOpen) {
                            return (
                                <div key={item.id} className="space-y-4">
                                    {/* User Question (Right-aligned) */}
                                    <div className="flex justify-end">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => toggleItem(item.id)}
                                                className="max-w-md rounded-2xl bg-[#F8FAFC] px-5 py-4 text-left text-base font-semibold text-slate-800 transition-all duration-200 hover:bg-slate-200/70 md:text-lg"
                                            >
                                                {item.question}
                                            </button>
                                            <button
                                                onClick={() => toggleItem(item.id)}
                                                className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border-[1.5px] border-[#7A55FF] bg-[#7A55FF] text-white transition-all duration-300"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bot Answer (Left-aligned) */}
                                    <div className="animate-fadeIn flex justify-start">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 h-9 w-9 flex-shrink-0 rounded-full bg-green-500 shadow-sm" />
                                            <div className="max-w-lg rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                                                <p className="text-base leading-relaxed whitespace-pre-line text-slate-700">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Render all other items as closed pills
                        return (
                            <div key={item.id} className="flex justify-center">
                                <div className="flex w-full max-w-2xl items-center gap-3">
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className="w-full rounded-2xl bg-[#F8FAFC] px-5 py-4 text-left text-base font-semibold text-slate-800 transition-all duration-200 hover:bg-slate-200/70 md:text-lg"
                                    >
                                        {item.question}
                                    </button>
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border-[1.5px] border-slate-400 bg-white text-slate-500 transition-all duration-300"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
