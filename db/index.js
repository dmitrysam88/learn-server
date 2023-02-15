const { jsonDB } = require('./db');
const path = require('path');
const { getConfig } = require('../config');

const db = new jsonDB(path.join(__dirname, '..', getConfig().dbFilename));

module.exports = db;
