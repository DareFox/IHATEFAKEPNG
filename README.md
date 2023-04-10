# I HATE FAKE PNG
<p align="center">
  <img width="250" height="250" src="https://raw.githubusercontent.com/DareFox/IHATEFAKEPNG/main/png.png">
</p>
<p align="center"><b><i>Download links</i></b></p>
<p align="center">
  <a href="https://chrome.google.com/webstore/detail/bmlibfnhnjgaonppkdpiehnlpeeaidnp"><img  width="150" Src="https://raw.githubusercontent.com/DareFox/IHATEFAKEPNG/main/.github/Chrome.png"> </a> <a href="https://addons.mozilla.org/en-US/firefox/addon/i-hate-fake-png/"><img width="150" Src="https://raw.githubusercontent.com/DareFox/IHATEFAKEPNG/main/.github/Firefox.png"></a>
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
