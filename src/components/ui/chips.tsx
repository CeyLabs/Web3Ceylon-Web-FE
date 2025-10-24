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
    return (
        <div role="radiogroup" className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {options.map((opt) => {
                const selected = value === opt.value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={opt.label}
                        onClick={() => onChange?.(opt.value)}
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
