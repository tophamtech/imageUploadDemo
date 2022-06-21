const log = require('loglevel');
const config = require('../config.json')


log.setDefaultLevel(config.loglevel)

module.exports = log