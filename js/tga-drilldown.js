/**
 * jQuery tgadrilldown
 *
 * require PubSub.js
 *
 */

;(function($) {

    $.fn.tgadrilldown = function(options, callback) {

        var $w = $(window),
            menu = this,
            deep = 0,
            clas = 0,
            next = [];

        menu.configs = {
            toggle: '<i>></i>'
        };
        menu.configs =  jQuery.extend( menu.configs, ( options || {} ) );

        function tgaDeepMenuDrilldown(collection){

            deep++;

            collection.each( function (i, e) {
                $(e).siblings('a').attr('data-drilltoggle', deep);
                $(e).addClass('lev'+deep);
                $(e).prepend('<li data-drillback="'+(deep-1)+'">back</li><li class="title">'+$(e).siblings('a').text()+'</li>');
            });

            next = collection.find('> li > ul');

            if(next.length){
                tgaDeepMenuDrilldown(next);
            }

        }

        function tgaClassMenuDrilldown(collection){

            clas++;

            collection.each( function (i, e) {
                $(e).addClass('lev'+(clas-1));
                if($(e).children('ul').length){
                    $(e).addClass('parent');
                    $(e).children('a').append(menu.configs.toggle);
                }
            });

            next = collection.find('> ul > li');

            if(next.length){
                tgaClassMenuDrilldown(next);
            }

        }

        function tgaMakeDrilldown() {

            menu.wrap('<div class="tgadrilldown-container"></div>');
            menu.data('tgadrilldown', '').addClass('tgadrilldown-init');
            menu.find('ul').hide();
            menu.find('ul').siblings('a').attr('data-drilltoggle', '');

            tgaDeepMenuDrilldown(menu.find('> li > ul'));
            tgaClassMenuDrilldown(menu.find('> li'));
            tgaBindEventDrilldown();

        }

        function tgaAnimationDrilldown(callback) {

            menu.animate({
                left: -(menu.outerWidth() * menu.data('deep')),
            }, function() {
                if (typeof callback === "function") callback.call(this);
            });

        }

        function tgaBindEventDrilldown() {

            menu.find('[data-drilltoggle]').on('click', function (e) {

                e.preventDefault();

                $(e.currentTarget).siblings('ul').addClass('active').css('display', 'flex');

                if(menu.data('deep')) {
                    menu.data('deep', $(e.currentTarget).data('drilltoggle'));
                }else{
                    menu.attr('data-deep', $(e.currentTarget).data('drilltoggle'));
                }



                tgaAnimationDrilldown();

                PubSub.publishSync('tgaDrilldownToggle');

            });

            menu.find('[data-drillback]').on('click', function (e) {

                e.preventDefault();
                menu.data('deep', $(e.currentTarget).data('drillback'));

                tgaAnimationDrilldown( function() {
                    $(e.currentTarget).parent('ul').hide().removeClass('active')
                });
                $(e.currentTarget).data('drillback') === 0 ? PubSub.publishSync('tgaDrilldownLevel0') : null;

            });

        }

        tgaMakeDrilldown();

        return this;

    };

})(window.jQuery || window.Zepto);