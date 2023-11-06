import { SwiperOptions } from 'node_modules/swiper/types/swiper-options';
import { getFirstWord } from 'src/helpers/getClassName';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

/**
 * Attribute Name: BLANK-element
 *
 * Required Attributes:
 * - [BLANK-element='wrapper']
 * - [BLANK-element='list']
 * - [BLANK-element='item']
 * - [BLANK-element='pagination']
 * - [BLANK-element='navigation']
 * - [BLANK-element='next-arrow']
 * - [BLANK-element='prev-arrow']
 */
const identifier = '';
const sliders = document.querySelectorAll<HTMLElement>(
  `[${identifier}-element='slider-component']`
);

sliders.forEach((e) => {
  const wrapper = e.querySelector<HTMLElement>(`[${identifier}-element='wrapper']`);
  if (!wrapper) {
    return console.error('no wrapper');
  }

  const list = e.querySelector<HTMLElement>(`[${identifier}-element='list']`);
  if (!list) {
    return console.error('no list');
  }

  const item = e.querySelector<HTMLElement>(`[${identifier}-element='item']`);
  if (!item) {
    return console.error('no item');
  }

  const nav = e.querySelector<HTMLElement>(`[${identifier}-element='navigation']`);
  if (!nav) {
    return console.error('no nav');
  }

  const paginationElement = e.querySelector<HTMLElement>(`[${identifier}-element='pagination']`);
  if (!paginationElement) {
    return console.error('no paginationElement');
  }

  const nextArrow = nav.querySelector<HTMLElement>(`[${identifier}-element='next-arrow']`);
  if (!nextArrow) {
    return console.error('no nextArrow');
  }

  const prevArrow = nav.querySelector<HTMLElement>(`[${identifier}-element='prev-arrow']`);
  if (!prevArrow) {
    return console.error('no prevArrow');
  }

  const paginationDot = paginationElement?.querySelector<HTMLElement>(
    `[${identifier}-element='pagination-dot']`
  );
  if (!paginationDot) {
    return console.error('no paginationDot');
  }

  const paginationActiveClass = 'is-active';
  const listClass = getFirstWord(list);
  const itemClass = getFirstWord(item);
  const paginationDotClass = getFirstWord(paginationDot);

  const swiperParams: SwiperOptions = {
    modules: [Navigation, Pagination],
    speed: 400,
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    direction: 'horizontal',
    wrapperClass: listClass,
    slideClass: itemClass,
    navigation: {
      nextEl: nextArrow,
      prevEl: prevArrow,
    },
    pagination: {
      el: paginationElement,
      bulletActiveClass: paginationActiveClass,
      bulletClass: paginationDotClass,
      bulletElement: 'button',
      clickable: true,
    },
  };

  if (wrapper) {
    const swiper = new Swiper(wrapper, swiperParams);

    // Function to be executed repeatedly
    function loopFunction() {
      swiper.slideNext();
    }

    // Interval time in milliseconds (5 seconds)
    const intervalTime = 5000;

    // Start the loop
    let intervalID = setInterval(loopFunction, intervalTime);

    // Attach event listener for slideChange event to reset interval on slide change
    swiper.on('slideChange', function () {
      // Clear the existing interval
      clearInterval(intervalID);

      // Start a new interval
      intervalID = setInterval(loopFunction, intervalTime);
    });
  }
});
