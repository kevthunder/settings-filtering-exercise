const chai = require('chai')
const assert = chai.assert
const filtering = require('../src/setting_filtering.js')
const api = require('../src/api_helper.js')

describe('Setting Filtering', function () {
  const original = Object.assign({}, api)
  afterEach(function () {
    Object.assign(api, original)
  })

  it('can caculate Filtered Settings from the api payload', function () {
    api.getSettings = function () {
      return Promise.resolve([
        {
          'name': 'foo1',
          'requires': ['foo']
        },
        {
          'name': 'foo2',
          'requires': []
        },
        {
          'name': 'foo3',
          'requires': ['bar']
        }
      ])
    }
    api.getComponents = function () {
      return Promise.resolve([
        {
          'name': 'foo'
        }, {
          'name': 'baz'
        }
      ])
    }
    const expect = [
      {
        'name': 'foo1',
        'requires': ['foo']
      },
      {
        'name': 'foo2',
        'requires': []
      }
    ]
    return filtering.getFilteredSettings().then(function (result) {
      assert.deepEqual(result, expect)
    })
  })
})
