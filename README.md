# I HATE FAKE PNG
<p align="center">
  <img width="250" height="250" src="https://raw.githubusercontent.com/DareFox/IHATEFAKEPNG/main/png.png">
</p>
<h3 align="center">Remove non-transparent images from PNG search results.</h3>

This extension filters out non-transparent images in search results when your query includes words like "png"

You can customize:
- Which search engines the extension works on
- Which words trigger the transparent images only mode
- How words are matched

<h3 align="center"><b><i>Download links</i></b></h3>
<p align="center">
  <a href="https://chrome.google.com/webstore/detail/bmlibfnhnjgaonppkdpiehnlpeeaidnp"><img  width="150" Src="https://raw.githubusercontent.com/DareFox/IHATEFAKEPNG/main/.github/Chrome.png"> </a> <a href="https://addons.mozilla.org/en-US/firefox/addon/i-hate-fake-png/"><img width="150" Src="https://raw.githubusercontent.com/DareFox/IHATEFAKEPNG/main/.github/Firefox.png"></a>
</p>

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
