import type Swiper from 'swiper';

// Function to initialize MutationObserver and handle updates
export const initializeSwiperObserver = (swiper: Swiper, list: HTMLElement) => {
  let initialChildCount = list.children.length;

  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: false };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList: MutationRecord[]) {
    let shouldUpdate = false;

    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const currentChildCount = list.children.length;
        if (currentChildCount !== initialChildCount) {
          shouldUpdate = true;
          initialChildCount = currentChildCount; // Update the initial count
          break;
        }
      }
    }

    console.log('callback called');

    if (shouldUpdate) {
      swiper.update();
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(list, config);
};
