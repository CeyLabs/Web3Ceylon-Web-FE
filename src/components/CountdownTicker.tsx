import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cityEvents, type CityEvent } from "@/lib/events";

type TickerProps = {
    intervalMs?: number; // how fast to cycle
    className?: string;
};

const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return "00D : 00H : 00M : 00S";
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400)
        .toString()
        .padStart(2, "0");
    const hours = Math.floor((totalSeconds % 86400) / 3600)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, "0");
    return `${days}D : ${hours}H : ${minutes}M : ${seconds}S`;
};

const useEventState = (event: CityEvent) => {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const startsAt = useMemo(() => new Date(event.startsAt).getTime(), [event.startsAt]);
    const endsAt = useMemo(() => new Date(event.endsAt).getTime(), [event.endsAt]);

    const isLive = now >= startsAt && now <= endsAt;
    const ended = now > endsAt;
    const msToStart = startsAt - now;
    const countdown = formatTimeLeft(msToStart);
    return { isLive, ended, countdown };
};

const CountdownTicker: React.FC<TickerProps> = ({ intervalMs = 3500, className }) => {
    const [index, setIndex] = useState(0);
    const tickerRef = useRef<HTMLDivElement>(null); // wrapper div in-flow
    const [stickyActive, setStickyActive] = useState(false);
    const [portalEl, setPortalEl] = useState<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLElement | null>(null);
    const [headerWidth, setHeaderWidth] = useState<number>(0);
    const [headerBg, setHeaderBg] = useState<string>("rgba(255,255,255,0.3)");
    const [headerColor, setHeaderColor] = useState<string>("#111111");
    // Smooth mount/unmount controls for portal
    const [showSticky, setShowSticky] = useState(false);
    const [stickyVisible, setStickyVisible] = useState(false);

    // Effect for cycling through events
    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % cityEvents.length);
        }, intervalMs);
        return () => clearInterval(id);
    }, [intervalMs]);

    // event state derived from current index

    // Setup observers and portal target
    useEffect(() => {
        // find visible header pill
        const pickHeader = () => {
            const headers = Array.from(
                document.querySelectorAll('[data-header="floating"]')
            ) as HTMLElement[];
            return headers.find((h) => h.offsetWidth > 0) ?? headers[0] ?? null;
        };
        headerRef.current = pickHeader();

        const ensurePortal = () => {
            let el = document.getElementById("ticker-sticky-portal") as HTMLDivElement | null;
            if (!el) {
                el = document.createElement("div");
                el.id = "ticker-sticky-portal";
                document.body.appendChild(el);
            }
            setPortalEl(el);
            return el;
        };
        const portal = ensurePortal();

        // observe header resize to mirror width and background
        const updateFromHeader = () => {
            const header = headerRef.current;
            if (!header) return;
            const rect = header.getBoundingClientRect();
            setHeaderWidth(rect.width);
            const cs = getComputedStyle(header);
            const bg = cs.backgroundColor || "rgba(255,255,255,0.35)";
            const color = cs.color || "#111111";
            setHeaderBg(bg);
            setHeaderColor(color);
            // position portal wrapper
            portal.style.position = "fixed";
            portal.style.left = "50%";
            portal.style.transform = "translateX(-50%)";
            portal.style.top = `${rect.bottom + 8}px`;
            portal.style.width = `${rect.width}px`;
            portal.style.zIndex = "49";
            portal.style.pointerEvents = stickyVisible ? "auto" : "none";
        };

        const ro = headerRef.current ? new ResizeObserver(updateFromHeader) : null;
        if (headerRef.current) ro?.observe(headerRef.current);

        const onScroll = () => updateFromHeader();
        const onResize = () => {
            headerRef.current = pickHeader();
            updateFromHeader();
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        updateFromHeader();

        return () => {
            ro?.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, [stickyVisible]);

    // Observe self to toggle sticky
    useEffect(() => {
        if (!tickerRef.current) return;
        const io = new IntersectionObserver(
            (entries) => {
                const e = entries[0];
                setStickyActive(!e.isIntersecting);
            },
            { threshold: 0.01 }
        );
        io.observe(tickerRef.current);
        return () => io.disconnect();
    }, []);

    // Animate portal show/hide for smoother merge
    useEffect(() => {
        if (stickyActive) {
            setShowSticky(true);
            requestAnimationFrame(() => setStickyVisible(true));
        } else {
            setStickyVisible(false);
            const t = setTimeout(() => setShowSticky(false), 260);
            return () => clearTimeout(t);
        }
    }, [stickyActive]);

    const event = cityEvents[index];
    const { isLive, ended, countdown } = useEventState(event);
    // Prevent hydration mismatches: render static snapshot until mounted
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const bgBaseInflow = "rounded-2xl border border-white/20 backdrop-blur-3xl bg-white/30";
    const inFlowWrapperClasses = `transition-[opacity,max-height] duration-200 overflow-hidden ${
        stickyActive ? "opacity-0" : "opacity-100"
    }`;
    const contentClassesInflow = `group block w-full ${bgBaseInflow} px-5 py-2.5 sm:px-5 sm:py-3 min-h-10 text-black hover:bg-white/15 transition-colors ${
        className ?? ""
    }`;
    const contentClassesSticky = `group block w-full px-5 py-2.5 sm:px-5 sm:py-3 min-h-10`;

    const renderContent = (variant: "inflow" | "sticky") => (
        <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className={variant === "inflow" ? contentClassesInflow : contentClassesSticky}
            aria-label={`Event status for ${event.city}`}
        >
            <div
                className="flex flex-nowrap items-center justify-between gap-3 sm:gap-4"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                <div className="min-w-0 flex-1 truncate text-xs font-medium whitespace-nowrap sm:text-sm md:text-base">
                    {event.image ? (
                        <img
                            src={event.image}
                            alt={`${event.city} icon`}
                            className="mr-2 inline-block size-6 rounded-md border border-white/30 object-cover align-middle sm:size-7"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : null}
                    <span className="mr-1 align-middle opacity-80 sm:mr-2">{event.city}</span>
                    <span className="align-middle opacity-60">— Web3Ceylon</span>
                </div>
                {isLive ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap text-black sm:gap-2 sm:text-xs md:text-sm">
                        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400 sm:h-2 sm:w-2" />
                        Live now
                    </span>
                ) : ended ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap text-black sm:gap-2 sm:text-xs md:text-sm">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70 sm:h-2 sm:w-2" />
                        Ended
                    </span>
                ) : (
                    <span
                        className="font-mono text-[11px] whitespace-nowrap tabular-nums opacity-90 sm:text-xs md:text-sm"
                        suppressHydrationWarning
                    >
                        {mounted ? countdown : ""}
                    </span>
                )}
            </div>
        </a>
    );

    return (
        <>
            {/* In-flow container used for observation; fades out when stickyActive */}
            <div
                ref={tickerRef}
                data-hero-ticker
                className={inFlowWrapperClasses}
                style={{ maxHeight: stickyActive ? 0 : undefined }}
                aria-hidden={stickyActive}
            >
                {renderContent("inflow")}
            </div>
            {/* Portal sticky version when out of view */}
            {showSticky && portalEl
                ? createPortal(
                      <div
                          className="transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                          style={{
                              opacity: stickyVisible ? 1 : 0,
                              transform: stickyVisible
                                  ? "translateY(0) scale(1)"
                                  : "translateY(-8px) scale(0.995)",
                          }}
                      >
                          <div
                              className="mx-auto"
                              style={{
                                  maxWidth: headerWidth ? `${headerWidth}px` : undefined,
                              }}
                          >
                              <div
                                  className="rounded-2xl backdrop-blur-3xl"
                                  style={{ backgroundColor: headerBg, color: headerColor }}
                              >
                                  {renderContent("sticky")}
                              </div>
                          </div>
                      </div>,
                      portalEl
                  )
                : null}
        </>
    );
};

export default CountdownTicker;
