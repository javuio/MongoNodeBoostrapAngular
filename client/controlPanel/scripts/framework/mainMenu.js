
define('mainMenu', function () {
    return {
        init: function (data) {
            this.dynamicLoader = data.dynamicLoader;
            var menuConfigs = data.pages;

            var $ul = $('#nav-accordion');
            for (var config in menuConfigs) {
                if (menuConfigs[config].mainMenuLabel) {
                    var $li = $("<li><a href='#'><i/><span /></a></li>");
                    $li.attr('id', menuConfigs[config].menuId);
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
                dynamicLoader.loadContentObj(config, null);
            };
        }
        , load: function (item) {
            this.dynamicLoader.loadContent(item);
        }

    }
});