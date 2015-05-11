var users = require('../dao/users.js');

apiAuthorization={
    checkUserPermission :function(permissionName,email,callback)
    {
        users.checkUserPermission(permissionName,email , function(err,result){
            if(err)
                callback(err,null);
            else
            callback(null,result);
        });
    }
};

module.exports = apiAuthorization;