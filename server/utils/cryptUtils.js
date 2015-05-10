var hash = require('./hash.js');
var config = require('../config.js');
var cryptr = require('cryptr');
var tokenCryptr = new cryptr(config.cypherKey);


module.exports = {
    hashStdPassword: function (password) {
        return hash.hashString(password);
    },
    hashFbPassword: function (privateDiscriminator) {
        return hash.hashString(privateDiscriminator, privateDiscriminator.split("").reverse().join(""));
    },
    encryptAccessToken: function (auth) {
        return tokenCryptr.encrypt(auth);
    },
    decryptAccessToken: function (auth) {
        return tokenCryptr.decrypt(auth);
    }
};


