
define('uiManager',  function () {
    var uiManager = {
        getThumbnailUrl: function (data) {
            var width = data.width;
            var height = data.height;
            var url = 'http://sp1ey4.cloudimage.io/s/';
            if (width && height)
                url = url + 'resizenp/' + width + 'x' + height + '/';
            else {
                if (width) {
                    url = url + 'width/' + width + '/';
                }
                else {
                    url = url + 'height/' + height + '/';
                }
            }

            return url + data.url;
        },
        hideSidebar: function () {
            $('#sidebar').addClass('hide-left-bar');
            $('#main-content').addClass('merge-left');
            if ($('#container').hasClass('open-right-panel')) {
                $('#container').removeClass('open-right-panel');
            }
            if ($('.right-sidebar').hasClass('open-right-bar')) {
                $('.right-sidebar').removeClass('open-right-bar');
            }
            if ($('.header').hasClass('merge-header')) {
                $('.header').removeClass('merge-header');
            }
        },
        showSidebar: function () {
            $('#sidebar').removeClass('hide-left-bar');
            $('#main-content').removeClass('merge-left');
        },
        disableMenu: function () {
            $('.sidebar-toggle-box .fa-bars').unbind("click");
            $('.toggle-right-box .fa-bars').unbind("click");
        },
        enableMenu: function () {
            $('.sidebar-toggle-box .fa-bars').click(function (e) {

                $('#sidebar').toggleClass('hide-left-bar');
                $('#main-content').toggleClass('merge-left');
                e.stopPropagation();
                if ($('#container').hasClass('open-right-panel')) {
                    $('#container').removeClass('open-right-panel');
                }
                if ($('.right-sidebar').hasClass('open-right-bar')) {
                    $('.right-sidebar').removeClass('open-right-bar');
                }

                if ($('.header').hasClass('merge-header')) {
                    $('.header').removeClass('merge-header');
                }
            });
            $('.toggle-right-box .fa-bars').click(function (e) {
                $('#container').toggleClass('open-right-panel');
                $('.right-sidebar').toggleClass('open-right-bar');
                $('.header').toggleClass('merge-header');
                e.stopPropagation();
            });
        }
    }

    return uiManager;
});