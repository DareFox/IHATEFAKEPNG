import { WebsiteUrlConverter as WebsiteUrlConverter } from "./abstract"
import { changeParams, combineParamsAndUrl, isDomain, isUserSearchingTransparent } from "./common"

export class GoogleUrlConverter extends WebsiteUrlConverter {
    name: string = "Google"
    protected isImageSearch(url: URL): boolean {
        return url.searchParams.get("udm") == "2"
    }
    protected isDomainMatch(url: URL): boolean {
        return isDomain(url, "google.")
    }
    protected getQuery(url: URL): string | null | undefined {
        return url.searchParams.get("q")
    }
    protected urlIsTransparent(url: URL): boolean {
        return url.searchParams.get("tbs") == "ic:trans"
    }
    async convertUrl(url: URL): Promise<URL> {
        return changeParams(url, params => params.set("tbs", "ic:trans"))
    }
    undoConvertUrl(url: URL): URL {
        return changeParams(url, params => {
            if (params.get("tbs") == "ic:trans") {
                params.delete("tbs")
            }
        })
    }

}