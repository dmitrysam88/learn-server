const { JsonDB, Config } = require('node-json-db');

const db = new JsonDB(new Config('myDataBase', true, false, '/'));

module.exports = db;
