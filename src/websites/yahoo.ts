import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const YahooUrlConverter: WebsiteUrlConverter = {
    name: "Yahoo",
    isUrlValid: function (url: URL): boolean {
        return isDomain(url, "images.search.yahoo.com") && isQueryTriggers(url) && urlIsntTransparent(url)
    },
    convertURL: function (url: URL): URL {
        const newUrlParams = new URLSearchParams(url.search)
        newUrlParams.set("imgty", "transparent")

        return combineParamsAndUrl(url, newUrlParams)
    }
}

function isQueryTriggers(url: URL): boolean {
    return isUserSearchingTransparent(url.searchParams.get("p"))
}

function urlIsntTransparent(url: URL): boolean {
    return url.searchParams.get("imgty") != "transparent"
}