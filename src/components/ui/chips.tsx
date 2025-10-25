"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipOption {
    value: string;
    label: string;
    description?: string;
}

export interface ChipGroupProps {
    options: ChipOption[];
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
}

export function ChipGroup({ options, value, onChange, name }: ChipGroupProps) {
    const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent, optValue: string, index: number) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onChange?.(optValue);
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = (index + 1) % options.length;
            onChange?.(options[nextIndex].value);
            buttonRefs.current[nextIndex]?.focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex = (index - 1 + options.length) % options.length;
            onChange?.(options[prevIndex].value);
            buttonRefs.current[prevIndex]?.focus();
        }
    };

    return (
        <div role="radiogroup" className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {options.map((opt, index) => {
                const selected = value === opt.value;
                const isTabbable = selected || (value == null && index === 0);
                return (
                    <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={opt.label}
                        tabIndex={isTabbable ? 0 : -1}
                        name={name}
                        ref={(el) => {
                            buttonRefs.current[index] = el;
                        }}
                        onClick={() => onChange?.(opt.value)}
                        onKeyDown={(e) => handleKeyDown(e, opt.value, index)}
                        className={cn(
                            "flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-shadow duration-150",
                            selected
                                ? "border border-emerald-500 bg-emerald-700/20 text-emerald-300 shadow-sm"
                                : "border border-white/8 bg-white/3 text-zinc-200 hover:border-white/20"
                        )}
                    >
                        <div className="flex flex-col">
                            <span
                                className={cn(
                                    "text-[clamp(14px,1vw,16px)] font-semibold",
                                    selected ? "text-emerald-200" : "text-zinc-100"
                                )}
                            >
                                {opt.label}
                            </span>
                            {opt.description && (
                                <span className="mt-1 text-sm text-zinc-400">
                                    {opt.description}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center">
                            <span
                                className={cn(
                                    "inline-block h-4 w-4 rounded-full",
                                    selected
                                        ? "bg-emerald-400"
                                        : "border border-white/10 bg-transparent"
                                )}
                            />
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

export default ChipGroup;
