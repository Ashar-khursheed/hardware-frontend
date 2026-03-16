import { ImagePath, storageURL } from "@/Utils/Constants";

export const getImageUrl = (thumbnail) => {
    let rawUrl =
        typeof thumbnail === "string"
            ? thumbnail
            : thumbnail?.image_url || thumbnail?.asset_url || thumbnail?.original_url || `${ImagePath}/placeholder.png`;

    if (rawUrl && (rawUrl.startsWith("/storage") || (!rawUrl.startsWith("http") && !rawUrl.startsWith("//") && !rawUrl.startsWith("/assets")))) {
        // Use the storageURL from constants, ensuring it doesn't end with a slash if rawUrl starts with one
        const baseUrl = storageURL?.endsWith('/') ? storageURL.slice(0, -1) : (storageURL || '');
        const path = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;
        rawUrl = `${baseUrl}${path}`;
    }

    let finalUrl = rawUrl?.replace(/([^:]\/)\/+/g, "$1");

    // Rewrite S3 URLs to CloudFront URLs if they exist
    if (finalUrl && finalUrl.includes("hardware-website-images.s3.us-east-1.amazonaws.com")) {
        finalUrl = finalUrl.replace("hardware-website-images.s3.us-east-1.amazonaws.com", "d3243ix3g2hwoc.cloudfront.net");
    }

    return finalUrl;
};
