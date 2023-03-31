const {createWriteStream, mkdirSync, existsSync, copyFileSync, renameSync, unlinkSync} = require('fs');
const archiver = require('archiver');

const outputFolder = './web-ext-artifacts'
const files = [
  "README.md",
  "package.json",
  "package-lock.json",
  "LICENSE",
  "png.png",
  "manifest.json"
]
const folders = [
  "out"
]

async function genericPack(name) {
  if (!existsSync(outputFolder)){
    mkdirSync(outputFolder, { recursive: true });
  }

  const output = createWriteStream(`${outputFolder}/${name}.zip`);
  const archive = archiver('zip');

  output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function(err){
      throw err;
  });

  archive.pipe(output);

  folders.forEach(folder => {
    archive.directory(folder)
  })

  files.forEach(file => {
    archive.file(file)
  })

  return archive.finalize();
}

async function packChrome() {
  copyFileSync('./manifest-chrome.json', './manifest.json')
  await genericPack("chrome-ext-ihatefakepng")
  unlinkSync('./manifest.json')
}

async function packFireFox() {
  copyFileSync('./manifest-firefox.json', './manifest.json')
  await genericPack("firefox-ext-ihatefakepng")
  unlinkSync('./manifest.json')
}

async function main() {
  renameSync('./manifest.json', './manifest.json.backup')
  await packFireFox()
  await packChrome()
  renameSync('./manifest.json.backup', './manifest.json')
}

main()