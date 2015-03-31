var cryptUtils = require( '../../../../utils/cryptUtils.js' );
var errorResponse = require( '../../../errorResponse.js' );
var apiHandler = require( '../../../apiHandler.js' );
var users = require( '../../../../dao/users.js' );

function createAPI( app ) {
    var handler = new apiHandler( '/api/users/admins/updateUser/', './users/admins/updateUser/postTest.js' );
    handler.requiresPermission = 'AdminPortal';

    handler.validateData = function ( req, res ) {
        return req.body.email && req.body.firstName && req.body.lastName;
    };


    handler.post = function ( req, res ) {

            users.getUserByUsername( req.body.email, function ( err, user ) {
                if ( err ) {
                    return errorResponse.sendAuthenticationError( res, "error while retrieve user", err );
                }
                else if ( user == null ) {
                    errorResponse.sendAuthorizationError( res, "user not found", null );
                }
                else {
                    users.updateUser( user, function ( err, updateCredentialsUser ) {
                        if ( err ) {
                            errorResponse.sendNotFoundError( res, "" );
                        }
                        else {
                            if ( req.body.password && req.body.password.length > 0 ) {

                                users.resetPassword( user.userId, user.userToken, req.body.password, function ( err, data ) {
                                    if ( err ) {
                                        errorResponse.sendNotFoundError( res, "" );
                                    }
                                    else {
                                        res.send( 200 ); //success
                                    }
                                });
                            }
                            else {
                                res.send( 200 ); //success
                            }
                        }
                    });
                }
            });

    };

    return handler;
}
module.exports = createAPI;