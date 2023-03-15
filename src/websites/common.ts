import { triggerWords } from "../words"

/**
 * Check if user searching transparent images in query
 * @param query user search
 * @returns true if user searcing transparent images
 */
export function isUserSearchingTransparent(query: string): boolean {
    for (const word of triggerWords) {
        if (query.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
            return true 
    }

    return false
}

export function combineParamsAndUrl(url: URL, newParams: URLSearchParams): URL {
    return new URL(`${url.origin}${url.pathname}?${newParams.toString()}`)
}