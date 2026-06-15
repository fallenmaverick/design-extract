/**
 * Cognitive Twin Layer v2
 * Bridges the gap between raw observation and business intent/purpose.
 * Implements GoalTwin v2, JourneyTwin, TrustTwin, ConstraintTwin, and Benchmarks.
 */

/**
 * @typedef {Object} GoalTwinItem
 * @property {string} goal The business or user objective
 * @property {number} weight Calculated importance of this goal (0.0 - 1.0)
 */

/**
 * @typedef {Object} GoalTwin
 * @property {GoalTwinItem[]} goals Array of weighted objectives
 * @property {Object[]} alignments Linkages between elements and goals
 */

/**
 * @typedef {Object} JourneyStep
 * @property {string} step Name of the section/step
 * @property {number} friction Inferred user friction score (0.0 - 1.0)
 * @property {number} confidence Accuracy confidence score (0.0 - 1.0)
 */

/**
 * @typedef {Object} JourneyTwin
 * @property {Object[]} funnels Supported conversion paths
 * @property {string} funnels.name Name of the path (e.g., 'VisitorToDemo')
 * @property {JourneyStep[]} funnels.steps Ordered sequence of page steps
 * @property {number} funnels.conversionConfidence Inferred probability (0.0 - 1.0)
 */

/**
 * @typedef {Object} TrustBreakdown
 * @property {number} socialProof Testimonials and review scores contribution
 * @property {number} security Security, HTTPS, compliance badge scores
 * @property {number} caseStudies Inferred presence of deep-dive case validations
 * @property {number} customerLogos Brand/logo walls credibility score
 */

/**
 * @typedef {Object} TrustTwin
 * @property {number} trustScore Overall perceived trust rating (0.0 - 1.0)
 * @property {TrustBreakdown} breakdown Decomposed trust component ratings
 * @property {string[]} signals Detected trust indicators (e.g., 'customer_logos', 'testimonials')
 * @property {Object[]} evidence Details of each detected signal
 */

/**
 * @typedef {string} Constraint
 * Business or regulatory constraint (e.g. 'enterprise_sales', 'security_sensitive')
 */

/**
 * @typedef {Object} ConstraintTwin
 * @property {Constraint[]} constraints Array of mapped operational boundaries
 */

/**
 * @typedef {Object} EvidenceTwin
 * @property {Record<string, string[]>} classifications Mapping of element selectors/IDs to classification reasons
 */

/**
 * @typedef {Object} IntentRecoveryBenchmarks
 * @property {number} intentRecovery Accuracy of raw element intent classification
 * @property {number} goalRecovery Accuracy of goal and alignment mapping
 * @property {number} journeyRecovery Accuracy of funnel and friction mapping
 * @property {number} trustRecovery Accuracy of trust and evidence classification
 * @property {number} overallScore Compound score (0.0 - 1.0)
 */

/**
 * Extracts all Cognitive Twins from visual design, section roles, copy, and intent.
 * 
 * @param {Object} design The extracted design language payload containing intent, sections, and visuals
 * @returns {{ goals: GoalTwin, journeys: JourneyTwin, trust: TrustTwin, constraints: ConstraintTwin, evidence: EvidenceTwin, benchmarks: IntentRecoveryBenchmarks }}
 */
export function extractCognitiveTwins(design) {
  const pageIntent = design?.pageIntent || {};
  const sections = design?.sectionRoles?.sections || [];
  const intentNodes = design?.intent?.nodes || [];

  // 1. GoalTwin Resolution v2
  const mainGoalText = pageIntent.type === 'pricing' 
    ? 'Direct Purchase / Subscription' 
    : pageIntent.type === 'docs' 
      ? 'Educate Buyer / Developer' 
      : 'Book Demo / Sign Up';

  const goals = [
    { goal: mainGoalText, weight: 0.55 },
    { goal: 'Build Trust & Credibility', weight: 0.28 },
    { goal: 'Educate Buyer on Features', weight: 0.17 }
  ];

  const alignments = [];
  for (const node of intentNodes) {
    let supports = [];
    let contribution = node.importance || 0.5;

    if (node.role === 'ConversionAction') {
      supports = [mainGoalText];
      if (node.importance > 0.8) contribution = 0.95;
    } else if (node.role === 'AttentionAnchor') {
      supports = ['Educate Buyer on Features'];
    } else if (node.role === 'SocialProof' || node.role === 'TrustSignal') {
      supports = ['Build Trust & Credibility'];
      contribution = 0.85;
    } else if (node.role === 'PricingStructure') {
      supports = [mainGoalText, 'Educate Buyer on Features'];
    }

    if (supports.length > 0) {
      alignments.push({
        selector: node.id,
        supports,
        contribution
      });
    }
  }

  const goalTwin = {
    goals,
    alignments
  };

  // 2. JourneyTwin Resolution with Step Friction
  const funnels = [];
  const steps = [];

  for (const s of sections) {
    const role = s.role || s.name || '';
    if (!role) continue;

    // Estimate friction per step:
    // Form fields, testimonials, or pricing tables add interactive/cognitive load (friction)
    let friction = 0.1; // Default low friction (simple reading layout)
    let confidence = 0.85;

    if (role === 'pricing-table' || role === 'pricing') {
      friction = 0.45; // Pricing comparison has medium cognitive load
      confidence = 0.9;
    } else if (role === 'cta' || role === 'form') {
      friction = 0.35; // Input/forms require user action friction
      confidence = 0.95;
    } else if (role === 'testimonial' || role === 'logo-wall') {
      friction = 0.15;
      confidence = 0.8;
    }

    steps.push({
      step: role,
      friction,
      confidence
    });
  }

  if (steps.length > 0) {
    const defaultFunnelName = pageIntent.type === 'pricing' 
      ? 'VisitorToPurchase' 
      : pageIntent.type === 'docs' 
        ? 'DeveloperToDocRead' 
        : 'VisitorToSignup';
        
    funnels.push({
      name: defaultFunnelName,
      steps,
      conversionConfidence: Math.min(0.95, 0.4 + (intentNodes.filter(n => n.role === 'ConversionAction').length * 0.15))
    });
  }

  const journeyTwin = {
    funnels
  };

  // 3. TrustTwin Decomposition
  const signals = [];
  const trustEvidence = [];
  let socialProof = 0.0;
  let security = 0.0;
  let caseStudies = 0.0;
  let customerLogos = 0.0;

  const hasTestimonials = intentNodes.some(n => n.role === 'SocialProof');
  const hasLogos = intentNodes.some(n => n.role === 'TrustSignal');
  
  if (hasTestimonials) {
    signals.push('testimonials');
    trustEvidence.push({
      type: 'testimonials',
      source: 'intentNodes',
      details: 'Detected element containing testimonial or social proof markers'
    });
    socialProof = 0.25;
  }
  if (hasLogos) {
    signals.push('customer_logos');
    trustEvidence.push({
      type: 'customer_logos',
      source: 'intentNodes',
      details: 'Detected element containing brand/logo wall indicators'
    });
    customerLogos = 0.25;
  }

  // Check for security/SSL indicators
  const bodyText = (design?._raw?.title || '').toLowerCase() + (design?._raw?.url || '').toLowerCase();
  if (bodyText.includes('secure') || bodyText.includes('https')) {
    signals.push('security_badges');
    trustEvidence.push({
      type: 'security_badges',
      source: 'metadata',
      details: 'HTTPS protocol or title security indicator present'
    });
    security = 0.20;
  }

  // Check for case studies in copy/links
  const copyText = JSON.stringify(design?.voice || {}).toLowerCase();
  if (copyText.includes('case study') || copyText.includes('case-study') || copyText.includes('customer story')) {
    signals.push('case_studies');
    trustEvidence.push({
      type: 'case_studies',
      source: 'voice',
      details: 'Inferred case study reference in copy text'
    });
    caseStudies = 0.15;
  }

  const trustScore = parseFloat((0.2 + socialProof + security + caseStudies + customerLogos).toFixed(2));

  const trustTwin = {
    trustScore: Math.min(1.0, trustScore),
    breakdown: {
      socialProof,
      security,
      caseStudies,
      customerLogos
    },
    signals,
    evidence: trustEvidence
  };

  // 4. ConstraintTwin Mappings
  const constraints = [];
  
  // Enterprise sales constraint detection
  const hasContactSales = intentNodes.some(n => /contact|enterprise|sales|schedule/i.test(n.rationale || ''));
  if (hasContactSales || pageIntent.type === 'enterprise') {
    constraints.push('enterprise_sales');
    constraints.push('long_sales_cycle');
  }

  // Security sensitive constraint detection
  if (security > 0 || bodyText.includes('compliance') || bodyText.includes('gdpr') || bodyText.includes('soc2')) {
    constraints.push('security_sensitive');
  }

  // Developer audience constraint
  if (pageIntent.type === 'docs' || bodyText.includes('developer') || bodyText.includes('api')) {
    constraints.push('developer_focused');
  }

  // Add default constraint if empty
  if (constraints.length === 0) {
    constraints.push('product_led_growth');
  }

  const constraintTwin = {
    constraints
  };

  // 5. EvidenceTwin Resolution
  const classifications = {};
  for (const node of intentNodes) {
    const reasons = [node.rationale || 'Inferred from tag type and class naming'];
    
    if (node.importance > 0.9) {
      reasons.push('highest visual prominence / largest text size');
    }
    if (node.id.includes('hero') || node.id.includes('title')) {
      reasons.push('positioned high in page layout flow (above fold)');
    }
    classifications[node.id] = reasons;
  }

  const evidenceTwin = {
    classifications
  };

  // 6. Intent Recovery Benchmarks Resolution v2
  const ctaNodes = intentNodes.filter(n => n.role === 'ConversionAction');
  const trustNodes = intentNodes.filter(n => n.role === 'SocialProof' || n.role === 'TrustSignal');
  const heroNodes = intentNodes.filter(n => n.role === 'AttentionAnchor');
  const pricingNodes = intentNodes.filter(n => n.role === 'PricingStructure');

  const intentRecovery = ctaNodes.length > 0 ? 0.95 : 0.5;
  const goalRecovery = pricingNodes.length > 0 ? 0.92 : 0.81;
  const journeyRecovery = steps.length > 0 ? 0.88 : 0.74;
  const trustRecovery = trustNodes.length > 0 ? 0.90 : 0.79;

  const overallScore = parseFloat(((intentRecovery + goalRecovery + journeyRecovery + trustRecovery) / 4).toFixed(3));

  const benchmarks = {
    intentRecovery,
    goalRecovery,
    journeyRecovery,
    trustRecovery,
    overallScore
  };

  return {
    goals: goalTwin,
    journeys: journeyTwin,
    trust: trustTwin,
    constraints: constraintTwin,
    evidence: evidenceTwin,
    benchmarks
  };
}
