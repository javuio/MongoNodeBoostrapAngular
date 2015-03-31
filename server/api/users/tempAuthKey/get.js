var apiHandler = require('../../apiHandler.js');
var errorResponse = require('../../errorResponse.js');
var tempAuthKeys = require('../../../dao/tempAuthKeys.js');
var users = require('../../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/api/users/tempAuthKey/', './users/tempAuthKey/getTest.js'); // TODO: Disabled tempAuthKey test until new tempAuthKey is implemented

    handler.requiresAuthentication = false;

    handler.validateData = function (req, res) {
        return req.query.tempAuthKey;
    };

    handler.securityCheck = function (req, res) {
        return true;
    };

    handler.get = function (req, res) {
        if (handler.validateData(req, res)) {
            if (!handler.securityCheck(req, res))
                errorResponse.sendAuthorizationError(res, "not authorised");
            else {
                tempAuthKeys.validateTempAuthKey(req.query.tempAuthKey, function (errValidateAuth, resultValidateAuth) {
                    if (errValidateAuth)
                        errorResponse.sendError(res, 500, errValidateAuth);
                    else if (resultValidateAuth) {
                        users.getUserByUsername(resultValidateAuth.email, function (errUser, resultUser) {
                            if (errUser)
                                errorResponse.sendError(res, 500, errUser);
                            else if (resultUser) {
                                res.json({email: resultUser.username, userToken: resultUser.userToken});
                            }
                            else
                                errorResponse.sendNotFoundError(res, "user not found");
                        });
                    }
                    else
                        errorResponse.sendNotFoundError(res, "AuthKey not found");
                });
            }
        }
        else
            errorResponse.sendValidationError(res, "Invalid Parameters");
    };
    return handler;
}

module.exports = createAPI;