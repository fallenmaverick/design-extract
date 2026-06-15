export interface RealityTwin {
  meta: {
    url: string;
    title: string;
    timestamp: string;
    targetVersion: string;
  };
  company: {
    name: string;
    sizeClass?: string;
    objectives?: string[];
  };
  product: {
    category: string;             // e.g. "FinOps", "Analytics"
    targetPersonas: string[];     // e.g. ["CTO", "Engineering Manager"]
    features: string[];
    gapAnalysis?: string[];
  };
  users: {
    fears: string[];
    desires: string[];
    objections: string[];
    motivations: string[];
  };
  competitors: {
    name: string;
    url: string;
    designOverlapScore?: number;
  }[];
  market: {
    industry: string;
    region: string;               // e.g. "US SaaS", "Indian SaaS"
    optimalDesignStyles?: string[];
  };
  brand: {
    voiceTone: string;
    traits: string[];             // e.g. ["technical", "premium"]
    personalityStyle: string;
  };
  revenue: {
    model: string;                // e.g. "Enterprise SaaS", "Self-Serve"
    pricingPlans: {
      name: string;
      price: string;
      features: string[];
    }[];
  };
  visualModel: {
    domTree: any;                 // Serialized DOM hierarchy
    boundingBoxes: Record<string, { x: number; y: number; w: number; h: number }>;
    responsiveVariants: Record<string, any>;
  };
  interactionModel: Record<string, {
    hover?: any;
    focus?: any;
    active?: any;
  }>;
  motionModel: {
    accelerations: any[];
    springDynamics: any[];
    transitionTimeline: any;
  };
  journeys: {
    routes: string[];
    funnel: { step: string; dropoffRisk: number }[];
  };
  trustSignals: {
    score: number;
    logoWallPresent: boolean;
    socialProofDetails: string[];
  };
  conversionModel: {
    saliencyHeatmap?: any;
    primaryCTAImportance: number;
  };
  designGenome: {
    spacingScale: number;
    radiiScale: number[];
    shadowScale: any[];
    typographyStyle: string;
  };
  messagingGenome: {
    copywritingStyle: string;
    headlines: string[];
  };
}
