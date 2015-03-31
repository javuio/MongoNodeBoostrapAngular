var config = require('../config.js');
var logger = require('../utils/logger.js');
var mysqlConnection = require("mDAL/mysql/mysqlDAL.js");
console.log('Connect to mysql DB');
module.exports= new mysqlConnection(config.mysqlConfig,logger);