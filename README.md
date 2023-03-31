# I HATE FAKE PNG
<p align="center">
  <img width="250" height="250" src="https://raw.githubusercontent.com/DareFox/IHATEFAKEPNG/main/png.png">
</p>
Browser extension that helps users filter out non-transparent images from their search results when using specific keywords like "png", to ensure they are only seeing transparent PNG images and not misleading or deceptive images with a white background.

## Supports
- Google
- Bing
- Yandex
- DuckDuckGO
- Yahoo

## Build from Source
### Requirements:
- Node v19
- NPM

### Steps:
- Run `npm i` to install all necessary libraries to build
- After that run `npm run pack`. It will build **unsigned** extension and pack them into zip files in `./web-ext-artifacts` for Firefox and Chrome
