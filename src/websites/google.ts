import { WebsiteUrlConverter } from "./websiteUrlConverter"

export const GoogleUrlConverter: WebsiteUrlConverter = {
    name: "Google",
    isUrlValid: function (url: URL): Boolean {
        return isGoogle(url) && 
        isSearchingImages(url) &&
        isUserSearchingTransparent(url) &&
        !isGoogleSearchSetToTransparent(url) 
    },
    convertURL: function (url: URL): URL {
        const newUrlParams = new URLSearchParams(url.search)
        newUrlParams.set("tbs", "ic:trans")

        return new URL(`${url.origin}${url.pathname}?${newUrlParams.toString()}`)
    }
}

/**
 * Check if url is google.**\/
 * @param url URL to check
 */
function isGoogle(url: URL): boolean {
    const urlDomain = url.hostname

    return urlDomain.includes("google.") || urlDomain.includes(".google.")
}

/**
 * Check if user searching transparent images
 * @param url Google URL
 */
function isUserSearchingTransparent(url: URL): boolean {    
    const query =  url.searchParams.get("q")
    const words = ["png"]

    if (!query)
        return false

    for (const word of words) {
        if (query.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
            return true 
    }

    return false
}

/**
 * Check if color option in Google set to transparent
 * @param url Google URL
 */
function isGoogleSearchSetToTransparent(url: URL): boolean {
    return url.searchParams.get("tbs") == "ic:trans"
}

/**
 * Check if url points to Google Images section
 * @param url Google URL
 */
function isSearchingImages(url: URL): boolean {
    return url.searchParams.get("tbm") == "isch"
}
