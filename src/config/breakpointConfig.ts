import type { SwiperOptions } from "swiper/types/swiper-options";

export function getBreakpointParams(list: HTMLElement): SwiperOptions['breakpoints'] {
  const breakpointParams: SwiperOptions['breakpoints'] = {};

  if (list.getAttribute('yc-slider-breakpoint-desktop')) {
    breakpointParams['991'] = {
      slidesPerView: parseInt(list.getAttribute('yc-slider-breakpoint-desktop') || '1') || 1,
    };
  }

  if (list.getAttribute('yc-slider-breakpoint-tablet')) {
    breakpointParams['568'] = {
      slidesPerView: parseInt(list.getAttribute('yc-slider-breakpoint-tablet') || '1') || 1,
    };
  }

  if (list.getAttribute('yc-slider-breakpoint-mobile')) {
    breakpointParams['320'] = {
      slidesPerView: parseInt(list.getAttribute('yc-slider-breakpoint-mobile') || '1') || 1,
    };
  }

  return breakpointParams;
}
