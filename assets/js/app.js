$(document).ready(function () {
    $('.location i').addClass('brinca-brinca');
    $('body').css('display', 'block');
    $('body').addClass('fadeIn');
    // detect navbar position
    var domain = 'https://laspalmerasmexicangrill.com/';
    var home_ = domain + "index.html";
    var about_ = domain + 'about-us.html';
    var menu_ = domain + 'menu.html';
    var specials_ = domain + 'specials.html';
    var catering_ = domain + 'catering.html';
    var parties_ = domain + 'parties.html';
    var jobs_ = domain + 'jobs.html';
    var accessibility_ = domain + 'accessibility.html';
    const pages = [
        { page: 'index', file: home_ },
        { page: 'about-us', file: about_ },
        { page: 'menu', file: menu_ },
        { page: 'specials', file: specials_ },
        { page: 'catering', file: catering_ },
        { page: 'parties', file: parties_ },
        { page: 'jobs', file: jobs_ },
        { page: 'accessibility', file: accessibility_ }
    ];

    $('.index, .about-us, .menu, .specials, .catering, .parties, .jobs, .accessibility').each(function () {
        $(this).click(function () {
            var clickedClass = $(this).attr('class').split(' ')[0];
            var pageObj = pages.find(function (page) {
                return page.page === clickedClass;
            });
            if (pageObj) {
                var file = pageObj.file;
                window.location.href = file;
            }
        });
    });

    //Add nav activo
    function agregarClaseNavActivo() {
        var currentPath = window.location.pathname;
        $('.page').each(function () {
            var link = $(this).text().toLowerCase();
            if (currentPath.includes(link)) {
                $(this).addClass('nav_activo');
            }
        });
        if (currentPath.endsWith("/")) {
            $('.home').addClass('nav_activo');
        }
    }
    $(document).ready(function () {
        agregarClaseNavActivo();
    });

    // Add class on scroll to button up
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('header').addClass('sticky_header');
            $('.up').addClass('show_btn');
            $('.opn-cls span').addClass('achica');
        } else {
            $('header').removeClass('sticky_header');
            $('.up').removeClass('show_btn');
            $('.opn-cls span').removeClass('achica');
        }
    });

    // Button Up
    var upUp = $(".up");
    upUp.on("click", function () {
        $(window).scrollTop(0);
    });

    // Cuando se hace clic en '.opn-cls-orders'
    $('.opn-cls-orders').on('click', function (event) {
        // Evitar que el clic se propague al documento
        event.stopPropagation();
        // Alternar la clase 'expande' en '.nav-box'
        $('.nav-box').toggleClass('expande');
        $('.opn-cls-orders i').toggleClass('rotate-it');
    });

    // Cuando se hace clic en cualquier lugar del documento
    $(document).on('click', function (event) {
        // Verificar si el clic no ocurrió dentro de '.nav-box' o '.opn-cls-orders'
        if (!$(event.target).closest('.nav-box').length && !$(event.target).closest('.opn-cls-orders').length) {
            // Si no ocurrió dentro de ninguno de los elementos, cerrar la '.nav-box'
            $('.nav-box').removeClass('expande');
            $('.opn-cls-orders i').removeClass('rotate-it');
        }
    });

    //Funcion para manipular el navbar en mobile - pantallas chicas
    $('.opn-cls').on('click', function () {
        $('nav ul').toggleClass('open--cls');
        $('.opn-cls span').toggleClass('equis');
    });

    //Funcion para manipular si se da click por fuera del elemento
    $(document).on('click', function (event) {
        // Verificar si el clic fue fuera del menú y si el menú está abierto
        if (!$(event.target).closest('nav').length && $('nav ul').hasClass('open--cls')) {
            $('nav ul').removeClass('open--cls');
            $('.opn-cls span').removeClass('equis');
        }
    });

    //Quitar data en url para slider galeria
    var allowedPaths = ['/home', '/about-us', '/'];
    var currentPath = window.location.pathname.replace('.html', '');
    //console.log('Ubicación: ' + currentPath);
    if (allowedPaths.includes(currentPath)) {
        $('[data-fancybox="gallery"]').fancybox({
            hash: false
        });

        //Function to control the Slider
        $(document).ready(function () {
            var $slides, interval, $selectors, $btns, currentIndex, nextIndex;

            var cycle = function (index) {
                var $currentSlide, $nextSlide, $currentSelector, $nextSelector;

                nextIndex = index !== undefined ? index : nextIndex;

                $currentSlide = $($slides.get(currentIndex));
                $currentSelector = $($selectors.get(currentIndex));

                $nextSlide = $($slides.get(nextIndex));
                $nextSelector = $($selectors.get(nextIndex));

                $currentSlide.removeClass("active").css("z-index", "0");

                $nextSlide.addClass("active").css("z-index", "1");

                $currentSelector.removeClass("current");
                $nextSelector.addClass("current");

                currentIndex = index !== undefined
                    ? nextIndex
                    : currentIndex < $slides.length - 1
                        ? currentIndex + 1
                        : 0;

                nextIndex = currentIndex + 1 < $slides.length ? currentIndex + 1 : 0;
            };

            $(function () {
                currentIndex = 0;
                nextIndex = 1;

                $slides = $(".slide");
                $selectors = $(".selector");
                $btns = $(".btn");

                $slides.first().addClass("active");
                $selectors.first().addClass("current");

                interval = window.setInterval(cycle, 4000);

                $selectors.on("click", function (e) {
                    var target = $selectors.index(e.target);
                    if (target !== currentIndex) {
                        window.clearInterval(interval);
                        cycle(target);
                        interval = window.setInterval(cycle, 4000);
                    }
                });

                $btns.on("click", function (e) {
                    window.clearInterval(interval);
                    if ($(e.target).hasClass("prev")) {
                        var target = currentIndex > 0 ? currentIndex - 1 : $slides.length - 1;
                        cycle(target);
                    } else if ($(e.target).hasClass("next")) {
                        cycle();
                    }
                    interval = window.setInterval(cycle, 4000);
                });
            });

            var menu = [];
            $(".swiper-slide").each(function (index) {
                menu.push($(this).find(".slide-inner").attr("data-text"));
            });

            var interleaveOffset = 0.5;
            var swiperOptions = {
                loop: true,
                speed: 1000,
                parallax: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false
                },
                loopAdditionalSlides: 0,
                watchSlidesProgress: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                on: {
                    progress: function () {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slideProgress = swiper.slides[i].progress;
                            var innerOffset = swiper.width * interleaveOffset;
                            var innerTranslate = slideProgress * innerOffset;
                            swiper.slides[i].querySelector(".slide-inner").style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
                        }
                    },
                    touchStart: function () {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = "";
                        }
                    },
                    setTransition: function (speed) {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".slide-inner").style.transition = speed + "ms";
                        }
                    }
                }
            };

            var swiper = new Swiper(".swiper-container", swiperOptions);

            var sliderBgSetting = $(".slide-bg-image");
            sliderBgSetting.each(function (indx) {
                if ($(this).attr("data-background")) {
                    $(this).css("background-image", "url(" + $(this).data("background") + ")");
                }
            });
        });
    }

    // Navbar on menu
    function menuTabs() {
        var tabs = $('.menu_tabs');
        var menuDivs = $('.mm');
        menuDivs.hide();
        menuDivs.eq(0).show();
        tabs.eq(0).addClass('colorea');
        tabs.each(function (index) {
            $(this).click(function () {
                menuDivs.hide();
                menuDivs.eq(index).show();
                tabs.removeClass('colorea');
                $(this).addClass('colorea');
            });
        });
    }
    menuTabs();

    // Show modal on home page
    var allowedPaths = ['/home', '/'];
    var currentPath = window.location.pathname.replace('.html', '');
    console.log('Ubicación: ' + currentPath);
    if (allowedPaths.includes(currentPath)) {

        //Data scroll to que mande al article.vips
        $(document).ready(function () {
            // Función para hacer scroll hacia el elemento con la clase .vips
            function scrollToVips() {
                var vipsElement = $('.vips');
                if (vipsElement.length > 0) {
                    $('html, body').animate({
                        scrollTop: vipsElement.offset().top
                    }, 1000); // Puedes ajustar la duración de la animación según tus preferencias
                }
            }
            // Asociar la función al evento de clic en elementos con el atributo data-scroll-to
            $('[data-scroll-to]').on('click', function () {
                scrollToVips();
            });
        });
    }

    // Show modal on home page after 3 seconds
    var allowedPaths = ['/home', '/'];
    var currentPath = window.location.pathname.replace('.html', '');
    // Esperar 2 segundos después de que la página se haya cargado
    setTimeout(function () {
        if (allowedPaths.includes(currentPath)) {
            // Agregar la propiedad visibility: visible al body
            $('body').addClass('no-scroll');
            $('.modal').addClass('show_modal');
            $('.show_modal').addClass('fadeIn');
            // Cerrar el modal
            $('.btn_modal').on('click', function () {
                $('.modal').addClass('animationless');
                $('.wrap').addClass('animationless2');
                $('.show_modal').removeClass('fadeIn');
                $('body').removeClass('no-scroll');
            });
        }
    }, 2000); // 2000 milisegundos (2 segundos)

    //Get Full Year
    $('.year').each(function () {
        var currentDate = new Date();
        var ANHO = currentDate.getFullYear();
        $(this).text(ANHO);
    });

    //Location Name
    LOCATION_NAME = "las palmeras";
    //Description
    ABOUT_HOME = "Las Palmeras Mexican Grill serves the most delicious Mexican tacos and authentic Mexican food...";
    ABOUT_ABOUT = "Las Palmeras Mexican Grill serves the most delicious Mexican tacos and authentic Mexican food. <br> Our recipes have been in our family for over 27 years. Try our variety of burritos, combinations, sopas, tortas, and more. Dine in or place an order to go to experience our delicious Mexican food.";
    //Address
    ADDRESS = "1131 Francis St B, Longmont, CO 80501";
    ADDRESS_URL = "https://maps.app.goo.gl/mD65ABF44v78X8rD8";
    //Email
    EMAIL = "laspalmeras@aol.com";
    //Phone
    PHONE_NUMBER = "(303) 682-0300";
    //Hours & Days
    D1 = "sun";
    D2 = "mon";
    D3 = "tue - fri";
    D4 = "sat";
    H1 = "8:00 a.m. - 2:00 p.m.";
    H2 = "6:00 a.m. - 2:00 p.m.";
    H3 = "6:00 a.m. - 8:00 p.m.";
    H4 = "7:00 a.m. - 8:00 p.m.";
    GOOGLE_DESK = "https://www.google.com/search?q=taqueria+las+palmeras+colorado&client=opera-gx&hs=FpZ&sca_esv=2513685c83e6abca&sxsrf=ACQVn0_gl6_eR2_nXpr4jRZl04veJs_YVQ%3A1709250245831&ei=xRbhZZ-rMt24kPIPnfiNgAo&ved=0ahUKEwjfofCt3dGEAxVdHEQIHR18A6AQ4dUDCBE&uact=5&oq=taqueria+las+palmeras+colorado&gs_lp=Egxnd3Mtd2l6LXNlcnAiHnRhcXVlcmlhIGxhcyBwYWxtZXJhcyBjb2xvcmFkbzIEECMYJ0jLClCEAljDCXABeACQAQCYAZwBoAGECKoBAzAuOLgBA8gBAPgBAZgCCaACkAjCAgcQIxiwAxgnwgIOEC4YrwEYxwEYgAQYsAPCAgsQABiABBjLARiwA8ICCRAAGAgYHhiwA8ICCxAuGIAEGMcBGK8BwgIIEAAYgAQYywHCAgYQABgWGB6YAwCIBgGQBgiSBwMxLjg&sclient=gws-wiz-serp#lrd=0x876bf9666502d927:0xf03099a662f579e9,3,,,,";
    GOOGLE_MOB = "https://www.google.com.mx/m?q=taueria+las+palmeras+colorado&client=ms-opera-mobile&channel=new&espv=1#wptab=si:AKbGX_oFio40EDpEiLGW5yb14kHbrhj0-kgJPotqLcIs2tFuH9VyqJr_a-1jTf_DiWcDGCGUUgGtpZQ9QQepamtiF-zN_Z2a8lCcTVu4vPyIF35PuF-glBNnF0lpOPZ30XQgRjqMyoajfO_qCYZTvyRq67mTF4S4MQ%3D%3D";
    //Iframe
    IFRAME = '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12193.445000053045!2d-105.1169866!3d40.1787733!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bf9666502d927%3A0xf03099a662f579e9!2sTaqueria%20Las%20Palmeras!5e0!3m2!1ses!2smx!4v1709250162751!5m2!1ses!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
    DESC01 = 'order your favorite dishes in seconds!';
    DESC02 = 'subscribe to <br> our vip club!';
    //Social Media
    FACEBOOK = '';
    INSTAGRAM = '';
    YELP = '';
    TIKTOK = '';
    //Logo
    $('header img').css('cursor', 'pointer');
    $('header img').on('click', function () {
        window.location.href = domain;
    });
    //Location - Name
    $('.location_name').each(function () {
        $(this).text(LOCATION_NAME);
    });
    //Location - Address
    $('.address').each(function () {
        $(this).text(ADDRESS);
    });
    $('.address-link').each(function () {
        $(this).click(function () {
            window.open(ADDRESS_URL, '_blank');
        });
    });
    //About Us
    $('.description_home').each(function () {
        $(this).html(ABOUT_HOME);
    });
    $('.description_about').each(function () {
        $(this).html(ABOUT_ABOUT);
    });
    //Phone
    $('.phone').each(function () {
        $(this).text(PHONE_NUMBER).click(function () {
            window.location.href = "tel:" + PHONE_NUMBER;
        });
    });
    // Email
    $('.email').each(function () {
        $(this).text(EMAIL).click(function () {
            window.location.href = "mailto:" + EMAIL;
        });
    });
    //Hours
    $('.d1').each(function () {
        $(this).text(D1);
    });
    $('.h1').each(function () {
        $(this).text(H1);
    });
    $('.d2').each(function () {
        $(this).text(D2);
    });
    $('.h2').each(function () {
        $(this).text(H1);
    });
    $('.d3').each(function () {
        $(this).text(D3);
    });
    $('.h3').each(function () {
        $(this).text(H1);
    });
    $('.d4').each(function () {
        $(this).text(D4);
    });
    $('.h4').each(function () {
        $(this).text(H1);
    });
    //Iframe
    $('.iframe').each(function () {
        $(this).html(IFRAME);
    });
    //Description Modal
    $('.description-01').each(function () {
        $(this).html(DESC01);
    });
    $('.description-02').each(function () {
        $(this).html(DESC02);
    });
    //Google Reviews 
    $('.desk-google').each(function () {
        $(this).click(function () {
            window.open(GOOGLE_DESK, '_blank');
        });
    });
    $('.mob-google').each(function () {
        $(this).click(function () {
            window.open(GOOGLE_MOB, '_blank');
        });
    });
    //3rd Party Vendors
    $('.order-pickup').each(function () {
        $(this).click(function () {
            window.open(PICK_UP, '_blank');
        });
    });
    $('.order-delivery1').each(function () {
        $(this).click(function () {
            window.open(DELIVERY1, '_blank');
        });
    });
    $('.order-delivery2').each(function () {
        $(this).click(function () {
            window.open(DELIVERY2, '_blank');
        });
    });
    $('.order-delivery3').each(function () {
        $(this).click(function () {
            window.open(DELIVERY3, '_blank');
        });
    });
    //Social Media
    $('.fb').each(function () {
        $(this).click(function () {
            window.open(FACEBOOK, '_blank');
        });
    });
    $('.ig').each(function () {
        $(this).click(function () {
            window.open(INSTAGRAM, '_blank');
        });
    });
    $('.yp').each(function () {
        $(this).click(function () {
            window.open(YELP, '_blank');
        });
    });
    $('.tk').each(function () {
        $(this).click(function () {
            window.open(TIKTOK, '_blank');
        });
    });
});
