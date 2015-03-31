var chai = require('chai');
var chaiHttp = require('chai-http');
var apiTestHelper = require('../../apiTestHelper.js');
chai.use(chaiHttp);

var apiUrl = '/api/users/forgetPassword/ ';

module.exports = {
    name: 'forgetPasswordPost',
    test: function (app) {
        //  apiTestHelper.testNonSecurePostWithMissingParameters(app, apiUrl);
        
        // test successful forgetPassword
        chai.request(app)
        .post('/api/users/forgetPassword')
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                username: "fb@javu.io"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 204);
        });
        
        //test unsuccessful forgetPassword
        chai.request(app)
        .post('/api/users/forgetPassword')
        .req(function (req) {
            req.set('Content-Type', 'application/json');
                req.set('auth', '72785e675e7a7e7210315892895084df118559132ac2e23eb90ec8ef4ecbe1417e61b8f19921aa05201e33695b586b0a');
                req.set('userToken', 'd852cd69-5e21-11e4-b647-025041000001');
            req.send({
                username: "abcdabcd@abcdabcd.com"
            });
        })
        .res(function (res) {
            chai.assert.equal(res.status, 404);
        });
        
        //test missing param
        chai.request(app)
        .post('/api/users/forgetPassword')
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({});
        })
        .res(function (res) {
            chai.assert.equal(res.status, 400);
        });
    }
}