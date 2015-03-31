
define('adminManager', {
    /*
        Keeps state of logged in user and caches login token in a cookie for 3 hours
        singleton
    */
    _currentAdmin: null,
    getAdminByCurrentUser: function (callback) {
        var slef = this;
        api.get('api/users/admins', {}, function (err, result) {
            if (err)
                callback(null);
            else {
                if (result) {
                        slef.setCurrentAdmin(result);
                        callback(result);
                    }
               
            }
        });
    }
    , getCurrentAdmin: function () {
        if (this._currentAdmin)
            return this._currentAdmin;
        else if (localStorage.admin) {
            var admin;
            try { admin = JSON.parse(localStorage.admin); }
            catch (e) { this.setCurrentAdmin(null); }
            if (admin && admin.userToken)
                return admin;
            else {
                localStorage.removeItem('admin');
                return null;
            }
        }
        else
            return null;
    }
    , setCurrentAdmin: function (admin) {
        this._currentAdmin = admin;
        if (admin)
            localStorage.setItem('admin', JSON.stringify(admin));
        else
            localStorage.removeItem('admin');
    }
  
});