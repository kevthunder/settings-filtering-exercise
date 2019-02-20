const chai = require('chai')
const assert = chai.assert
const filteringHelper = require('../src/setting_filter_helper')

describe('Setting Filter Helper', function () {
  it('keeps a setting that have an empty requirement', function () {
    const setting = {
      'name': 'foo',
      'requires': []
    }
    const components = [
      {
        'name': 'foo'
      },
      {
        'name': 'bar'
      }
    ]
    assert.isTrue(filteringHelper.settingIsSatisfiedByComponents(setting, components))
  })

  it('keeps a setting that have an empty requirement - with no components', function () {
    const setting = {
      'name': 'foo',
      'requires': []
    }
    const components = []
    assert.isTrue(filteringHelper.settingIsSatisfiedByComponents(setting, components))
  })

  it('keeps a setting that Contains at least one element present in the components', function () {
    const setting = {
      'name': 'foo',
      'requires': ['foo', 'other']
    }
    const components = [
      {
        'name': 'foo'
      },
      {
        'name': 'bar'
      }
    ]
    assert.isTrue(filteringHelper.settingIsSatisfiedByComponents(setting, components))
  })

  it('keeps a setting that Contains at least one element present in the components - with many matching', function () {
    const setting = {
      'name': 'foo',
      'requires': ['foo', 'bar']
    }
    const components = [
      {
        'name': 'foo'
      },
      {
        'name': 'bar'
      }
    ]
    assert.isTrue(filteringHelper.settingIsSatisfiedByComponents(setting, components))
  })

  /**
   * This is where I tried to determine wich implementation of settingIsSatisfiedByComponents was better.
   * By moving where bigArray was around requires and components, each implementation would sometime be faster or slower
   **/
  this.slow(10000)
  it.skip('is fast', function () {
    const bigArray = Array.apply(null, { length: 1000 }).map(Number.call, Number)
    const setting = {
      'name': 'foo',
      'requires': [].concat([
        'foo', 'bar'
      ])
    }
    const components = [].concat(bigArray, [
      'foo', 'bar'
    ]).map((name) => {
      return { 'name': name }
    })
    let i

    console.time('settingIsSatisfiedByComponents')
    for (i = 0; i < 100000; i++) {
      assert.isTrue(filteringHelper.settingIsSatisfiedByComponents(setting, components))
    }
    console.timeEnd('settingIsSatisfiedByComponents')

    console.time('settingIsSatisfiedByComponents2')
    for (i = 0; i < 100000; i++) {
      assert.isTrue(filteringHelper.settingIsSatisfiedByComponents2(setting, components))
    }
    console.timeEnd('settingIsSatisfiedByComponents2')

    console.time('settingIsSatisfiedByComponents3')
    for (i = 0; i < 100000; i++) {
      assert.isTrue(filteringHelper.settingIsSatisfiedByComponents3(setting, components))
    }
    console.timeEnd('settingIsSatisfiedByComponents3')
  })

  it('filter out a setting with requirement that Contains at no element present in the components', function () {
    const setting = {
      'name': 'foo',
      'requires': ['foo']
    }
    const components = [
      {
        'name': 'baz'
      }
    ]
    assert.isFalse(filteringHelper.settingIsSatisfiedByComponents(setting, components))
  })

  it('filter out a setting with requirement that Contains at no element present in the components - with many requirement', function () {
    const setting = {
      'name': 'foo',
      'requires': ['foo', 'bar']
    }
    const components = [
      {
        'name': 'foob'
      },
      {
        'name': 'baz'
      }
    ]

    assert.isFalse(filteringHelper.settingIsSatisfiedByComponents(setting, components))
  })

  it('filter out a setting with requirement when there is no components', function () {
    const setting = {
      'name': 'foo',
      'requires': ['foo', 'bar']
    }
    const components = []
    assert.isFalse(filteringHelper.settingIsSatisfiedByComponents(setting, components))
  })

  it('can filter many settings', function () {
    const settings = [
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
    ]
    const components = [
      {
        'name': 'foo'
      }, {
        'name': 'baz'
      }
    ]
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
    assert.deepEqual(filteringHelper.filterSettingsByComponents(settings, components), expect)
  })

  it('can filter many settings when there is no components', function () {
    const settings = [
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
    ]
    const components = [
    ]
    const expect = [
      {
        'name': 'foo2',
        'requires': []
      }
    ]
    assert.deepEqual(filteringHelper.filterSettingsByComponents(settings, components), expect)
  })

  it('return en empty array when there is no settings', function () {
    const settings = []
    const components = [
      {
        'name': 'foo'
      }, {
        'name': 'baz'
      }
    ]
    const expect = []
    assert.deepEqual(filteringHelper.filterSettingsByComponents(settings, components), expect)
  })
})
