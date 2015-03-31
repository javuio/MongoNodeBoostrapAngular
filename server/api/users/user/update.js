var cryptUtils = require('../../../utils/cryptUtils.js');
var errorResponse = require('../../errorResponse.js');
var apiHandler = require('../../apiHandler.js');
var users = require('../../../dao/users.js');


function createAPI(app) {
    var handler = new apiHandler('/api/users/user/update/', '');
    handler.requiresPermission= false;
    handler.requiresAuthentication= true ;

    handler.validateData = function (req, res) {
        return req.body.user && req.body.user.userToken;
    };

    handler.post = function (req,res){

        var user = req.body.user;
        /*force these values*/
        user.lastUpdatedBy = req.user.userId;
        user.isActive = null; // keeps current setting

        users.updateUser( user, function ( err, updatedUser ) {
            if ( err )
                errorResponse.sendNotFoundError( res, "",err );
            else
                res.send( updatedUser); //success
        });

    };

    return handler;
}
module.exports = createAPI;