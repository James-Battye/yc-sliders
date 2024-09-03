import { Swiper } from 'swiper';

import { initializeSwiperObserver } from './config/filterConfig';
import { getSwiperConfig } from './config/swiperConfig';

// Select all elements with the attribute 'yc-slider-component'
const sliders = document.querySelectorAll<HTMLElement>(`[yc-slider-component]`);

// Object to store all Swiper instances
const sliderInstances: { [key: string]: { swiper: Swiper, control: boolean } } = {};

// Iterate over each slider component found
sliders.forEach((e, index) => {
  // Query necessary child elements
  const wrapper = e.querySelector<HTMLElement>(`[yc-slider-element='wrapper']`);
  const list = e.querySelector<HTMLElement>(`[yc-slider-element='list']`);
  const item = e.querySelectorAll<HTMLElement>(`[yc-slider-element='item']`);

  // Error Handling: Ensure all required elements are present
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

  const controller = list.getAttribute('yc-controller-role') === 'controller' ? true : false

  // Get Swiper configuration based on the element attributes
  const swiperParams = getSwiperConfig(e, wrapper, list, item, controller);

  let swiperInstance;

  // Initialize Swiper if 'yc-slider-init' attribute is not present
  if (!list.getAttribute('yc-slider-init')) {
    swiperInstance = new Swiper(wrapper, swiperParams);
  }

  // Get the current window width
  const width = window.innerWidth;
  const attributeValue = list.getAttribute('yc-slider-init');

  // Initialize Swiper based on screen width and 'yc-slider-init' attribute
  if (attributeValue?.includes('desktop') && width > 991) {
    swiperInstance = new Swiper(wrapper, swiperParams);
  }

  if (attributeValue?.includes('tablet') && width > 568 && width <= 991) {
    swiperInstance = new Swiper(wrapper, swiperParams);
  }

  if (attributeValue?.includes('mobile') && width >= 320 && width <= 568) {
    swiperInstance = new Swiper(wrapper, swiperParams);
  }

  // Store the Swiper instance if it was initialized
  if (swiperInstance) {
    sliderInstances[`${e.getAttribute('yc-slider-component')}-${index}`] = { swiper: swiperInstance, control: controller };
  }

  // Initialize MutationObserver if 'yc-slider-filter' attribute is present
  if (list.getAttribute('yc-slider-filter')) {
    if (swiperInstance) {
      initializeSwiperObserver(swiperInstance, list);
    }
  }
});

// Extend the global window object to include ycAttributes
declare global {
  interface Window {
    ycAttributes: {
      sliders: {
        [key: string]: {
          swiper: Swiper; // Assuming Swiper is the type you want to keep
          control: boolean; // New boolean property added inside sliders
        };
      };
    };
  }
}


// Ensure ycAttributes is defined on the window object
window.ycAttributes = window.ycAttributes || {};

// Attach sliderInstances to ycAttributes
window.ycAttributes.sliders = sliderInstances;

if (window.ycAttributes && window.ycAttributes.sliders) {
  const sliderKeys = Object.keys(window.ycAttributes.sliders); // Get the keys of the sliders object
  const length = sliderKeys.length; // Get the number of sliders

  for (let i = 0; i < length; i++) {
    const key = sliderKeys[i]; // Get the current key
    const slider = window.ycAttributes.sliders[key]; // Access the slider object

    if (slider.control) {
      // Search the page for all elements with 'yc-controller-pair' attribute
      const allPairElements = document.querySelectorAll('[yc-controller-pair]');
      let controls = []; // Initialize controls array inside the loop

      // Find the matching element (excluding the input element)
      for (const element of allPairElements) {
        if (element !== slider.swiper.slidesEl && element.getAttribute('yc-controller-pair') === slider.swiper.slidesEl.getAttribute('yc-controller-pair')) {
          const parentSwiper = element.parentNode?.swiper;
          if (parentSwiper) {
            controls.push(parentSwiper);
          }
        }
      }
      slider.swiper.controller.control = controls;
    }
  }
}
