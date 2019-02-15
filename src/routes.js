const settingFiltering = require('./setting_filtering')

module.exports = {
  register: function (app) {
    app.get('/', function (req, res) {
      res.json({
        application_name: 'Settings filtering API',
        routes: [
          {
            method: 'GET',
            path: '/filtered_settings/',
            description: 'Get settings available for the current components'
          }
        ]
      })
    })
    app.get('/filtered_settings/', function (req, res) {
      settingFiltering.getFilteredSettings().then(function (result) {
        res.json(result)
      }).catch(function (e) {
        res.status(500).json({ error: e.message })
      })
    })
  }
}
