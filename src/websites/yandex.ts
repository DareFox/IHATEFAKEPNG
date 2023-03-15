import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const YandexUrlConverter: WebsiteUrlConverter = {
    name: "Yandex",
    isUrlValid: async function (url: URL): Promise<boolean> {
        return isDomain(url, "yandex.") && isSearchingImages(url) && urlIsntTransparent(url) && await isQueryTriggers(url)
    },
    convertURL: async function (url: URL): Promise<URL> {
        const newUrlParams = new URLSearchParams(url.search)
        newUrlParams.set("itype", "png")

        return combineParamsAndUrl(url, newUrlParams)
    }
}

function isSearchingImages(url: URL): boolean {
    return url.pathname == "/images/search"
}

function urlIsntTransparent(url: URL): boolean {
    return url.searchParams.get("itype") != "png"
}

async function isQueryTriggers(url: URL): Promise<boolean> {
    return await isUserSearchingTransparent(url.searchParams.get("text"))
}