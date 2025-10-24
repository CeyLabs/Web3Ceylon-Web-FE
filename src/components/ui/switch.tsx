"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, onCheckedChange, ...props }, ref) => {
        return (
            <label className="flex cursor-pointer items-center focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:ring-offset-zinc-900">
                <input
                    type="checkbox"
                    ref={ref}
                    className="sr-only"
                    onChange={(e) => {
                        onCheckedChange?.(e.target.checked);
                    }}
                    {...props}
                />
                <div
                    className={cn(
                        "relative inline-flex h-7 w-12 items-center rounded-full bg-zinc-700 transition-colors duration-300"
                    )}
                    style={{
                        backgroundColor: props.checked ? "#10b981" : "#3f3f46",
                    }}
                >
                    <div
                        className={cn(
                            "inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-300",
                            props.checked ? "translate-x-6" : "translate-x-0"
                        )}
                    />
                </div>
            </label>
        );
    }
);

Switch.displayName = "Switch";

export { Switch };
