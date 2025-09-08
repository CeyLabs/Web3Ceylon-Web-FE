import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    // Single source of truth for nav items
    const navItems = useMemo(
        () => [
            { id: "home", label: "Home" },
            { id: "cities", label: "Cities" },
            { id: "speakers", label: "Speakers" },
        ],
        []
    );

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToSection = (id: string) => {
        if (id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.getElementById(id);
            if (element) {
                window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
            }
        }
    };

    return (
        <>
            {/* Desktop Navigation - Floating centered pill */}
            <nav
                className={`group/navigation-menu fixed top-[19px] left-1/2 z-50 hidden max-w-max -translate-x-1/2 items-center justify-between gap-8 rounded-2xl bg-white/30 px-5 py-2.5 backdrop-blur-3xl transition-all duration-300 lg:flex ${
                    isScrolled ? "bg-white/40 shadow-lg" : ""
                } ${className ?? ""}`}
                data-header="floating"
                aria-label="Main"
            >
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src="/Main-Logo.svg"
                        alt="Web3Ceylon Logo"
                        className="h-10 w-28 min-w-[112px] object-contain"
                        loading="eager"
                        decoding="async"
                    />
                </Link>

                <ul className="flex list-none items-center justify-center gap-1">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-black transition-all outline-none hover:bg-white/20 hover:text-black focus:bg-white/20 focus:text-black focus-visible:ring-[3px] focus-visible:ring-black/20"
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTAs */}
                <div className="flex items-center gap-2">
                    <button
                        className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium tracking-tight whitespace-nowrap text-black transition-all outline-none hover:bg-white/30 focus-visible:ring-[3px] focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => scrollToSection("speakers")}
                    >
                        Learn More
                    </button>
                    <button
                        className="hidden h-9 items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-all outline-none hover:bg-black/90 focus-visible:ring-[3px] focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 lg:flex"
                        onClick={() => scrollToSection("register")}
                    >
                        <span className="flex cursor-pointer items-center text-xs tracking-tight">
                            Register Now
                            <ArrowUpRight className="ml-1 inline-block" size={16} />
                        </span>
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation - Compact pill with dropdown */}
            <div
                className={`fixed top-[19px] left-1/2 z-50 flex w-[90vw] -translate-x-1/2 items-center justify-between rounded-2xl bg-white/30 px-2.5 py-2 backdrop-blur-3xl lg:hidden ${
                    isScrolled ? "bg-white/40 shadow-lg" : ""
                } ${className ?? ""}`}
                data-header="floating"
            >
                <Link href="/">
                    <img
                        src="/Main-Logo.svg"
                        alt="Web3Ceylon Logo"
                        className="h-8 w-24 min-w-[96px] object-contain"
                        loading="eager"
                        decoding="async"
                    />
                </Link>
                <div className="relative" ref={mobileMenuRef}>
                    <button
                        className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-black transition-all outline-none hover:bg-white/20 focus:bg-white/20 focus-visible:ring-[3px] focus-visible:ring-black/20"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                    >
                        Menu
                    </button>
                    {/* Smooth expanding panel */}
                    <div
                        className={`absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl transition-[max-height,opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isMobileMenuOpen
                                ? "max-h-[70vh] translate-y-0 opacity-100"
                                : "max-h-0 translate-y-1 opacity-0"
                        }`}
                        style={{ willChange: "max-height, opacity, transform" }}
                    >
                        <div className="p-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    className="w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-gray-100"
                                    onClick={() => {
                                        scrollToSection(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div className="mt-2 grid grid-cols-1 gap-2 border-t border-gray-100 pt-2">
                                <button
                                    className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium tracking-tight whitespace-nowrap text-black transition-all outline-none hover:bg-gray-50 focus-visible:ring-[3px] focus-visible:ring-black/20"
                                    onClick={() => {
                                        scrollToSection("speakers");
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Learn More
                                </button>
                                <button
                                    className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-all outline-none hover:bg-black/90 focus-visible:ring-[3px] focus-visible:ring-black/20"
                                    onClick={() => {
                                        scrollToSection("register");
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    <span className="flex cursor-pointer items-center tracking-tight">
                                        Register now
                                        <ArrowUpRight className="ml-1 inline-block" size={16} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
