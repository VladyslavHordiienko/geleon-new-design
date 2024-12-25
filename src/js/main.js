document.addEventListener('DOMContentLoaded', function () {
  // Update cuurent year
  $('.current-year').text(new Date().getFullYear());
  // Sliders init
  const hugeHomeSlider = new Swiper('.home-banner__huge', {
    pagination: {
      el: '.home-banner__huge .swiper-pagination',
    },
    navigation: {
      nextEl: '.home-banner__huge .swiper-button-next',
      prevEl: '.home-banner__huge .swiper-button-prev',
    },
    //autoplay: true,
  });

  const benefitsHomeSlider = new Swiper('.home-banner__small', {
    pagination: {
      el: '.home-banner__small .swiper-pagination',
    },
    navigation: {
      nextEl: '.home-banner__small .swiper-button-next',
      prevEl: '.home-banner__small .swiper-button-prev',
    },
    //autoplay: true,
  });

  // HIT section inner sliders
  const hitProducts = document.querySelectorAll('.product__hero');
  hitProducts.forEach((el, i) => {
    el.dataset.slide = `product-slide-${i}`;
    new Swiper(`[data-slide='product-slide-${i}']`, {
      pagination: {
        el: '.product__hero .swiper-pagination',
      },
    });
  });

  // Sliders in card page
  const swiperSide = new Swiper('.card__pagination-slider', {
    direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.card__pagination-thumb .swiper-button-next',
      prevEl: '.card__pagination-thumb .swiper-button-prev',
    },
  });
  const swiperMain = new Swiper('.card__main-slider', {
    thumbs: {
      swiper: swiperSide,
    },
    watchOverflow: true,
    breakpoints: {
      280: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
          dynamicBullets: true,
        },
      },
    },
  });
  // END Sliders init

  // TABS in CARD page
  $('.card__tab').each(function (i) {
    $(this).click(function () {
      $('.card__tab').each(function (j) {
        i === j ? $(this).addClass('active') : $(this).removeClass('active');
      });
      $('.card__tab-text').each(function (j) {
        i === j ? $(this).addClass('active') : $(this).removeClass('active');
      });
    });
  });
});
