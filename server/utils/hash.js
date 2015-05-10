var crypto = require("crypto");
var config = require('../config.js');
function hash() {
    this.hashConfigKey = null;
}

function hash(config){
    this.hashConfigKey = config.hash.hashConfigKey;
    if (!this.hashConfigKey) {
        throw new Error('cannot read hash configuration');
    }
}

hash.prototype = {
    hashString: function (data) {
        if(typeof(data) == "undefined") data='';
        if (!this.hashConfigKey) {
            throw new Error('cannot read hash configuration');
        }
        return crypto.createHmac("md5", this.hashConfigKey )
        .update(data)
        .digest("hex");
    }
};

module.exports = new hash(config);