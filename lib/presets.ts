/**
 * Built-in Neural Network Configuration Presets
 * 
 * Optimized configurations for different use cases and skill levels
 */

import { PresetConfig, NetworkConfig } from './types';

/**
 * Beginner-friendly preset with simple, safe defaults
 */
const beginnerPreset: NetworkConfig = {
  // Architecture
  inputLayers: 2,
  hiddenLayers: [16],
  outputLayers: 3,
  epochs: 50,
  batchSize: 16,
  learningRate: 0.01,
  randomSeed: 42,
  
  // Activation & Loss
  hiddenActivation: 'relu',
  outputActivation: 'softmax',
  lossFunction: 'categoricalCrossentropy',
  optimizer: 'adam',
  
  // Data Preprocessing
  normalization: 'standardization',
  featureScaling: true,
  handleImbalance: false,
  
  // Regularization
  useDropout: false,
  dropoutRate: 0.2,
  regularization: 'none',
  regularizationRate: 0.001,
  useBatchNormalization: false,
  weightInit: 'glorotUniform',
  
  // Training Control
  clipGradients: false,
  clipValue: 1.0,
  useEarlyStopping: false,
  patience: 10,
  minDelta: 0.001,
  learningRateDecay: false,
  decayRate: 0.96,
  decaySteps: 100,
};

/**
 * Standard production-ready preset (RECOMMENDED)
 */
const standardPreset: NetworkConfig = {
  // Architecture
  inputLayers: 2,
  hiddenLayers: [64, 32],
  outputLayers: 3,
  epochs: 100,
  batchSize: 32,
  learningRate: 0.001,
  randomSeed: 42,
  
  // Activation & Loss
  hiddenActivation: 'relu',
  outputActivation: 'softmax',
  lossFunction: 'categoricalCrossentropy',
  optimizer: 'adam',
  
  // Data Preprocessing
  normalization: 'standardization',
  featureScaling: true,
  handleImbalance: true,
  
  // Regularization
  useDropout: true,
  dropoutRate: 0.3,
  regularization: 'l2',
  regularizationRate: 0.001,
  useBatchNormalization: true,
  weightInit: 'heNormal',
  
  // Training Control
  clipGradients: true,
  clipValue: 1.0,
  useEarlyStopping: true,
  patience: 15,
  minDelta: 0.0001,
  learningRateDecay: false,
  decayRate: 0.96,
  decaySteps: 100,
};

/**
 * Deep learning preset for complex problems
 */
const deepLearningPreset: NetworkConfig = {
  // Architecture
  inputLayers: 2,
  hiddenLayers: [128, 64, 32, 16],
  outputLayers: 3,
  epochs: 200,
  batchSize: 64,
  learningRate: 0.0005,
  randomSeed: 42,
  
  // Activation & Loss
  hiddenActivation: 'relu',
  outputActivation: 'softmax',
  lossFunction: 'categoricalCrossentropy',
  optimizer: 'adam',
  
  // Data Preprocessing
  normalization: 'standardization',
  featureScaling: true,
  handleImbalance: true,
  
  // Regularization
  useDropout: true,
  dropoutRate: 0.4,
  regularization: 'l1_l2',
  regularizationRate: 0.0005,
  useBatchNormalization: true,
  weightInit: 'heNormal',
  
  // Training Control
  clipGradients: true,
  clipValue: 1.0,
  useEarlyStopping: true,
  patience: 20,
  minDelta: 0.00005,
  learningRateDecay: true,
  decayRate: 0.95,
  decaySteps: 50,
};

/**
 * Fast training preset for quick experiments
 */
const fastTrainingPreset: NetworkConfig = {
  // Architecture
  inputLayers: 2,
  hiddenLayers: [32],
  outputLayers: 3,
  epochs: 30,
  batchSize: 64,
  learningRate: 0.01,
  randomSeed: 42,
  
  // Activation & Loss
  hiddenActivation: 'relu',
  outputActivation: 'softmax',
  lossFunction: 'categoricalCrossentropy',
  optimizer: 'adam',
  
  // Data Preprocessing
  normalization: 'minmax',
  featureScaling: true,
  handleImbalance: false,
  
  // Regularization
  useDropout: true,
  dropoutRate: 0.2,
  regularization: 'none',
  regularizationRate: 0.001,
  useBatchNormalization: false,
  weightInit: 'glorotUniform',
  
  // Training Control
  clipGradients: false,
  clipValue: 1.0,
  useEarlyStopping: true,
  patience: 5,
  minDelta: 0.001,
  learningRateDecay: false,
  decayRate: 0.96,
  decaySteps: 100,
};

/**
 * Built-in presets array
 */
export const BUILT_IN_PRESETS: PresetConfig[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Simple network with safe defaults. Perfect for learning and small datasets.',
    config: beginnerPreset,
    isCustom: false,
    category: 'beginner',
    tags: ['simple', 'learning', 'safe'],
  },
  {
    id: 'standard',
    name: 'Standard (Recommended)',
    description: 'Production-ready with regularization, early stopping, and class balancing. Best for most tasks.',
    config: standardPreset,
    isCustom: false,
    category: 'standard',
    tags: ['recommended', 'production', 'balanced'],
  },
  {
    id: 'deep',
    name: 'Deep Learning',
    description: 'Advanced 4-layer network with full regularization suite. For complex patterns and large datasets.',
    config: deepLearningPreset,
    isCustom: false,
    category: 'advanced',
    tags: ['advanced', 'deep', 'powerful'],
  },
  {
    id: 'fast',
    name: 'Fast Training',
    description: 'Quick experiments with minimal epochs. Good for rapid prototyping and testing.',
    config: fastTrainingPreset,
    isCustom: false,
    category: 'beginner',
    tags: ['fast', 'prototype', 'experiment'],
  },
];

/**
 * Get preset by ID
 */
export function getPresetById(id: string): PresetConfig | undefined {
  return BUILT_IN_PRESETS.find(p => p.id === id);
}

/**
 * Get presets by category
 */
export function getPresetsByCategory(category: string): PresetConfig[] {
  return BUILT_IN_PRESETS.filter(p => p.category === category);
}

