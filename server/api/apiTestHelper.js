var chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

module.exports = {
    testNonSecurePostWithMissingParameters: function (app, apiUrl) {
        chai.request(app)
            .post(apiUrl)
            .req(function (req) {
                req.set('Content-Type', 'application/json');
                req.send({
                });
            })
            .res(function (res) {
                chai.assert.equal(res.status, 400, apiUrl);
                chai.expect(res).to.be.json;
                chai.assert.equal(res.body.code, "VALIDATION", apiUrl);
            });
    },
    testSecurePostWithMissingParameters: function (app, apiUrl) {
        chai.request(app)
            .post(apiUrl)
            .req(function (req) {
                req.set('Content-Type', 'application/json');
                req.set('auth', '72785e675e7a7e7210315892895084df118559132ac2e23eb90ec8ef4ecbe1417e61b8f19921aa05201e33695b586b0a');
                req.set('userToken', 'd852cd69-5e21-11e4-b647-025041000001');
                req.send({
                });
            })
            .res(function (res) {
                chai.assert.equal(res.status, 400, apiUrl);
                chai.expect(res).to.be.json;
                chai.assert.equal(res.body.code, "VALIDATION", apiUrl);
            });
    },
    testBadAuthPost: function (app, apiUrl) {
        chai.request(app)
            .post(apiUrl)
            .req(function (req) {
                req.set('Content-Type', 'application/json');
                req.set('auth', 'FORBIDDEN');
                req.send({
                });
            })
            .res(function (res) {
                chai.assert.equal(res.status, 401, apiUrl); // TODO: Switch to 403 after authorization is complete
            });
    },
    testMissingAuthPost: function (app, apiUrl) {
        chai.request(app)
            .post(apiUrl)
            .req(function (req) {
                req.set('Content-Type', 'application/json');
                req.send({
                });
            })
            .res(function (res) {
                chai.assert.equal(res.status, 401, apiUrl);
            });
    }
}