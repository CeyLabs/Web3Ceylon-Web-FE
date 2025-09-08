"use client";

import dynamic from "next/dynamic";
import LiveClock from "@/components/ui-custom/LiveClock";
import DesktopSocials from "@/components/layout/DesktopSocials";
import { useRef } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useFooter } from "@/contexts/footer-context";
import { socialLinks } from "@/data/socialLinks";

const FooterCTAMobile = dynamic(() => import("@/components/layout/FooterCTAMobile"), {
    ssr: false,
});
const PhysicsContactButtons = dynamic(() => import("@/components/layout/PhysicsContactButtons"), {
    ssr: false,
});

export default function Footer() {
    const matterContainer = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const { footerRef } = useFooter();

    return (
        <section id="footer" className="p-4">
            <footer
                ref={footerRef}
                className="flex h-[600px] flex-col justify-between gap-8 rounded-xl bg-stone-100 p-4 pt-8 pb-6 md:px-8 lg:h-[clamp(700px,95vh,900px)]"
            >
                <div className="flex w-full justify-between">
                    <p className="text-[clamp(16px,1.6vw,24px)] font-semibold text-[#7B3F00]">
                        Colombo, LK
                    </p>

                    <LiveClock />
                </div>

                <div ref={matterContainer} className="relative h-full overflow-hidden">
                    <h2 className="absolute top-6 left-1/2 w-full -translate-x-1/2 text-center text-[clamp(30px,4vw,72px)] leading-[0.85] font-semibold tracking-tight text-[#ff950b] lg:top-0">
                        Join <span className="z-50 text-[#111827]">Web3Ceylon</span>
                        <span className="z-50 block text-[#111827]">Ecosystem</span>
                    </h2>

                    {width > 768 && (
                        <PhysicsContactButtons
                            containerRef={matterContainer as React.RefObject<HTMLDivElement>}
                        />
                    )}

                    <FooterCTAMobile />
                </div>

                {/* Mobile */}
                <div className="flex items-end justify-between md:hidden">
                    <ul className="flex w-full flex-col gap-1">
                        {socialLinks
                            .slice(0, Math.ceil(socialLinks.length / 2))
                            .map((social) => (
                                <li key={social.title}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p className="font-semibold text-[#7B3F00]">{social.title}</p>
                                    </a>
                                </li>
                            ))}
                    </ul>

                    <p className="w-full text-center font-semibold text-[#7B3F00]">
                        ©{new Date().getFullYear()}
                    </p>

                    <ul className="flex w-full flex-col items-end gap-1">
                        {socialLinks
                            .slice(Math.ceil(socialLinks.length / 2))
                            .map((social) => (
                                <li key={social.title}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p className="font-semibold text-[#7B3F00]">{social.title}</p>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Desktop */}
                <DesktopSocials />
            </footer>
        </section>
    );
}
