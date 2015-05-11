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
            function (userToken, auth, done) {
                var email,id;
                try {
                    email = cryptUtils.decryptAccessToken(auth);
                    id= cryptUtils.decryptAccessToken(userToken);
                }
                catch (ex) {
                    return done(null, false);
                }

                //{ _id: userToken, accessToken: decryptedAccessToken }
                users.getUsers({ _id: id, email: email}, function (err, users) {
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

