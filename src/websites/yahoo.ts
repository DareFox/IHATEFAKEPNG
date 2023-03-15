import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const YahooUrlConverter: WebsiteUrlConverter = {
    name: "Yahoo",
    isUrlValid: async function (url: URL): Promise<boolean> {
        return isDomain(url, "images.search.yahoo.com") && await isQueryTriggers(url) && urlIsntTransparent(url)
    },
    convertURL: async function (url: URL): Promise<URL> {
        const newUrlParams = new URLSearchParams(url.search)
        newUrlParams.set("imgty", "transparent")

        return combineParamsAndUrl(url, newUrlParams)
    }
}

async function isQueryTriggers(url: URL): Promise<boolean> {
    return await isUserSearchingTransparent(url.searchParams.get("p"))
}

function urlIsntTransparent(url: URL): boolean {
    return url.searchParams.get("imgty") != "transparent"
}