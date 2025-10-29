import cloudinary from "./cloudinary";
import getBase64ImageUrl from "./get-base64-image-url";
import type { ImageProps } from "./types";

type CloudinaryResource = {
    height: number;
    width: number;
    public_id: string;
    format: string;
};

let cachedResults: ImageProps[] | null = null;
const folderCache: Map<string, ImageProps[]> = new Map();

const normalizeFolderPath = (folder: string): string =>
    folder.replace(/^\/+/, "").replace(/\/+$/, "");

const resolveFolderPath = (folder: string, base?: string): string => {
    const normalizedFolder = normalizeFolderPath(folder);
    if (!base) {
        return normalizedFolder;
    }
    const normalizedBase = normalizeFolderPath(base);
    if (
        normalizedFolder === normalizedBase ||
        normalizedFolder.startsWith(`${normalizedBase}/`)
    ) {
        return normalizedFolder;
    }
    return `${normalizedBase}/${normalizedFolder}`;
};

async function fetchFromFolder(folderPath: string, maxResults: number): Promise<ImageProps[]> {
    const normalizedFolder = normalizeFolderPath(folderPath);

    const results = await cloudinary.search
        .expression(`folder:${normalizedFolder}/*`)
        .sort_by("public_id", "desc")
        .max_results(maxResults)
        .execute();

    const resources = (results?.resources ?? []) as CloudinaryResource[];

    const images: ImageProps[] = resources.map((resource, index) => ({
        id: index,
        height: resource.height,
        width: resource.width,
        public_id: resource.public_id,
        format: resource.format,
    }));

    const blurDataUrls = await Promise.all(images.map((image) => getBase64ImageUrl(image)));

    return images.map((image, index) => ({
        ...image,
        blurDataUrl: blurDataUrls[index],
    }));
}

export default async function getResults(maxResults = 400): Promise<ImageProps[]> {
    if (!cachedResults) {
        if (!process.env.CLOUDINARY_FOLDER) {
            throw new Error("CLOUDINARY_FOLDER environment variable is missing.");
        }
        cachedResults = await fetchFromFolder(process.env.CLOUDINARY_FOLDER, maxResults);
    }

    return cachedResults;
}

export async function getResultsForFolder(
    folder: string,
    maxResults = 500,
): Promise<ImageProps[]> {
    if (!folder) {
        throw new Error("A folder name is required to fetch gallery images.");
    }

    const baseFolder = process.env.CLOUDINARY_FOLDER;
    const targetFolder = resolveFolderPath(folder, baseFolder);

    // Check if we have cached results for this folder
    const cacheKey = `${targetFolder}_${maxResults}`;
    const cachedFolderResults = folderCache.get(cacheKey);

    if (cachedFolderResults) {
        return cachedFolderResults;
    }

    // Fetch fresh data and cache it
    const results = await fetchFromFolder(targetFolder, maxResults);
    folderCache.set(cacheKey, results);

    return results;
}