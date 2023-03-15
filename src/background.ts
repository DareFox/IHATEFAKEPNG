import { getWebsites } from "./options"
import { BingUrlConverter } from "./websites/bing"
import { DuckDuckGoUrlConverter } from "./websites/duckduckgo"
import { GoogleUrlConverter } from "./websites/google"
import { YahooUrlConverter } from "./websites/yahoo"
import { YandexUrlConverter } from "./websites/yandex"

const websites = [GoogleUrlConverter, DuckDuckGoUrlConverter, BingUrlConverter, YahooUrlConverter, YandexUrlConverter]

chrome.tabs.onUpdated.addListener(async (tabID, changeInfo, tab) => {
    const url = tab.url
    
    if (!url)
        return

    const urlObj = new URL(url)

    for (const website of await getWebsites()) {
        if (await website.isUrlValid(urlObj)) {
            const newUrl = await website.convertURL(urlObj)

            chrome.tabs.update(tabID, {
                url: newUrl.toString()
            })
    
            console.log(`Redirecting from ${url} to ${newUrl}`)
            return
        }
    }
})