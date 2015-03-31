var chai = require('chai')
var chaiHttp = require('chai-http');
var apiTestHelper = require('../../../apiTestHelper.js');
chai.use(chaiHttp);

var apiUrl = '/api/users/admins/';

module.exports = {
    name: 'adminUserGet',
    test: function (app) {
   /*     // success
        chai.request(app)
        .get(apiUrl)
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.set('auth', '72785e675e7a7e7210315892895084df118559132ac2e23eb90ec8ef4ecbe1417e61b8f19921aa05201e33695b586b0a');
            req.set('userToken', 'd852cd69-5e21-11e4-b647-025041000001');
          })
        .res(function (res) {
            chai.assert.equal(res.status, 403);
        });*/
    }
}