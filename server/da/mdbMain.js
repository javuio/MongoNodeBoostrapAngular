/**
 * Created by Daniel on 4/13/2015.
 */
var config = require('../config.js');
var logger = require('../utils/logger.js');

var MongoClient = require('mDAL/mongodb/mongoClient.js');
var mcMainClient = new MongoClient(config.mongoDBServer,logger);

module.exports =mcMainClient;