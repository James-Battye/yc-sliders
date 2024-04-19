export function getAutoplayParams(list: HTMLElement) {
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