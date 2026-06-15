/**
 * IntentTwin — Models the semantic intent and purpose of design decisions
 * rather than just visual appearance.
 */

/**
 * @typedef {Object} IntentNode
 * @property {string} id Unique identifier or CSS selector path
 * @property {string} role 'AttentionAnchor' | 'ConversionAction' | 'ValueProposition' | 'SocialProof' | 'PricingStructure' | 'FrictionReducer' | 'TrustSignal' | 'Navigation'
 * @property {number} importance Visual importance score (0.0 to 1.0)
 * @property {string} intent User action or business goal intent
 * @property {string} [rationale] Narrative explaining why this design exists
 * @property {Object} [metrics] Recovery confidence metrics
 */

/**
 * @typedef {Object} IntentTwin
 * @property {IntentNode[]} nodes
 * @property {number} intentRecoveryScore Estimated recovery score (0.0 to 1.0)
 * @property {string} primaryObjective Main intent of the target page
 */

/**
 * Creates an empty IntentTwin object.
 * @returns {IntentTwin}
 */
export function createIntentTwin() {
  return {
    nodes: [],
    intentRecoveryScore: 0.0,
    primaryObjective: 'unknown',
  };
}

/**
 * Extract the IntentTwin representation from a crawled DOM tree and page intent.
 * Runs structural and semantic analysis on elements to map visual indicators to business intent.
 * 
 * @param {Object} domTree Serialized DOM tree from the crawler
 * @param {Object} pageIntent Extracted page intent
 * @returns {IntentTwin} The inferred IntentTwin
 */
export function extractIntent(domTree, pageIntent = {}) {
  const intentTwin = createIntentTwin();
  if (!domTree) return intentTwin;

  intentTwin.primaryObjective = pageIntent.type || 'landing';
  const nodes = [];
  let totalInferred = 0;
  let confidenceSum = 0;

  // Recursive DOM traversal to locate key intent blocks
  function traverse(node, depth = 0) {
    if (!node) return;

    let role = null;
    let importance = 0.5;
    let intent = '';
    let rationale = '';

    const tagName = (node.tagName || '').toLowerCase();
    const textContent = (node.textContent || '').trim();
    const classes = (node.className || '').toLowerCase();
    const inlineStyles = node.styles || {};

    // 1. Primary Attention Anchor (Main headings in Hero)
    if (depth <= 5 && (tagName === 'h1' || (tagName === 'h2' && depth < 4))) {
      role = 'AttentionAnchor';
      importance = 0.95;
      intent = 'Establish value proposition and capture user attention';
      rationale = `Large typography (${inlineStyles.fontSize || 'default'}) positioned high in layout to anchor user focus.`;
      totalInferred++;
      confidenceSum += 0.9;
    }

    // 2. Primary / Secondary Conversion Actions (CTAs)
    if (tagName === 'button' || tagName === 'a' || classes.includes('btn') || classes.includes('button') || classes.includes('cta')) {
      const isPrimary = inlineStyles.backgroundColor && 
                        inlineStyles.backgroundColor !== 'transparent' && 
                        !['rgba(0, 0, 0, 0)', 'rgb(255, 255, 255)'].includes(inlineStyles.backgroundColor);
      
      const hasCtaText = /register|signup|sign-up|start|get|trial|demo|pricing|buy|checkout|join/i.test(textContent);

      if (hasCtaText || isPrimary) {
        role = 'ConversionAction';
        importance = isPrimary ? 0.9 : 0.75;
        intent = isPrimary ? 'Primary conversion action (e.g. signup / trial)' : 'Secondary discovery flow';
        rationale = isPrimary 
          ? `High-contrast button colored in brand primary accent to funnel traffic.`
          : `Secondary link or hollow button for exploratory engagement.`;
        totalInferred++;
        confidenceSum += isPrimary ? 0.95 : 0.8;
      }
    }

    // 3. Social Proof & Trust Signals (Logos, testimonials)
    if (classes.includes('logo') || classes.includes('brand') || classes.includes('testimonial') || classes.includes('trust')) {
      role = classes.includes('testimonial') ? 'SocialProof' : 'TrustSignal';
      importance = 0.8;
      intent = classes.includes('testimonial') ? 'Reduce customer doubt via peer validation' : 'Associate product with trusted brands';
      rationale = `Placed in context flow to establish credibility and reduce friction.`;
      totalInferred++;
      confidenceSum += 0.75;
    }

    // 4. Pricing / Plans Structure
    if (classes.includes('price') || classes.includes('plan') || classes.includes('tier') || textContent.includes('$') || textContent.includes('₹')) {
      role = 'PricingStructure';
      importance = 0.85;
      intent = 'Present pricing options and feature tier matrices';
      rationale = `Grid or columnar plan layout communicating costs and limits.`;
      totalInferred++;
      confidenceSum += 0.7;
    }

    if (role) {
      nodes.push({
        id: node.selector || `${tagName}.${classes.split(' ').join('.')}`.slice(0, 50),
        role,
        importance,
        intent,
        rationale,
        metrics: {
          confidence: confidenceSum / Math.max(1, totalInferred),
        }
      });
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        traverse(child, depth + 1);
      }
    }
  }

  traverse(domTree);

  intentTwin.nodes = nodes;
  intentTwin.intentRecoveryScore = totalInferred > 0 ? (confidenceSum / totalInferred) : 0.0;

  return intentTwin;
}
