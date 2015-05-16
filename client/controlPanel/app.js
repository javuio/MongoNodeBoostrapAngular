///global
var $javuApp = angular.module('javu',['ngRoute','ui.bootstrap']);


$javuApp.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/', {templateUrl: '/pages/templates/dashboard.html'})
        .when('/login', {templateUrl: '/pages/templates/login.html'})
        .when('/page1', {templateUrl: '/pages/templates/page1.html'})
        .when('/profile',{templateUrl:'/pages/templates/profile.html'})
        .when('/register',{templateUrl:'/pages/templates/register.html'})
        .when('/forgotPassword', {templateUrl: '/pages/templates/forgotPassword.html'})
        .when('/404', {templateUrl: '/pages/templates/404.html'})
        .otherwise({redirectTo: '/404/404.html'});
}]);

function loadControllers(){
    var controllerFiles;
    if (window.location.hostname != 'localhost' ) {
        controllerFiles = ['/pages/controllers/all.min.js'];
    }
    else {
        controllerFiles = [
            "/scripts/framework/homePageProfileCtrl.js",
            "/pages/controllers/loginCtrl.js",
            "/pages/controllers/dashboardCtrl.js",
            "/pages/controllers/page1Ctrl.js",
            "/pages/controllers/registerCtrl.js",
            "/pages/controllers/profileCtrl.js"
        ]
    }

    for (var i = 0; i < controllerFiles.length; i++)
        document.write('<script type="text/javascript" src="' + controllerFiles[i] + '"></script>');


}
loadControllers();

$javuApp.controller('menuCtrl', ['$scope', function ($scope) {
    $scope.pages = [
        {title: 'Dashboard', hash: '', className: ''}
        , {title: 'Page 1', hash: 'page1', className: ''}
    ];
}]);



