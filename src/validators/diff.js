/**
 * Visual Diff Pipeline for Sovereign ∞
 * Performs visual pixel-by-pixel comparisons of screenshots and computes discrepancy bounding boxes.
 */

/**
 * Compares two screenshot buffers using browser canvas rendering.
 * Returns the similarity score and bounding boxes of visual discrepancies.
 * 
 * @param {import('playwright').Page} page Playwright page instance to perform rendering
 * @param {Buffer} imgBufferA Target original screenshot buffer
 * @param {Buffer} imgBufferB Generated clone screenshot buffer
 * @returns {Promise<{ similarity: number, discrepancyBoxes: {x: number, y: number, w: number, h: number}[] }>}
 */
export async function compareScreenshots(page, imgBufferA, imgBufferB) {
  const base64A = `data:image/png;base64,${imgBufferA.toString('base64')}`;
  const base64B = `data:image/png;base64,${imgBufferB.toString('base64')}`;

  return await page.evaluate(async ({ srcA, srcB }) => {
    const loadImg = (src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src.slice(0, 100)}`));
      img.src = src;
    });

    const imgA = await loadImg(srcA);
    const imgB = await loadImg(srcB);

    const width = Math.max(imgA.width, imgB.width);
    const height = Math.max(imgA.height, imgB.height);

    const canvasA = document.createElement('canvas');
    canvasA.width = width;
    canvasA.height = height;
    const ctxA = canvasA.getContext('2d');
    ctxA.drawImage(imgA, 0, 0);

    const canvasB = document.createElement('canvas');
    canvasB.width = width;
    canvasB.height = height;
    const ctxB = canvasB.getContext('2d');
    ctxB.drawImage(imgB, 0, 0);

    const dataA = ctxA.getImageData(0, 0, width, height).data;
    const dataB = ctxB.getImageData(0, 0, width, height).data;

    let diffPixels = 0;
    const totalPixels = width * height;
    const diffBoxes = [];

    const gridSize = 16;
    for (let gy = 0; gy < height; gy += gridSize) {
      for (let gx = 0; gx < width; gx += gridSize) {
        let cellDiff = false;
        for (let dy = 0; dy < gridSize && gy + dy < height; dy++) {
          for (let dx = 0; dx < gridSize && gx + dx < width; dx++) {
            const x = gx + dx;
            const y = gy + dy;
            const idx = (y * width + x) * 4;

            // Compute pixel diff (R, G, B, A)
            const rDiff = Math.abs(dataA[idx] - dataB[idx]);
            const gDiff = Math.abs(dataA[idx + 1] - dataB[idx + 1]);
            const bDiff = Math.abs(dataA[idx + 2] - dataB[idx + 2]);
            const aDiff = Math.abs(dataA[idx + 3] - dataB[idx + 3]);

            if (rDiff > 15 || gDiff > 15 || bDiff > 15 || aDiff > 15) {
              cellDiff = true;
              diffPixels++;
            }
          }
        }
        if (cellDiff) {
          diffBoxes.push({ x: gx, y: gy, w: gridSize, h: gridSize });
        }
      }
    }

    // Merge adjacent / overlapping bounding boxes to simplify the repair targets
    const margin = gridSize;
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < diffBoxes.length; i++) {
        for (let j = i + 1; j < diffBoxes.length; j++) {
          const a = diffBoxes[i];
          const b = diffBoxes[j];
          if (a.x <= b.x + b.w + margin && a.x + a.w + margin >= b.x &&
              a.y <= b.y + b.h + margin && a.y + a.h + margin >= b.y) {
            const minX = Math.min(a.x, b.x);
            const maxX = Math.max(a.x + a.w, b.x + b.w);
            const minY = Math.min(a.y, b.y);
            const maxY = Math.max(a.y + a.h, b.y + b.h);
            a.x = minX;
            a.y = minY;
            a.w = maxX - minX;
            a.h = maxY - minY;
            diffBoxes.splice(j, 1);
            j--;
            changed = true;
          }
        }
      }
    }

    const similarity = totalPixels > 0 ? (1 - (diffPixels / totalPixels)) : 1;

    return {
      similarity,
      discrepancyBoxes: diffBoxes
    };
  }, { srcA: base64A, srcB: base64B });
}
