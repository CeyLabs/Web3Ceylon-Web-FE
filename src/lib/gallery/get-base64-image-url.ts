import type { ImageProps } from "./types";

const cache = new Map<string, string>();

export default async function getBase64ImageUrl(image: ImageProps): Promise<string | undefined> {
    const cacheKey = `${image.public_id}.${image.format}`;
    const cachedUrl = cache.get(cacheKey);
    if (cachedUrl) {
        return cachedUrl;
    }

    try {
        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
            throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set');
        }
        const response = await fetch(
            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`,
        );
        if (!response.ok) {
            throw new Error(`Cloudinary fetch failed with status ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        // Cloudinary already returns a tiny, compressed JPEG. No further optimization is necessary here.
        const url = `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;
        cache.set(cacheKey, url);
        return url;
    } catch (error) {
        console.warn(`Failed to fetch blur image for ${cacheKey}:`, error);
        return undefined;
    }
}
