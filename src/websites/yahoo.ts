import { changeParams, combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const YahooUrlConverter: WebsiteUrlConverter = {
    name: "Yahoo",
    isUrlValid: async function (url: URL): Promise<boolean> {
        return isDomain(url, "images.search.yahoo.com") && await isQueryTriggers(url) && urlIsntTransparent(url)
    },
    convertURL: async function (url: URL): Promise<URL> {
        return changeParams(url, params => params.set("imgty", "transparent"))
    }
}

async function isQueryTriggers(url: URL): Promise<boolean> {
    return await isUserSearchingTransparent(url.searchParams.get("p"))
}

function urlIsntTransparent(url: URL): boolean {
    return url.searchParams.get("imgty") != "transparent"
}