"use client";

import LiveClock from "@/components/ui-custom/LiveClock";
import { ReactNode, useMemo } from "react";
import Image from "next/image";
import { useFooter } from "@/contexts/footer-context";
import { socialLinks } from "@/data/socialLinks";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandWhatsapp,
    IconBrandX,
    IconMail,
} from "@tabler/icons-react";
import { ArrowUpRight } from "lucide-react";
import { useContactModalStore } from "@/lib/zustand/stores";

type Item = { label: string; href: string; display: string; icon: ReactNode };

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
        const icons: Record<string, ReactNode> = {
            Email: <IconMail className="h-5 w-5 text-amber-400" />,
            WhatsApp: <IconBrandWhatsapp className="h-5 w-5 text-green-400" />,
            Instagram: <IconBrandInstagram className="h-5 w-5 text-pink-600" />,
            Facebook: <IconBrandFacebook className="h-5 w-5 text-blue-500" />,
            X: <IconBrandX className="h-5 w-5 text-black" />,
        };

        const socials = socialLinks.map((s) => {
            const href = s.url;
            const lower = href.toLowerCase();
            let display = displayUrl(href);
            // Used to show username/handle for these socials
            if (lower.includes("facebook")) display = "@web3ceylon";
            if (lower.includes("whatsapp")) display = "@web3ceylon";
            if (lower.includes("instagram")) display = "instagram.com/web3ceylon";
            if (lower.includes("x")) display = "x.com/web3ceylontour";
            return {
                label: s.title,
                href,
                display,
                icon: icons[s.title as keyof typeof icons],
            } as Item;
        });

        return [
            {
                label: "Email",
                href: `mailto:${email}`,
                display: email,
                icon: icons.Email,
            },
            ...socials,
        ];
    }, []);

    return (
        <section id="footer" className="bg-background relative px-4 pt-14 pb-10">
            {/* Subtle radial gradient background */}
            <div className="pointer-events-none absolute inset-0 mx-auto max-w-5xl opacity-40 [background:radial-gradient(circle_at_center,#dbeafe_0%,transparent_70%)]" />
            <footer
                ref={footerRef}
                className="relative mx-auto flex max-w-3xl flex-col items-center gap-8"
            >
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
                            className="rounded-2xl bg-white/30 backdrop-blur-3xl"
                        >
                            {item.label === "Volunteer" ? (
                                <button
                                    onClick={() => toggleModal()}
                                    className="font-secondary flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left font-normal transition-colors hover:bg-white/40 focus:bg-white/40"
                                    aria-label={`${item.label}: ${item.display}`}
                                >
                                    <span className="flex items-center gap-2 text-[15px] text-[#3b3b3b] sm:text-[16px]">
                                        {item.icon}
                                        {item.label}
                                    </span>
                                    <span className="flex items-center justify-end gap-2 text-sm font-medium text-[#4a4a4a] sm:text-base">
                                        {item.display}
                                        <ArrowUpRight
                                            className="inline-block h-4 w-4"
                                            aria-hidden
                                        />
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
                                    className="font-secondary flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left font-normal transition-colors hover:bg-white/40 focus:bg-white/40"
                                    aria-label={`${item.label}: ${item.display}`}
                                >
                                    <span className="flex items-center gap-2 text-[15px] text-[#3b3b3b] sm:text-[16px]">
                                        {item.icon}
                                        {item.label}
                                    </span>
                                    <span className="text-sm font-medium text-[#4a4a4a] sm:text-base">
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
