const helper = require('./setting_filter_helper')
const api = require('./api_helper')

module.exports = {
  getFilteredSettings: function () {
    return Promise.all([api.getSettings(), api.getComponents()]).then(function (SettingsAndComponents) {
      return helper.filterSettingsByComponents(...SettingsAndComponents)
    })
  }
}
