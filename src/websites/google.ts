import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common"
import { WebsiteUrlConverter } from "./websiteUrlConverter"

export const GoogleUrlConverter: WebsiteUrlConverter = {
    name: "Google",
    isUrlValid: async function (url: URL): Promise<boolean> {
        return isDomain(url, "google.") && 
        isSearchingImages(url) &&
        await isQueryTriggers(url) &&
        urlIsntTransparent(url) 
    },
    convertURL: async function (url: URL): Promise<URL> {
        const newUrlParams = new URLSearchParams(url.search)
        newUrlParams.set("tbs", "ic:trans")

        return combineParamsAndUrl(url, newUrlParams)
    }
}

/**
 * Check if user searching transparent images
 * @param url Google URL
 */
async function isQueryTriggers(url: URL): Promise<boolean> {    
    const query =  url.searchParams.get("q")
    
    if (!query)
        return false

    return await isUserSearchingTransparent(query)
}

/**
 * Check if color option in Google set to transparent
 * @param url Google URL
 */
function urlIsntTransparent(url: URL): boolean {
    return url.searchParams.get("tbs") != "ic:trans"
}

/**
 * Check if url points to Google Images section
 * @param url Google URL
 */
function isSearchingImages(url: URL): boolean {
    return url.searchParams.get("tbm") == "isch"
}
