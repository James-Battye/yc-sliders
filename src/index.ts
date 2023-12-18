import type { SwiperOptions } from 'node_modules/swiper/types/swiper-options';
import { getFirstWord } from 'src/helpers/getClassName';
import { Swiper } from 'swiper';
import {
  Autoplay,
  Controller,
  EffectCards,
  EffectCreative,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper/modules';

import {
  getAutoplayParams,
  getBreakpointParams,
  getDirection,
  getEffectsParams,
  getNavigationParams,
  getPaginationParams,
} from './helpers/moduleSelector';

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
  // End of Error Handling

  // Custom Modules
  const navigationParams = getNavigationParams(e) ?? {};
  const paginationParams = getPaginationParams(e) ?? {};
  const autoplayParams = getAutoplayParams(list) ?? {};
  const direction = getDirection(list);
  const breakpoints = getBreakpointParams(list);
  const effects = getEffectsParams(list);
  // End of Custom Modules

  // Identifying class of list and item elements
  const listClass = getFirstWord(list);
  const itemClass = getFirstWord(item[0]);
  // End of Identifying class of list and item elements

  if (list.getAttribute('yc-slider-double-slides')) {
    item.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      list.appendChild(clone);
    });
  }

  // Setting Swiper Parameters
  const swiperParams: SwiperOptions = {
    modules: [
      Navigation,
      Pagination,
      Autoplay,
      EffectFade,
      Controller,
      EffectCards,
      EffectCreative,
    ],
    speed: parseInt(list.getAttribute('yc-slider-speed') || '400') || 400,
    spaceBetween: parseInt(list.getAttribute('yc-slider-slide-gap') || '0') || 0,
    slidesPerView:
      list.getAttribute('yc-slider-slides-visible') === 'auto'
        ? 'auto'
        : parseInt(list.getAttribute('yc-slider-slides-visible') || '1') || 1,
    loop: list.getAttribute('yc-slider-loop') === 'true' ? true : false || false,
    direction: direction,
    initialSlide: parseInt(list.getAttribute('yc-slider-initial-slide') || '0') || 0,
    wrapperClass: listClass,
    slideClass: itemClass,
    navigation: navigationParams,
    loopAdditionalSlides: parseInt(list.getAttribute('yc-slider-additional-slides') || '0') || 0,
    pagination: paginationParams,
    autoplay: autoplayParams,
    breakpoints: breakpoints,
    centeredSlides: list.getAttribute('yc-slider-centered') === 'true' ? true : false || false,
    effect: effects.effects,
    grabCursor:
      list.getAttribute('yc-slider-grab-cursor') === 'true' ||
      list.getAttribute('yc-slider-grab-cursor') === null ||
      false,
    allowTouchMove:
      list.getAttribute('yc-slider-swipe-to-change') === 'true' ||
      list.getAttribute('yc-slider-swipe-to-change') === null ||
      false,
    init: list.getAttribute('yc-slider-init') === 'true' ? true : false || true,
    controller: {
      control: null,
    },
  };

  // adding custom effect objects
  if (effects.fadeEffect) {
    swiperParams.fadeEffect = effects.fadeEffect;
  }

  if (effects.effects === 'cards') {
    swiperParams.cardsEffect = effects.cardEffect;
  }

  if (effects.effects === 'creative') {
    swiperParams.creativeEffect = effects.creativeEffect;
  }

  const swiperInstance = new Swiper(wrapper, swiperParams);
  sliderInstances[`${e.getAttribute('yc-slider-component')}-${index}`] = swiperInstance;

  if (effects.fadeEffect) {
    const style = document.createElement('style');

    const fadeCss = `
      .${itemClass} {
        pointer-events: none;
      }

      .${itemClass}.swiper-slide-active {
        pointer-events: auto;
      }
    `;

    // Set the CSS text of the style element
    style.textContent = fadeCss;

    // Append the style element to the document head
    document.head.appendChild(style);
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
