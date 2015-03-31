var cryptUtils = require('../../../utils/cryptUtils.js');
var errorResponse = require('../../errorResponse.js');
var apiHandler = require('../../apiHandler.js');
var users = require('../../../dao/users.js');


function createAPI(app) {
    var handler = new apiHandler('/api/users/changePassword/', './users/changePassword/postTest.js');
    handler.requiresAuthentication = false;
    handler.validateData = function (req, res) {
        return req.body.currentPassword
            && req.body.newPassword;
    };

    handler.post = function (req, res) {
        users.updateCredentials(req.user.userId,req.user.username, req.body.currentPassword, req.user.username, req.body.newPassword, function (err, updateCredentialsUser) {
            if (err) {
                errorResponse.sendNotFoundError(res, "incorrect password");
            }
            else {
                if (updateCredentialsUser)
                    res.json({ auth: cryptUtils.encryptAccessToken(updateCredentialsUser.accessToken), userToken: updateCredentialsUser.userToken });
                else
                    errorResponse.sendValidationError(res, "user not found");
            }
        });

    };
    
    return handler;
}
module.exports = createAPI;