var apiHandler = require('../../apiHandler.js');
var users = require('../../../dao/users.js');
var cryptUtils = require('../../../utils/cryptUtils.js');
var tempAuthKeys = require('../../../dao/tempAuthKeys.js');
var errorResponse = require('../../errorResponse.js');

function createAPI(app) {
    var handler = new apiHandler('/api/users/resetPassword/', './users/resetPassword/postTest.js'); // TODO: Disabled resetPassword test untill new resetPassword is implemented

    handler.requiresAuthentication = false;

    handler.validateData = function (req, res) {
        return req.body.tempAuthKey && req.body.userToken && req.body.password;
    };
    
    handler.securityCheck = function (req, res) {
        return true;
    };
    
    handler.post = function (req, res) {
        if (handler.validateData(req, res)) {
            if (handler.securityCheck(req, res)) {
                tempAuthKeys.validateTempAuthKey(req.body.tempAuthKey, function (errValidateAuth, resultValidateAuth) {
                    if (errValidateAuth)
                        errorResponse.sendError(res, 500, errValidateAuth);
                    else
                        if (resultValidateAuth) {
                            //get the user for this tempAuthKey
                            var userId = resultValidateAuth.userId;

                            users.resetPassword(userId, req.body.userToken , req.body.password, function (errUpdatePassword, resultUpdatePassword) {
                                if (errUpdatePassword)
                                    errorResponse.sendError(res, 500, errUpdatePassword);
                                else if (resultUpdatePassword) {
                                    users.getUser( { username: resultUpdatePassword.username, password: req.body.password, ip: req.originatingAddress }, function (err, user) {
                                        if (err || !user) {
                                            errorResponse.sendNotFoundError(res, "Invalid username");
                                        }
                                        else if (user.deletedOn || !user.isActive) {
                                            errorResponse.sendAuthorizationError(res, "account suspended", null);
                                        }
                                        else {
                                            user.auth = cryptUtils.encryptAccessToken(user.accessToken);
                                            delete user.accessToken;

                                            res.json(user);
                                        }
                                    });
                                }
                                else
                                    errorResponse.sendValidationError(res, "Invalid username");
                            });

                            tempAuthKeys.deleteTempAuthKey(req.body.tempAuthKey,function(){});
                        }
                        else
                            errorResponse.sendNotFoundError(res, "AuthKey not found");
                });
            }
            else {
                errorResponse.sendAuthorizationError(res, "not authorised");
            }
        }
        else
            errorResponse.sendValidationError(res, "Invalid Parameters");
    };
    
    return handler;
};

module.exports = createAPI;