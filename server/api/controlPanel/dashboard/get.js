/**
 * Created by Daniel on 1/1/2015.
 */

//var userDAO = require('../../dao/dashboard.js');

function createAPI(app) {
    var apiHandler = require('../../apiHandler.js');
    var dashboard = new apiHandler('/api/controlPanel/dashboard');
    dashboard.requiresPermission = 'ControlPanelAccess';

    dashboard.validateData = function (req, res) {
        return true;
    };

    dashboard.get = function (req, res) {
        console.log('got dash');
        var mockData =
        {
            stats: {
                total: 9999
                , count: 555
                , lowest: 11
                , highest: 88
                , newUsers: 77

            }
            , recentEvents: [
                {createdOn: new Date()-2,createdBy:"User 1",event:"Created a new javu.io project"}
                ,{createdOn: new Date()-1,createdBy:"User 2",event:"Ran a test run"}
                ,{createdOn: new Date(),createdBy:"User 3",event:"ready to start coding"}
            ]
        };
        res.json(mockData);
    };

    return dashboard;
}
module.exports = createAPI;

