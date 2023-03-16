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