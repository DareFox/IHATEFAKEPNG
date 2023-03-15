chrome.tabs.onUpdated.addListener((tabID, changeInfo, tab) => {
    const url = tab.url
    
    if (!url)
        return

    const urlObj = new URL(url)

    if (isAllConditionsTrue(urlObj)) {
        const newUrlParams = new URLSearchParams(urlObj.search)
        newUrlParams.set("tbs", "ic:trans")

        const newUrl = `${urlObj.origin}${urlObj.pathname}?${newUrlParams.toString()}`
        chrome.tabs.update(tabID, {
            url: newUrl
        })

        console.log(`Redirecting from ${url} to ${newUrl}`)
    }
})

function isAllConditionsTrue(url: URL): boolean {
    if (!url)
        return false

    return isGoogle(url) && 
    isSearchingImages(url) &&
    isUserSearchingTransparent(url) &&
    !isGoogleSearchSetToTransparent(url) 
}

/**
 * Check if url is google.**\/
 * @param url URL to check
 */
function isGoogle(url: URL): boolean {
    const urlDomain = url.hostname

    return urlDomain.includes("google.") || urlDomain.includes(".google.")
}

/**
 * Check if user searching transparent images
 * @param url Google URL
 */
function isUserSearchingTransparent(url: URL): boolean {    
    const query =  url.searchParams.get("q")
    const words = ["png"]

    if (!query)
        return false

    for (const word of words) {
        if (query.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
            return true 
    }

    return false
}

/**
 * Check if color option in Google set to transparent
 * @param url Google URL
 */
function isGoogleSearchSetToTransparent(url: URL): boolean {
    return url.searchParams.get("tbs") == "ic:trans"
}

/**
 * Check if url points to Google Images section
 * @param url Google URL
 */
function isSearchingImages(url: URL): boolean {
    return url.searchParams.get("tbm") == "isch"
}

