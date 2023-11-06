import { getFirstWord } from './getClassName';

export function getNavigationParams(list: HTMLElement) {
  let navigationParams = {};

  if (list.getAttribute('navigation')) {
    const nav = list.querySelector<HTMLElement>(`[slider-element='navigation']`);
    if (!nav) {
      return console.error('No nav wrapper element on the page.');
    }

    const nextArrow = nav.querySelector<HTMLElement>(`[slider-element='next-arrow']`);
    if (!nextArrow) {
      return console.error('no nextArrow');
    }

    const prevArrow = nav.querySelector<HTMLElement>(`[slider-element='prev-arrow']`);
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

export function getPaginationParams(list: HTMLElement) {
  let paginationParams = {};

  if (list.getAttribute('pagination')) {
    const paginationElement = list.querySelector<HTMLElement>(`[slider-element='pagination']`);
    if (!paginationElement) {
      return console.error('no paginationElement');
    }

    const paginationDot = paginationElement?.querySelector<HTMLElement>(
      `[slider-element='pagination-dot']`
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

export function getAutoplayParams(list: HTMLElement) {
  let autoplayParams = {};

  if (list.getAttribute('slider-autoplay')) {
    autoplayParams = {
      enabled: true,
      delay: parseInt(list.getAttribute('autoplay-delay') || '4000') || 4000,
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
