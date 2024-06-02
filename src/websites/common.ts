import { Settings } from "../settings/Settings"

/**
 * Check if user searching transparent images in query
 * @param query user search
 * @returns true if user searcing transparent images
 */
export async function isUserSearchingTransparent(query: string | undefined | null, ignoreCase: boolean): Promise<boolean> {
    if (!query) {
        return false
    }
    
    for (const word of (await Settings.getSettingsOrDefault()).words ) {
        if (ignoreCase) {
            return query.toLocaleLowerCase().includes(word.toLocaleLowerCase())
        } else {
            return query.includes(word)
        }
    }

    return false
}

/**
 * Create URL with new parameters
 * @param url Base URL 
 * @param newParams Parameters to set
 * @returns URL + New parameters
 */
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