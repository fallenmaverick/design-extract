import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { discoverComponents } from '../src/classifiers/component-discovery.js';

describe('Component Discovery Engine', () => {
  it('discovers and clusters identical button structures', () => {
    // Mock DOM tree with 3 identical buttons
    const mockDOM = {
      id: 'el-0',
      type: 'element',
      tagName: 'body',
      children: [
        {
          id: 'el-1',
          type: 'element',
          tagName: 'button',
          styles: {
            backgroundColor: 'rgb(0, 120, 240)',
            color: 'rgb(255, 255, 255)',
            padding: '10px',
            fontSize: '14px',
            display: 'block'
          },
          children: [
            { id: 'text-1', type: 'text', text: 'Submit' }
          ],
          rect: { x: 10, y: 10, w: 100, h: 40 }
        },
        {
          id: 'el-2',
          type: 'element',
          tagName: 'button',
          styles: {
            backgroundColor: 'rgb(0, 120, 240)',
            color: 'rgb(255, 255, 255)',
            padding: '10px',
            fontSize: '14px',
            display: 'block'
          },
          children: [
            { id: 'text-2', type: 'text', text: 'Cancel' }
          ],
          rect: { x: 120, y: 10, w: 100, h: 40 }
        },
        {
          id: 'el-3',
          type: 'element',
          tagName: 'button',
          styles: {
            backgroundColor: 'rgb(0, 120, 240)',
            color: 'rgb(255, 255, 255)',
            padding: '10px',
            fontSize: '14px',
            display: 'block'
          },
          children: [
            { id: 'text-3', type: 'text', text: 'Reset' }
          ],
          rect: { x: 230, y: 10, w: 100, h: 40 }
        }
      ]
    };

    const templates = discoverComponents(mockDOM, { minInstances: 2 });

    assert.equal(templates.length, 1);
    assert.equal(templates[0].tagName, 'button');
    assert.equal(templates[0].instanceCount, 3);
    assert.equal(templates[0].styles.backgroundColor, 'rgb(0, 120, 240)');
    assert.ok(templates[0].structuralHash.includes('button[text]'));
  });

  it('separates subtrees with different visual style vectors', () => {
    // 2 primary buttons, 2 secondary buttons
    const mockDOM = {
      id: 'el-0',
      type: 'element',
      tagName: 'body',
      children: [
        {
          id: 'el-1',
          type: 'element',
          tagName: 'button',
          styles: { backgroundColor: 'rgb(0, 120, 240)', color: 'rgb(255, 255, 255)' },
          children: [{ id: 'text-1', type: 'text', text: 'Primary 1' }]
        },
        {
          id: 'el-2',
          type: 'element',
          tagName: 'button',
          styles: { backgroundColor: 'rgb(0, 120, 240)', color: 'rgb(255, 255, 255)' },
          children: [{ id: 'text-2', type: 'text', text: 'Primary 2' }]
        },
        {
          id: 'el-3',
          type: 'element',
          tagName: 'button',
          styles: { backgroundColor: 'rgb(240, 240, 240)', color: 'rgb(0, 0, 0)' },
          children: [{ id: 'text-3', type: 'text', text: 'Secondary 1' }]
        },
        {
          id: 'el-4',
          type: 'element',
          tagName: 'button',
          styles: { backgroundColor: 'rgb(240, 240, 240)', color: 'rgb(0, 0, 0)' },
          children: [{ id: 'text-4', type: 'text', text: 'Secondary 2' }]
        }
      ]
    };

    const templates = discoverComponents(mockDOM, { minInstances: 2 });

    // Should yield 2 distinct templates representing primary and secondary buttons
    assert.equal(templates.length, 2);
    assert.equal(templates[0].instanceCount, 2);
    assert.equal(templates[1].instanceCount, 2);

    const primary = templates.find(t => t.styles.backgroundColor === 'rgb(0, 120, 240)');
    const secondary = templates.find(t => t.styles.backgroundColor === 'rgb(240, 240, 240)');

    assert.ok(primary);
    assert.ok(secondary);
  });
});
