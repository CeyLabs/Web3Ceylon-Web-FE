import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlbumGallery from "@/components/gallery/AlbumGallery";
import { galleryEvents, getGalleryEvent } from "@/data/gallery-events";
import { fetchGalleryImagesForFolder } from "@/lib/gallery/fetch-gallery-images";

export const revalidate = 3600;

type EventParams = {
    event: string;
};

export function generateStaticParams(): EventParams[] {
    return galleryEvents.map((event) => ({ event: event.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<EventParams>;
}): Promise<Metadata> {
    const event = getGalleryEvent((await params).event);
    if (!event) {
        return {
            title: "Web3Ceylon Gallery",
        };
    }

    return {
        title: `${event.hero.title} Photos | Web3Ceylon 2025`,
        description: event.metaDescription ?? event.hero.description,
    };
}

export default async function EventGalleryPage({ params }: { params: Promise<EventParams> }) {
    const event = getGalleryEvent((await params).event);
    if (!event) {
        notFound();
    }

    const images = await fetchGalleryImagesForFolder(event.folder);

    return (
        <div className="min-h-screen bg-black text-white">
            <AlbumGallery images={images} hero={event.hero} imageAlt={event.imageAlt} />
        </div>
    );
}
