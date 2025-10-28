import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { galleryEvents } from "@/data/gallery-events";

export const metadata: Metadata = {
    title: "Web3Ceylon 2025 Tour Galleries",
    description: "Choose a city from the 2025 Web3Ceylon tour to explore each photo gallery.",
};

export default function AlbumLandingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold tracking-[0.35em] text-white/50 uppercase">
                        2025 Tour
                    </p>
                    <h1 className="font-primary mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Web3Ceylon City Galleries
                    </h1>
                    <p className="mt-4 text-base text-white/70 sm:text-lg">
                        Four cities. Four communities. Pick a stop from the 2025 Web3Ceylon tour to
                        relive the workshops, meetups, and builder sessions from each city.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                    {galleryEvents.map((event) => (
                        <Link
                            key={event.slug}
                            href={`/2025/album/${event.slug}`}
                            className="group relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/30 hover:bg-white/[0.07]"
                        >
                            {event.hero.image ? (
                                <div className="flex justify-center">
                                    <Image
                                        src={event.hero.image.src}
                                        alt={event.hero.image.alt}
                                        width={event.hero.image.width ?? 180}
                                        height={event.hero.image.height ?? 180}
                                        className="h-32 w-auto transition group-hover:scale-105"
                                    />
                                </div>
                            ) : null}
                            <div className="mt-auto">
                                <p className="font-secondary text-xs font-semibold text-white/50">
                                    {event.hero.eyebrow ?? "City Gallery"}
                                </p>
                                <h2
                                    className={`font-primary mt-3 text-xl font-semibold sm:text-2xl ${event.hero.titleClassName || "text-white"}`}
                                >
                                    {event.hero.title}
                                </h2>
                                <p className="mt-3 text-sm text-white/70">{event.summary}</p>
                            </div>
                            <span className="font-secondary mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium whitespace-nowrap text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none">
                                View gallery
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
