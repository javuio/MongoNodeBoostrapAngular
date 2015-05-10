var cryptUtils = require('../utils/cryptUtils.js');
var mongoCollection = require("../da/mdbMainCollection.js");
var col = mongoCollection('users');

var roles = require('./roles.js');

module.exports = {
    getUsers: function (query, callback) {

        if(query.password)
            query.password = cryptUtils.hashStdPassword( query.password);

        col.find(query,callback);

    }
    ,registerUser: function (user, callback) {
        if(!(user.username && user.password))
            callback ("username and password are required to register");
        col.insert(user,callback);
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

        this.getUsers({token:userToken,userId:userId},function(err,data){
            if(err)
                callback(err);
            else if(data.length == 0)
                callback(null,false);
            else {
                var kill = false;
                var threads=0;
                for(roleName in data[0].roles)
                    threads++;
                    role.checkRolePermission(roleName,permissionName,function(result){
                        threads--;
                        if(result){
                            if(kill) return;
                            callback(null, result);
                            kill=true;
                            return;
                        }
                    });
                while(threads)//dangerous
                    callback(null,false);

            }
        } );


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
