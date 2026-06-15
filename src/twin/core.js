/**
 * @typedef {Object} RealityTwin
 * @property {Object} meta
 * @property {string} meta.url
 * @property {string} meta.title
 * @property {string} meta.timestamp
 * @property {string} meta.targetVersion
 * @property {Object} company
 * @property {string} company.name
 * @property {string} [company.sizeClass]
 * @property {string[]} [company.objectives]
 * @property {Object} product
 * @property {string} product.category
 * @property {string[]} product.targetPersonas
 * @property {string[]} product.features
 * @property {string[]} [product.gapAnalysis]
 * @property {Object} users
 * @property {string[]} users.fears
 * @property {string[]} users.desires
 * @property {string[]} users.objections
 * @property {string[]} users.motivations
 * @property {Object[]} competitors
 * @property {string} competitors.name
 * @property {string} competitors.url
 * @property {number} [competitors.designOverlapScore]
 * @property {Object} market
 * @property {string} market.industry
 * @property {string} market.region
 * @property {string[]} [market.optimalDesignStyles]
 * @property {Object} brand
 * @property {string} brand.voiceTone
 * @property {string[]} brand.traits
 * @property {string} brand.personalityStyle
 * @property {Object} revenue
 * @property {string} revenue.model
 * @property {Object[]} revenue.pricingPlans
 * @property {string} revenue.pricingPlans.name
 * @property {string} revenue.pricingPlans.price
 * @property {string[]} revenue.pricingPlans.features
 * @property {Object} visualModel
 * @property {any} visualModel.domTree
 * @property {Record<string, {x: number, y: number, w: number, h: number}>} visualModel.boundingBoxes
 * @property {Record<string, any>} visualModel.responsiveVariants
 * @property {Record<string, {hover?: any, focus?: any, active?: any}>} interactionModel
 * @property {Object} motionModel
 * @property {any[]} motionModel.accelerations
 * @property {any[]} motionModel.springDynamics
 * @property {any} motionModel.transitionTimeline
 * @property {Object} journeys
 * @property {string[]} journeys.routes
 * @property {Object[]} journeys.funnel
 * @property {string} journeys.funnel.step
 * @property {number} journeys.funnel.dropoffRisk
 * @property {Object} trustSignals
 * @property {number} trustSignals.score
 * @property {boolean} trustSignals.logoWallPresent
 * @property {string[]} trustSignals.socialProofDetails
 * @property {Object} conversionModel
 * @property {any} [conversionModel.saliencyHeatmap]
 * @property {number} conversionModel.primaryCTAImportance
 * @property {Object} designGenome
 * @property {number} designGenome.spacingScale
 * @property {number[]} designGenome.radiiScale
 * @property {any[]} designGenome.shadowScale
 * @property {string} designGenome.typographyStyle
 * @property {Object} messagingGenome
 * @property {string} messagingGenome.copywritingStyle
 * @property {string[]} messagingGenome.headlines
 */

/**
 * Creates an empty RealityTwin object skeleton.
 * @param {string} url 
 * @param {string} title 
 * @returns {RealityTwin}
 */
export function createRealityTwin(url, title = '') {
  return {
    meta: {
      url,
      title,
      timestamp: new Date().toISOString(),
      targetVersion: '1.0.0',
    },
    company: { name: '', sizeClass: '', objectives: [] },
    product: { category: '', targetPersonas: [], features: [], gapAnalysis: [] },
    users: { fears: [], desires: [], objections: [], motivations: [] },
    competitors: [],
    market: { industry: '', region: '', optimalDesignStyles: [] },
    brand: { voiceTone: '', traits: [], personalityStyle: '' },
    revenue: { model: '', pricingPlans: [] },
    visualModel: {
      domTree: null,
      boundingBoxes: {},
      responsiveVariants: {},
    },
    interactionModel: {},
    motionModel: {
      accelerations: [],
      springDynamics: [],
      transitionTimeline: null,
    },
    journeys: {
      routes: [],
      funnel: [],
    },
    trustSignals: {
      score: 0,
      logoWallPresent: false,
      socialProofDetails: [],
    },
    conversionModel: {
      saliencyHeatmap: null,
      primaryCTAImportance: 0.5,
    },
    designGenome: {
      spacingScale: 4,
      radiiScale: [],
      shadowScale: [],
      typographyStyle: '',
    },
    messagingGenome: {
      copywritingStyle: '',
      headlines: [],
    },
  };
}
