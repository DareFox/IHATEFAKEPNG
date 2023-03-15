import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const BingUrlConverter: WebsiteUrlConverter = {
    name: "Bing",
    isUrlValid: function (url: URL): boolean {
        return isDomain(url, "bing.com") && isSearchingImages(url) && urlIsntTransparent(url) && isQueryTriggers(url)
    },
    convertURL: function (url: URL): URL {
        const newUrlParams = new URLSearchParams(url.search)
        var settings = newUrlParams.get("qft")?.split("+")

        if (!settings) {
            settings = [''] // needed for adding plus at start
        }

        settings.filter((value, index, array) => {
            !value.startsWith("filterui:photo-") // filter out any photo filters
        })

        settings.push("filterui:photo-transparent")
        newUrlParams.set("iaf", settings.join('+'))

        return combineParamsAndUrl(url, newUrlParams)
    }
}

function isSearchingImages(url: URL): boolean {
    return url.searchParams.get("form") == "HDRSC3"
}

function isQueryTriggers(url: URL): boolean {
    return isUserSearchingTransparent(url.searchParams.get("q"))
}

function urlIsntTransparent(url: URL): boolean {
    const param = url.searchParams.get("qft")

    if (!param)
        return true

    return !param.includes("+filterui:photo-transparent")
}

