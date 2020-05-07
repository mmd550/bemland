
//----------------------------------------------------------------------- navigation clicks--------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------- dashboard-----------------------------------------------------------------------------------------
function lockScroll(){
    $html = $('html');
    $body = $('body');
    var initWidth = $body.outerWidth();
    var initHeight = $body.outerHeight();

    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];
    $html.data('scroll-position', scrollPosition);
    $html.data('previous-overflow', $html.css('overflow'));
    $html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    var marginR = $body.outerWidth()-initWidth;
    var marginB = $body.outerHeight()-initHeight;
    $body.css({'margin-right': marginR,'margin-bottom': marginB});
}

function unlockScroll(){
    $html = $('html');
    $body = $('body');
    $html.css('overflow', $html.data('previous-overflow'));
    var scrollPosition = $html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    $body.css({'margin-right': 0, 'margin-bottom': 0});
}
function mainMenu(){
    $('.dashboard-wrapper .dash-sublist-main-menu ').parent().animate({right:'-100%'})
    $('.dashboard-wrapper .dash-1st-list').animate({right:'0'})
}
$(document).ready(function () {
    $('nav #catalog').click(function () {
        $('.dashboard-background').fadeIn();
        $('.dashboard-wrapper').animate({right:'0'});
        $('div.dash-close').fadeIn()
        lockScroll()
    })
    $('.dashboard-background , .dash-close').click(function () {
        $('.dashboard-background').fadeOut();
        $('.dashboard-wrapper').animate({right:'-370'});
        $('div.dash-close').fadeOut()
        mainMenu()
        unlockScroll()

    })


    $('.dashboard-wrapper .dash-1st-sublist-item ').click(function () {
        if($(this).is('[data-sublistClass]')){
            $('.dashboard-wrapper .dash-1st-list').animate({right:'100%'})
            var sublistClass = $(this).attr('data-sublistClass')
            $('.dashboard-wrapper'+' .'+sublistClass).animate({right:'0'})
        }
    })
    $('.dashboard-wrapper .dash-sublist-main-menu ').click(function () {
        mainMenu()
    })
})


//----------------------------------------------------------------------- search-----------------------------------------------------------------------------------------
function searchIn() {
    $('#catalog').fadeTo(100,0)
    $('#buybag').fadeTo(200,0)
    $('#search').fadeTo(300,0)
    $('.mainlogo').fadeTo(400,0)
    $('ul.bar').delay(500).fadeOut('fast',function () {
        $('.search-field').fadeIn();
        $('.search-field input').focus();
    })
};
function searchOut() {
    $('.search-field').fadeOut('slow',function () {
        $('ul.bar').fadeIn()
    })
    $('#catalog').fadeTo(1000,1)
    $('#buybag').fadeTo(800,1)
    $('#search').fadeTo(600,1)
    $('.mainlogo').fadeTo(400,1)
};

$(document).ready(function () {
    $('#search').click(function () {
        searchIn();
    });
    $('#search-out-button').click(
        function () {
            searchOut()

        }
    )

})



//----------------------------------------------------------------------- main slider---------------------------------------------------------------------------------------------------------
    var mainSlider = new Swiper('.swiper1', {
        spaceBetween: 30,
        effect: 'fade',
        loop:'true',
        autoplay: {
            delay: 4000,
            disableOnInteraction:false,
        },
        pagination: {
            el: '.swiper-pagination1',
            clickable: true,
            type: 'bullets',
            dynamicBullets:true,
        },
        mousewheel: {
            invert: true,
        },
        navigation:{
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1',
        },
    });
    mainSlider.mousewheel.disable();
    //----------------------------------------------------------------------- parts-----------------------------------------------------------------------------------------
    $(document).ready(function () {
        $('ul.parts>li').hover(function () {
            $(this).find('p').fadeTo().stop();
            $(this).find('p').fadeTo('slow',1)
        },function () {
            $(this).find('p').fadeTo().stop();
                $(this).find('p').fadeTo('slow',0)
        })
    })
    //--------------------------------------- product-slider---------------------------------------------------

    var productSlider = new Swiper('.product-slider',{
        freeMode:true,
        freeModeMomentum:true,
        touchRatio:2,
        slidesPerView: 2,
        slidesPerGroup:3,
        spaceBetween: 10,
        speed:550,
        navigation:{
            nextEl: '.swiper-button-next-ps',
            prevEl: '.swiper-button-prev-ps',
        },
        breakpoints: {
            414: {
                slidesPerView:2.1,
                spaceBetween: 20,
            },
            600: {
                slidesPerView:2.4,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2.8,
                spaceBetween: 10,
                slidesPerGroup:2,
            },
            1080: {
                slidesPerView: 3,
                spaceBetween: 35,
                slidesPerGroup:2,
                touchRatio:0.1,
                freeMode: false,
            },
            1200: {
                slidesPerView: 3.2,
                spaceBetween: 35,
                touchRatio:0.1,
                freeMode: false,
            },
            1280: {
                slidesPerView: 4,
                slidesPerGroup:2,
                touchRatio:0.1,
                freeMode: false,
            },
            1400: {
                slidesPerView: 4,
                slidesPerGroup:2,
                spaceBetween: 30,
                touchRatio:0.1,
                freeMode: false,
            },
            1580: {
                slidesPerView: 5,
                slidesPerGroup:2,
                spaceBetween: 10,
                touchRatio:0.1,
                freeMode: false,
            },
        }
    });
 //------------------------------------------------------------------------------------------ brand slider---------------------------------------------------------------------------------------------------
    var brandSlider = new Swiper('.swiper3',{
        loop: true,
        autoplay: {
            delay:0.1,
            disableOnInteraction:false,
        },
        slidesPerGroup:1,
        speed:3000,
        slidesPerView: 4,
        spaceBetween: 2,
        allowTouchMove:false,
        simulateTouch:false,
        breakpoints: {
            414:{
                slidesPerView:4,
            },
            680:{
                slidesPerView:5,
            },
            808:{
                slidesPerView:6,
            }
            ,
            1050: {
                slidesPerView: 8,
            },
            1280: {
                slidesPerView: 8,
            },
        }

    });