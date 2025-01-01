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
    pagination: {
      el: '.card__main-slider .swiper-pagination',
    },
  });
  const sliderSettings = {
    slidesPerView: 4,
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      374: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      769: {
        slidesPerView: 4,
      },
    },
  };
  let swiperInstances = {};
  const checkSlider = (node, className) => {
    const isMobile = $(window).width() <= 1024;
    if (isMobile && !swiperInstances[node]) {
      $(`.${node} > div`).addClass('swiper-wrapper');
      $(`.${node} > div`).removeClass(className);
      swiperInstances[node] = new Swiper(`.${node}`, sliderSettings);
    } else if (!isMobile && swiperInstances[node]) {
      $(`.${node} > div`).removeClass('swiper-wrapper');
      $(`.${node} > div`).addClass(className);
      swiperInstances[node].destroy(true, true);
      swiperInstances[node] = null;
    }
  };

  // Функция debounce
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  $(window).resize(
    debounce(function () {
      checkSlider('popular__products', 'popular__grid');
      checkSlider('hit__products', 'product__grid');
      checkSlider('recently__products', 'product__grid');
      checkSlider('recommend__products', 'product__grid');
    }, 200),
  );
  checkSlider('popular__products', 'popular__grid');
  checkSlider('hit__products', 'product__grid');
  checkSlider('recently__products', 'product__grid');
  checkSlider('recommend__products', 'product__grid');
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

  function hideOnClickOutside(node) {
    const outsideClickListener = (event) => {
      if (event.target.closest(node) === null) {
        $(node).each(function () {
          $(this).removeClass('active');
        });
        removeClickListener();
      }
    };

    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };

    document.addEventListener('click', outsideClickListener);
  }
  // Custome dropdown
  document.addEventListener('click', (e) => {
    hideOnClickOutside('.sort__dropdown');
  });

  $('.sort__selected').click(function () {
    $(this).closest('.sort__dropdown').toggleClass('active');
  });
  $('.sort__item').click(function () {
    $(this).closest('.sort__dropdown').removeClass('active');
    $(this).closest('.sort__dropdown').find('.sort__selected span').text($(this).text());
  });
  // show more/less
  $('.more-less').click(function () {
    $(this).prev().toggleClass('active');
  });
  // Popups
  $('.popup__cancel').click(function () {
    $('body').removeClass('hidden');
    $(this).closest('.popup').fadeOut('slow');
  });
  $('.header__cart').click(function () {
    $('body').addClass('hidden');
    $('.cart-popup').fadeIn('slow');
  });
  // Header catalog
  $('.header__catalog-tab').each(function (i) {
    $(this).click(function () {
      $('.header__catalog-tab').each(function (j) {
        i === j ? $(this).addClass('active') : $(this).removeClass('active');
      });
      $('.header__catalog-mobile').each(function (j) {
        i === j ? $(this).addClass('active') : $(this).removeClass('active');
      });
    });
  });
  $('.header__catalog-cancel').click(function () {
    $('body').removeClass('hidden');
    $('.header__catalog').removeClass('active');
  });
  $('.header__catalog-btn').click(function () {
    if ($('body').width() <= 768) {
      $('body').addClass('hidden');
      $('.header__catalog').addClass('active');
    }
  });
  $('.header__catalog-list > li').click(function (e) {
    if ($('body').width() <= 768) {
      $(this).toggleClass('active');
      $(this).find('.header__submenu').slideToggle('slow');
    }
  });
  $('.header__catalog-label').click(function (e) {
    if ($('body').width() <= 768) {
      e.preventDefault();
    }
  });
  // Replace price block in Card page
  replacePriceBlock();
  if (document.querySelector('.card__content')) {
    window.addEventListener('resize', replacePriceBlock);
  }

  function replacePriceBlock() {
    if ($(window).width() <= 1024) {
      var prodForm = $('.card-price-cell').detach();
      $('.card__main').after(prodForm);
    } else {
      var prodForm = $('.card-price-cell').detach();
      $('.card__info').prepend(prodForm);
    }
  }
  // Catalog filter
  $('.catalog__filter-call').click(function () {
    $('body').addClass('hidden');
    $('.catalog__filter').addClass('active');
  });
  $('.catalog__filter-cancel').click(function () {
    $('body').removeClass('hidden');
    $('.catalog__filter').removeClass('active');
  });
  // Cart page
  $('.cart__title-inner').click(function () {
    if ($(window).width() <= 1024) {
      $(this).toggleClass('active');
      $(this).next().slideToggle('slow');
    }
  });
});
