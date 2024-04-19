import type { SwiperOptions } from "swiper/types/swiper-options";
import { getPaginationParams } from "./paginationConfig";
import { getAutoplayParams } from "./autoplayConfig";
import { getBreakpointParams } from "./breakpointConfig";
import { getDirection } from "./directionConfig";
import { getEffectsParams } from "./effectsConfig";
import { getNavigationParams } from "./navigationConfig";
import { getFirstWord } from "../helpers/getClassName";
import {
    A11y,
    Autoplay,
    Controller,
    EffectCards,
    EffectCreative,
    EffectFade,
    Navigation,
    Pagination,
  } from 'swiper/modules';

// Function to generate the configuration for a Swiper instance based on the provided element
export function getSwiperConfig(element: HTMLElement, wrapper: HTMLElement, list: HTMLElement, item: NodeListOf<HTMLElement>): SwiperOptions {
    // Retrieve attribute-based configurations
    const navigationParams = getNavigationParams(element);
    const paginationParams = getPaginationParams(element);
    const autoplayParams = getAutoplayParams(list);
    const effectsParams = getEffectsParams(list);
    const breakpointParams = getBreakpointParams(list)
    const directionParams = getDirection(list)

    // Get list, wrapper and item classes
    const itemClass = getFirstWord(item[0])
    const listClass = getFirstWord(list)

    // Duplicate slides
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
      A11y,
    ],
    speed: parseInt(list.getAttribute('yc-slider-speed') || '400') || 400,
    spaceBetween: parseInt(list.getAttribute('yc-slider-slide-gap') || '0') || 0,
    slidesPerView:
      list.getAttribute('yc-slider-slides-visible') === 'auto'
        ? 'auto'
        : parseInt(list.getAttribute('yc-slider-slides-visible') || '1') || 1,
    loop: list.getAttribute('yc-slider-loop') === 'true' ? true : false || false,
    direction: directionParams,
    initialSlide: parseInt(list.getAttribute('yc-slider-initial-slide') || '0') || 0,
    wrapperClass: listClass,
    slideClass: itemClass,
    a11y: {
      enabled: true,
      itemRoleDescriptionMessage: 'slider item',
    },
    navigation: navigationParams,
    loopAdditionalSlides: parseInt(list.getAttribute('yc-slider-additional-slides') || '0') || 0,
    pagination: paginationParams,
    autoplay: autoplayParams,
    breakpoints: breakpointParams,
    slidesPerGroup: 1,
    centeredSlides: list.getAttribute('yc-slider-centered') === 'true' ? true : false || false,
    effect: effectsParams.effects,
    grabCursor:
      list.hasAttribute('yc-slider-grab-cursor') &&
      list.getAttribute('yc-slider-grab-cursor') === 'false'
        ? false
        : true,
    allowTouchMove:
      list.hasAttribute('yc-slider-swipe-to-change') &&
      list.getAttribute('yc-slider-swipe-to-change') === 'false'
        ? false
        : true,
    init: list.getAttribute('yc-slider-init') === 'true' ? true : false || true,
    controller: {
      control: null,
    },
  };

  // adding custom effect objects
  if (effectsParams.fadeEffect) {
    swiperParams.fadeEffect = effectsParams.fadeEffect;

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

  if (effectsParams.effects === 'cards') {
    swiperParams.cardsEffect = effectsParams.cardEffect;
  }

  if (effectsParams.effects === 'creative') {
    swiperParams.creativeEffect = effectsParams.creativeEffect;
  }

    return swiperParams;
}