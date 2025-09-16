"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface Web3CircuitRoadmapProps {
    className?: string;
}

// No manual positioning needed: the overlay SVG is exported at the same canvas size as the roadmap.
// We stretch it to the container bounds (object-fit: contain) so all details align 1:1.

/**
 * Web3CircuitRoadmap
 * A reusable wrapper around the upcoming "web3 circuit" SVG.
 * - Drop the full SVG markup where indicated below (REPLACE_SVG_CONTENT comment)
 * - Use percentage-based pin coordinates for responsive positioning.
 * - Pins animate with a pulse; active pin is emphasized.
 */
const Web3CircuitRoadmap: React.FC<Web3CircuitRoadmapProps> = ({ className }) => {
    return (
        <div
            className={cn(
                "relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg p-4",
                className
            )}
        >
            {/* SVG Container with overlayed location pins */}
            <div className="relative h-full w-full">
                {/* Keep aspect ratio of the SVG to ensure overlay alignment */}
                <div
                    className="relative mx-auto aspect-[801/1182] h-full w-full"
                    style={{
                        aspectRatio: "801 / 1182",
                        // Render map as background to avoid img/object-fit rounding differences
                        backgroundImage: "url(/assets/Roadmap.svg)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        // Prevent the inner box from growing beyond the map’s native size on large screens
                        maxWidth: 801,
                        maxHeight: 1182,
                    }}
                >
                    {/* Group overlay covering full map bounds (same canvas/viewBox as Roadmap.svg) */}
                    <img
                        src="/assets/maps/map-group.svg"
                        alt="Sri Lanka cities overlay"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            width: "100%",
                            height: "100%",
                            animation: "w3cFloatOverlay 6.5s ease-in-out infinite",
                            willChange: "transform",
                        }}
                    />
                </div>
            </div>

            {/* Legend / Subtitle (glassmorphism + gentle float) */}
            {/* <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
                <div
                    className="rounded-full border px-6 py-2 text-sm font-medium backdrop-blur-md"
                    style={{
                        background: "rgba(255,255,255,0.28)",
                        borderColor: "rgba(255,255,255,0.4)",
                        WebkitBackdropFilter: "blur(6px)",
                        backdropFilter: "blur(6px)",
                        color: "#1f2937",
                        animation: "w3cFloat 6s ease-in-out infinite",
                    }}
                >
                    Four Cities · One Vision
                </div>
            </div> */}
            <style>{`
                @keyframes w3cFloat {
                    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
                    50% { transform: translate(-50%, -50%) translateY(-6px); }
                }
                @keyframes w3cFloatOverlay {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
      `}</style>
        </div>
    );
};
export default Web3CircuitRoadmap;
