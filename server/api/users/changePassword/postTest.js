var chai = require('chai')
var chaiHttp = require('chai-http');
var apiTestHelper = require('../../apiTestHelper.js');
chai.use(chaiHttp);

var apiUrl = '/api/users/changePassword/';

module.exports = {
    name: 'changePasswordPost',
    test: function (app) {
        //apiTestHelper.testSecurePostWithMissingParameters(app, apiUrl);
      /*  
        // success
        chai.request(app)
        .post('/api/login/std')
        .req(function (req) {
            req.set('Content-Type', 'application/json');
            req.send({
                email: "test2@javu.io",
                password: "123456"
            });
        })
        .res(function (res) {
            // success
            chai.request(app)
             .post(apiUrl)
                .req(function (req) {
                req.set('content-type', 'application/json');
                req.set('auth', res.body.auth);
                req.set('usertoken', res.body.userToken);
                req.send({
                    currentPassword: '123456',
                    newPassword: '654321'
                });
            })
             .res(function (res) {
                chai.assert.equal(res.status, 204);

                //login again
                chai.request(app)
                .post('/api/login/std')
                .req(function (req) {
                    req.set('Content-Type', 'application/json');
                    req.send({
                        email: "test2@javu.io",
                        password: "654321"
                    });
                })
                .res(function (res) {
                  // success
                   chai.request(app)
                   .post(apiUrl)
                   .req(function (req) {
                        req.set('content-type', 'application/json');
                        req.set('auth', res.body.auth);
                        req.set('usertoken', res.body.userToken);
                        req.send({
                            currentPassword: '654321',
                            newPassword: '123456'
                        });
                    })
                  .res(function (res) {
                        chai.assert.equal(res.status, 204);
                    });
                });
            });
        });*/
    }
};