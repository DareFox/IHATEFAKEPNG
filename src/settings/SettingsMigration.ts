import { Dictionary } from "../utils/Dictionary";
import { allWebsitesDict, mergeWebsiteDict } from "../websites/all";
import { LatestSettings, Settings } from "./Settings";
import { SettingsV1, SettingsV1Impl } from "./v1/SettingsV1";
import { SettingsV2, SettingsV2Impl } from "./v2/SettingsV2";


function convert(settings: SettingsV1): SettingsV2 {
    return {
        version: SettingsV2Impl.defaultSettings.version,
        words: settings.words || SettingsV2Impl.defaultSettings.words,
        exactMatch: SettingsV2Impl.defaultSettings.exactMatch,
        ignoreCase: SettingsV2Impl.defaultSettings.ignoreCase,
        websites: settings.websites?.reduce((obj, key) => {
            obj[key] = true;
            return obj;
        }, {} as Dictionary<string, boolean>) || SettingsV2Impl.defaultSettings.websites
    }
}

async function saveLatest(settings: LatestSettings) {
    return SettingsV2Impl.setSettings(settings)
}

async function migrate() {
    console.log("Starting migration")
    console.log("Checking if need to convert settings")
    const currentSettings = await Settings.getSettings()
    const settingsV1 = await SettingsV1Impl.getSettings()
    

    if (currentSettings) {
        console.log("No need to convert settings")
    } else if (settingsV1.words != null || settingsV1.websites != null) {
        console.log("SettingsV1 exists, converting it to latest")
        const v2 = convert(settingsV1)
        await saveLatest(v2)
        await SettingsV1Impl.deleteSettings()
        console.log("Migrated from V1 to latest settings")
    } else {
        console.log("Creating default settings")
    }

    console.log("Trying to update websites")
    await addNewWebsites()

    console.log("Finished migration")
}

async function addNewWebsites() {
    const currentSettings = (await Settings.getSettingsOrDefault())
    const updatedWebsites = mergeWebsiteDict(currentSettings.websites, allWebsitesDict)
    console.log("Current settings", currentSettings.websites, "Updated websites", updatedWebsites)
    currentSettings.websites = updatedWebsites
    
    await Settings.setSettings(currentSettings)
}

export const SettingsMigration = {
    migrate
}