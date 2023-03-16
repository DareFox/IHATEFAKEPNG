import { isUserSearchingTransparent } from "./common"

export abstract class WebsiteUrlConverter {
    abstract name: string

    protected abstract isImageSearch(url: URL): boolean
    protected abstract isDomainMatch(url: URL): boolean
    protected abstract getQuery(url: URL): string | null | undefined

    protected abstract urlIsTransparent(url: URL): boolean
    protected urlIsntTransparent(url: URL): boolean {
        return !this.urlIsTransparent(url)
    }


    /**
     * Check if can convert URL to exclude transparent images
     * @param url URL to check
     * @returns Promise of check. True, if you can convert
     */
    async canConvertUrl(url: URL): Promise<boolean> {
        return this.isDomainMatch(url) && this.isImageSearch(url) && this.urlIsntTransparent(url) && await isUserSearchingTransparent(this.getQuery(url)) 
    }
    
    /**
     * Check if you can undo conversion of URL made with converUrl()
     * @param url URL to check
     * @returns True, if you can undo convert
     */
    canUndoConvertUrl(url: URL): boolean {
        return this.isDomainMatch(url) && this.isImageSearch(url) && this.urlIsTransparent(url)
    }

    /**
     * Convert URL to exclude fake png images from results
     * @param url new URL with transparency filters
     */
    abstract convertUrl(url: URL): Promise<URL>
    
    /**
     * Remove transparency filters from URL
     * @param url new URL without transparency filters
     */
    abstract undoConvertUrl(url: URL): URL
}