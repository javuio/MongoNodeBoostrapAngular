var chai = require('chai')
var chaiHttp = require('chai-http');
var apiTestHelper = require('../apiTestHelper.js');
chai.use(chaiHttp);

var apiUrl = '/api/login';

module.exports = {
    test: function (app) {
        
        apiTestHelper.testNonSecurePostWithMissingParameters(app, apiUrl);
        
        // success
        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: "CPUser@javu.io",
                password: "123456"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 200);
            chai.assert.isDefined(res.body.auth);
            chai.assert.isNotNull(res.body.auth);
            chai.assert.isDefined(res.body.userToken);
            chai.assert.isNotNull(res.body.userToken);
            //chai.assert.equal(res.body.userToken, 'd852cd69-5e21-11e4-b647-025041000001');
            //chai.assert.equal(res.body.auth, '72785e675e7a7e7210315892895084df118559132ac2e23eb90ec8ef4ecbe1417e61b8f19921aa05201e33695b586b0a');
        });


        // unauthorized
        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: "CPUser@javu.io",
                password: "xxxxxx"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 404);
        });
    }
}



