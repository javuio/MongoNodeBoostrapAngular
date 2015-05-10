$javuApp.controller('profileCtrl', ['$scope','authManager', function ($scope,authManager) {

        $scope.user=authManager.getCurrentUser();
        authManager.currentUserChangedListeners.push(function(user){
            $scope.user=user;
        });

        $scope.logout = function () {
                authManager.logout();
                return false;
            };


    }]
);