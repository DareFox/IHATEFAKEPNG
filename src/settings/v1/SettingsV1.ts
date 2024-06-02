import Browser from "webextension-polyfill"
import { isStringsArray } from "../../utils/typeChecks"

export type SettingsV1 = {
    version: 1
    words: string[] | null
    websites: string[] | null
}

const WEBSITES_KEY = "websites"
const WORDS_KEY = "words"

async function getWebsites(): Promise<string[] | null> {
    try {
        const value = (await Browser.storage.sync.get(WEBSITES_KEY))?.websites
        
        if(!value || !isStringsArray(value)) {
            return null
        }

        return value
    } catch (ex) {
        console.error(ex)
        console.error("Failed to get websites from SettingsV1")

        return null
    }
}

async function getWords(): Promise<string[] | null> {
    try {
        const value = (await Browser.storage.sync.get(WORDS_KEY))?.words
        
        if(!value || !isStringsArray(value)) {
            return null
        }

        return value
    } catch (ex) {
        console.error(ex)
        console.error("Failed to get words from SettingsV1")

        return null
    }
}

async function getSettings(): Promise<SettingsV1> {
    const websites = await getWebsites()
    const words = await getWords()
    return {
        version: 1,
        websites: websites,
        words: words
    }
}

async function deleteSettings(): Promise<void> {
    await Browser.storage.sync.remove(WEBSITES_KEY)
    await Browser.storage.sync.remove(WORDS_KEY)
}

export const SettingsV1Impl = {
    getSettings,
    deleteSettings,
}