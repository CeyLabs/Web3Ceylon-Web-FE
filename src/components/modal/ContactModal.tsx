"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useContactModalStore } from "@/lib/zustand/stores";
import ContactForm, { ContactFormRef } from "@/components/form/ContactForm";
import { IconX } from "@tabler/icons-react";
import FixedContactButton from "@/components/button/FixedContactButton";

export default function ContactModal() {
    const modalRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<ContactFormRef>(null);
    const isModalOpen = useContactModalStore((state) => state.isModalOpen);
    const toggleModal = useContactModalStore((state) => state.toggleModal);
    // use a built-in ease to avoid typing issues
    const ease = "easeInOut" as const;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isModalOpen ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className={`fixed inset-0 top-0 left-0 z-[9999] h-[100dvh] w-screen bg-stone-900/60 ${
                    isModalOpen ? "" : "pointer-events-none"
                }`}
            ></motion.div>

            <motion.div
                initial={{ y: "110%" }}
                animate={isModalOpen ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 1, ease }}
                ref={modalRef as React.RefObject<HTMLDivElement>}
                className="fixed top-4 right-4 bottom-4 left-4 z-[10000] overflow-y-auto rounded-2xl bg-stone-100 px-6 py-10 pb-24 will-change-transform lg:rounded-3xl lg:p-12"
            >
                <button
                    onClick={toggleModal}
                    className="fixed top-10 right-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#7B3F00] shadow-md transition-all duration-150 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] hover:scale-110 lg:top-8 lg:right-8 lg:h-12 lg:w-12 2xl:top-12 2xl:right-12 2xl:h-16 2xl:w-16"
                >
                    <IconX
                        className="h-5 w-5 text-[#EEE4D7] lg:h-6 lg:w-6 2xl:h-8 2xl:w-8"
                        stroke={3}
                    />
                </button>

                <div className="h-full overflow-y-auto pb-20">
                    <ContactForm ref={formRef} />
                </div>
            </motion.div>
            <FixedContactButton formRef={formRef as React.RefObject<ContactFormRef>} />
        </>
    );
}
