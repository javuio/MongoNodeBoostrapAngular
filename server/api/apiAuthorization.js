var users = require('../dao/users.js');

apiAuthorization={
    checkUserPermission :function(permissionName,userId,callback)
    {
        users.checkUserPermission(permissionName,null/*user token*/ , userId , function(err,result){
            if(err)
                callback(err,null);
            else
            callback(null,result);
        });
    }
};

module.exports = apiAuthorization;