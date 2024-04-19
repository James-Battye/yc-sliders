export function getNavigationParams(component: HTMLElement) {
    let navigationParams = {};
  
    if (component.querySelector("[yc-slider-element='navigation']")) {
      const nav = component.querySelector<HTMLElement>(`[yc-slider-element='navigation']`);
      if (!nav) {
         console.error('No nav wrapper element on the page.');
         return {}
      }
  
      const nextArrow = nav.querySelector<HTMLElement>(`[yc-slider-element='next-arrow']`);
      if (!nextArrow) {
         console.error('no nextArrow');
        return {}
      }
  
      const prevArrow = nav.querySelector<HTMLElement>(`[yc-slider-element='prev-arrow']`);
      if (!prevArrow) {
         console.error('no prevArrow');
         return {}

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