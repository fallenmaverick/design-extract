import { RealityTwin } from './core.js';

export interface UniverseTwin {
  reality: RealityTwin;
  possibilities: PossibilityGraph;
  simulations: SimulationGraph;
  outcomes: OutcomeGraph;
  evolution: EvolutionGraph;
}

export interface PossibilityGraph {
  variants: {
    id: string;                   // e.g. "enterprise-optimized", "startup-optimized"
    targetAudience: string;
    mutations: string[];          // List of changes from reality
    designGenome: any;
    messagingGenome: any;
  }[];
  searchSpaceSize: number;        // e.g. 100,000 potential design combinations
}

export interface SimulationGraph {
  syntheticJourneys: {
    personaId: string;            // e.g. "CTO", "Procurement Officer"
    path: string[];
    clicks: number;
    exitReason?: string;
  }[];
  colonyDebates: {
    topic: string;
    arguments: { agentRole: string; critique: string }[];
  }[];
}

export interface OutcomeGraph {
  forecasts: Record<string, {     // variantId -> predictions
    conversionRate: number;
    perceivedTrust: number;
    mrrUSD: number;
    cacUSD: number;
    ltvUSD: number;
    attentionHeatmapUrl?: string;
  }>;
}

export interface EvolutionGraph {
  generation: number;
  tournaments: {
    round: number;
    variantA: string;
    variantB: string;
    winner: string;
    deltaFitness: number;
  }[];
  fitnessMatrix: Record<string, { // variantId -> fitness score
    performance: number;
    accessibility: number;
    conversion: number;
    brandAlignment: number;
    overallFitness: number;
  }>;
}
