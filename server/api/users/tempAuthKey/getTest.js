var chai = require('chai')
    , chaiHttp = require('chai-http');
chai.use(chaiHttp);

var tempAuthKeys = require('../../../dao/tempAuthKeys.js');
var errorResponse  = require('../../errorResponse.js');
var apiUrl = '/api/users/tempAuthKey';

module.exports = {
    name: 'tempAuthKeyGet',
    test: function (app) {

        tempAuthKeys.insertTempAuthKey(1, function (errAuthKey, resultAuthKey) {
            if (errAuthKey)
                throw errAuthKey;
            else if (resultAuthKey) {
                //// test successful tempAuthKey
                chai.request(app)
                    .get(apiUrl)
                    .req(function (req) {
                        req.set('Content-Type', 'application/json');
                        req.query({
                            tempAuthKey: resultAuthKey.key
                        });
                    })
                    .res(function (res) {
                        chai.assert.equal(res.status, 200);
                        chai.expect(res).to.be.json;
                    });
            }
        });
    }
};