var apiHandler = require( '../../apiHandler.js' );
var errorResponse = require( '../../errorResponse.js' );
var users = require( '../../../dao/users.js' );

function createAPI( app ) {
    var handler = new apiHandler( '/api/admin/dashboard', '' );

    handler.requiresPermission = "AdminPortal";

    handler.validateData = function ( req, res ) {
        return true;
    };

    handler.securityCheck = function ( req, res ) {
        return true;
    };

    handler.get = function ( req, res ) {
        if ( handler.validateData( req, res ) ) {
            if ( handler.securityCheck( req, res ) ) {

            }
            else
                errorResponse.sendAuthorizationError( res, "not authorised" );
        }
        else
            errorResponse.sendValidationError( res, "Invalid Parameters" );
    }
    return handler;
};

module.exports = createAPI;