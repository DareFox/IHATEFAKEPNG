import { SettingsV2, SettingsV2Impl } from "./v2/SettingsV2"

export type LatestSettings = SettingsV2

export const Settings = {
    getSettings: SettingsV2Impl.getSettings,
    getSettingsOrDefault: async () => { return (await SettingsV2Impl.getSettings() || SettingsV2Impl.defaultSettings) },
    setSettings: SettingsV2Impl.setSettings,
    deleteSettings: SettingsV2Impl.deleteSettings,
    defaultSettings: SettingsV2Impl.defaultSettings,
}