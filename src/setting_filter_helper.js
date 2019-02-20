
module.exports = {
  filterSettingsByComponents: function (settings, components) {
    return settings.filter((setting) => {
      return this.settingIsSatisfiedByComponents(setting, components)
    })
  },
  /**
   * Find if a setting Is Satisfied By Components using the name
   * note : I Could not find wich implementation was the faster than the other
   * This one performed better when "requires" was small and Components was big and sorted (most used at the begining)
   **/
  settingIsSatisfiedByComponents: function (setting, components) {
    return setting.requires == null ||
      setting.requires.length === 0 ||
      setting.requires.find((requirement) => {
        return components.find((component) => {
          return component.name === requirement
        })
      }) != null
  },
  /**
   * Find if a setting Is Satisfied By Components using the name
   * note : I Could not find wich implementation was the faster than the other
   * This one performed well but was a lot slower when Components was big and and-sorted (most used at the end or randomly distibuted)
   **/
  settingIsSatisfiedByComponents2: function (setting, components) {
    const componentsNames = components.map((component) => {
      return component.name
    })
    return setting.requires == null ||
      setting.requires.length === 0 ||
      setting.requires.find((requirement) => {
        return componentsNames.includes(requirement)
      }) != null
  },
  /**
   * Find if a setting Is Satisfied By Components
   * note : I Could not find wich implementation was the faster than the other
   * This one performed well bet slightly slower when "requires" was small
   **/
  settingIsSatisfiedByComponents3: function (setting, components) {
    return setting.requires == null ||
      setting.requires.length === 0 ||
      components.find((component) => {
        return setting.requires.includes(component.name)
      }) != null
  }
}
