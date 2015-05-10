
$javuApp.service('uiManager', function () {
    var select={
        byId:document.getElementById
        ,byClass:document.getElementsByClassName
        ,byTag: document.getElementsByTagName
        ,query:document.querySelector
    };
    return {
        setPageTitle: function (title) {
            select.byId("pageTitle").innerHTML =title;
            return this;
        },
        hideSidebar: function () {
            select.byId('sidebar').classList.add('hide-left-bar');
            select.byId('main-content').classList.add('merge-left');
            select.byId('container').classList.remove('open-right-panel');

            select.query('.right-sidebar').classList.remove('open-right-bar');

            select.query('.header').classList.remove('merge-header');
            return this;
        },
        showSidebar: function () {
            select.byId('sidebar').classList.remove('hide-left-bar');
            select.byId('main-content').classList.remove('merge-left');
            return this;
        },
        disableMenu: function () {
            select.query('.sidebar-toggle-box .fa-bars').unbind("click");
            select.query('.toggle-right-box .fa-bars').unbind("click");
            return this;
        },
        enableMenu: function () {
            select.query('.sidebar-toggle-box .fa-bars').onclick = function (e) {

                var $sidebar = select.byId('sidebar');
                $sidebar.toggleClass('hide-left-bar');



                select.byId('main-content').toggleClass('merge-left');
                e.stopPropagation();

                select.byId('container').classList.remove('open-right-panel');

                select.query('.right-sidebar').classList.remove('open-right-bar');


                select.query('.header').classList.remove('merge-header');

            };
            select.query('.toggle-right-box .fa-bars').onclick =function (e) {
                select.byId('container').toggleClass('open-right-panel');
                select.query('.right-sidebar').toggleClass('open-right-bar');
                select.query('.header').toggleClass('merge-header');
                e.stopPropagation();
            };
            return this;
        },
        showBody: function () {
            select.query('html').classList.remove('hidden');
            return this;
        },
        showSpinner: function (message, ttl) {
            if( typeof(message) != "string")
                message = "please wait...";
            var $loading = $("#div-loading");
            $loading.html(message).classList.remove('hidden');
            if(ttl) {
                if(this.spinnerTimer) clearTimeout(this.spinnerTimer);

                this.spinnerTimer = setTimeout(function () {
                    $loading.classList.add('hidden');
                }, ttl);
            }

            return this;
        },
        hideSpinner: function () {
            select.query("#div-loading").classList.add('hidden');
            return this;
        },
        showTopMenu: function () {
            select.query(".top-menu").classList.remove('hidden');
            return this;
        },
        hideTopMenu: function () {
            select.query(".top-menu").classList.add('hidden');
            return this;
        },
        hideAlert:function () {
            select.query('[role=alert]').classList.add('hidden').html('');
        },
        showAlert: function (style, message, ctrl) {

            this.hideAlert();
            if(typeof(style)=="string" && typeof(message)=="undefined"){
                message = style;
                style="";
            }

            var $msgCtl = null;
            if (ctrl) {
                $msgCtl = select.query(ctrl);
                $msgCtl.attr('role', 'alert');
            }
            else
                $msgCtl = select.query('[role=alert]');

            $msgCtl.empty();
            $msgCtl.classList.add('hidden');

            $msgCtl.classList.remove();
            $msgCtl.classList.add('alert alert-dismissible alert-' + style);

            $msgCtl.append('<button type="button" class="close" data-dismiss="alert">' +
            '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            message);

            $msgCtl.slideDown(function () {
                select.query('html,body').animate({
                        scrollTop: $msgCtl.offset().top
                    },
                    'slow');
            });
        },
        reset: function(){
            this.hideSpinner();
            this.hideAlert();
            return this;
        }
    };


});