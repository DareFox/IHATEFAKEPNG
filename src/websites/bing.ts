import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const BingUrlConverter: WebsiteUrlConverter = {
    name: "Bing",
    isUrlValid: async function (url: URL): Promise<boolean> {
        return isDomain(url, "bing.com") && isSearchingImages(url) && urlIsntTransparent(url) && await isQueryTriggers(url)
    },
    convertURL: async function (url: URL): Promise<URL> {
        const newUrlParams = new URLSearchParams(url.search)
        var settings = newUrlParams.get("qft")?.split("+")

        if (!settings) {
            settings = [''] // needed for adding plus at start
        }

        settings.filter((value, index, array) => {
            !value.startsWith("filterui:photo-") // filter out any photo filters
        })

        settings.push("filterui:photo-transparent")
        newUrlParams.set("qft", settings.join('+'))

        return combineParamsAndUrl(url, newUrlParams)
    }
}

function isSearchingImages(url: URL): boolean {
    return url.searchParams.get("form") == "HDRSC3"
}

async function isQueryTriggers(url: URL): Promise<boolean> {
    return await isUserSearchingTransparent(url.searchParams.get("q"))
}

function urlIsntTransparent(url: URL): boolean {
    const param = url.searchParams.get("qft")

    if (!param)
        return true

    return !param.includes("+filterui:photo-transparent")
}

