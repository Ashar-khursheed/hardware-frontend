import { ImagePath } from "@/Utils/Constants";

export const getImageUrl = (thumbnail) => {
    let rawUrl =
        typeof thumbnail === "string"
            ? thumbnail
            : thumbnail?.asset_url || thumbnail?.original_url || `${ImagePath}/placeholder.png`;

    if (rawUrl && rawUrl.startsWith("/storage")) {
        rawUrl = `https://hardwareapi.in-sourceit.com${rawUrl}`;
    }

    const finalUrl = rawUrl.replace(/([^:]\/)\/+/g, "$1");
    return finalUrl;
};
