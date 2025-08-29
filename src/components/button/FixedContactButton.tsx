"use client";

import { motion, useInView } from "framer-motion";
import { IconMail, IconSend2 } from "@tabler/icons-react";
import { useContactModalStore } from "@/lib/zustand/stores";
import useWindowSize from "@/hooks/useWindowSize";
import { useRef, useState, useEffect } from "react";
import { useFooter } from "@/contexts/footer-context";
import type { ContactFormRef } from "@/components/form/ContactForm";

interface FixedContactButtonProps {
    formRef: React.RefObject<ContactFormRef>;
}

export default function FixedContactButton({ formRef }: FixedContactButtonProps) {
    const isModalOpen = useContactModalStore((state) => state.isModalOpen);
    const toggleModal = useContactModalStore((state) => state.toggleModal);

    const { width } = useWindowSize();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { footerRef } = useFooter();
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const isFooterInView = useInView(footerRef as React.RefObject<Element>, {
        amount: 0.2,
    });

    useEffect(() => {
        const t = setTimeout(() => setIsInitialLoad(false), 3000);
        return () => clearTimeout(t);
    }, []);

    const handleClick = () => {
        if (isModalOpen && formRef.current) {
            formRef.current.submit();
        } else {
            toggleModal();
        }
    };

    // Avoid hydration mismatch by keeping icon size stable on SSR/initial render
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const iconSize = mounted && width < 728 ? 20 : 30;

    return (
        <motion.button
            initial={{ y: 200, scale: 0.8 }}
            animate={isFooterInView && !isModalOpen ? { y: 200, scale: 0.8 } : { y: 0, scale: 1 }}
            transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: isInitialLoad ? 3 : 0,
            }}
            onClick={handleClick}
            ref={buttonRef}
            transformTemplate={(_, generated) => `translateX(-50%) ${generated}`}
            className={`${
                isModalOpen ? "bg-[#7B3F00]" : "bg-[rgba(238,228,215,0.5)] backdrop-blur-md"
            } group fixed bottom-8 left-1/2 z-[10001] flex cursor-pointer items-center gap-2 rounded-full py-1 pr-4 pl-1 shadow-2xl transition-colors delay-100 duration-700 ease-in-out origin-center xl:gap-3 xl:pr-6 xl:pl-1.5`}
        >
            <div className="relative h-12 w-12 rounded-full xl:h-16 xl:w-16">
                <div
                    className={`${
                        isModalOpen ? "opacity-0" : ""
                    } relative h-full w-full overflow-hidden rounded-full transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:scale-70 group-hover:opacity-0`}
                >
                    <img
                        src={"/assets/hero-cover.webp"}
                        alt="logo"
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <span
                    className={`${
                        isModalOpen ? "opacity-0" : ""
                    } absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full bg-[#EEE4D7] transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:scale-100 xl:h-16 xl:w-16`}
                >
                    <IconMail
                        className="text-[#7B3F00]"
                        stroke={2.5}
                        size={iconSize}
                    />
                </span>

                <span
                    className={`${
                        isModalOpen ? "scale-100 opacity-100" : "scale-70 opacity-0"
                    } absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-end overflow-hidden rounded-full bg-[#EEE4D7] transition-all delay-200 duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] xl:h-16 xl:w-16`}
                >
                    <div className="flex transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:translate-x-1/2">
                        <div className="flex w-12 items-center justify-center xl:w-16">
                            <IconSend2
                                className="text-2xl text-[#7B3F00] xl:text-5xl"
                                stroke={2.5}
                                size={iconSize}
                            />
                        </div>
                        <div className="flex w-12 items-center justify-center xl:w-16">
                            <IconSend2
                                className="text-2xl text-[#7B3F00] xl:text-5xl"
                                stroke={2.5}
                                size={iconSize}
                            />
                        </div>
                    </div>
                </span>
            </div>

            <div
                className={`${
                    isModalOpen ? "text-[#EEE4D7]" : "text-[#7B3F00]"
                } h-7 overflow-hidden lg:h-9`}
            >
                <div className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:-translate-y-1/2">
                    <span className="text-xl font-semibold lg:text-3xl">
                        {isModalOpen ? "Submit" : "Contact"}
                    </span>
                    <span className="text-xl font-semibold lg:text-3xl">
                        {isModalOpen ? "Submit" : "Contact"}
                    </span>
                </div>
            </div>
        </motion.button>
    );
}
