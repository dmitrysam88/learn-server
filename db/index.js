const { jsonDB } = require('./db');
const path = require('path');

const db = new jsonDB(path.join(__dirname, '..', 'myDataBase.json'));

module.exports = db;
