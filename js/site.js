(function($) {
    "use strict";

    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 70)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    function changeTheme(styleName) {
        //reset all "(Aktiv)" span visibility states
        $('.js-change-theme').removeClass('is-active');
        $('.js-change-theme[data-theme-name=' + styleName + ']').addClass('is-active');
        var oldlink = document.getElementsByTagName("link").item(7);
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "css/" + styleName + ".css");
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
        Cookies.set('theme-name', styleName, {
            expires: 7
        });
    }

    function getSavedTheme() {
        return Cookies.get('theme-name');
    }

    var themeName = getSavedTheme();
    if (themeName) {
        changeTheme(themeName);
    } else {
        changeTheme('site-blue-green');
    }

    function rgb2hex(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function draw() {
        var my_canvas = document.getElementById('canvas');
        var context = my_canvas.getContext("2d");
        context.clearRect(0, 0, 200, 200);
        context.beginPath();
        context.save();
        context.translate(100, 100);
        var time = new Date();
        context.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
        var primaryColor = $('section.bg-primary').css('background-color');
        context.fillStyle = rgb2hex(primaryColor);
        context.fillRect(-50, -50, 100, 100);
        context.fillStyle = "#2C3E50";
        context.font = "20px Garamond";
        context.fillText("Robin", -40, -55);
        context.fillText("Derungs", -40, 65);
        context.restore();
    }
    draw();
    var interval = setInterval(draw, 120);
    var isAnimationRunning = true;


    $('.js-change-theme').click(function(e, v) {
        var styleName = $(e.target).data('theme-name');

        changeTheme(styleName);
    });

    $('.js-stop-canvas-animation').click(function(e) {
        if (isAnimationRunning) {
            isAnimationRunning = false;
            clearInterval(interval);
            $('.js-stop-canvas-animation').addClass('disabled');
            $('.js-start-canvas-animation').removeClass('disabled');
        }
    });

    $('.js-start-canvas-animation').click(function(e) {

        if (!isAnimationRunning) {
            isAnimationRunning = true;
            interval = setInterval(draw, 120);
            $('.js-start-canvas-animation').addClass('disabled');
            $('.js-stop-canvas-animation').removeClass('disabled');
        }

    });

    $('.js-reload-picture').click(function(e) {

        if ($('.js-reload-picture').hasClass('disabled')) {
            return;
        }

        $.ajax('/gallery/gallery.php').done(function(d) {
            var data = JSON.parse(d);
            var randomPictureUrl = data[0];
            $('#gallery-img').attr('src', randomPictureUrl);
        });
        $('.js-reload-picture').addClass('disabled');

    });
    $('#gallery-img').on('load', function() {
        console.log('loaded');
        $('.js-reload-picture').removeClass('disabled');
    });
    // Scroll to top button appear
    $(document).scroll(function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    $('body').scrollspy({
        target: '#mainNav',
        offset: 80
    });

    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };

    navbarCollapse();
    $(window).scroll(navbarCollapse);

    $('.portfolio-item').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        modal: true
    });
    $(document).on('click', '.portfolio-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false,
                loop: false
            }
        }
    })

})(jQuery);