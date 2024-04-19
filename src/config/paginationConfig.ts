import { getFirstWord } from "../helpers/getClassName";

export function getPaginationParams(component: HTMLElement) {
    let paginationParams = {};
  
    if (component.querySelector("[yc-slider-element='pagination']")) {
      const paginationElement = component.querySelector<HTMLElement>(
        `[yc-slider-element='pagination']`
      );
      if (!paginationElement) {
        console.error('no paginationElement');
        return {}
      }
  
      const paginationDot = paginationElement?.querySelector<HTMLElement>(
        "[yc-slider-element='pagination-dot']"
      );
      if (!paginationDot) {
        console.error('no paginationDot');
        return {}
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