// Centralized Next.js Providers file
"use client";
import { FooterProvider } from "@/contexts/footer-context";
import { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
    return <FooterProvider>{children}</FooterProvider>;
}
