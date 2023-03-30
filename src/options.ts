import { isStringsArray } from "./typeChecks"
import { BingUrlConverter } from "./websites/bing"
import { WebsiteUrlConverter } from "./websites/abstract"
import { DuckDuckGoUrlConverter } from "./websites/duckduckgo"
import { GoogleUrlConverter } from "./websites/google"
import { YahooUrlConverter } from "./websites/yahoo"
import { YandexUrlConverter } from "./websites/yandex"
import Browser from "webextension-polyfill"

export const allWebsites = [
    new GoogleUrlConverter(), 
    new BingUrlConverter(), 
    new DuckDuckGoUrlConverter(), 
    new YahooUrlConverter(), 
    new YandexUrlConverter()
]

const defaultWords = ["png"]


export async function getWords(): Promise<string[]> {
    try {
        const value = (await Browser.storage.sync.get("words"))?.words
        
        if(!value || !isStringsArray(value)) {
            resetWords()
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
    return Browser.storage.sync.set({
        "words": words
    })
}

export async function resetWords(): Promise<void> {
    return setWords(defaultWords).then(() => {
        console.log("Updated storage to default words successfully")
    }).catch((e) => {
        console.error(e)
        console.error("Failed to update storage to default words")
    })
}

export async function setWebsites(websites: string[]): Promise<void> {
    return Browser.storage.sync.set({
        "websites": websites
    })
}

export async function setWebsitesObject(websitesObjects: WebsiteUrlConverter[]): Promise<void> {
    return setWebsites(websitesToNames(websitesObjects))
}

export async function getWebsites(): Promise<WebsiteUrlConverter[]> {
    try {
        const value = (await Browser.storage.sync.get("websites"))?.websites
        
        if(!value || !isStringsArray(value)) {
            resetWebsites()
            return allWebsites
        }

        return websitesNamesToObject(value)
    } catch (ex) {
        console.error(ex)
        console.error("Returning all websites")

        return allWebsites
    }
}

export async function resetWebsites(): Promise<void> {
    return setWebsitesObject(allWebsites).then(() => {
        console.log("Updated storage to default websites successfully")
    }).catch(() => {
        console.log("Failed to update storage to default websites")
    })
}

export function websitesToNames(websites: WebsiteUrlConverter[]): string[] {
    return websites.map((value) => value.name)
}

export function websitesNamesToObject(websiteNames: string[]): WebsiteUrlConverter[] {
    const websiteMap = new Map(allWebsites.map((site) => [site.name, site]))

    return websiteNames.flatMap(name => {
        const site = websiteMap.get(name)

        if (site) return [site] 
        else return [] // after flattening empty objects (converted nulls) will be removed
    })
}
