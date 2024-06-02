import { LatestSettings, Settings } from "../settings/Settings"
import { Dictionary } from "../utils/Dictionary"
import { allWebsites } from "../websites/all"

const websiteContainer = document.getElementById("websites")!
const wordsText = document.getElementById("words")! as HTMLInputElement
const ignoreCaseCheckbox = document.getElementById("ignoreCase")! as HTMLInputElement
const exactMatchCheckbox = document.getElementById("exactMatch")! as HTMLInputElement
const statusDiv = document.getElementById("status")!
const saveButton = document.getElementById("save")! as HTMLButtonElement
const resetButton = document.getElementById("reset")! as HTMLButtonElement

function setStatus(string: string) {
  statusDiv.textContent = string
}

async function updateOptions() {
  console.log("updating options")
  const settings = await Settings.getSettingsOrDefault()
  var enabledWebsites = new Map(allWebsites.map(website => [website.name, false]))
  const websitesFromSync = settings.websites
  const wordsFromSync = settings.words

  ignoreCaseCheckbox.checked = settings.ignoreCase
  exactMatchCheckbox.checked = settings.exactMatch

  websiteContainer.innerHTML = ""
  for (const [name, enabled] of Object.entries(websitesFromSync)) {
    enabledWebsites.set(name, enabled)
  }

  for (const [name,enabled] of enabledWebsites) {
      const input = document.createElement("input")
      input.type = "checkbox"
      input.id = name
      input.name = name
      input.checked = enabled

      const label = document.createElement("label")
      label.htmlFor = name
      label.textContent = name
  
      const div = document.createElement("div")
      div.classList.add("oneLineInputLabel")
      div.appendChild(input)
      div.appendChild(label)
  
      websiteContainer.appendChild(div)
  }

  wordsText.value = wordsFromSync.join(', ')
}

async function resetOptions() {
  Settings.setSettings(Settings.defaultSettings)
  .catch((e) => {
    console.error(e)
    setStatus(getErrorMessage(e))
  })
  .then(() => {
    setStatus("The settings have been reset")
  })
  .finally(() => {
    updateOptions()
  })
}

async function saveOptions() {
  const websiteMap = new Map(allWebsites.map(website => [website.name, false]))

  for (const website of websiteContainer.children) {
    const checkbox = website.getElementsByTagName("input")?.[0]
    const websiteName = checkbox.name

    websiteMap.set(websiteName, checkbox.checked)
  } 

  const websiteDict: Dictionary<string, boolean> = {}
  const words = wordsText.value.split(',').map((item) => item.trim()) as string[]

  websiteMap.forEach((val, key) => {
    websiteDict[key] = val
  })

  const oldSettings = await Settings.getSettingsOrDefault()
  
  const newSettings: LatestSettings = {
    version: oldSettings.version,
    words: words,
    ignoreCase: ignoreCaseCheckbox.checked,
    exactMatch: exactMatchCheckbox.checked,
    websites: websiteDict
  }

  console.log("Old settings:", oldSettings, "New settings:", newSettings)

  Settings.setSettings(newSettings)
    .catch((e) => {
      console.error(e)
      setStatus(getErrorMessage(e))
    })
    .then(() => {    
      setStatus("The settings have been saved")
    })
    .finally(() => {
      updateOptions()
    })
}



function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

saveButton.onclick = saveOptions
resetButton.onclick = () => {
  if (confirm("Are you sure you want to reset settings?")) {
    resetOptions()
  }
}

console.log("TEST TEST")
await updateOptions()
