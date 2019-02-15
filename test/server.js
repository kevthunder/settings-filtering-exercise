const chai = require('chai')
const assert = chai.assert
const request = require('supertest')
const app = require('../src/server')
const api = require('../src/api_helper')

describe('GET /filtered_settings/', function () {
  const original = Object.assign({}, api)
  afterEach(function () {
    Object.assign(api, original)
  })

  it('can get settings available for the current components', function () {
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

    return request(app)
      .get('/filtered_settings/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert.deepEqual(response.body, expect)
      })
  })

  it('can return a proper error', function () {
    api.getSettings = function () {
      return Promise.reject(new Error('fake error'))
    }

    return request(app)
      .get('/filtered_settings/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(response => {
        assert.deepEqual(response.body, { error: 'fake error' })
      })
  })
})
