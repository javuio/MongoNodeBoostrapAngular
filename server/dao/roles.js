var mongoCollection = require("../da/mdbMainCollection.js");
var col = mongoCollection('roles');

module.exports = {
    getRoles: function (query, callback) {
        col.find(query,callback);
    }
    ,addRole: function (role, callback) {
        if(!(role.name))
            callback ("need role name");
        col.insert(role,callback);
    }

    , checkRolePermission: function (roleName,permissionName,callback) {
        this.getRoles( {name:roleName , permissions: { $elemMatch: permissionName }},callback);
    }
};
