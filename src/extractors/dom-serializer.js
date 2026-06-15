/**
 * DOM Tree and Bounding Box Serializer for Sovereign ∞
 * Serializes DOM nodes into a lightweight tree structure and extracts geometry coordinates.
 */

/**
 * Serializes the DOM tree starting from document.body or a given selector.
 * Returns the serialized tree and a map of bounding boxes.
 * 
 * @param {import('playwright').Page} page 
 * @param {string} [scopeSelector] Optional selector to restrict tree collection
 * @returns {Promise<{ domTree: any, boundingBoxes: Record<string, {x: number, y: number, w: number, h: number}> }>}
 */
export async function serializeDOM(page, scopeSelector = '') {
  return await page.evaluate((scope) => {
    let idSeq = 0;
    const boundingBoxes = {};

    function serializeNode(node) {
      if (!node) return null;

      // Handle text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (!text) return null;
        return {
          id: `text-${idSeq++}`,
          type: 'text',
          text
        };
      }

      // Skip non-element nodes
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }

      const tagName = node.tagName.toLowerCase();
      const cs = window.getComputedStyle(node);
      
      // Skip script, style, head, noscript, etc.
      if (['script', 'style', 'noscript', 'iframe', 'svg', 'path'].includes(tagName)) {
        // We can serialize SVG as a single block if desired, but skip deep details
        if (tagName === 'svg') {
          const rect = node.getBoundingClientRect();
          const id = `el-${idSeq++}`;
          boundingBoxes[id] = {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            w: Math.round(rect.width),
            h: Math.round(rect.height)
          };
          return {
            id,
            type: 'element',
            tagName,
            rect: boundingBoxes[id],
            styles: { display: cs.display },
            children: []
          };
        }
        return null;
      }

      // Skip hidden elements
      if (cs.display === 'none' || cs.visibility === 'hidden') {
        return null;
      }

      const rect = node.getBoundingClientRect();
      const id = `el-${idSeq++}`;

      // Store bounding box
      boundingBoxes[id] = {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        w: Math.round(rect.width),
        h: Math.round(rect.height)
      };

      const attributes = {};
      for (const attr of node.attributes) {
        attributes[attr.name] = attr.value;
      }

      const children = [];
      
      // Handle Shadow DOM
      if (node.shadowRoot) {
        for (const child of node.shadowRoot.childNodes) {
          const childNode = serializeNode(child);
          if (childNode) children.push(childNode);
        }
      }

      // Handle standard children
      for (const child of node.childNodes) {
        const childNode = serializeNode(child);
        if (childNode) children.push(childNode);
      }

      return {
        id,
        type: 'element',
        tagName,
        attributes,
        rect: boundingBoxes[id],
        styles: {
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          borderColor: cs.borderColor,
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          display: cs.display,
          position: cs.position,
          flexDirection: cs.flexDirection,
          justifyContent: cs.justifyContent,
          alignItems: cs.alignItems,
          boxShadow: cs.boxShadow,
          borderRadius: cs.borderRadius,
          padding: cs.padding,
          margin: cs.margin
        },
        children
      };
    }

    let rootNode = document.body;
    if (scope) {
      try {
        const match = document.querySelector(scope);
        if (match) rootNode = match;
      } catch (e) {}
    }

    const domTree = serializeNode(rootNode);
    return { domTree, boundingBoxes };
  }, scopeSelector);
}
