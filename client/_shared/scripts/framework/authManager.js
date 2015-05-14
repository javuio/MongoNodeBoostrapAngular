$javuApp.service('authManager', ['$http', function ($http) {
    var authManager ={
        _currentUser: null,
        currentUserChangedListeners:[],
        _notifyListenersAboutChange: function(){
            /*
          for(fn in authManager.currentUserChangedListeners)
            fn(authManager._currentUser);
            */
        },
        attemptAutoLogin: function () {
            var user = this.getCurrentUser();
            if (user)
                this._loggedIn(user);
            return user;
        },
        getCurrentUser: function () {
            if (this._currentUser)
                return this._currentUser;
            else if (localStorage.user) {
                var user;
                try {
                    user = JSON.parse(localStorage.user);
                    //this._loggedIn(user);
                }
                catch (e) {
                    this.setCurrentUser(null);
                }
                if (user && user.userToken)
                    return user;
                else {
                    localStorage.removeItem('user');
                    return null;
                }
            }
            else
                return null;
        },
        setCurrentUser: function (user) {
            var currentUser = user;
            if (user) {
                currentUser = authManager.getCurrentUser();
                if (currentUser && currentUser.userToken == user.userToken) {
                    currentUser.auth = user.auth;
                }
                else {
                    currentUser = user;
                }

                localStorage.setItem('user', JSON.stringify(currentUser));
            }
            else
                localStorage.removeItem('user');

            authManager._currentUser = currentUser;
            authManager._notifyListenersAboutChange();
        },
        isUserLoggedIn: function () {
            return (this.getCurrentUser() != null);
        },
        login: function (email, password, callback) {
            var t = this;
            return $http
                .post('/api/login', {email: email, password: password})
                .success(t.setCurrentUser);

        },
        logout: function () {
            if (this.getCurrentUser() != null) {
                //api.call( 1, 'users/logout', { token: authManager._currentUser.userToken });
                this.setCurrentUser(null);
            }
            localStorage.clear();
            this.logoutHandler();
        },
        logoutHandler: function () {

            window.location.hash='/login';
        } ,
        resetPassword: function (UserTokenname, callback) {
        }
    };
    return authManager;
}]);