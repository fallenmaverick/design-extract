import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { translateJsxToHtml } from '../src/replicator.js';

describe('Replicator Orchestrator', () => {
  it('translates JSX style and className syntax to standard HTML', () => {
    const jsx = `
      import './globals.css';
      export default function Home() {
        return (
          <main style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h1 className="title" style={{ fontSize: 48, color: 'blue' }}>Hello</h1>
            <button style={{ padding: '10px 20px', borderRadius: 8 }}>Click</button>
          </main>
        );
      }
    `;

    const html = translateJsxToHtml(jsx, { '--color-primary': 'rgb(0, 100, 200)' });
    console.log("RESULT HTML:", html);

    assert.ok(html.includes('style="max-width: 1200px; margin: 0 auto;"'));
    assert.ok(html.includes('class="title"'));
    assert.ok(html.includes('style="font-size: 48px; color: blue;"'));
    assert.ok(html.includes('style="padding: 10px 20px; border-radius: 8px;"'));
    assert.ok(html.includes('--color-primary: rgb(0, 100, 200);'));
    assert.ok(html.includes('<!DOCTYPE html>'));
  });
});
