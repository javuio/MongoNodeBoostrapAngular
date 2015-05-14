var mongoCollection = require("../da/mdbMainCollection.js");
var col = mongoCollection('roles');

var cachedRoles= null;

var rolesObj = {
    cacheRoles : function(callback){
        this.getRoles({},function(err,roles) {
            if (err) {
                callback(err);
                return;
            }
            var c= {};
            for(var i = 0 ; i < roles.length ; i++)
                c[roles[i]._id] =roles[i].permissions;
            c.cachedOn = new Date();
            cachedRoles = c;

            if(callback)callback(null,cachedRoles);
        });
    }
    ,getRoles: function (query, callback) {
        col.find(query,callback);
    }
    ,addRole: function (role, callback) {
        if(!(role.name))
            callback ("need role name");
        col.insert(role,callback);
    }

    , checkRolePermission: function (roleName,permissionName,callback) {

        var hasPermission = function(roleName,permissionName){
            var result=false;
            if(cachedRoles == null || cachedRoles[roleName] == undefined)
                console.log('invalid role name:',roleName);
            else
                result= cachedRoles[roleName].indexOf(permissionName) >=0;
            return result;
        };

        if(cachedRoles == null
            || ((new Date()) - cachedRoles.cachedOn > 5000 ) /// cache for 5 seconds only
        )
            this.cacheRoles(function(){
                callback(null,hasPermission(roleName,permissionName));
            });
        else
            callback(null,hasPermission(roleName,permissionName))
    }
};

rolesObj.cacheRoles();
module.exports=rolesObj;