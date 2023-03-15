import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common"
import { WebsiteUrlConverter } from "./websiteUrlConverter"

export const GoogleUrlConverter: WebsiteUrlConverter = {
    name: "Google",
    isUrlValid: function (url: URL): boolean {
        return isDomain(url, "google.") && 
        isSearchingImages(url) &&
        isQueryTriggers(url) &&
        urlIsntTransparent(url) 
    },
    convertURL: function (url: URL): URL {
        const newUrlParams = new URLSearchParams(url.search)
        newUrlParams.set("tbs", "ic:trans")

        return combineParamsAndUrl(url, newUrlParams)
    }
}

/**
 * Check if user searching transparent images
 * @param url Google URL
 */
function isQueryTriggers(url: URL): boolean {    
    const query =  url.searchParams.get("q")
    
    if (!query)
        return false

    return isUserSearchingTransparent(query)
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
