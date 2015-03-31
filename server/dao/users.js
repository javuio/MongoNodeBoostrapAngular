var cryptUtils = require('../utils/cryptUtils.js');
var mysql = require("../da/mysqlDataAccess.js");

module.exports = {
    getUser: function (query, callback) {
        var cmd = mysql.createCommand('users_select');
        cmd.addParam("_userId", query.userId);
        cmd.addParam("_userToken", query.userToken);
        cmd.addParam("_accessToken", query.accessToken);
        cmd.addParam("_username", query.username);
        cmd.addParam("_password", query.password?cryptUtils.hashStdPassword( query.password):'');
        cmd.addParam("_ipAddress", query.ip);
        cmd.addParam("_showDeleted", true);
        cmd.addParam("_showActiveOnly", false);
        
        cmd.getDataObject(function (err, data) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, data);
            }
        });
    },
    getUserById: function (userId, password, callback) {
        
        var cmd = mysql.createCommand('users_select');
        cmd.addParam("_userId", userId);
        cmd.addParam("_username", null);
        cmd.addParam("_password", null);
        
        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else if (data)
                callback(null, data);
            else
                callback(new Error("Invalid Username or Password"));
        });
    }
    , getUsers: function (callback) {
        
        var cmd = mysql.createCommand('users_select_all');
        cmd.getDataSet(function (err, data) {
            if (err)
                callback(err);
            else if (data)
                callback(null, data)
           
        });
    }
    
    ,registerUser: function (user, loginMethod, callback) {

        if(!(user.username && user.password))
            throw "username and password are required to register";
        var cmd = mysql.createCommand('users_insert');
        cmd.addParam("_username", user.username);
        cmd.addParam("_password", cryptUtils.hashStdPassword(user.password));
        cmd.addParam("_loginMethod", loginMethod);
        cmd.addParam("_firstName", user.firstName);
        cmd.addParam("_lastName", user.lastName);

        cmd.addParam("_roleName", user.roleName);
        
        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, data);
        });
    }
    ,getUserByUsername: function (username, callback) {
        
        var cmd = mysql.createCommand('users_select_by_username');
        cmd.addParam("_username", username);
        cmd.addParam("_showDeleted", 0);
        cmd.addParam("_showActiveOnly", 1);
        
        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err, null);
            else
                callback(null, data);
        });
    }
    ,resetPassword: function (userId, userToken, password, callback) {
        
        var cmd = mysql.createCommand('users_reset_password');
        cmd.addParam("_userId", userId);
        cmd.addParam("_userToken", userToken);
        cmd.addParam("_password", cryptUtils.hashStdPassword(password));
        
        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, data);
        });
    }
    , checkUserPermission: function (permissionName, userToken, userId, callback) {
        
        var cmd = mysql.createCommand('users_checkPermissions');
        cmd.addParam("_permissionName", permissionName);
        cmd.addParam("_userToken", userToken);
        cmd.addParam("_userId", userId);
        
        cmd.getScalar(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, data);
        });
    }
    , updateCredentials: function (userId ,username, password, newUsername, newPassword, callback) {

        var cmd = mysql.createCommand('users_update_credentials');
        cmd.addParam("_username", username);
        cmd.addParam("_password", cryptUtils.hashStdPassword(password));
        cmd.addParam("_newUsername", newUsername);
        cmd.addParam("_newPassword", cryptUtils.hashStdPassword(newPassword));

        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, data);
        });
    }
    , userRoles: function (username ,roleName, callback) {

        var cmd = mysql.createCommand('userRoles_insert');
        cmd.addParam("_username", username);
        cmd.addParam("_roleName", password);


        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, data);
        });
    }

    , updateUser: function (user, callback) {

        var cmd = mysql.createCommand('users_update');
        cmd.addParam("_userToken", user.userToken);
        cmd.addParam("_firstName", user.firstName);
        cmd.addParam("_lastName", user.lastName);
        cmd.addParam("_address", user.address);
        cmd.addParam("_city", user.city);
        cmd.addParam("_state", user.state);
        cmd.addParam("_zip", user.zip);
        cmd.addParam("_isActive", user.isActive);
        cmd.addParam("_lastUpdatedBy", user.lastUpdatedBy);

        cmd.getDataObject(function (err, data) {
            if (err)
                callback(err);
            else
                callback(null, user);
        });
    }
}
