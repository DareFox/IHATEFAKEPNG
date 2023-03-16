import { isStringsArray } from "./typeChecks"
import { BingUrlConverter } from "./websites/bing"
import { WebsiteUrlConverter } from "./websites/abstract"
import { DuckDuckGoUrlConverter } from "./websites/duckduckgo"
import { GoogleUrlConverter } from "./websites/google"
import { YahooUrlConverter } from "./websites/yahoo"
import { YandexUrlConverter } from "./websites/yandex"

const allWebsites = [
    new GoogleUrlConverter(), 
    new BingUrlConverter(), 
    new DuckDuckGoUrlConverter(), 
    new YahooUrlConverter(), 
    new YandexUrlConverter()
]

const defaultWords = ["png"]

export async function getWords(): Promise<string[]> {
    try {
        const value = (await chrome.storage.sync.get("words"))?.words
        
        if(!value || !isStringsArray(value)) {
            setWords(defaultWords).then(() => {
                console.log("Updated storage to default words successfully")
            }).catch(() => {
                console.log("Failed to update storage to default words")
            })
 
            return defaultWords
        }

        return value
    } catch (ex) {
        console.error(ex)
        console.error("Returning default words")

        return defaultWords
    }
}

export async function setWords(words: string[]): Promise<void> {
    return chrome.storage.sync.set({
        "words": words
    })
}

export async function setWebsites(websites: WebsiteUrlConverter[]): Promise<void> {
    const websitesNames = websites.map((value) => value.name)

    return chrome.storage.sync.set({
        "websites": websitesNames
    })
}

export function websitesNamesToObject(websiteNames: string[]): WebsiteUrlConverter[] {
    const websiteMap = new Map(allWebsites.map((site) => [site.name, site]))

    return websiteNames.flatMap(name => {
        const site = websiteMap.get(name)

        if (site) return [site] 
        else return [] // after flattening empty objects (converted nulls) will be removed
    })
}


export async function getWebsites(): Promise<WebsiteUrlConverter[]> {
    try {
        const value = (await chrome.storage.sync.get("websites"))?.websites
        
        if(!value || !isStringsArray(value)) {
            setWebsites(allWebsites).then(() => {
                console.log("Updated storage to default websites successfully")
            }).catch(() => {
                console.log("Failed to update storage to default websites")
            })
 
            return allWebsites
        }

        return websitesNamesToObject(value)
    } catch (ex) {
        console.error(ex)
        console.error("Returning all websites")

        return allWebsites
    }
}

