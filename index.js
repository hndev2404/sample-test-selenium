require('dotenv').config()
var addToPath = require('add-to-path');

addToPath([__dirname + '/drivers']);

exports.BROWSER = process.env.MOCHA_BROWSER || 'chrome';
exports.BASE_URL = process.env.TEST_BASE_URL || 'https://sandbox.moodledemo.net/';