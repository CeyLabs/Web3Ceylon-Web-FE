"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Cities from "@/components/Cities";
import { SpeakersSection } from "@/components/sections/speakers";
import Partners from "@/components/Partners";
import FooterCTA from "@/components/Community";
import About from "@/components/About";
import AnimatedFAQ from "@/components/sections/AnimatedFAQ";
import ContactModal from "@/components/modal/ContactModal";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const Home = () => {
    useEffect(() => {
        // Smooth scroll behavior for anchor links
        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            const anchor = e.currentTarget as HTMLAnchorElement;
            const targetId = anchor.getAttribute("href")?.substring(1);
            if (!targetId) return;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: "smooth",
                });
            }
        };
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", handleClick as EventListener);
        });
        return () => {
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.removeEventListener("click", handleClick as EventListener);
            });
        };
    }, []);

    return (
        <>
            <ContactModal />
            <main className="relative">
                <Header />
                {/* Hero + Intro share a continuous background image (desktop only) */}
                <div className="relative">
                    {/* Cross-section background image that bleeds into Intro on md+ */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden overflow-visible md:block"
                    >
                        <div className="relative h-[113vh] w-full">
                            <img
                                src="/assets/hero-cover.svg"
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover object-left md:object-center"
                                draggable={false}
                            />
                            {/* Edge fades to blend with sand beige */}
                            <div className="absolute top-0 right-0 left-0 h-1/2 bg-gradient-to-b from-[#F6F4D5] to-transparent md:h-1/3 md:from-[#F6F4D5]/60" />
                            <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t from-[#F6F4D5] to-transparent md:h-1/3 md:from-[#F6F4D5]/60" />
                            <div className="absolute top-0 bottom-0 left-0 w-3/5 bg-gradient-to-r from-[#F6F4D5] to-transparent md:w-1/6 md:rounded-none md:from-[#F6F4D5]/40 md:to-[#F6F4D5]/10" />
                            <div className="absolute top-0 right-0 bottom-0 w-3/5 bg-gradient-to-l from-[#F6F4D5] to-transparent md:w-1/6 md:rounded-none md:from-[#F6F4D5]/40 md:to-[#F6F4D5]/10" />
                        </div>
                    </div>

                    {/* Content stacked above the shared background */}
                    {/* On mobile, keep Hero's default background; hide it on md+ */}
                    <Hero bgVisibilityClass="md:hidden" />
                    <Intro className="bg-transparent" />
                </div>
                <Cities />
                <SpeakersSection />
                <Partners />
                <About />
                <AnimatedFAQ />
                <FooterCTA />
                <Footer />
            </main>
        </>
    );
};

export default Home;
