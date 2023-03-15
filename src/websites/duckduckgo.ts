import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const DuckDuckGoUrlConverter: WebsiteUrlConverter = {
    name: "DuckDuckGo",
    isUrlValid: function (url: URL): boolean {
        return isDomain(url, "duckduckgo.com") && isSearchingImages(url) && !isUrlAlreadyTransparent(url) && isQueryTriggers(url)
    },
    convertURL: function (url: URL): URL {
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
function isQueryTriggers(url: URL): boolean {
    const query =  url.searchParams.get("q")
    
    if (!query)
        return false

    return isUserSearchingTransparent(query)
}

function isUrlAlreadyTransparent(url: URL): boolean {
    const settings = url.searchParams.get("iaf")?.split(",") 

    if (!settings)
        return false

    for (const setting of settings) {
        if (setting.toLowerCase() == "type:transparent") {
            return true
        }
    }

    return false
}