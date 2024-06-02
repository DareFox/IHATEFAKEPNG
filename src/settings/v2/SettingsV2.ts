import Browser from "webextension-polyfill"
import { allWebsites, allWebsitesDict } from "../../websites/all"
import { Dictionary, isDictionary } from "../../utils/Dictionary"

const SETTINGS_V2_KEY = "settings_v2"

export type SettingsV2 = {
    version: 2
    words: string[]
    ignoreCase: boolean
    exactMatch: boolean
    websites: Dictionary<string, boolean>
}

const defaultSettings: SettingsV2 = {
    version: 2,
    words: ["png"],
    ignoreCase: true,
    exactMatch: true,
    websites: allWebsitesDict
}

function isSettingsV2(obj: any): obj is SettingsV2 {
    return (
        typeof obj === "object" &&
        obj !== null &&
        obj.version === 2 &&
        Array.isArray(obj.words) &&
        obj.words.every((word: any) => typeof word === "string") &&
        typeof obj.ignoreCase === "boolean" &&
        typeof obj.exactMatch === "boolean" &&
        isDictionary(obj.websites)
    );
}

async function getSettings(): Promise<SettingsV2 | undefined> {
    const settings = (await Browser.storage.sync.get(SETTINGS_V2_KEY))[SETTINGS_V2_KEY]
    if (settings === undefined) {
        console.log("SettingsV2 is not set")
        return undefined
    }
    if (isSettingsV2(settings)) {
        return settings
    }
    console.error("SettingsV2 has wrong data, returning undefined", settings)
    return undefined
}

async function setSettings(settings: SettingsV2): Promise<void> {
    const newSettings: Record<string, SettingsV2> = {}
    newSettings[SETTINGS_V2_KEY] = settings
    return Browser.storage.sync.set(newSettings)
}

async function deleteSettings(): Promise<void> {
    return Browser.storage.sync.remove(SETTINGS_V2_KEY)
}

export const SettingsV2Impl = {
    key: SETTINGS_V2_KEY,
    defaultSettings,
    getSettings,
    setSettings,
    deleteSettings,
    isSettingsV2,
}
