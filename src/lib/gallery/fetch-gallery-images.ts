import getResults, { getResultsForFolder } from "./cachedImages";
import type { ImageProps } from "./types";

export async function fetchGalleryImages(maxResults = 400): Promise<ImageProps[]> {
    return getResults(maxResults);
}

export async function fetchGalleryImagesForFolder(
    folder: string,
    maxResults = 500,
): Promise<ImageProps[]> {
    return getResultsForFolder(folder, maxResults);
}
