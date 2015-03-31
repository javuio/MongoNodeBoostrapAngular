var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var tempAuthKeys = require('../../../dao/tempAuthKeys.js');

var apiUrl = '/api/users/resetPassword/ ';

module.exports = {
    name: 'resetPasswordPost',
    test: function (app) {
/*
        tempAuthKeys.insertTempAuthKey(1, function (errAuthKey, resultAuthKey) {
            if (errAuthKey)
                chai.assert.equal(200, 500);
            else if (resultAuthKey) {

                // test successful resetPassword
                chai.request(app)
                    .post(apiUrl)
                    .req(function (req) {
                        req.set('Content-Type', 'application/json');
                        req.send({
                            tempAuthKey: resultAuthKey.key,
                            userToken: "11111111-1111-1111-1111-111111111111",
                            password: "123123"
                        });
                    })
                    .res(function (res) {
                        //chai.assert.equal(res.status, 200);
                        //chai.expect(res).to.be.json;
                    });
            }
        });
    */}
};