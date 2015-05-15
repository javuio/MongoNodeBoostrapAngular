var cryptUtils = require('../../../utils/cryptUtils.js');
var errorResponse = require('../../errorResponse.js');
var apiHandler = require('../../apiHandler.js');
var users = require('../../../dao/users.js');


function createAPI(app) {
    var handler = new apiHandler('/api/users/user/update/', '');

    handler.requiresAuthentication= true;

    handler.validateData = function (req, res) {
        return req.body.user && req.body.user.userToken;
    };

    handler.post = function (req,res){

        var user = req.body.user;
        /*force these values*/
        user.lastUpdatedBy = req.user.userId;

        users.updateUser( user, function ( err, recordsUpdated ) {
            if ( err )
                errorResponse.sendNotFoundError( res, "",err );
            else if ( recordsUpdated==0)
                errorResponse.sendAuthenticationError( res, "no records updated");
            else
                res.json( {recordsUpdated: recordsUpdated  }); //success
        });

    };

    return handler;
}
module.exports = createAPI;