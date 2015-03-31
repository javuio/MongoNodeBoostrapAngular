var mysql = require("../da/mysqlDataAccess.js");

module.exports = {
    insertTempAuthKey: function (userId, callback) {
        var cmd = mysql.createCommand('tempAuthKeys_insert');
        cmd.addParam("_userId", userId);
        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, data);
        });
    },
    validateTempAuthKey: function (key, callback) {
        var cmd = mysql.createCommand('tempAuthKeys_validateKey');
        cmd.addParam("_key", key);
        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, data);
        });
    },
    deleteTempAuthKey: function (key, callback) {
        var cmd = mysql.createCommand('tempAuthKeys_delete');
        cmd.addParam("_key", key);
        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, data);
        });
    }
};
