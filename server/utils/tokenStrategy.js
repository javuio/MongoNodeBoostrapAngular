//var hash = require('mHash/hash.js');
//var config = require('../config.js');
var passport = require('passport');
var tokenStrategy = require('passport-token').Strategy;
var cryptUtils = require('./cryptUtils.js');
var users = require('../dao/users.js');

module.exports=
 {
    createTokenStrategy: function () {
        return new tokenStrategy({ usernameHeader: 'userToken', tokenHeader: 'auth' },
            function (userToken, accessToken, done) {
                var decryptedAccessToken = undefined;
                try {
                    decryptedAccessToken = cryptUtils.decryptAccessToken(accessToken);
                }
                catch (ex) {
                    return done(null, false);
                }

                users.getUsers({ userToken: userToken, accessToken: decryptedAccessToken }, function (err, users) {
                    if (err)
                        return done(err);
                    else if (users.length == 0)
                        return done(null, false);
                    else
                        return done(null, users[0]);
                });

            });
    }
};

