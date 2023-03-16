import { WebsiteUrlConverter } from "./abstract";
import { combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";

export class DuckDuckGoUrlConverter extends WebsiteUrlConverter {
    name: string = "DuckDuckGO";
    protected isImageSearch(url: URL): boolean {
        return url.searchParams.get("ia") == "images" && url.searchParams.get("iax") == "images"
    }
    protected isDomainMatch(url: URL): boolean {
        return isDomain(url, "duckduckgo.com") 
    }
    protected getQuery(url: URL): string | null | undefined {
        return url.searchParams.get("q")
    }
    protected urlIsTransparent(url: URL): boolean {
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
    async convertUrl(url: URL): Promise<URL> {
        const newUrlParams = new URLSearchParams(url.search);
        var settings = newUrlParams.get("iaf")?.split(",");

        if (!settings) {
            settings = [];
        }

        settings.push("type:transparent");
        newUrlParams.set("iaf", settings.join(','));

        return combineParamsAndUrl(url, newUrlParams);
    }
    undoConvertUrl(url: URL): URL {
        const newUrlParams = new URLSearchParams(url.search);
        var settings = newUrlParams.get("iaf")?.split(",");

        if (!settings) {
            settings = [];
        }

        settings = settings.filter((val) => {
            val != "type:transparent"
        });

        newUrlParams.set("iaf", settings.join(','));
        return combineParamsAndUrl(url, newUrlParams);
    }
}