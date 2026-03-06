import { ImagePath, storageURL } from "@/Utils/Constants";

export const getImageUrl = (thumbnail) => {
    let rawUrl =
        typeof thumbnail === "string"
            ? thumbnail
            : thumbnail?.asset_url || thumbnail?.original_url || `${ImagePath}/placeholder.png`;

    if (rawUrl && rawUrl.startsWith("/storage")) {
        // Use the storageURL from constants, ensuring it doesn't end with a slash if rawUrl starts with one
        const baseUrl = storageURL?.endsWith('/') ? storageURL.slice(0, -1) : storageURL;
        rawUrl = `${baseUrl}${rawUrl}`;
    }

    const finalUrl = rawUrl?.replace(/([^:]\/)\/+/g, "$1");
    return finalUrl;
};
