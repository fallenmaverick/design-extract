/**
 * Agentic Section Visual Repair Swarm for Sovereign ∞
 * Interfaces with LLMs to patch JSX templates based on coordinate discrepancy maps.
 */

import { existsSync, readFileSync } from 'fs';

function detectProvider() {
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}

async function callAnthropic(system, user) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.DESIGNLANG_MODEL || 'claude-3-5-sonnet-latest',
      max_tokens: 4000,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`);
  const json = await res.json();
  return (json.content || []).map(b => b.text || '').join('');
}

async function callOpenAI(system, user) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.DESIGNLANG_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      max_tokens: 4000,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
  const json = await res.json();
  return json.choices?.[0]?.message?.content || '';
}

/**
 * Invokes the Visual Repair Agent to patch the generated JSX template.
 * 
 * @param {string} currentJsx Current JSX/React template code
 * @param {{ similarity: number, discrepancyBoxes: {x: number, y: number, w: number, h: number}[] }} diffResult 
 * @param {any} [realityTwin] Original metadata and design specs for visual guidance
 * @returns {Promise<string>} Patched JSX code
 */
export async function repairVisualDiscrepancies(currentJsx, diffResult, realityTwin = null) {
  const provider = detectProvider();
  
  if (!provider) {
    console.warn('No LLM API keys detected. Falling back to local heuristic patch.');
    // Simple heuristic fallback: inject inline style corrections if possible,
    // but primarily return currentJsx if no intelligence is available.
    return currentJsx;
  }

  const systemPrompt = `You are the ArthaOps Design Repair Agent.
Your job is to repair visual discrepancies in a React/JSX template.
You will be given:
1. The current JSX template code.
2. The visual diff discrepancy report (locations on page where things look wrong).
3. Optional design guidelines/original styles.

Analyze the discrepancies. Identify which elements or CSS properties in the JSX are causing alignment, size, padding, margin, or color mismatches at those coordinates.
Surgically patch the JSX/CSS styles.
Return ONLY the corrected, ready-to-run JSX code wrapped inside a single markdown code block:
\`\`\`jsx
// your code here
\`\`\`
Do not include any other text, explanations, or markdown outside the code block.`;

  const userPrompt = `
Current JSX Code:
\`\`\`jsx
${currentJsx}
\`\`\`

Visual Diff Discrepancy Report:
- Similarity Score: ${(diffResult.similarity * 100).toFixed(2)}%
- Mismatched Bounding Boxes (Coordinates):
${diffResult.discrepancyBoxes.map((box, i) => `  [Box ${i + 1}]: x=${box.x}, y=${box.y}, w=${box.w}, h=${box.h}`).join('\n')}

${realityTwin ? `Design Genome & Target Guidelines:
- Spacing Scale base: ${realityTwin.designGenome?.spacingScale || 4}px
- Typography theme: ${realityTwin.designGenome?.typographyStyle || 'Standard'}
- Primary color: ${realityTwin.colors?.primary?.hex || 'N/A'}
- Background color: ${realityTwin.colors?.backgrounds?.[0] || 'N/A'}` : ''}

Please correct the JSX styles (paddings, margins, colors, alignments, borders) to resolve these discrepancies. Keep the component structures identical, modifying only styles.`;

  try {
    const responseText = provider === 'anthropic' 
      ? await callAnthropic(systemPrompt, userPrompt)
      : await callOpenAI(systemPrompt, userPrompt);

    const match = responseText.match(/```jsx?\n([\s\S]*?)\n```/);
    if (match && match[1]) {
      return match[1].trim();
    }
    return responseText.trim();
  } catch (err) {
    console.error(`Repair agent LLM call failed: ${err.message}`);
    return currentJsx;
  }
}
