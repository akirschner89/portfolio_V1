if ($.cookie("theme_csspath")) {
    $('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
}
if ($.cookie("theme_layout")) {
    $('body').addClass($.cookie("theme_layout"));
}

$(function () {

    lightbox();
    sliders();
    menuSliding();
    utils();
    map();
    demo();

});

/* for demo purpose only - can be deleted */

function demo() {

    if ($.cookie("theme_csspath")) {
        $('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            $('link#theme-stylesheet').attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {expires: 365, path: '/'});
        }

        return false;
    });

    $("#layout").change(function () {

        if ($(this).val() !== '') {

            var theme_layout = $(this).val();

            $('body').removeClass('wide');
            $('body').removeClass('boxed');

            $('body').addClass(theme_layout);

            $.cookie("theme_layout", theme_layout, {expires: 365, path: '/'});
        }

        return false;
    });
}

/* =========================================
 *  lightbox
 *  =======================================*/

function lightbox() {

    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
    });
}

/* sliders */

function sliders() {
    if ($('.owl-carousel').length) {


        $(".testimonials").owlCarousel({
            items: 4,
            itemsDesktopSmall: [1100, 3],
            itemsTablet: [768, 2],
            itemsMobile: [480, 1]
        });
    }

}

function map() {

    if ($('#map').length > 0) {


        function initMap() {

            var location = new google.maps.LatLng(30.267153, -97.7430608);

            var mapCanvas = document.getElementById('map');
            var mapOptions = {
                center: location,
                zoom: 16,
                panControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(mapCanvas, mapOptions);

            var markerImage = 'img/bitmoji-coffee.png';

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: markerImage,
                draggable: true
            });

            var contentString = '<div class="info-window">' +
                    '<h3>Take me somewhere</h3>' +
                    '<div class="info-content">' +
                    '<p>Drag my bitmoji anywhere around the world to drink coffee and listen to music. Let\'s start in Austin, TX!.</p>' +
                    '</div>' +
                    '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 400
            });

            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

            map.set('styles', styles);


        }

        google.maps.event.addDomListener(window, 'load', initMap);


    }

}



/* menu sliding */

function menuSliding() {


    $('.dropdown').on('show.bs.dropdown', function (e) {

        if ($(window).width() > 750) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();

        }
        else {
            $(this).find('.dropdown-menu').first().stop(true, true).show();
        }
    }

    );
    $('.dropdown').on('hide.bs.dropdown', function (e) {
        if ($(window).width() > 750) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        }
        else {
            $(this).find('.dropdown-menu').first().stop(true, true).hide();
        }
    });

}

/* animations */

function animations() {
    delayTime = 0;
    $('[data-animate]').css({opacity: '0'});
    $('[data-animate]').waypoint(function (direction) {
        delayTime += 150;
        $(this).delay(delayTime).queue(function (next) {
            $(this).toggleClass('animated');
            $(this).toggleClass($(this).data('animate'));
            delayTime = 0;
            next();
            //$(this).removeClass('animated');
            //$(this).toggleClass($(this).data('animate'));
        });
    },
            {
                offset: '90%',
                triggerOnce: true
            });

    $('[data-animate-hover]').hover(function () {
        $(this).css({opacity: 1});
        $(this).addClass('animated');
        $(this).removeClass($(this).data('animate'));
        $(this).addClass($(this).data('animate-hover'));
    }, function () {
        $(this).removeClass('animated');
        $(this).removeClass($(this).data('animate-hover'));
    });

}

function animationsSlider() {

    var delayTimeSlider = 400;

    $('.owl-item:not(.active) [data-animate-always]').each(function () {

        $(this).removeClass('animated');
        $(this).removeClass($(this).data('animate-always'));
        $(this).stop(true, true, true).css({opacity: 0});

    });

    $('.owl-item.active [data-animate-always]').each(function () {
        delayTimeSlider += 500;

        $(this).delay(delayTimeSlider).queue(function (next) {
            $(this).addClass('animated');
            $(this).addClass($(this).data('animate-always'));

            console.log($(this).data('animate-always'));

        });
    });



}

/* counters */

function counters() {

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

}

function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio */

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
        var radio = $(this).find(':radio');
        radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function (e) {

        window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });
    /* animated scrolling */

    $('.scroll-to, .scroll-to-top').click(function (event) {

        var full_url = this.href;
        var parts = full_url.split("#");
        if (parts.length > 1) {

            scrollTo(full_url);
            event.preventDefault();
        }
    });
    function scrollTo(full_url) {
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#" + trgt).offset();
        var target_top = target_offset.top - 100;
        if (target_top < 0) {
            target_top = 0;
        }

        $('html, body').animate({
            scrollTop: target_top
        }, 1000);
    }
}

/* product detail gallery */

function productDetailGallery(confDetailSwitch) {
    $('.thumb:first').addClass('active');
    timer = setInterval(autoSwitch, confDetailSwitch);
    $(".thumb").click(function (e) {

        switchImage($(this));
        clearInterval(timer);
        timer = setInterval(autoSwitch, confDetailSwitch);
        e.preventDefault();
    }
    );
    $('#mainImage').hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(autoSwitch, confDetailSwitch);
    });
    function autoSwitch() {
        var nextThumb = $('.thumb.active').closest('div').next('div').find('.thumb');
        if (nextThumb.length == 0) {
            nextThumb = $('.thumb:first');
        }
        switchImage(nextThumb);
    }

    function switchImage(thumb) {

        $('.thumb').removeClass('active');
        var bigUrl = thumb.attr('href');
        thumb.addClass('active');
        $('#mainImage img').attr('src', bigUrl);
    }
}

/* product detail sizes */

function productDetailSizes() {
    $('.sizes a').click(function (e) {
        e.preventDefault();
        $('.sizes a').removeClass('active');
        $('.size-input').prop('checked', false);
        $(this).addClass('active');
        $(this).next('input').prop('checked', true);
    });
}


$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

        var maxHeight = 0;
        var children = $(this).find('.same-height');
        children.height('auto');
        if ($(window).width() > 768) {
            children.each(function () {
                if ($(this).innerHeight() > maxHeight) {
                    maxHeight = $(this).innerHeight();
                }
            });
            children.innerHeight(maxHeight);
        }

        maxHeight = 0;
        children = $(this).find('.same-height-always');
        children.height('auto');
        children.each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).innerHeight();
            }
        });
        children.innerHeight(maxHeight);

    });
}

$(window).on('load', function () {

    windowWidth = $(window).width();

    $(this).alignElementsSameHeight();

});
$(window).resize(function () {

    newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
        setTimeout(function () {
            $(this).alignElementsSameHeight();
        }, 205);
        windowWidth = newWindowWidth;
    }

});

// //AJAX call to PHP - send email

// function isValidEmail(emailAddress) {
//     var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

//     return pattern.test(emailAddress);

// }

// $("#contactForm").on('submit', function (e) {
//     e.preventDefault();
//     var data = {
//         firstname: $("#name").val().trim(),
//         lastname: $("#surname").val().trim(),
//         email: $("#email").val().trim(),
//         // subject: $("#subject").val().trim(),
//         message: $("#message").val().trim()
//     };

//     console.log(data['firstname']);
//     console.log(data['lastname']);
//     console.log(data['email']);
//     console.log(data['message']);

//     if (isValidEmail(data['email']) && (data['message'].length > 1) && (data['firstname'].length > 1) && (data['lastname'].length > 1)) {
//         $.ajax({
//             type: "POST",
//             url: "sendmail.php",
//             data: data,
//             success: function () {
//                 $('#contactForm .input-success').delay(500).fadeIn(1000);
//                 $('#contactForm .input-error').fadeOut(500);
//             }
//         });
//     } else {
//         $('#contactForm .input-error').delay(500).fadeIn(1000);
//         $('#contactForm .input-success').fadeOut(500);
//     }

//     return false;
// });


    // $(".email-submit").on('click', function() {
    //     var data = {
    //     firstname: $("#name").val().trim(),
    //     lastname: $("#surname").val().trim(),
    //     email: $("#email").val().trim(),
    //     message: $("#message").val().trim()
    //     };

    //     $.ajax({
    //         type: "POST",
    //         url: "contact.php",
    //         data: data,
    //         success: function(){
    //         $('.success').fadeIn(1000);
    //         }
    //     });

    //     return true;
    // });
// }
