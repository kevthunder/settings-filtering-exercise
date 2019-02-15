
module.exports = {
  filterSettingsByComponents: function (settings, components) {
    return settings.filter((setting) => {
      return this.settingIsSatisfiedByComponents(setting, components)
    })
  },
  settingIsSatisfiedByComponents: function (setting, components) {
    return setting.requires == null ||
      setting.requires.length === 0 ||
      setting.requires.find(function (requirement) {
        return components.find(function (component) {
          return component.name === requirement
        })
      }) != null
  }
}
