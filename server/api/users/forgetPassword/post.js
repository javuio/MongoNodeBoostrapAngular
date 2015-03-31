var config = require( '../../../config.js' );
var apiHandler = require( '../../apiHandler.js' );
var errorResponse = require( '../../errorResponse.js' );
var users = require( '../../../dao/users.js' );
var tempAuthKeys = require( '../../../dao/tempAuthKeys.js' );
//var emails = require( 'mEmail/emails.js' );

function createAPI( app ) {
    var handler = new apiHandler( '/api/users/forgetPassword/', './users/forgetPassword/postTest.js' ); // TODO: Disabled forgetPassword test untill new forgetPassword is implemented

    handler.requiresAuthentication = false;

    handler.validateData = function ( req, res ) {
        return req.body.username != null;
    };

    handler.securityCheck = function ( req, res ) {
        return true;
    };

    handler.post = function ( req, res ) {
        var redirectPage = req.body.redirectPage;
        users.getUserByUsername( req.body.username, function ( errUser, resultUser ) {
                    if ( errUser )
                        errorResponse.sendError( res, 500, errUser );
                    else if ( resultUser && resultUser.userId != null ) {
                        tempAuthKeys.insertTempAuthKey( resultUser.userId, function ( errAuthKey, resultAuthKey ) {
                            if ( errAuthKey )
                                errorResponse.sendError( res, 500, errAuthKey );
                            else if ( resultAuthKey ) {

                                if ( redirectPage )
                                    templateParams.link += "&redirectPage=" + redirectPage;

                                if ( config.module == "admin" ) {

                                    ///implement mail client
                                    console.log ("implement mail client");
                                    res.send(204);

                                }
                                else if ( config.module == "controlPanel" ) {
                                    ///implement mail client
                                    console.log ("implement mail client");
                                    res.send(204);

                                }
                                else {
                                    errorResponse.sendError( res, 500, "forget password not supported" );
                                }

                            }
                            else {
                                errorResponse.sendError( res, 500, "TempAuthKey is null" );
                            }
                        });
                    }
                    else
                        errorResponse.sendNotFoundError( res, "email not found" );
                });

    };
    return handler;
};

module.exports = createAPI;