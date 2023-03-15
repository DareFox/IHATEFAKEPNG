import { getWords } from "../options"

/**
 * Check if user searching transparent images in query
 * @param query user search
 * @returns true if user searcing transparent images
 */
export async function isUserSearchingTransparent(query: string | undefined | null): Promise<boolean> {
    if (!query) {
        return false
    }
    
    for (const word of await getWords()) {
        if (query.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
            return true 
    }

    return false
}

export function combineParamsAndUrl(url: URL, newParams: URLSearchParams): URL {
    return new URL(`${url.origin}${url.pathname}?${newParams.toString()}`)
}

/**
 * Check if URL has specified domain
 * @param url URL to check, e.g.: https://www.google.com/search?q=... 
 * @param domain Domain that URL should contain, e.g.: google.com, google. (if you want include regional variants)
 * @returns True, if url includes domain
 */
export function isDomain(url: URL, domain: string): boolean {
    const urlDomain = url.hostname

    return urlDomain.includes(domain) || urlDomain.includes(`.${domain}`)
}

/**
 * Change URL parameters with anonymous function
 * @param url URL to change
 * @param func Anonymous function that uses provided URLSearchParams for modyfing URL params 
 * @returns New URL with changed parameters
 */
export function changeParams(url: URL, func: (newParams: URLSearchParams) => void): URL {
    const newUrlParams = new URLSearchParams(url.search)
    func(newUrlParams)
    return combineParamsAndUrl(url, newUrlParams)
}