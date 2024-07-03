export function getDirection(list: HTMLElement): 'horizontal' | 'vertical' {
  const directionAttr = list.getAttribute('yc-slider-direction') as 'horizontal' | 'vertical';
  return ['horizontal', 'vertical'].includes(directionAttr) ? directionAttr : 'horizontal';
}
