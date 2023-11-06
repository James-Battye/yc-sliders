// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { expect, test } from '@playwright/test';

import { sitemapArray } from './sitemap';

const urls = sitemapArray;

urls.forEach((url) => {
  test.describe(`Image Alt Text Tests for ${url}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test('all images should have alt text or be marked as decorative', async ({ page }) => {
      const images = await page.$$('img');
      const imagesWithoutAlt = [];

      for (const image of images) {
        const altText = await image.getAttribute('alt');
        const role = await image.getAttribute('role');
        const ariaHidden = await image.getAttribute('aria-hidden');

        if (
          (altText === null || altText.trim() === '') && // alt is missing or empty
          role !== 'presentation' && // role is not presentation
          ariaHidden !== 'true' // aria-hidden is not true
        ) {
          const src = await image.getAttribute('src');
          imagesWithoutAlt.push(src);
        }
      }

      if (imagesWithoutAlt.length > 0) {
        // eslint-disable-next-line no-console
        console.log(
          `Found ${imagesWithoutAlt.length} images without proper alt text or not marked as decorative on page ${url}`
        );
        expect(imagesWithoutAlt.length).toBe(0);
      }
    });
  });
});
