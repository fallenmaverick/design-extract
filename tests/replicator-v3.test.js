import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { rmSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { replicateSite } from '../src/replicator.js';

describe('Replicator Orchestrator E2E', () => {
  const tmpDir = join(process.cwd(), 'tests-tmp-cloned-design');
  let originalEnv;
  let originalFetch;

  before(() => {
    // Backup environment variables and global fetch
    originalEnv = { ...process.env };
    originalFetch = global.fetch;

    // Clean any leftover directory
    if (existsSync(tmpDir)) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  after(() => {
    // Restore environment variables and global fetch
    process.env = originalEnv;
    global.fetch = originalFetch;

    // Clean up temporary directory
    if (existsSync(tmpDir)) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('runs the closed-loop replication cycle successfully on mock HTML input', async () => {
    // Enable OpenAI API mock path
    process.env.OPENAI_API_KEY = 'mock-key';
    delete process.env.ANTHROPIC_API_KEY;

    // Mock fetch for LLM repair swarm
    global.fetch = async (url, options) => {
      // Return a simulated patched JSX page
      const patchedJsx = `
        import './globals.css';
        export default function Home() {
          return (
            <main style={{ maxWidth: 1200, margin: '0 auto', background: 'rgb(255, 0, 0)' }}>
              <section style={{ padding: '96px 0', textAlign: 'left' }}>
                <h1 style={{ fontSize: '48px', fontWeight: 700 }}>Hello Patched World</h1>
              </section>
            </main>
          );
        }
      `;
      return {
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: `\`\`\`jsx\n${patchedJsx}\n\`\`\``
              }
            }
          ]
        })
      };
    };

    const mockHtml = `
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; background-color: rgb(255, 0, 0); }
            main { max-width: 1200px; margin: 0 auto; background: rgb(255, 0, 0); }
            h1 { font-size: 48px; font-weight: 700; color: rgb(255, 255, 255); }
          </style>
        </head>
        <body>
          <main>
            <section>
              <h1>Hello Patched World</h1>
            </section>
          </main>
        </body>
      </html>
    `;
    const dataUri = `data:text/html,${encodeURIComponent(mockHtml)}`;

    console.log('[Test] Running replicateSite...');
    const result = await replicateSite(dataUri, {
      outDir: tmpDir,
      maxIterations: 2,
      targetSimilarity: 0.999
    });

    console.log('[Test] replicateSite result:', result);

    assert.ok(result);
    assert.ok(result.iterations >= 1);
    assert.ok(result.outDir);
    assert.ok(typeof result.initialSimilarity === 'number');
    assert.ok(typeof result.finalSimilarity === 'number');
    assert.ok(Array.isArray(result.history));

    // Verify key files were generated
    const pageJsPath = join(tmpDir, 'src/app/page.js');
    const globalsCssPath = join(tmpDir, 'src/app/globals.css');
    const packageJsonPath = join(tmpDir, 'package.json');

    assert.ok(existsSync(pageJsPath), 'page.js should exist');
    assert.ok(existsSync(globalsCssPath), 'globals.css should exist');
    assert.ok(existsSync(packageJsonPath), 'package.json should exist');

    // Verify page content has the updated/repaired content
    const pageContent = readFileSync(pageJsPath, 'utf-8');
    assert.ok(pageContent.includes('Hello Patched World'), 'Page should include the patched text');
  });
});
