var cryptUtils =  require('../../utils/cryptUtils.js');
var errorResponse = require('../errorResponse.js');
var apiHandler = require('../apiHandler.js');
var validator = require('../../utils/validator.js');
var users = require('../../dao/users.js');

function createAPI(app) {
    var handler = new apiHandler('/login', './login/postTest.js');
    handler.requiresAuthentication = false;
    
    handler.validateData = function (req, res) {
        return req.body && req.body.email && validator.isValidEmail(req.body.email)
            && req.body.password && req.body.password.length>1;
    };


    handler.post = function (req, res) {
        users.getUsers( { email: req.body.email, password: req.body.password }, function (err, users) {
            if (err || !users || users.length==0) {
                errorResponse.sendNotFoundError(res, "Invalid username or password");
            }
            else if (users[0].deletedOn || !users[0].isActive) {
                errorResponse.sendAuthorizationError(res, "account suspended", null);
            }
            else {
                var u = users[0];

                delete u.accessToken;
                delete u.password;

                u.auth = cryptUtils.encryptAccessToken(u.email);
                u.userToken = cryptUtils.encryptAccessToken(u._id);

                res.json(u);
            }
        });
    };
    
    return handler;
}
module.exports = createAPI;