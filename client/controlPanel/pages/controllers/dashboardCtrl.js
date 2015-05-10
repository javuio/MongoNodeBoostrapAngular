
$javuApp.controller('dashboardCtrl', ['$scope', '$http'
    , function ($scope, $http) {
        $http.get('api/controlPanel/dashboard').success(function (data) {
            $scope.stats = data.stats;
            $scope.stats.avg = Math.round( $scope.stats.total / $scope.stats.count,2);
            $scope.recentEvents= data.recentEvents;
        });
    }
]);


