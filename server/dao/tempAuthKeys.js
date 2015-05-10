var Col = require("../da/mdbMainCollection.js");
var col = new Col('tempAuthKeys');
var uuid = require('node-uuid');

module.exports = {
    insertTempAuthKey: function (userId, callback) {
        var expiresOn = new Date();
        expiresOn.setHours(expiresOn.getHours() + 3); // add 3 hours to now
        var doc = {
            _id:uuid.v4()
            ,userId :userId
            ,expiresOn : expiresOn
        };
        col.insert(doc,callback);
    },
    validateTempAuthKey: function (key, callback) {
        col.find({_id:key},callback);
    },
    deleteTempAuthKey: function (key, callback) {
        col.remove({_id:key},callback);
    }
};
