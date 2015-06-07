/*!
 *
 *  Copyright (c) David Bushell | http://dbushell.com/
 *
 */
(function(window, document, undefined)
{

    // helper functions

    var trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    };

    var hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };

    var hasParent = function(el, id)
    {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };

    // normalize vendor prefixes

    var doc = document.documentElement;

    var transform_prop = window.Modernizr.prefixed('transform'),
        transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function() {
            var props = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd otransitionend',
                'msTransition'     : 'MSTransitionEnd',
                'transition'       : 'transitionend'
            };
            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
        })();

    window.App = (function()
    {

        var _init = false, app = { };

        var inner = document.getElementById('inner-wrap'),

            nav_open = false,

            nav_class = 'js-nav';


        app.init = function()
        {
            if (_init) {
                return;
            }
            _init = true;

            var closeNavEnd = function(e)
            {
                if (e && e.target === inner) {
                    document.removeEventListener(transition_end, closeNavEnd, false);
                }
                nav_open = false;
            };

            app.closeNav =function()
            {
                if (nav_open) {
                    // close navigation after transition or immediately
                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeNavEnd, false);
                    } else {
                        closeNavEnd(null);
                    }
                }
                removeClass(doc, nav_class);
            };

            app.openNav = function()
            {
                if (nav_open) {
                    return;
                }
                addClass(doc, nav_class);
                nav_open = true;
            };

            app.toggleNav = function(e)
            {
                if (nav_open && hasClass(doc, nav_class)) {
                    app.closeNav();
                } else {
                    app.openNav();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            // open nav with main "nav" button
            document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);

            // close nav with main "close" button
            document.getElementById('nav-close-btn').addEventListener('click', app.toggleNav, false);

            // close nav by touching the partial off-screen content
            document.addEventListener('click', function(e)
            {
                if (nav_open && !hasParent(e.target, 'nav')) {
                    e.preventDefault();
                    app.closeNav();
                }
            },
            true);

            addClass(doc, 'js-ready');

        };

        return app;

    })();

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', window.App.init, false);
    }

})(window, window.document);

$(document).ready(function () {

    $("#nanoGallery5").nanoGallery({
        kind: 'flickr',
        userID: '96313114@N02',

        // uncomment this line to display one specific album:
        photoset:'72157651825450913',

        // uncomment this line to display full photostream (v5.0.0):
        // photoset:'none',
        theme: 'light',
        imageTransition:'slideAppear',
        colorScheme: 'none',

        thumbnailWidth: 120,
        thumbnailHeight: 120,
        thumbnailLabel: {
            display: false,
            displayDescription: false,
            position: 'overImageOnBottom'
        },
        thumbnailHoverEffect:'borderLighter'
    });
    $("#nanoGallery4").nanoGallery({
    thumbnailWidth: 120,
    thumbnailHeight: 120,
    items: [{
        src: 'IMG_0193.JPG',
        srct: 'IMG_0193-tumb.JPG',
        title: 'Living Room',
        description: 'Готовимся к переезду'
    },{
        src: 'IMG_0194.JPG',
        srct: 'IMG_0194-tumb.JPG',
        title: 'Кухня',
        description: 'Нравятся мне полки сверху'
    },{
        src: 'IMG_0195.JPG',
        srct: 'IMG_0195-tumb.JPG',
        title: 'Вид из кухни',
        description: 'Справа верхняя комната'
    },{
        src: 'IMG_0196.JPG',
        srct: 'IMG_0196-tumb.JPG',
        title: '1/2 bathroom',
        description: 'Очень удобный, отгадайте почему'
    },{
        src: 'IMG_0197.JPG',
        srct: 'IMG_0197-tumb.JPG',
        title: 'Выход',
        description: 'Для меня лестницы сильно крутые'
    },{
        src: 'IMG_0198.JPG',
        srct: 'IMG_0198-tumb.JPG',
        title: 'Обувь',
        description: 'Нас 6 и обуви очень много'
    },{
        src: 'IMG_0199.JPG',
        srct: 'IMG_0199-tumb.JPG',
        title: 'Стиралка/Сушилка',
        description: 'Старые!!!'
    },{
        src: 'IMG_0200.JPG',
        srct: 'IMG_0200-tumb.JPG',
        title: 'Ванна',
        description: 'Достаточно большая кстати.'
    },{
        src: 'IMG_0201.JPG',
        srct: 'IMG_0201-tumb.JPG',
        title: 'Ванна',
        description: ''
    }
    ],
    itemsBaseURL: 'http://jesse.co.ua/images/nanoGal',
    thumbnailLabel: {
        display: true,
        displayDescription: true,
        align: 'center',
        position: 'overImageOnMiddle',
        hideIcons:true
    },
    theme: 'light',
    thumbnailHoverEffect: {
        duration: 450,
        name: 'labelSlideUp',
        easing: 'swing',
        easingBack: 'swing'
    },
    colorScheme: 'darkGreen',
    colorSchemeViewer: 'light',
    lazyBuild:'display',
    viewer: 'internal',
    imageTransition:'slideAppear'
});
});
