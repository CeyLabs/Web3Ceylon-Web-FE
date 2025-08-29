"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Cities from "@/components/Cities";
import Speakers from "@/components/Speakers";
import Partners from "@/components/Partners";
import Registration from "@/components/Community";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ContactModal from "@/components/modal/ContactModal";

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
                <Hero />
                <Intro />
                <Cities />
                <Speakers />
                <Partners />
                <About />
                <Registration />
                <Footer />
            </main>
        </>
    );
};

export default Home;
