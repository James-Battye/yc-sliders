import { getFirstWord } from './getClassName';

export function getNavigationParams(component: HTMLElement, list: HTMLElement) {
  let navigationParams = {};

  if (list.getAttribute('yc-slider-navigation')) {
    const nav = component.querySelector<HTMLElement>(`[yc-slider-element='navigation']`);
    if (!nav) {
      return console.error('No nav wrapper element on the page.');
    }

    const nextArrow = nav.querySelector<HTMLElement>(`[yc-slider-element='next-arrow']`);
    if (!nextArrow) {
      return console.error('no nextArrow');
    }

    const prevArrow = nav.querySelector<HTMLElement>(`[yc-slider-element='prev-arrow']`);
    if (!prevArrow) {
      return console.error('no prevArrow');
    }

    navigationParams = {
      nextEl: nextArrow,
      prevEl: prevArrow,
    };
  } else {
    navigationParams = {
      enabled: false,
    };
  }
  return navigationParams;
}

export function getPaginationParams(component: HTMLElement, list: HTMLElement) {
  let paginationParams = {};

  if (list.getAttribute('yc-slider-pagination')) {
    const paginationElement = component.querySelector<HTMLElement>(
      `[yc-slider-element='pagination']`
    );
    if (!paginationElement) {
      return console.error('no paginationElement');
    }

    const paginationDot = paginationElement?.querySelector<HTMLElement>(
      `[yc-slider-element='pagination-dot']`
    );
    if (!paginationDot) {
      return console.error('no paginationDot');
    }

    const paginationActiveClass = 'is-active';
    const paginationDotClass = getFirstWord(paginationDot);

    paginationParams = {
      el: paginationElement,
      bulletActiveClass: paginationActiveClass,
      bulletClass: paginationDotClass,
      bulletElement: 'button',
      clickable: true,
    };
  } else {
    paginationParams = {
      enabled: false,
    };
  }

  return paginationParams;
}

export function getAutoplayParams(component: HTMLElement, list: HTMLElement) {
  let autoplayParams = {};

  if (list.getAttribute('yc-slider-autoplay')) {
    autoplayParams = {
      enabled: true,
      delay: parseInt(list.getAttribute('yc-slider-autoplay-delay') || '4000') || 4000,
    };
  } else {
    autoplayParams = {
      enabled: false,
    };
  }

  return autoplayParams;
}

export function getDirection(list: HTMLElement): 'horizontal' | 'vertical' {
  const directionAttr = list.getAttribute('speed') as 'horizontal' | 'vertical';
  return ['horizontal', 'vertical'].includes(directionAttr) ? directionAttr : 'horizontal';
}
