import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";
import { WebsiteUrlConverter } from "./websiteUrlConverter";

export const YandexUrlConverter: WebsiteUrlConverter = {
    name: "Yandex",
    isUrlValid: function (url: URL): boolean {
        return isDomain(url, "yandex.") && isSearchingImages(url) && urlIsntTransparent(url) && isQueryTriggers(url)
    },
    convertURL: function (url: URL): URL {
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

function isQueryTriggers(url: URL): boolean {
    return isUserSearchingTransparent(url.searchParams.get("text"))
}