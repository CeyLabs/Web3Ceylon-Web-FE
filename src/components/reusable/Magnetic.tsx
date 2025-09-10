"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticProps {
    children: React.ReactNode;
    strength?: number; // 0.05 - 0.2 recommended
    className?: string;
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.12, className }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = `translate(0px, 0px)`;
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={cn("transition-transform duration-150 ease-out will-change-transform", className)}
        >
            {children}
        </div>
    );
};

export default Magnetic;
