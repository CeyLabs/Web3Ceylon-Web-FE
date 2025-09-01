"use client";
import React, { ReactNode, useEffect, useState } from "react";
import SiteLoader from "@/components/reusable/SiteLoader";

type Props = {
  children: ReactNode;
  images?: string[];
  logoSrc?: string;
  /** ms minimum time to show loader (optional) */
  minDuration?: number;
  /** ms maximum time to wait before forcing hide (safety fallback) */
  maxWait?: number;
};

/**
 * SiteLoaderProvider: gates the app with a one-time animated intro.
 * - Client-only; safe in app/layout.
 * - Hides after images preload + optional minDuration.
 */
export function SiteLoaderProvider({
  children,
  images = [
    "/assets/stamps/Stamp - Colombo.png",
    "/assets/stamps/Stamp - Ella.png",
    "/assets/stamps/Stamp - Galle.png",
    "/assets/stamps/Stamp - Kandy.png",
    "/assets/stamps/Stamp - Colombo.png",
    "/assets/stamps/Stamp - Ella.png",
    "/assets/stamps/Stamp - Galle.png",
    "/assets/stamps/Stamp - Kandy.png",
  ],
  logoSrc = "/Main-Logo.svg",
  minDuration = 800,
  maxWait = 6000,
}: Props) {
  const [show, setShow] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Hide only after intro completes and minDuration elapsed; also set a safety max wait.
  useEffect(() => {
    const start = performance.now();
    let safety: number | undefined;
    safety = window.setTimeout(() => setShow(false), maxWait);
    return () => {
      if (safety) window.clearTimeout(safety);
    };
  }, [maxWait]);

  useEffect(() => {
    if (!introDone) return;
    // Trigger the exit zoom; overlay remains until exit completes
    const t = window.setTimeout(() => setExiting(true), Math.max(0, minDuration));
    return () => window.clearTimeout(t);
  }, [introDone, minDuration]);

  return (
    <>
      {/* Content behind to avoid CLS; loader absolutely positioned */}
      <div className="relative">{children}</div>
      {show && (
        <div
          className={[
            "pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-400",
            exiting ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <div className="pointer-events-auto h-full w-full bg-[radial-gradient(circle,hsl(38_55%_94%)_0%,hsl(30_35%_82%)_100%)]">
            <SiteLoader
              images={images}
              logoSrc={logoSrc}
              onIntroComplete={() => setIntroDone(true)}
              exit={exiting}
              onExitComplete={() => setShow(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
