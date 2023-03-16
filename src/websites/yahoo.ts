import { WebsiteUrlConverter } from "./abstract";
import { changeParams, combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";

export class YahooUrlConverter extends WebsiteUrlConverter {
    name: string = "Yahoo";
    protected isImageSearch(url: URL): boolean {
        return isDomain(url, "images.search.yahoo.com");
    }
    protected isDomainMatch(url: URL): boolean {
        return isDomain(url, "images.search.yahoo.com");
    }
    protected getQuery(url: URL): string | null | undefined {
        return url.searchParams.get("p")
    }
    protected urlIsTransparent(url: URL): boolean {
        return url.searchParams.get("imgty") == "transparent"
    }
    async convertUrl(url: URL): Promise<URL> {
        return changeParams(url, params => params.set("imgty", "transparent"));
    }
    undoConvertUrl(url: URL): URL {
        return changeParams(url, params => {
            if (params.get("imgty") == "transparent") {
                params.delete("imgty")
            }
        })
    }
}