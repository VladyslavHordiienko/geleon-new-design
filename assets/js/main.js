document.addEventListener('DOMContentLoaded', function () {
  // Home page sliders init
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

  // END Home page sliders init
});
