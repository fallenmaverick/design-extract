import { createRealityTwin } from './core.js';

/**
 * @typedef {Object} PossibilityGraph
 * @property {Object[]} variants
 * @property {string} variants.id
 * @property {string} variants.targetAudience
 * @property {string[]} variants.mutations
 * @property {any} variants.designGenome
 * @property {any} variants.messagingGenome
 * @property {number} searchSpaceSize
 */

/**
 * @typedef {Object} SimulationGraph
 * @property {Object[]} syntheticJourneys
 * @property {string} syntheticJourneys.personaId
 * @property {string[]} syntheticJourneys.path
 * @property {number} syntheticJourneys.clicks
 * @property {string} [syntheticJourneys.exitReason]
 * @property {Object[]} colonyDebates
 * @property {string} colonyDebates.topic
 * @property {Object[]} colonyDebates.arguments
 * @property {string} colonyDebates.arguments.agentRole
 * @property {string} colonyDebates.arguments.critique
 */

/**
 * @typedef {Object} OutcomeGraph
 * @property {Record<string, {conversionRate: number, perceivedTrust: number, mrrUSD: number, cacUSD: number, ltvUSD: number, attentionHeatmapUrl?: string}>} forecasts
 */

/**
 * @typedef {Object} EvolutionGraph
 * @property {number} generation
 * @property {Object[]} tournaments
 * @property {number} tournaments.round
 * @property {string} tournaments.variantA
 * @property {string} tournaments.variantB
 * @property {string} tournaments.winner
 * @property {number} tournaments.deltaFitness
 * @property {Record<string, {performance: number, accessibility: number, conversion: number, brandAlignment: number, overallFitness: number}>} fitnessMatrix
 */

/**
 * @typedef {Object} UniverseTwin
 * @property {import('./core.js').RealityTwin} reality
 * @property {PossibilityGraph} possibilities
 * @property {SimulationGraph} simulations
 * @property {OutcomeGraph} outcomes
 * @property {EvolutionGraph} evolution
 */

/**
 * Creates an empty UniverseTwin object.
 * @param {string} url 
 * @param {string} title 
 * @returns {UniverseTwin}
 */
export function createUniverseTwin(url, title = '') {
  return {
    reality: createRealityTwin(url, title),
    possibilities: {
      variants: [],
      searchSpaceSize: 0,
    },
    simulations: {
      syntheticJourneys: [],
      colonyDebates: [],
    },
    outcomes: {
      forecasts: {},
    },
    evolution: {
      generation: 0,
      tournaments: [],
      fitnessMatrix: {},
    },
  };
}
