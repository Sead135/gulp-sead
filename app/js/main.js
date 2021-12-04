$(function() {

    $('.header__btn').on('click', function() {
        $('.rightside-menu').removeClass('rightside-menu--close')
    });

    $('.rightside-menu__close').on('click', function() {
        $('.rightside-menu').addClass('rightside-menu--close')
    });

    $('.top__slider').slick({
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000
    })

    $('.contact-slider').slick({
        slidesToShow: 10,
        slidesToScroll: 10,
        dots: true,
        arrows: false,
    })

    $('.article-slider__box').slick({
        prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrow--left"><img src="/img/arrow-slide-left.svg"></button>',
        nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrow--right"><img src="/img/arrow-slide-right.svg"></button>'
    })
})

const mixer = mixitup('.gallery__inner', {
    load: {
        filter: '.living'
    }
})

/* gsap.registerPlugin(ScrollTrigger);

let newCollection = { trigger: ".new-collection", start: "top center", end: "bottom bottom" } 
let decor = { trigger: ".decor", start: "top center", end: "bottom bottom" } 

gsap.from(".new-collection", {
    scrollTrigger: newCollection,
    x: 400,
    opacity: 0
});
gsap.from(".new-collection__title", {
    scrollTrigger: newCollection,
    opacity: 0,
    duration: 3
});
gsap.from(".collection", {
    scrollTrigger: newCollection,
    opacity: 0,
    y: 100,
    duration: 3,
    ease: "power1.in"
});
gsap.from(".decor", {
    scrollTrigger: decor,
    x: 400,
    opacity: 0
});
gsap.from(".works-path", {
    scrollTrigger: {
    trigger: ".works-path",
    start: "top center",
    end: "bottom bottom"
    },
    x: 400,
    opacity: 0
}); */