var users = require('../dao/users.js');

apiAuthorization={
    checkUserPermission :function(permissionName,email,callback)
    {
        if(typeof(permissionName) != "undefined" && typeof(email) != "undefined")
            users.checkUserPermission(permissionName,email , function(err,result){
                if(err)
                    callback(err,null);
                else
                callback(null,result);
            });
        else
            throw ("apiAuthorization.checkUserPermission has invalid parameters");
    }
};

module.exports = apiAuthorization;