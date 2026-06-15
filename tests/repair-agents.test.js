import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { repairVisualDiscrepancies } from '../src/repair/repair-agents.js';

describe('Visual Repair Agents', () => {
  let originalEnv;

  before(() => {
    // Backup env vars
    originalEnv = { ...process.env };
  });

  after(() => {
    // Restore env vars
    process.env = originalEnv;
  });

  it('falls back to returning current JSX if no API keys are present', async () => {
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const originalJsx = 'const Button = () => <button style={{ padding: 10 }}>Click</button>;';
    const diffResult = { similarity: 0.9, discrepancyBoxes: [{ x: 0, y: 0, w: 100, h: 40 }] };
    
    const result = await repairVisualDiscrepancies(originalJsx, diffResult);
    assert.equal(result, originalJsx);
  });

  it('interfaces with LLM (mocked) and extracts JSX block correctly', async () => {
    process.env.OPENAI_API_KEY = 'mock-key';

    const originalJsx = 'const Button = () => <button style={{ padding: 10 }}>Click</button>;';
    const expectedJsx = 'const Button = () => <button style={{ padding: 15 }}>Click</button>;';

    // Mock global fetch
    const originalFetch = global.fetch;
    global.fetch = async (url, options) => {
      return {
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: `Here is the corrected code:\n\n\`\`\`jsx\n${expectedJsx}\n\`\`\``
              }
            }
          ]
        })
      };
    };

    try {
      const diffResult = { similarity: 0.9, discrepancyBoxes: [{ x: 0, y: 0, w: 100, h: 40 }] };
      const result = await repairVisualDiscrepancies(originalJsx, diffResult);
      assert.equal(result, expectedJsx);
    } finally {
      // Restore original fetch
      global.fetch = originalFetch;
    }
  });
});
