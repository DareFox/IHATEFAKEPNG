import { DuckDuckGoUrlConverter } from "./websites/duckduckgo"
import { GoogleUrlConverter } from "./websites/google"

const websites = [GoogleUrlConverter, DuckDuckGoUrlConverter]

chrome.tabs.onUpdated.addListener((tabID, changeInfo, tab) => {
    const url = tab.url
    
    if (!url)
        return

    const urlObj = new URL(url)

    for (const website of websites) {
        if (website.isUrlValid(urlObj)) {
            const newUrl = website.convertURL(urlObj)

            chrome.tabs.update(tabID, {
                url: newUrl.toString()
            })
    
            console.log(`Redirecting from ${url} to ${newUrl}`)
            return
        }
    }
})