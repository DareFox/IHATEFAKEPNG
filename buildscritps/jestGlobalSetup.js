module.exports = function() {
    global.chrome = require("sinon-chrome")
    global.chrome.runtime.id = "testid"
}