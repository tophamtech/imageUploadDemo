const express = require('express')
const config = require('./config.json')
const uploadRoutes = require('./routes/upload')
const downloadRoutes = require('./routes/download')
const log = require('./utils/logger')

const app = express()


// Express routes
app.use('/upload', uploadRoutes)
app.use('/download', downloadRoutes)


// Default 404 catch all 
app.use(function(req, res) {
  log.debug('Unknown route hit')
    res.status(404).json({
      message: "No such route exists"
    })
  });
  


app.listen(config.port, (err) => {
  if (err) {
    log.error('Something has gone wrong with app startup')
  } else {
    log.info(`App running on port: ${config.port}`)
  }

})

module.exports = app;