"use client";
import { useContactModalStore } from "@/lib/zustand/stores";

export default function FooterCTAMobile() {
    const toggleModal = useContactModalStore((state) => state.toggleModal);

    return (
        <div className="absolute top-[65%] left-1/2 flex w-full -translate-x-1/2 -translate-y-[65%] flex-col items-center gap-2 lg:hidden">
            <a
                href="mailto:hello@web3ceylon.org"
                className="flex w-full max-w-[600px] cursor-pointer flex-col items-start rounded-lg bg-[#EEE4D7] px-4 pt-6 pb-4"
            >
                <p className="tracking-tight text-[#7B3F00]">Email us</p>

                <p className="text-xl leading-tight font-semibold text-[#7B3F00]">
                    hello@web3ceylon.com
                </p>
            </a>

            <button
                onClick={toggleModal}
                className="w-full max-w-[600px] cursor-pointer rounded-full bg-[#EEE4D7] p-4"
            >
                <p className="text-2xl font-semibold tracking-tight text-[#7B3F00]">Get in touch</p>
            </button>
        </div>
    );
}
