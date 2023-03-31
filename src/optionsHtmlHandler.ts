import { allWebsites, getWebsites, getWords, resetWebsites, resetWords, setWebsites, setWords } from "./options"

const websiteContainer = document.getElementById("websites")!
const wordsText = document.getElementById("words")! as HTMLInputElement
const statusDiv = document.getElementById("status")!
const saveButton = document.getElementById("save")! as HTMLButtonElement
const resetButton = document.getElementById("reset")! as HTMLButtonElement

async function updateOptions() {
  var enabledWebsites = new Map(allWebsites.map(website => [website.name, false]))
  const websitesFromSync = await (await getWebsites())
  const wordsFromSync = await getWords()

  websiteContainer.innerHTML = ""
  for (const website of websitesFromSync) {
    enabledWebsites.set(website.name, true)
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
      div.appendChild(input)
      div.appendChild(label)
  
      websiteContainer.appendChild(div)
  }

  wordsText.value = wordsFromSync.join(', ')
}

async function resetOptions() {
  const allPromises = [
    resetWebsites(),
    resetWords()
  ]
  
  Promise.all(allPromises)
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

  // convert map to array
  const enabledWebsites = [...websiteMap].filter(([key,value]) => value).map(([val]) => val)
  const words = wordsText.value.split(',').map((item) => item.trim()) as string[]

  const allPromises = [
    setWords(words),
    setWebsites(enabledWebsites)
  ]

  Promise.all(allPromises)
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

function setStatus(string: string) {
  statusDiv.textContent = string
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

saveButton.onclick = () => {
  saveOptions()
}

resetButton.onclick = () => {
  resetOptions()
}

updateOptions()
