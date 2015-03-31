var cryptUtils = require('../../../utils/cryptUtils.js');
var errorResponse = require('../../errorResponse.js');
var apiHandler = require('../../apiHandler.js');
var users = require('../../../dao/users.js');


function createAPI(app) {
    var handler = new apiHandler('/api/users/user/', '');

    handler.validateData = function (req, res) {
        return req.body.email && req.body.password;
    };

    handler.get = function (req,res){
        users.getUser(req.body.email, req.body.password, function (err, user) {
            if ( err )
                errorResponse.sendAuthenticationError( res, "error while retrieve user", err );
            else if ( user == null )
                errorResponse.sendAuthorizationError( res, "user not found", null );
             else
                delete user.password;
                res.send( user ); //success
        });

    };

    return handler;
}
module.exports = createAPI;