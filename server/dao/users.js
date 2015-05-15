var cryptUtils = require('../utils/cryptUtils.js');
var MongoClient = require('mDAL/mongodb/mongoClient');
var mongoCollection = require("../da/mdbMainCollection.js");
var col = mongoCollection('users');
var async = require('async');

var roles = require('./roles.js');

module.exports = {
    getUsers: function (query, callback) {

        if(query.password)
            query.password = cryptUtils.hashStdPassword( query.password);

        if(typeof(query._id) == 'string')
            query._id = MongoClient.prototype.convertToObjectID(query._id);
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
    , checkUserPermission: function (permissionName, email, callback) {

        this.getUsers({email:email},function(err,data){
            if(err)
                callback(err);
            else if(data.length == 0)
                callback(null,false);
            else {
                var hasPermission = false;
                var setPermission = function(result){
                    if(result){
                        if(!hasPermission)
                            callback(null,true); // no need to continue to wait just call the callback ony the first time
                        hasPermission=result;
                    }
                };

                var fnCalls = [];
                for(var i in data[0].roles)
                    fnCalls.push(
                        function(){roles.checkRolePermission(data[0].roles[i], permissionName, setPermission);}
                    );

                async.parallel(fnCalls, function(){
                    if(!hasPermission) callback(null,false); // if was true would have sent callback above
                });
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

        var query = {_id:user._id};
        var delta = {
            firstName: user.firstName
            ,lastName: user.lastName
        };
        if(user.newPassword) {
            delta.password = cryptUtils.hashStdPassword(user.newPassword);
            query.password = cryptUtils.hashStdPassword(user.currentPassword);
        }
        col.update(query,{$set:delta}, callback);

    }
};
