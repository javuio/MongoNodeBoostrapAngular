var config = require('../config.js');
var mongodb = require('mDAL/mongodb/mdb.js');
var mongoClient = new mongodb();

console.log('setup mongo db connection');
mongoClient.init(config.mongoDBServer);

module.exports = require('mDAL/mongodb/mongoDA.js') ;