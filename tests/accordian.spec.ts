import { expect, test } from '@playwright/test';

import { sitemapArray } from './sitemap';

const urls = sitemapArray;

urls.forEach((url) => {
  test.describe(`Accordian Tests for ${url}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(url);
    });

    test('are there any links on the page', async ({ page }) => {
      const links = await page.$$('div[faq-link]');
      expect(links.length).toBeGreaterThan(0);
    });

    test('when a link is clicked does the active class get added', async ({ page }) => {
      const links = await page.$$('div[faq-link]');
      await links[0].click();
      const classList = await links[0].getAttribute('class');
      expect(classList).toContain('is-active');
    });

    test('when a link is clicked, after a short delay is there only 1 link with the active class applied', async ({
      page,
    }) => {
      const links = await page.$$('div[faq-link]');
      await links[0].click();
      await page.waitForTimeout(100);
      await links[1].click();
      await page.waitForTimeout(500);

      let activeCount = 0;
      for (let i = 0; i < links.length; i++) {
        const classList = await links[i].getAttribute('class');
        if (classList?.includes('is-active')) activeCount = activeCount + 1;
      }

      expect(activeCount).toBe(1);
    });

    test('when a link with the active class is clicked, the active class should get removed', async ({
      page,
    }) => {
      const links = await page.$$('div[faq-link]');
      expect(links.length).toBeGreaterThan(0); // Ensure there is at least one link

      // Click the first link to add the active class
      await links[0].click();
      let classList = await links[0].getAttribute('class');
      expect(classList).toContain('is-active'); // Ensure the active class is added

      // Click the first link again to remove the active class
      await links[0].click();
      classList = await links[0].getAttribute('class');
      expect(classList).not.toContain('is-active'); // Ensure the active class is removed
    });
  });
});
