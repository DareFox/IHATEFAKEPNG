import { WebsiteUrlConverter } from "./abstract";
import { changeParams, combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common";

export class BingUrlConverter extends WebsiteUrlConverter {
    name: string = "Bing";
    protected isImageSearch(url: URL): boolean {
        return url.pathname == "/images/search"
    }
    protected isDomainMatch(url: URL): boolean {
        return isDomain(url, "bing.com")
    }
    protected getQuery(url: URL): string | null | undefined {
        return url.searchParams.get("q")
    }
    protected urlIsTransparent(url: URL): boolean {
        const param = url.searchParams.get("qft")

        if (param) {
            return param.includes("+filterui:photo-transparent")
        }

        return false
    }
    async convertUrl(url: URL): Promise<URL> {
        const newUrlParams = new URLSearchParams(url.search);
        var settings = newUrlParams.get("qft")?.split("+");

        if (!settings) {
            settings = ['']; // needed for adding plus at start
        }

        settings.filter((value, index, array) => {
            !value.startsWith("filterui:photo-"); // filter out any photo filters
        });

        settings.push("filterui:photo-transparent");
        newUrlParams.set("qft", settings.join('+'));

        return combineParamsAndUrl(url, newUrlParams);
    }
    undoConvertUrl(url: URL): URL {
        return changeParams(url, params => {
            const filters = params.get("qft")
            if (filters?.includes("+filterui:photo-transparent")) {
                params.set("qft", filters.replace("+filterui:photo-transparent", ""))
            }
        })
    }
}