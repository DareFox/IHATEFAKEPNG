import { getWebsites } from "./options"
import { getPreviousUrl, removePreviousUrl, updatePreviousUrl } from "./previousUrl"
import { changeParams } from "./websites/common"

chrome.tabs.onUpdated.addListener(async (tabID, changeInfo, tab) => {
    const url = tab.url
    
    if (!url)
        return

    const previousUrl = getPreviousUrl(tabID)
    var urlObj = new URL(url)

    for (const website of await getWebsites()) {
        // if previous url was changed by extension
        // and new url can remove filter transparency
        // then new url was set by previous url
        if (previousUrl && isConvertedByExtension(previousUrl) && website.canUndoConvertUrl(urlObj)) {
            // remove filter from new url
            const cleanUrl = changeParams(website.undoConvertUrl(urlObj), params => {
                params.delete("removefakepng")
            })
            const isValidForConverstion = await website.canConvertUrl(cleanUrl)

            // if new url doesn't trigger transparency filter
            // then set clean url without previous filters
            if (!isValidForConverstion) {
                chrome.tabs.update(tabID, {
                    url: cleanUrl.toString()
                })

                console.log(`Cleaning new URL from previous URL. Redirecting from ${url} to ${cleanUrl.toString()}`)
                updatePreviousUrl(tabID, cleanUrl)
                return
            }
        }


        if (await website.canConvertUrl(urlObj)) {
            const newUrl = changeParams(await website.convertUrl(urlObj), params => {
                params.set("removefakepng", "true")
            })

            chrome.tabs.update(tabID, {
                url: newUrl.toString()
            })
    
            console.log(`Redirecting from ${url} to ${newUrl}`)
            updatePreviousUrl(tabID, newUrl)
            return
        }
    }

    updatePreviousUrl(tabID, urlObj)
})

chrome.tabs.onRemoved.addListener(async (tabId) => {
    removePreviousUrl(tabId)
})

function isConvertedByExtension(url: URL): boolean {
    return url.searchParams.get("removefakepng") == "true" 
}