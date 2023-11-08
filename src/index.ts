import type { SwiperOptions } from 'node_modules/swiper/types/swiper-options';
import { getFirstWord } from 'src/helpers/getClassName';
import { Swiper } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import {
  getAutoplayParams,
  getDirection,
  getNavigationParams,
  getPaginationParams,
} from './helpers/moduleSelector';

const sliders = document.querySelectorAll<HTMLElement>(`[yc-slider-element='slider-component']`);

const swiperElements: { [key: string]: Swiper } = {};

sliders.forEach((e, index) => {
  const wrapper = e.querySelector<HTMLElement>(`[yc-slider-element='wrapper']`);
  const list = e.querySelector<HTMLElement>(`[yc-slider-element='list']`);
  const item = e.querySelector<HTMLElement>(`[yc-slider-element='item']`);

  // Error Handling
  if (!wrapper) {
    return console.error(
      'Error: The wrapper element could not be found. Please ensure that an element with [yc-slider-element="wrapper"] exists.'
    );
  }
  if (!list) {
    return console.error(
      'Error: The list element could not be found. Please ensure that an element with [yc-slider-element="list"] exists.'
    );
  }
  if (!item) {
    return console.error(
      'Error: The item element could not be found. Please ensure that an element with [yc-slider-element="item"] exists.'
    );
  }
  // End of Error Handling

  // Custom Modules
  const navigationParams = getNavigationParams(e) ?? {};
  const paginationParams = getPaginationParams(e) ?? {};
  const autoplayParams = getAutoplayParams(list) ?? {};
  const direction = getDirection(list);
  // End of Custom Modules

  // Identifying class of list and item elements
  const listClass = getFirstWord(list);
  const itemClass = getFirstWord(item);
  // End of Identifying class of list and item elements

  // Setting Swiper Parameters
  const swiperParams: SwiperOptions = {
    modules: [Navigation, Pagination, Autoplay],
    speed: parseInt(list.getAttribute('yc-slider-speed') || '400') || 400,
    spaceBetween: parseInt(list.getAttribute('yc-slider-slide-gap') || '0') || 0,
    slidesPerView: parseInt(list.getAttribute('yc-slider-slides-visible') || '1') || 1,
    loop: list.getAttribute('yc-slider-loop') === 'true' || true,
    direction: direction,
    wrapperClass: listClass,
    slideClass: itemClass,
    navigation: navigationParams,
    pagination: paginationParams,
    autoplay: autoplayParams,
  };

  const swiperInstance = new Swiper(wrapper, swiperParams);
  swiperElements[`swiperInstance-${index}`] = swiperInstance;
});

declare global {
  interface Window {
    ycAttributes: {
      swiperElements: { [key: string]: Swiper };
    };
  }
}

// Ensure ycAttributes is defined
window.ycAttributes = window.ycAttributes || {};

// Attach swiperElements to ycAttributes
window.ycAttributes.swiperElements = swiperElements;
