define(
    {
        init: function () {
            require(['masterPageController', 'adminManager', 'templateJs/jquery.easypiechart.min', 'moment'], function (masterPageController, adminManager, EasyPieChart, moment) {
                //masterPageController.kickOutIfNotLoggedIn();
                var currentAdmin = adminManager.getCurrentAdmin();
               
                api.get('api/admin/dashbaord', '', function (err, data) {
                    if (err)
                    {
                      //  showAlert('warning', err.message);
                    }
                    else
                    {
                    }
                });
            });
        }
    });