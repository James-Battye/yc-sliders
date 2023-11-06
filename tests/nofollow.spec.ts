import { expect, test } from '@playwright/test';

import { sitemapArray } from './sitemap';

const urls = sitemapArray;

test.describe('External links', () => {
  test.beforeEach(async ({ page }) => {
    console.log('Navigating to the main page...');
    await page.goto('http://www.ginny-gilbert.webflow.io', { waitUntil: 'networkidle' });
    console.log('Navigation complete.');
  });

  test('should open in a new tab and have rel=nofollow', async ({ page }) => {
    console.log('Waiting for anchor tags to appear...');
    await page.waitForSelector('a');
    console.log('Anchor tags found.');

    console.log('Fetching all links...');
    const allLinks = await page.$$eval('a', (links) => links.map((link) => link.href));
    console.log('Total links found:', allLinks.length);

    for (const link of allLinks) {
      if (!link.includes('ginny-gilbert')) {
        console.log(`Navigating to external link: ${link}`);
        await page.goto(link);

        const target = await page.getAttribute('a[href="' + link + '"]', 'target');
        const rel = await page.getAttribute('a[href="' + link + '"]', 'rel');
        console.log(`For link ${link}, target = ${target}, rel = ${rel}`);

        expect(target).toBe('_blank');
        expect(rel).toContain('nofollow');
      } else {
        console.log(`Ignoring internal link: ${link}`);
      }
    }
  });
});
