/**
 * Replicator Orchestrator for Sovereign ∞
 * Manages the closed-loop crawl -> generate -> diff -> self-heal repair pipeline.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { extractDesignLanguage } from './index.js';
import { generateClone } from './clone.js';
import { discoverComponents } from './classifiers/component-discovery.js';
import { compareScreenshots } from './validators/diff.js';
import { repairVisualDiscrepancies } from './repair/repair-agents.js';
import { chromium } from 'playwright';

/**
 * Translates React JSX/CSS styles in page.js to standard HTML for mock browser rendering.
 * @param {string} jsxCode 
 * @param {Record<string, string>} [cssVars] 
 * @returns {string} Plain HTML page
 */
export function translateJsxToHtml(jsxCode, cssVars = {}) {
  let html = jsxCode;

  // Remove import statements
  html = html.replace(/import\s+[\s\S]*?;/g, '');

  // Extract content inside export default function Home() { return ( ... ) }
  const match = html.match(/export\s+default\s+function\s+Home\(\)\s*\{[\s\S]*?return\s*\(([\s\S]*?)\);\s*\}/);
  if (match && match[1]) {
    html = match[1];
  }

  // Translate style={{ ... }} objects to style="..." strings
  html = html.replace(/style=\{\{([\s\S]*?)\}\}/g, (m, body) => {
    const rules = [];
    const parts = body.split(',');
    for (const p of parts) {
      const splitIdx = p.indexOf(':');
      if (splitIdx === -1) continue;
      const key = p.substring(0, splitIdx).trim().replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
      let val = p.substring(splitIdx + 1).trim();

      // Clean quotes
      val = val.replace(/^['"`]|['"`]$/g, '');

      // Add px to numeric values
      if (/^\d+(\.\d+)?$/.test(val) && !['font-weight', 'opacity', 'z-index'].includes(key)) {
        val = `${val}px`;
      }
      rules.push(`${key}: ${val}`);
    }
    return rules.length > 0 ? `style="${rules.join('; ')};"` : '';
  });

  // Convert className to class
  html = html.replace(/className="([\s\S]*?)"/g, 'class="$1"');

  // Replace NextJS/React loops with simplified static structures
  html = html.replace(/\{['"]Acme['"][\s\S]*?\.map\([\s\S]*?\)\}/g, `
    <div style="display: flex; gap: 20px;">
      <span>Acme</span><span>Northwind</span><span>Initech</span><span>Umbrella</span>
    </div>
  `);

  const varsStr = Object.entries(cssVars).map(([k, v]) => `${k}: ${v};`).join('\n');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root {
            ${varsStr}
          }
          body {
            margin: 0;
            padding: 0;
            background: var(--color-background, #ffffff);
            color: var(--color-foreground, #171717);
            font-family: sans-serif;
          }
          main {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
}

/**
 * Orchestrates the Sovereign ∞ closed-loop replication flow.
 * 
 * @param {string} url Target URL to replicate
 * @param {Object} [options] Options configuration
 * @param {string} [options.outDir] Output directory (default: './cloned-design')
 * @param {number} [options.maxIterations] Max repair iterations (default: 3)
 * @param {number} [options.targetSimilarity] Minimum similarity score to stop loop (default: 0.98)
 * @returns {Promise<any>} Compilation result
 */
export async function replicateSite(url, options = {}) {
  const outDir = options.outDir || './cloned-design';
  const maxIterations = options.maxIterations ?? 3;
  const targetSimilarity = options.targetSimilarity ?? 0.98;

  // 1) Extract design language and capture original screenshot
  console.log(`[Replicator] Crawling target site: ${url}...`);
  const design = await extractDesignLanguage(url, {
    full: true,
    outDir
  });

  // 2) Run Component Discovery on the extracted DOM Tree
  console.log(`[Replicator] Running component discovery clustering...`);
  const discovered = discoverComponents(design.responsive?.viewports?.[0]?.domTree || null);
  design.componentClusters = discovered;

  // 3) Generate Initial Next.js starter clone
  console.log(`[Replicator] Compiling initial Next.js starter...`);
  const cloneResult = generateClone(design, outDir);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  let finalSimilarity = 0.0;
  let iterationsRun = 0;
  const metrics = [];

  try {
    // Navigate to target site to get reference screenshot
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle').catch(() => { });
    const targetScreenshot = await page.screenshot();

    const pageJsPath = join(resolve(outDir), 'src/app/page.js');
    let currentJsx = readFileSync(pageJsPath, 'utf-8');

    // CSS variables to pass to the HTML shell
    const cssVars = {
      '--color-background': design.colors?.backgrounds?.[0] || '#ffffff',
      '--color-foreground': design.colors?.text?.[0] || '#171717',
      '--color-primary': design.colors?.primary?.hex || '#3b82f6',
      '--color-secondary': design.colors?.secondary?.hex || '#8b5cf6',
      '--color-accent': design.colors?.accent?.hex || '#f59e0b',
    };

    // 4) Closed-loop Visual Diff & Repair Loop
    for (let i = 0; i < maxIterations; i++) {
      iterationsRun++;
      console.log(`[Replicator] Visual diff iteration ${iterationsRun}/${maxIterations}...`);

      // Translate JSX to plain HTML & render inside browser
      const testHtml = translateJsxToHtml(currentJsx, cssVars);
      await page.setContent(testHtml);
      await page.waitForTimeout(300);
      const generatedScreenshot = await page.screenshot();

      // Compare target and generated screenshots
      const diffRes = await compareScreenshots(page, targetScreenshot, generatedScreenshot);
      console.log(`[Replicator] Similarity: ${(diffRes.similarity * 100).toFixed(2)}%`);
      metrics.push({
        iteration: iterationsRun,
        similarity: diffRes.similarity,
        discrepancies: diffRes.discrepancyBoxes.length
      });

      finalSimilarity = diffRes.similarity;

      if (diffRes.similarity >= targetSimilarity) {
        console.log(`[Replicator] Target similarity reached!`);
        break;
      }

      // Self-heal: Call LLM visual repair agent to patch JSX file
      console.log(`[Replicator] Discrepancies detected, triggering agentic repair swarm...`);
      const patchedJsx = await repairVisualDiscrepancies(currentJsx, diffRes, design.reality);
      if (patchedJsx && patchedJsx !== currentJsx) {
        currentJsx = patchedJsx;
        writeFileSync(pageJsPath, currentJsx, 'utf-8');
      } else {
        console.log(`[Replicator] No changes proposed by repair swarm. Stopping.`);
        break;
      }
    }

  } finally {
    await browser.close();
  }

  return {
    success: finalSimilarity >= targetSimilarity,
    outDir,
    iterations: iterationsRun,
    initialSimilarity: metrics[0]?.similarity || 0.0,
    finalSimilarity,
    history: metrics,
    files: cloneResult.files,
    goals: design.goals,
    trust: design.trust,
    constraints: design.constraints,
    benchmarks: design.benchmarks
  };
}
