/* eslint-disable no-console */
import { expect, test } from '@playwright/test';

import { sitemapArray } from './sitemap';

const urls = sitemapArray;

urls.forEach((url) => {
  test.describe(`Link Aria-Label Tests for ${url}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test('all links should have href or aria-label', async ({ page }) => {
      const links = await page.$$('a');
      let linksMissingHrefOrAriaLabel = 0;

      for (const link of links) {
        const ariaLabel = await link.getAttribute('aria-label');
        const href = await link.getAttribute('href');

        if (
          (ariaLabel === null || ariaLabel.trim() === '') &&
          (href === null || href.trim() === '')
        ) {
          linksMissingHrefOrAriaLabel += 1;
        }
      }

      // Log the count and fail the test if any links are missing href or aria-label.
      if (linksMissingHrefOrAriaLabel > 0) {
        console.log(
          `Page ${url} has ${linksMissingHrefOrAriaLabel} links missing both aria-label and href.`
        );
        expect(linksMissingHrefOrAriaLabel).toBe(0); // This will cause the test to fail if linksMissingHrefOrAriaLabel is not 0.
      }
    });
  });
});
