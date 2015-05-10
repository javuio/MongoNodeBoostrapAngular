var mMainClient = require('./mdbMain.js');
var Collection = require('mDAL/mongodb/mongoCollection.js');


console.log('setup mongo db connection');

module.exports =  function(colName){
    return new Collection(mMainClient, colName)
};