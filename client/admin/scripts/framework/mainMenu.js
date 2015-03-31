
define('mainMenu', function () {
    return {
        init: function (data) {
            this.dynamicLoader = data.dynamicLoader;
            var menuConfigs = data.pages;

            var $ul = $('#nav-accordion');
            for (var config in menuConfigs) {
                if (menuConfigs[config].mainMenuLabel) {
                    var $li = $("<li><a><i/><span /></a></li>");
                    $li.attr('id', menuConfigs[config].menuId);
                    $li.find('a').attr('href', '#');
                    $li.find('i').addClass('fa ' + menuConfigs[config].icon || '');
                    $li.find('span').text(menuConfigs[config].mainMenuLabel);
                    $li.click(this._createOnClickFunction(this.dynamicLoader, menuConfigs[config]));
                    $ul.append($li);
                }
            }
        }
    , _createOnClickFunction: function (dynamicLoader, config) {
        var _self = this;
        return function () {
            //to do with ayman
            //_self.setActiveMenu(config.menuId);
            dynamicLoader.loadContentObj(config, null);
        };
    }
    , load: function (item) {
        this.dynamicLoader.loadContent(item);
    }
    //, setActiveMenu: function (menuId) {
    //    //$('#nav-accordion').find('li > a').removeClass("active");
    //    //$('#nav-accordion').find('#' + menuId + ' a').addClass("active");
    //}

    }
});
