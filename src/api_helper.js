const path = require('path')
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)

module.exports = {
  getSettings: function () {
    return readFile(path.resolve('fake_data/settings_api.json')).then(function (contents) {
      return JSON.parse(contents)
    })
  },

  getComponents: function () {
    return readFile(path.resolve('fake_data/components_api.json')).then(function (contents) {
      return JSON.parse(contents)
    })
  }
}
