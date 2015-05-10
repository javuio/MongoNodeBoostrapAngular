/*
 module.run(function($http) {
 $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'
 });
 * */

// register the interceptor as a service
// helps pass creds to api
/// helps lick kickout unauthorized users
$javuApp.factory('httpSecurityInterceptor', function ($q) {
    return {
        // optional method
        'request': function (config) {

            if(config.url.indexOf('api/') in [0,1] ) {
                var user=localStorage.getItem('user');
                if(user){
                    user = JSON.parse(user);
                    config.headers.auth = user.auth;
                    config.headers.userToken = user.userToken;
                }

            }
            return config;
        },
        'response': function(response) {
            // do something on success
            return response;
        },
        'responseError': function (e) {
            if (e && (e.status == 401 || e.status == 403)) {
                //auth or userToken are not valid .. kick Out the user
                debugger;// !!! keep this debugger !!!
                window.location.hash ='login';
            }
            else {
                if (e.responseJSON && e.responseJSON.code)
                    e.code = e.responseJSON.code;
                else
                    e.code = e.status;

                if (e.responseJSON && e.responseJSON.message)
                    e.message = e.responseJSON.message;
                else
                    e.message = e.responseText;
            }
            if (console.error) console.error(e);

            return $q.reject(e);
        }
    };
});

/*
 $javuApp.run(function($http) {
 debugger;
 $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'
 });
 */
$javuApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpSecurityInterceptor');
}]);
