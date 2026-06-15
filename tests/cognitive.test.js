import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractCognitiveTwins } from '../src/twin/cognitive.js';

describe('Cognitive Twin Pipeline v2', () => {
  it('correctly maps raw structures to GoalTwin v2, Journey friction, Trust breakdown, ConstraintTwin, and recovery benchmarks', () => {
    const mockDesign = {
      pageIntent: { type: 'landing' },
      sectionRoles: {
        sections: [
          { role: 'hero' },
          { role: 'feature-grid' },
          { role: 'pricing-table' },
          { role: 'cta' }
        ]
      },
      intent: {
        nodes: [
          {
            id: 'h1.hero-title',
            role: 'AttentionAnchor',
            importance: 0.95,
            rationale: 'Largest text above fold'
          },
          {
            id: 'button.primary-cta',
            role: 'ConversionAction',
            importance: 0.9,
            rationale: 'Colored brand button'
          },
          {
            id: 'div.brand-logos',
            role: 'TrustSignal',
            importance: 0.8,
            rationale: 'Logo wall container'
          }
        ]
      },
      voice: {
        headlines: ['Read our security case study today']
      },
      _raw: {
        title: 'ArthaOps - Secure Cloud Cost Optimization',
        url: 'https://arthaops.com'
      }
    };

    const cognitive = extractCognitiveTwins(mockDesign);

    // 1. Verify GoalTwin v2 (Weighted Objectives)
    assert.ok(Array.isArray(cognitive.goals.goals));
    assert.equal(cognitive.goals.goals[0].goal, 'Book Demo / Sign Up');
    assert.equal(cognitive.goals.goals[0].weight, 0.55);

    // 2. Verify JourneyTwin Step Friction
    assert.equal(cognitive.journeys.funnels.length, 1);
    assert.equal(cognitive.journeys.funnels[0].name, 'VisitorToSignup');
    const pricingStep = cognitive.journeys.funnels[0].steps.find(s => s.step === 'pricing-table');
    assert.ok(pricingStep);
    assert.equal(pricingStep.friction, 0.45);
    assert.equal(pricingStep.confidence, 0.9);

    // 3. Verify TrustTwin Decomposition
    assert.equal(cognitive.trust.breakdown.customerLogos, 0.25);
    assert.equal(cognitive.trust.breakdown.security, 0.20);
    assert.equal(cognitive.trust.breakdown.caseStudies, 0.15);
    assert.ok(cognitive.trust.trustScore > 0.6);

    // 4. Verify ConstraintTwin
    assert.ok(cognitive.constraints.constraints.includes('security_sensitive'));

    // 5. Verify Benchmarks
    assert.equal(cognitive.benchmarks.intentRecovery, 0.95);
    assert.equal(cognitive.benchmarks.goalRecovery, 0.81);
    assert.equal(cognitive.benchmarks.journeyRecovery, 0.88);
    assert.equal(cognitive.benchmarks.trustRecovery, 0.90);
    assert.ok(cognitive.benchmarks.overallScore > 0.7);
  });
});
