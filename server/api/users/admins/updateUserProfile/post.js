var cryptUtils = require( '../../../../utils/cryptUtils.js' );
var errorResponse = require( '../../../errorResponse.js' );
var apiHandler = require( '../../../apiHandler.js' );
var users = require( '../../../../dao/users.js' );

function createAPI( app ) {
    var handler = new apiHandler( '/api/users/admins/updateUserProfile/', './users/admins/updateUserProfile/postTest.js' );
    handler.requiresPermission = 'AdminPortal';
    handler.validateData = function ( req, res ) {
        return true;
    }

    handler.securityCheck = function ( req, res ) {
        return true;
    }
    handler.post = function ( req, res ) {
        if ( handler.validateData( req, res ) ) {
            users.getUserByUsername( req.user.username, function ( err, user ) {
                if ( err ) {
                    return errorResponse.sendAuthenticationError( res, "unable to login user", err );
                }
                else if ( user ==null) {
                    errorResponse.sendAuthorizationError( res, "user not found", null );
                }
                else {
                        users.updateUser( req.headers.usertoken, req.body.firstName, req.body.lastName, user.address, user.city, user.state, user.zip, user.isActive, user.userId, function ( err, updateCredentialsUser ) {
                        if ( err ) {
                            errorResponse.sendNotFoundError( res, "" );
                        }
                        else {
                            res.send( 200 ); //success
                        }
                    });
                }
            });

        }
        else
            errorResponse.sendValidationError( res, "Invalid Parameters" );
    };

    return handler;
}
module.exports = createAPI;