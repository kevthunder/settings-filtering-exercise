const express = require('express')
const app = express()
const routes = require('./routes')

routes.register(app)

module.exports = app
