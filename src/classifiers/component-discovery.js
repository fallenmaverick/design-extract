/**
 * Component Discovery Engine for Sovereign ∞
 * Performs structural and style similarity clustering on DOM subtrees to identify reusable components.
 */

/**
 * Calculates cosine similarity between two numeric vectors of equal length.
 * @param {number[]} a 
 * @param {number[]} b 
 * @returns {number}
 */
function cosineSimilarity(a, b) {
  if (!a.length || !b.length || a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return normA && normB ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0;
}

/**
 * Helper to convert color string (rgb/rgba/hex) to numeric rgb components.
 * @param {string} col 
 * @returns {number[]}
 */
function parseRGB(col) {
  if (!col) return [0, 0, 0];
  const match = col.match(/\d+/g);
  if (match && match.length >= 3) {
    return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
  }
  return [0, 0, 0];
}

/**
 * Generates a numeric style vector for a node.
 * @param {any} node 
 * @returns {number[]}
 */
function getStyleVector(node) {
  if (!node || !node.styles) return Array(10).fill(0);
  const styles = node.styles;
  const rgbBg = parseRGB(styles.backgroundColor);
  const rgbFg = parseRGB(styles.color);
  
  const parsePx = (val) => {
    if (!val) return 0;
    const match = val.match(/^(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const pad = parsePx(styles.padding);
  const marg = parsePx(styles.margin);
  const fontSize = parsePx(styles.fontSize);
  const borderRadius = parsePx(styles.borderRadius);

  // Layout feature: 0 = block/static, 1 = flex, 2 = grid, 3 = absolute/fixed
  let layout = 0;
  if (styles.display === 'flex') layout = 1;
  else if (styles.display === 'grid') layout = 2;
  if (styles.position === 'absolute' || styles.position === 'fixed') layout = 3;

  return [
    rgbBg[0] / 255, rgbBg[1] / 255, rgbBg[2] / 255,
    rgbFg[0] / 255, rgbFg[1] / 255, rgbFg[2] / 255,
    pad / 100, marg / 100, fontSize / 72, borderRadius / 50,
    layout / 3
  ];
}

/**
 * Recursively generates a structural hash for a subtree.
 * @param {any} node 
 * @param {number} depth 
 * @returns {string}
 */
function getStructuralHash(node, depth = 0) {
  if (!node) return '';
  if (node.type === 'text') return 'text';
  if (depth > 4) return node.tagName || '';

  const childrenHash = (node.children || [])
    .map(c => getStructuralHash(c, depth + 1))
    .filter(Boolean)
    .join(',');

  return childrenHash ? `${node.tagName}[${childrenHash}]` : (node.tagName || '');
}

/**
 * Performs structural and style vector similarity clustering.
 * Groups DOM nodes into potential reusable components.
 * 
 * @param {any} domTree Root node of the serialized DOM tree
 * @param {Object} [options]
 * @param {number} [options.similarityThreshold] Default 0.95
 * @param {number} [options.minInstances] Minimum repeat instances to form a component template, default 2
 * @returns {any[]} List of discovered component templates
 */
export function discoverComponents(domTree, options = {}) {
  const threshold = options.similarityThreshold ?? 0.95;
  const minInstances = options.minInstances ?? 2;

  if (!domTree) return [];

  const candidatesByHash = {};

  // 1) Traverse tree and gather subtree candidates
  function traverse(node) {
    if (!node || node.type !== 'element') return;

    // Skip top level elements (html, body, main wrappers)
    if (!['html', 'body', 'main', 'section'].includes(node.tagName)) {
      const hash = getStructuralHash(node);
      if (hash && hash.length > 3) {
        if (!candidatesByHash[hash]) candidatesByHash[hash] = [];
        candidatesByHash[hash].push(node);
      }
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(domTree);

  const templates = [];

  // 2) For each structural hash, sub-cluster by style vector similarity
  for (const [hash, nodes] of Object.entries(candidatesByHash)) {
    if (nodes.length < minInstances) continue;

    const subClusters = [];
    for (const node of nodes) {
      const vec = getStyleVector(node);
      let matchedCluster = null;

      for (const cluster of subClusters) {
        const sim = cosineSimilarity(cluster.vector, vec);
        if (sim >= threshold) {
          matchedCluster = cluster;
          break;
        }
      }

      if (matchedCluster) {
        matchedCluster.nodes.push(node);
      } else {
        subClusters.push({
          vector: vec,
          nodes: [node]
        });
      }
    }

    // 3) Map qualified clusters to template schemas
    for (const cluster of subClusters) {
      if (cluster.nodes.length >= minInstances) {
        const representative = cluster.nodes[0];
        
        // Extract variables (fields that change across instances)
        const variables = [];
        if (representative.tagName === 'a' || representative.tagName === 'button') {
          variables.push('text');
        }
        
        // Count child text nodes and add to variables
        let textNodeCount = 0;
        function countText(n) {
          if (n.type === 'text') textNodeCount++;
          else if (n.children) n.children.forEach(countText);
        }
        countText(representative);
        if (textNodeCount > 0) {
          variables.push('childrenContent');
        }

        templates.push({
          id: `template-${templates.length + 1}`,
          tagName: representative.tagName,
          structuralHash: hash,
          instanceCount: cluster.nodes.length,
          styles: representative.styles,
          variables,
          instances: cluster.nodes.map(n => ({
            id: n.id,
            rect: n.rect,
            attributes: n.attributes
          }))
        });
      }
    }
  }

  // Sort templates by instance count descending
  return templates.sort((a, b) => b.instanceCount - a.instanceCount);
}
