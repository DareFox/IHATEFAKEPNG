import { WebsiteUrlConverter } from "./abstract";
import { changeParams, combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";

export class YandexUrlConverter extends WebsiteUrlConverter {
    name: string = "Yandex";
    protected isImageSearch(url: URL): boolean {
        return url.pathname == "/images/search"
    }
    protected isDomainMatch(url: URL): boolean {
        return isDomain(url, "yandex.")
    }
    protected getQuery(url: URL): string | null | undefined {
        return url.searchParams.get("text")
    }
    protected urlIsTransparent(url: URL): boolean {
        return url.searchParams.get("itype") == "png"
    }
    async convertUrl(url: URL): Promise<URL> {
        return changeParams(url, params => params.set("itype", "png"));
    }
    undoConvertUrl(url: URL): URL {
        return changeParams(url, params => {
            if (params.get("itype") == "png") {
                params.delete("itype")
            }
        })
    }
}