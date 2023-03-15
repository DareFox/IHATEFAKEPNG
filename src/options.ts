import { isStringsArray } from "./typeChecks"

const defaultWords = ["png"]

export async function getWords(): Promise<string[]> {
    try {
        const value = (await chrome.storage.sync.get("words"))?.words
        
        if(!value || !isStringsArray(value)) {
            chrome.storage.sync.set({
                "words": defaultWords
            }).then(() => {
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