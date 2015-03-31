
define('uiManager', function () {
    var uiManager = {
        setPageTitle: function (title) {
            $("#pageTitle:first").html(title);
            return this;
        },
        hideSidebar: function () {
            $('#sidebar:first').addClass('hide-left-bar');
            $('#main-content:first').addClass('merge-left');
            $('#container:first').removeClass('open-right-panel');

            $('.right-sidebar:first').removeClass('open-right-bar');

            $('.header:first').removeClass('merge-header');
            return this;
        },
        toggleSidebar:function(){
            if($('#sidebar:first').is(":visible"))
                this.hideSidebar();
            else
            this.showSidebar();
        },
        showSidebar: function () {
            $('#sidebar').removeClass('hide-left-bar');
            $('#main-content').removeClass('merge-left');
            return this;
        },
        disableMenu: function () {
            $('.sidebar-toggle-box .fa-bars').unbind("click");
            $('.toggle-right-box .fa-bars').unbind("click");
            return this;
        },
        enableMenu: function () {
            $('.sidebar-toggle-box .fa-bars').click(function (e) {

                var $sidebar = $('#sidebar:first')
                $sidebar.toggleClass('hide-left-bar');



                $('#main-content').toggleClass('merge-left');
                e.stopPropagation();

                $('#container:first').removeClass('open-right-panel');

                $('.right-sidebar:first').removeClass('open-right-bar');


                $('.header:first').removeClass('merge-header');

            });
            $('.toggle-right-box .fa-bars').click(function (e) {
                $('#container:first').toggleClass('open-right-panel');
                $('.right-sidebar:first').toggleClass('open-right-bar');
                $('.header:first').toggleClass('merge-header');
                e.stopPropagation();
            });
            return this;
        },
        showBody: function () {
            var $html = $('html:first');
            if ($html.hasClass('hidden'))
                $html.hide().removeClass('hidden').fadeIn('fast');
            return this;
        },
        showSpinner: function (message, ttl) {
            if( typeof(message) != "string")
                message = "please wait...";
            var $loading = $("#div-loading:first");
            $loading.html(message).show();
            if(ttl) {
                if(this.spinnerTimer) clearTimeout(this.spinnerTimer);

                this.spinnerTimer = setTimeout(function () {
                    $loading.hide();
                }, ttl);
            }

            return this;
        },
        hideSpinner: function () {
            $("#div-loading:first").hide();
            return this;
        },
        showTopMenu: function () {
            $(".top-menu:first").show();
            return this;
        },
        hideTopMenu: function () {
            $(".top-menu:first").hide();
            return this;
        },
        hideAlert:function () {
            $('[role=alert]').removeClass().hide().html('');
        },
        showAlert: function (style, message, ctrl) {

            this.hideAlert();
            if(typeof(style)=="string" && typeof(message)=="undefined"){
                message = style;
                style="";
            }

            var $msgCtl = null;
            if (ctrl) {
                $msgCtl = $(ctrl);
                $msgCtl.attr('role', 'alert');
            }
            else
                $msgCtl = $('[role=alert]:first');

            $msgCtl.empty();
            $msgCtl.hide();

            $msgCtl.removeClass();
            $msgCtl.addClass('alert alert-dismissible alert-' + style);

            $msgCtl.append('<button type="button" class="close" data-dismiss="alert">' +
            '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            message);

            $msgCtl.slideDown(function () {
                $('html,body').animate({
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

    return uiManager;
});