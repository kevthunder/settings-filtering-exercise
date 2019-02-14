const chai = require('chai')
const assert = chai.assert
const apiHelper = require('../src/api_helper')

describe('API Helper', function () {
  it('can get settings', function () {
    return apiHelper.getSettings().then(function (result) {
      assert.isArray(result)
      result.forEach(function (item) {
        assert.isObject(item)
        assert.hasAllKeys(item, ['name', 'requires'])
      })
    })
  })
  it('can get components', function () {
    return apiHelper.getComponents().then(function (result) {
      assert.isArray(result)
      result.forEach(function (item) {
        assert.isObject(item)
        assert.hasAllKeys(item, ['name'])
      })
    })
  })
})
