var chai = require('chai')
var chaiHttp = require('chai-http');
var apiTestHelper = require('../apiTestHelper.js');
chai.use(chaiHttp);

var apiUrl = '/api/register';

module.exports = {
    test: function (app) {
        
        apiTestHelper.testNonSecurePostWithMissingParameters(app, apiUrl);
        
        // badPassword
        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: "CPUser@javu.io",
                password: "1",
                devicePlatform: "iOS",
                deviceToken: "2783478342347823890423893893489348934898912891289012"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 400);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.body.code, "duplicateUsername");
        });
        
/*
        // success
        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: 'test@javu' + new Date().getTime() + '.io',
                password: "1234$6",
                devicePlatform: "iOS",
                deviceToken: "2783478342347823890423893893489348934898912891289012"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 200);
            chai.assert.isDefined(res.body.auth);
            chai.assert.isNotNull(res.body.auth);
            chai.assert.isDefined(res.body.userToken);
            chai.assert.isNotNull(res.body.userToken);
        });

        
        // duplicateUsername
        chai.request(app)
        .post(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: "CPUser@javu.io",
                password: "1234$6",
                devicePlatform: "iOS",
                deviceToken: "2783478342347823890423893893489348934898912891289012"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 400);
            chai.expect(res).to.be.json;
            chai.assert.equal(res.body.code, "duplicateUsername");
        });
        */
    }
};



