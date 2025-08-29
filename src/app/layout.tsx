import type { Metadata } from "next";
import "@/styles/theme.css";
import { AppProviders } from "@/app/providers";
import { figtree, instrumentSerif } from "@/app/fonts";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${figtree.variable} ${instrumentSerif.variable}`}>
            <body className="font-sans antialiased">
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
