/*! bigSlide - v0.4.3 - 2014-01-25
 * http://ascott1.github.io/bigSlide.js/
 * Copyright (c) 2014 Adam D. Scott; Licensed MIT */
(function($) {
    'use strict';

    $.fn.bigSlide = function(options) {

        var settings = $.extend({
            'menu': ('#menu'),
            'push': ('.push'),
            'side': 'left',
            'menuWidth': '15.625em',
            'speed': '300'
        }, options);

        var menuLink = this,
            menu = $(settings.menu),
            push = $(settings.push),
            width = settings.menuWidth;

        var positionOffScreen = {
            'position': 'fixed',
            'top': '0',
            'bottom': '0',
            'settings.side': '-' + settings.menuWidth,
            'width': settings.menuWidth,
            'height': '100%'
        };

        var animateSlide = {
            '-webkit-transition': settings.side + ' ' + settings.speed + 'ms ease',
            '-moz-transition': settings.side + ' ' + settings.speed + 'ms ease',
            '-ms-transition': settings.side + ' ' + settings.speed + 'ms ease',
            '-o-transition': settings.side + ' ' + settings.speed + 'ms ease',
            'transition': settings.side + ' ' + settings.speed + 'ms ease'
        };

        menu.css(positionOffScreen);
        push.css(settings.side, '0');
        menu.css(animateSlide);
        push.css(animateSlide);

        var $el = $('#menu');
        var mql = window.matchMedia('screen and (max-width: 1000px)');

        if (mql.matches) {
            menu._state = 'closed';
        } else {
            menu._state = 'open';
        }

        // Tablet & Mobile
        $(window).resize(function() {
            var mql = window.matchMedia('screen and (max-width: 1400px)');

            if (mql.matches && $el.prop('style').left === '0px') {
                menu._state = 'closed';
                $el.prop('style').left = '-' + settings.menuWidth;
            } else if (mql.matches === false && $el.prop('style').left === '-' + settings.menuWidth) {
                menu._state = 'open';
                $el.prop('style').left = '0px';
            }
        });

        menu.open = function() {
            menu._state = 'open';
            menu.css(settings.side, '0');
            push.css(settings.side, width);
        };

        menu.close = function() {
            menu._state = 'closed';
            menu.css(settings.side, '-' + width);
            push.css(settings.side, '0');
        };

        menuLink.on('click.bigSlide', function(e) {
            e.preventDefault();
            if (menu._state === 'open') {
                menu.close();
            } else if ($el.prop('style').left === '0px' && menu._state === 'open') {
                menu.close();
            } else {
                menu.open();
            }
        });

        menuLink.on('touchend', function(e) {
            menuLink.trigger('click.bigSlide');
            e.preventDefault();
        });

        return menu;

    };

}(jQuery));