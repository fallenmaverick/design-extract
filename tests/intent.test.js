import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractIntent } from '../src/twin/intent.js';

describe('IntentTwin Extraction Engine', () => {
  it('extracts intent nodes representing primary attention anchors and CTAs', () => {
    const mockDomTree = {
      tagName: 'div',
      className: 'hero-wrapper',
      children: [
        {
          tagName: 'h1',
          textContent: 'Build the Future of Cloud Cost Optimization',
          styles: { fontSize: '72px' },
          children: []
        },
        {
          tagName: 'button',
          className: 'btn btn-primary cta-button',
          textContent: 'Get Started for Free',
          styles: { backgroundColor: 'rgb(94, 106, 210)' },
          children: []
        },
        {
          tagName: 'div',
          className: 'testimonial-card',
          textContent: 'ArthaOps saved us 45% on AWS!',
          styles: {},
          children: []
        }
      ]
    };

    const intent = extractIntent(mockDomTree, { type: 'landing' });

    assert.equal(intent.primaryObjective, 'landing');
    assert.ok(intent.nodes.length >= 3);

    // Verify H1 extracted as AttentionAnchor
    const headingNode = intent.nodes.find(n => n.role === 'AttentionAnchor');
    assert.ok(headingNode);
    assert.equal(headingNode.importance, 0.95);

    // Verify Button extracted as ConversionAction
    const buttonNode = intent.nodes.find(n => n.role === 'ConversionAction');
    assert.ok(buttonNode);
    assert.equal(buttonNode.importance, 0.9);

    // Verify Testimonial extracted as SocialProof
    const proofNode = intent.nodes.find(n => n.role === 'SocialProof');
    assert.ok(proofNode);
    assert.equal(proofNode.importance, 0.8);
  });
});
