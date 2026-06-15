import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { crawlPage } from '../src/crawler.js';

describe('Crawler V3 Multi-Viewport and Interaction', () => {
  it('extracts responsive variants across multiple viewports', async () => {
    const html = `
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; }
            #content { width: 100%; height: 200px; background-color: rgb(255, 0, 0); }
            @media (max-width: 400px) {
              #content { background-color: rgb(0, 0, 255); }
            }
          </style>
        </head>
        <body>
          <div id="content">Responsive Box</div>
        </body>
      </html>
    `;
    const dataUri = `data:text/html,${encodeURIComponent(html)}`;
    
    const res = await crawlPage(dataUri, {
      width: 1440,
      height: 900,
      deepInteract: false,
    });

    assert.ok(res.responsiveVariants);
    assert.ok(res.responsiveVariants.desktop);
    assert.ok(res.responsiveVariants.mobile);

    // Desktop should have red background
    const desktopBg = res.responsiveVariants.desktop.domTree.children.find(c => c.tagName === 'div').styles.backgroundColor;
    assert.equal(desktopBg, 'rgb(255, 0, 0)');

    // Mobile should have blue background due to media query max-width: 400px
    const mobileBg = res.responsiveVariants.mobile.domTree.children.find(c => c.tagName === 'div').styles.backgroundColor;
    assert.equal(mobileBg, 'rgb(0, 0, 255)');
  });

  it('runs interaction pass and gathers focus and active deltas', async () => {
    const html = `
      <html>
        <head>
          <style>
            button {
              background-color: rgb(0, 100, 200);
              color: rgb(255, 255, 255);
              outline: none;
            }
            button:hover {
              background-color: rgb(0, 150, 250);
            }
            button:focus {
              outline: 2px solid rgb(255, 0, 0);
            }
            button:active {
              opacity: 0.5;
            }
          </style>
        </head>
        <body>
          <button id="btn">Interactive Button</button>
        </body>
      </html>
    `;
    const dataUri = `data:text/html,${encodeURIComponent(html)}`;

    const res = await crawlPage(dataUri, {
      width: 1440,
      height: 900,
      deepInteract: true,
    });

    assert.ok(res.interactState);
    assert.ok(res.interactState.interactionGraph);
    
    const btnKey = Object.keys(res.interactState.interactionGraph).find(k => k.includes('button'));
    assert.ok(btnKey, 'Found button selector in interactionGraph');
    
    const deltas = res.interactState.interactionGraph[btnKey];
    assert.ok(deltas.hover, 'Hover style delta captured');
    assert.equal(deltas.hover.backgroundColor, 'rgb(0, 150, 250)');

    assert.ok(deltas.focus, 'Focus style delta captured');
    assert.equal(deltas.focus.outline, 'rgb(255, 0, 0) solid 2px');

    assert.ok(deltas.active, 'Active style delta captured');
    assert.equal(deltas.active.opacity, '0.5');
  });
});
