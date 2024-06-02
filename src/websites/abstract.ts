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
     * @param ignoreCase On true ignores letter case of search query and trigger words
     * @param exactMatch On true matches whole word, on false can match words partially
     * @returns Promise of check. True, if you can convert
     */
    async canConvertUrl(url: URL, ignoreCase: boolean, exactMatch: boolean): Promise<boolean> {
        const isDomainMatch = this.isDomainMatch(url)
        const isImageSearch = this.isImageSearch(url)
        const urlIsntTransparent = this.urlIsntTransparent(url)
        const isUserSearchingTransparentImage = await isUserSearchingTransparent(this.getQuery(url), ignoreCase, exactMatch) 
        const canConvert = isDomainMatch && isImageSearch && urlIsntTransparent && isUserSearchingTransparentImage 


        console.log(
            `Checking if can convert ${url} to transparent url\n` +
            `${this.name}.isImageSearch: ${isImageSearch}\n` +
            `${this.name}.isDomainMatch: ${isDomainMatch}\n` +
            `${this.name}.isUserSearchingTransparentImage: ${isUserSearchingTransparentImage}\n` +
            `${this.name}.urlIsntTransparent: ${urlIsntTransparent}\n\n` +
            `Can convert: ${canConvert}`
        )
        return canConvert
    }
    
    /**
     * Check if you can undo conversion of URL made with converUrl()
     * @param url URL to check
     * @returns True, if you can undo convert
     */
    canUndoConvertUrl(url: URL): boolean {
        const isDomainMatch = this.isDomainMatch(url)
        const isImageSearch = this.isImageSearch(url)
        const urlIsTransparent = this.urlIsTransparent(url)
        const canUndo = isDomainMatch && isImageSearch && urlIsTransparent

        console.log(
            `Checking if can undo transparency converstion for ${url}\n` +
            `${this.name}.isImageSearch: ${isImageSearch}\n` +
            `${this.name}.isDomainMatch: ${isDomainMatch}\n` +
            `${this.name}.urlIsTransparent: ${urlIsTransparent}\n\n` +
            `Can undo conversion: ${canUndo}`
        )

        return canUndo
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