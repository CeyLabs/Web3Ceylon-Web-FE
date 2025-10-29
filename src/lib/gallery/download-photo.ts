function forceDownload(blobUrl: string, filename: string) {
    const anchor = document.createElement("a");
    anchor.download = filename;
    anchor.href = blobUrl;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
}

export default function downloadPhoto(url: string, filename: string) {
    const resolvedFilename = filename || url.split("\\").pop()?.split("/").pop() || "download.jpg";
    fetch(url, {
        headers: new Headers({
            Origin: location.origin,
        }),
        mode: "cors",
    })
        .then((response) => response.blob())
        .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            forceDownload(blobUrl, resolvedFilename);
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch((error) => console.error(error));
}
