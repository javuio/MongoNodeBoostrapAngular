$javuApp.controller('homePageProfileCtrl', ['$scope','$rootScope', 'authManager', function ($scope,$rootScope, authManager) {

        $scope.user = authManager.getCurrentUser();
        $rootScope.$on('userChanged',function (e,user) {
            $scope.user = user;
        });

        $scope.logout = function () {
            authManager.logout();
            return false;
        };


    }]
);