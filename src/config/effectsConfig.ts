export function getEffectsParams(list: HTMLElement) {
  const effects: { effects: string;[key: string]: any } = {
    effects: 'none',
  };

  if (list.getAttribute('yc-slider-effect') === 'fade') {
    effects.effects = 'fade';
    effects.fadeEffect = {
      crossFade: true,
    };
  }

  if (
    list.getAttribute('yc-slider-effect') === 'cards' ||
    list.getAttribute('yc-slider-effect') === 'card'
  ) {
    effects.effects = 'cards';
    effects.cardEffect = {
      perSlideOffset: 64,
      perSlideRotate: -2,
      slideShadows: true,
    };
  }

  if (list.getAttribute('yc-slider-effect') === 'creative') {
    effects.effects = 'creative';
    effects.creativeEffect = {
      next: {
        translate: ['80%', '-2rem', 0],
        scale: 0.9,
      },
      prev: {
        translate: ['-80%', '-2rem', 0],
        scale: 0.9,
      },
    };
  }

  if (list.getAttribute('yc-slider-effect') === 'creative-flat') {
    effects.effects = 'creative';
    effects.creativeEffect = {
      next: {
        translate: ['80%', '-2rem', 0],
      },
      prev: {
        translate: ['-80%', '-2rem', 0],
      },
    };
  }

  return effects;
}
