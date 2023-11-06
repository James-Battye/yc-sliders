import { expect, test } from '@playwright/test';

import { sitemapArray } from './sitemap';

const urls = sitemapArray;

urls.forEach((e) => {
  test.describe('Testimonial Slider', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(e);
    });

    test(`${e} should render slider component correctly`, async ({ page }) => {
      const sliderComponent = await page.waitForSelector(
        '[testimonial-element="slider-component"]'
      );
      expect(sliderComponent).toBeTruthy();

      const wrapper = await sliderComponent.waitForSelector('[testimonial-element="wrapper"]');
      expect(wrapper).toBeTruthy();

      const list = await sliderComponent.waitForSelector('[testimonial-element="list"]');
      expect(list).toBeTruthy();

      const item = await sliderComponent.waitForSelector('[testimonial-element="item"]');
      expect(item).toBeTruthy();

      const nav = await sliderComponent.waitForSelector('[testimonial-element="navigation"]');
      expect(nav).toBeTruthy();

      const paginationElement = await sliderComponent.waitForSelector(
        '[testimonial-element="pagination"]'
      );
      expect(paginationElement).toBeTruthy();

      const nextArrow = await nav.waitForSelector('[testimonial-element="next-arrow"]');
      expect(nextArrow).toBeTruthy();

      const prevArrow = await nav.waitForSelector('[testimonial-element="prev-arrow"]');
      expect(prevArrow).toBeTruthy();
    });

    test(`${e} should navigate to the previous item on prev arrow click`, async ({ page }) => {
      const currentActive = await page.waitForSelector("[data-swiper-slide-index='0']");
      const lastSibling = await currentActive.evaluate((element) => {
        const parent = element.parentNode;
        const lastChild = parent?.lastElementChild;
        return {
          element: lastChild,
          index: lastChild?.getAttribute('data-swiper-slide-index'),
        };
      });

      const prevArrow = await page.waitForSelector('[testimonial-element="prev-arrow"]');
      await prevArrow.click();

      // Similar to the next item test, check if the expected item is displayed and pagination is updated.
      const activeItem = (
        await page.waitForSelector('.testimonials_item.swiper-slide-active')
      ).getAttribute('data-swiper-slide-index');

      expect((await activeItem) === lastSibling.index).toBeTruthy();

      const activeDot = await page.waitForSelector('.testimonials_pagination-dot.is-active');
      expect(activeDot).toBeTruthy();
    });

    test(`${e} should navigate to the next item on next arrow click`, async ({ page }) => {
      const nextSlide = await page.waitForSelector("[data-swiper-slide-index='1']");

      const nextArrow = await page.waitForSelector('[testimonial-element="next-arrow"]');
      await nextArrow.click();

      // Similar to the next item test, check if the expected item is displayed and pagination is updated.
      const activeItem = (
        await page.waitForSelector('.testimonials_item.swiper-slide-active')
      ).getAttribute('data-swiper-slide-index');

      expect(
        (await activeItem) === (await nextSlide.getAttribute('data-swiper-slide-index'))
      ).toBeTruthy();

      const activeDot = await page.waitForSelector('.testimonials_pagination-dot.is-active');
      expect(activeDot).toBeTruthy();
    });
  });
});
