import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { serializeDOM } from '../src/extractors/dom-serializer.js';

describe('DOM Serializer', () => {
  let browser;
  let page;

  before(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it('serializes simple DOM structure', async () => {
    const html = `
      <html>
        <body>
          <div id="container" class="main-content" style="padding: 20px; background-color: rgb(255, 0, 0);">
            <h1 style="font-size: 24px; color: rgb(0, 0, 255);">Hello World</h1>
            <p>Some paragraph text</p>
          </div>
        </body>
      </html>
    `;
    await page.setContent(html);

    const { domTree, boundingBoxes } = await serializeDOM(page, '#container');

    assert.ok(domTree);
    assert.equal(domTree.tagName, 'div');
    assert.equal(domTree.attributes.id, 'container');
    assert.equal(domTree.attributes.class, 'main-content');
    assert.equal(domTree.styles.backgroundColor, 'rgb(255, 0, 0)');
    
    // Check children
    assert.ok(domTree.children.length >= 2);
    const h1Node = domTree.children.find(c => c.tagName === 'h1');
    assert.ok(h1Node);
    assert.equal(h1Node.styles.color, 'rgb(0, 0, 255)');
    assert.equal(h1Node.styles.fontSize, '24px');
    
    // Bounding boxes check
    assert.ok(boundingBoxes[domTree.id]);
    assert.ok(typeof boundingBoxes[domTree.id].x === 'number');
    assert.ok(typeof boundingBoxes[domTree.id].w === 'number');
  });
});
