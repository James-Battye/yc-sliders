import { Swiper } from 'swiper';

import { initializeSwiperObserver } from './config/filterConfig';
import { getSwiperConfig } from './config/swiperConfig';

const sliders = document.querySelectorAll<HTMLElement>(`[yc-slider-component]`);

const sliderInstances: { [key: string]: Swiper } = {};

sliders.forEach((e, index) => {
  const wrapper = e.querySelector<HTMLElement>(`[yc-slider-element='wrapper']`);
  const list = e.querySelector<HTMLElement>(`[yc-slider-element='list']`);
  const item = e.querySelectorAll<HTMLElement>(`[yc-slider-element='item']`);

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
  if (item.length < 1) {
    return console.error('Error: Only 1 slide, cannot create a slider.');
  }

  const swiperParams = getSwiperConfig(e, wrapper, list, item);

  let swiperInstance;

  if (!list.getAttribute('yc-slider-init')) {
    swiperInstance = new Swiper(wrapper, swiperParams);
  }

  const width = window.innerWidth;
  const attributeValue = list.getAttribute('yc-slider-init');

  if (attributeValue?.includes('desktop') && width > 991) {
    swiperInstance = new Swiper(wrapper, swiperParams);
  }

  if (attributeValue?.includes('tablet') && width > 568 && width <= 991) {
    swiperInstance = new Swiper(wrapper, swiperParams);
  }

  if (attributeValue?.includes('mobile') && width >= 320 && width <= 568) {
    swiperInstance = new Swiper(wrapper, swiperParams);
  }

  if (swiperInstance) {
    sliderInstances[`${e.getAttribute('yc-slider-component')}-${index}`] = swiperInstance;
  }

  if (list.getAttribute('yc-slider-filter')) {
    if (swiperInstance) {
      initializeSwiperObserver(swiperInstance, list);
    }
  }
});

declare global {
  interface Window {
    ycAttributes: {
      sliders: { [key: string]: Swiper };
    };
  }
}

// Ensure ycAttributes is defined
window.ycAttributes = window.ycAttributes || {};

// Attach sliderInstances to ycAttributes
window.ycAttributes.sliders = sliderInstances;
