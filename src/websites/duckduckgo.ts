import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const DuckDuckGoUrlConverter: WebsiteUrlConverter = {
    name: "DuckDuckGo",
    isUrlValid: async function (url: URL): Promise<boolean> {
        return isDomain(url, "duckduckgo.com") && isSearchingImages(url) && urlIsntTransparent(url) && await isQueryTriggers(url)
    },
    convertURL: async function (url: URL): Promise<URL> {
        const newUrlParams = new URLSearchParams(url.search)
        var settings = newUrlParams.get("iaf")?.split(",")

        if (!settings) {
            settings = []
        }

        settings.push("type:transparent")
        newUrlParams.set("iaf", settings.join(','))

        return combineParamsAndUrl(url, newUrlParams)
    }
}

/**
 * Check if url points to images page
 * @param url duckduckgo URL
 */
function isSearchingImages(url: URL): boolean {
    return url.searchParams.get("ia") == "images" && url.searchParams.get("iax") == "images"
}

/**
 * Check if user searching transparent images
 */
async function isQueryTriggers(url: URL): Promise<boolean> {
    const query =  url.searchParams.get("q")
    
    if (!query)
        return false

    return await isUserSearchingTransparent(query)
}

function urlIsntTransparent(url: URL): boolean {
    const settings = url.searchParams.get("iaf")?.split(",") 

    if (!settings)
        return true

    for (const setting of settings) {
        if (setting.toLowerCase() == "type:transparent") {
            return false
        }
    }

    return true
}