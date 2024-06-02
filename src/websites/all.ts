import { BingUrlConverter } from "../websites/bing"
import { WebsiteUrlConverter } from "../websites/abstract"
import { DuckDuckGoUrlConverter } from "../websites/duckduckgo"
import { GoogleUrlConverter } from "../websites/google"
import { YahooUrlConverter } from "../websites/yahoo"
import { YandexUrlConverter } from "../websites/yandex"
import { Dictionary } from "../utils/Dictionary"

export const allWebsites: WebsiteUrlConverter[] = [
    new GoogleUrlConverter(), 
    new BingUrlConverter(), 
    new DuckDuckGoUrlConverter(), 
    new YahooUrlConverter(), 
    new YandexUrlConverter()
]

export const allWebsitesMap = new Map(allWebsites.map((site) => [site.name, site]))
export const allWebsitesDict = (allWebsites).reduce((obj, key) => {
    obj[key.name] = true;
    return obj;
}, {} as Dictionary<string, boolean>)

/**
 * Converts an array of website names to an array of WebsiteUrlConverter objects.
 * 
 * @param websiteNames - An array of website names to be converted.
 * @returns An array of WebsiteUrlConverter objects corresponding to the given website names.
 */
export function websiteNamesToObject(websiteNames: string[]): WebsiteUrlConverter[] {
    return websiteNames.flatMap(name => {
        const site = allWebsitesMap.get(name)

        if (site) return [site] 
        else return [] // after flattening empty objects (converted nulls) will be removed
    })
}

/**
 * Converts a dictionary of website names and their enabled status to an array of WebsiteUrlConverter objects.
 * 
 * @param dict - A dictionary with website names as keys and a boolean indicating if the website is enabled.
 * @returns An array of WebsiteUrlConverter objects for the websites that are enabled.
 */
export function dictionaryToWebsites(dict: Dictionary<string, boolean>): WebsiteUrlConverter[] {
    const websites: WebsiteUrlConverter[] = []
    for (const [name, enabled] of Object.entries(dict)) {
        if (!enabled) continue
        const web = allWebsitesMap.get(name)
        if (web) websites.push(web)
    }
    return websites
}

/**
 * Merges two dictionaries of website names and their enabled status into a single dictionary.
 * If a website name is present in both dictionaries, the enabled status is set to true if either dictionary has it set to true.
 * 
 * @param dict1 - The first dictionary with website names as keys and a boolean indicating if the website is enabled.
 * @param dict2 - The second dictionary with website names as keys and a boolean indicating if the website is enabled.
 * @returns A new dictionary with merged website names and their enabled status.
 */
export function unionWebsiteDict(dict1: Dictionary<string, boolean>, dict2: Dictionary<string, boolean>): Dictionary<string,boolean> {
    const newDict: Dictionary<string, boolean> = {}

    for (const key1 in dict1) {
        const value1 = dict1[key1]
        const newDictValue = newDict[key1]

        if (typeof newDictValue === "undefined") {
            newDict[key1] = value1
        } else {
            if (value1) {
                newDict[key1] = value1
            }
        }
    }

    for (const key2 in dict2) {
        const value2 = dict2[key2]
        const newDictValue = newDict[key2]

        if (typeof newDictValue === "undefined") {
            newDict[key2] = value2
        } else {
            if (value2) {
                newDict[key2] = value2
            }
        }
    }

    return newDict
}


/**
 * Merges two dictionaries of website names and their enabled status into a single dictionary.
 * If a website name is present in both dictionaries, the enabled status from the first dictionary is used.
 * 
 * @param dict1 - The first dictionary with website names as keys and a boolean indicating if the website is enabled.
 * @param dict2 - The second dictionary with website names as keys and a boolean indicating if the website is enabled.
 * @returns A new dictionary with merged website names and their enabled status.
 */
export function mergeWebsiteDict(dict1: Dictionary<string, boolean>, dict2: Dictionary<string, boolean>): Dictionary<string,boolean> {
    const newDict: Dictionary<string, boolean> = {}

    for (const key1 in dict1) {
        newDict[key1] = dict1[key1]
    }

    for (const key2 in dict2) {
        const newDictValue = newDict[key2]
        if (typeof newDictValue === "undefined") {
            newDict[key2] = dict2[key2]
        }
    }

    return newDict
}