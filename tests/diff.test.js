import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { compareScreenshots } from '../src/validators/diff.js';

describe('Visual Diff Pipeline', () => {
  let browser;
  let page;

  before(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it('detects discrepancies and calculates similarity', async () => {
    // Render first image: red square on white background
    await page.setContent(`
      <html>
        <body style="margin: 0; background: white;">
          <div style="width: 100px; height: 100px; background: red;"></div>
        </body>
      </html>
    `);
    const screenshotA = await page.screenshot();

    // Render second image: blue square on white background (same position)
    await page.setContent(`
      <html>
        <body style="margin: 0; background: white;">
          <div style="width: 100px; height: 100px; background: blue;"></div>
        </body>
      </html>
    `);
    const screenshotB = await page.screenshot();

    const { similarity, discrepancyBoxes } = await compareScreenshots(page, screenshotA, screenshotB);

    assert.ok(similarity < 1.0);
    assert.ok(similarity > 0.9); // Mostly white background, so high similarity
    assert.ok(discrepancyBoxes.length >= 1);

    // One of the boxes should cover the 100x100 square at (0, 0)
    const coversSquare = discrepancyBoxes.some(box => box.x === 0 && box.y === 0 && box.w >= 96 && box.h >= 96);
    assert.ok(coversSquare, 'Discrepancy covers the shifted color box');
  });

  it('returns 1.0 similarity for identical pages', async () => {
    await page.setContent(`
      <html>
        <body style="margin: 0; background: white;">
          <div style="width: 100px; height: 100px; background: green;"></div>
        </body>
      </html>
    `);
    const screenshotA = await page.screenshot();
    const screenshotB = await page.screenshot();

    const { similarity, discrepancyBoxes } = await compareScreenshots(page, screenshotA, screenshotB);

    assert.equal(similarity, 1.0);
    assert.equal(discrepancyBoxes.length, 0);
  });
});
