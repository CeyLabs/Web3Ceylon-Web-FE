"use client";

import LiveClock from "@/components/ui-custom/LiveClock";
import { useMemo } from "react";
import Image from "next/image";
import { useFooter } from "@/contexts/footer-context";
import { socialLinks } from "@/data/socialLinks";
import { SITE_URL } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import { useContactModalStore } from "@/lib/zustand/stores";

type Item = { label: string; href: string; display: string };

function displayUrl(url: string) {
    try {
        const u = new URL(url);
        const path = u.pathname.replace(/\/$/, "");
        const shown = path && path !== "/" ? `${u.host}${path}` : u.host;
        return shown.length > 40 ? `${shown.slice(0, 37)}…` : shown;
    } catch {
        return url.replace(/^https?:\/\//, "");
    }
}

export default function Footer() {
    const { footerRef } = useFooter();

    const toggleModal = useContactModalStore((s) => s.toggleModal);

    const items: Item[] = useMemo(() => {
        const email = "hello@web3ceylon.com";
        const website = SITE_URL;
        const socials = socialLinks.map((s) => {
            const href = s.url;
            const lower = href.toLowerCase();
            let display = displayUrl(href);
            // Only show username handle for Facebook and WhatsApp
            if (lower.includes("facebook")) display = "@web3ceylon";
            if (lower.includes("whatsapp")) display = "@web3ceylon";
            return { label: s.title, href, display } as Item;
        });

        return [
            { label: "Email", href: `mailto:${email}`, display: email },
            ...socials,
            // Replace Website with Volunteer action which will open ContactModal
            { label: "Volunteer", href: "#volunteer", display: "Volunteer with Web3Ceylon 2025" },
        ];
    }, []);

    return (
        <section id="footer" className="bg-[#f8f6f3] px-4 pt-14 pb-10">
            <footer ref={footerRef} className="mx-auto flex max-w-3xl flex-col items-center gap-8">
                <div className="flex w-full items-center justify-between">
                    <p className="font-secondary text-[clamp(14px,1.2vw,18px)] font-medium text-[#7B3F00]">
                        Colombo, LK
                    </p>
                    <LiveClock />
                </div>

                <div className="text-center">
                    <h2 className="font-carena text-[clamp(28px,4vw,54px)] leading-tight font-semibold tracking-tight text-[#0a1a5c]">
                        Join Web3Ceylon Ecosystem
                    </h2>
                    <p className="font-secondary mt-3 text-[clamp(14px,1.5vw,18px)] font-medium text-[#667085]">
                        Connect with us!
                    </p>
                </div>

                <ul className="w-full space-y-3">
                    {items.map((item) => (
                        <li
                            key={`${item.label}-${item.display}`}
                            className="rounded-2xl bg-[#ebe9e4] ring-1 ring-black/5"
                        >
                            {item.label === "Volunteer" ? (
                                <button
                                    onClick={() => toggleModal()}
                                    className="font-secondary flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left font-normal transition-colors hover:bg-[#e5e2dc] focus:bg-[#e5e2dc]"
                                    aria-label={`${item.label}: ${item.display}`}
                                >
                                    <span className="text-[15px] text-[#3b3b3b] sm:text-[16px]">
                                        {item.label}
                                    </span>
                                    <span className="text-[15px] font-medium text-[#4a4a4a] sm:text-[16px] flex items-center justify-end gap-2">
                                        {item.display}
                                        <ArrowUpRight className="inline-block h-4 w-4" aria-hidden />
                                    </span>
                                </button>
                            ) : (
                                <a
                                    href={item.href}
                                    target={item.href.startsWith("http") ? "_blank" : undefined}
                                    rel={
                                        item.href.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="font-secondary flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left font-normal transition-colors hover:bg-[#e5e2dc] focus:bg-[#e5e2dc]"
                                    aria-label={`${item.label}: ${item.display}`}
                                >
                                    <span className="text-[15px] text-[#3b3b3b] sm:text-[16px]">
                                        {item.label}
                                    </span>
                                    <span className="text-[15px] font-medium text-[#4a4a4a] sm:text-[16px]">
                                        {item.display}
                                    </span>
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="mt-6 flex w-full items-center justify-center">
                    <Image
                        src="/Main-Logo.svg"
                        width={120}
                        height={48}
                        alt="Web3Ceylon logo"
                        className="h-8 w-auto select-none sm:h-10"
                    />
                </div>
                <p className="text-center text-sm text-[#7B3F00]">© {new Date().getFullYear()}</p>
            </footer>
        </section>
    );
}
