
$javuApp.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/pages/templates/dashboard.html'
            , controller: 'dashboardCtrl'
        })
        .when('/login', {
            templateUrl: '/pages/templates/login.html'
            , controller: 'loginCtrl'
        })
        .when('/userManagement', {templateUrl: '/pages/templates/userManagement.html'})
        .when('/page1', {
            templateUrl: '/pages/templates/page1.html'
            //,controller:'page1Ctrl'
        })
        .when('/forgotPassword', {
            templateUrl: '/pages/templates/forgotPassword.html'
            , controller: 'forgotPasswordCtrl'
        })
        .when('/404', {
            templateUrl: '/pages/templates/404.html'
        })
        .otherwise({redirectTo: '/404'});
}]);

function loadControllers(){
    var controllerFiles;

    if (window.location == 'localhost' ) {
        controllerFiles = ['/pages/controllers/all.min.js'];
    }
    else {
        controllerFiles = [
            "/pages/controllers/loginCtrl.js"
            ,"/pages/controllers/dashboardCtrl.js"
            , "/pages/controllers/userManagementCtrl.js"
            , "/pages/controllers/page1Ctrl.js"
        ]
    }

    for (var i = 0; i < controllerFiles.length; i++)
        document.write('<script type="text/javascript" src="' + controllerFiles[i] + '"></script>');


}
loadControllers();

$javuApp.controller('menuCtrl', ['$scope', function ($scope) {
    $scope.pages = [
        {title: 'Dashboard', hash: '', className: ''}
        , {title: 'User Management', hash: 'userManagement', className: ''}
        , {title: 'Page 1', hash: 'page1', className: ''}
    ];
}]);



