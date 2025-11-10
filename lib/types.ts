/**
 * Type Definitions for Neural Network Builder
 * 
 * This file contains all TypeScript interfaces and types used throughout the application.
 * Organized by category for better maintainability.
 */

// ============================================================================
// ACTIVATION, LOSS, AND OPTIMIZER TYPES
// ============================================================================

/**
 * Supported activation functions for neural network layers
 */
export type ActivationFunction = 
  | 'relu' 
  | 'sigmoid' 
  | 'tanh' 
  | 'softmax' 
  | 'linear';

/**
 * Supported loss functions for training
 */
export type LossFunction = 
  | 'categoricalCrossentropy' 
  | 'meanSquaredError' 
  | 'meanAbsoluteError' 
  | 'hinge';

/**
 * Supported optimization algorithms
 */
export type OptimizerType = 
  | 'sgd' 
  | 'adam' 
  | 'rmsprop' 
  | 'adadelta' 
  | 'adamax';

/**
 * Normalization methods for data preprocessing
 */
export type NormalizationMethod = 
  | 'none' 
  | 'minmax' 
  | 'standardization' 
  | 'robust';

/**
 * Regularization techniques
 */
export type RegularizationType = 
  | 'none' 
  | 'l1' 
  | 'l2' 
  | 'l1_l2';

/**
 * Weight initialization strategies
 */
export type WeightInitialization = 
  | 'glorotUniform' 
  | 'heNormal' 
  | 'heUniform' 
  | 'leCunNormal';

// ============================================================================
// DATA CONFIGURATION INTERFACES
// ============================================================================

/**
 * Configuration for parsing CSV/Excel data
 */
export interface DataFormatConfig {
  /** Whether the first row contains column headers */
  hasHeaders: boolean;
  /** Position of the label column */
  labelColumn: 'last' | 'first' | number;
  /** Optional: Specific feature columns to use (if not all) */
  featureColumns?: number[];
}

/**
 * Normalization scaler parameters for data preprocessing
 * Stores the parameters needed to normalize and denormalize data
 */
export interface NormalizationScaler {
  /** The normalization method used */
  method: NormalizationMethod;
  /** Mean values for each feature (standardization) */
  mean?: number[];
  /** Standard deviation for each feature (standardization) */
  std?: number[];
  /** Minimum values for each feature (minmax) */
  min?: number[];
  /** Maximum values for each feature (minmax) */
  max?: number[];
  /** Median values for each feature (robust) */
  median?: number[];
  /** Interquartile range for each feature (robust) */
  iqr?: number[];
}

// ============================================================================
// NEURAL NETWORK CONFIGURATION
// ============================================================================

/**
 * Complete configuration for the neural network
 * Includes architecture, training parameters, and all advanced features
 */
export interface NetworkConfig {
  // ===== BASIC ARCHITECTURE =====
  /** Number of input features */
  inputLayers: number;
  /** Array of hidden layer sizes (e.g., [64, 32] for 2 layers) */
  hiddenLayers: number[];
  /** Number of output classes */
  outputLayers: number;
  
  // ===== TRAINING PARAMETERS =====
  /** Number of training epochs */
  epochs: number;
  /** Batch size for training */
  batchSize: number;
  /** Learning rate for optimizer */
  learningRate: number;
  /** Random seed for reproducibility */
  randomSeed: number;
  
  // ===== ACTIVATION & LOSS =====
  /** Activation function for hidden layers */
  hiddenActivation: ActivationFunction;
  /** Activation function for output layer */
  outputActivation: ActivationFunction;
  /** Loss function for training */
  lossFunction: LossFunction;
  /** Optimizer algorithm */
  optimizer: OptimizerType;
  
  // ===== DATA PREPROCESSING =====
  /** Normalization method for features */
  normalization: NormalizationMethod;
  /** Enable feature scaling */
  featureScaling: boolean;
  /** Handle class imbalance with automatic weighting */
  handleImbalance: boolean;
  
  // ===== REGULARIZATION =====
  /** Enable dropout regularization */
  useDropout: boolean;
  /** Dropout rate (0.0 - 0.5) */
  dropoutRate: number;
  /** Weight regularization type */
  regularization: RegularizationType;
  /** Regularization rate (0.0001 - 0.01) */
  regularizationRate: number;
  /** Enable batch normalization */
  useBatchNormalization: boolean;
  /** Weight initialization strategy */
  weightInit: WeightInitialization;
  
  // ===== TRAINING IMPROVEMENTS =====
  /** Enable gradient clipping */
  clipGradients: boolean;
  /** Gradient clipping value (0.5 - 5.0) */
  clipValue: number;
  
  // ===== EARLY STOPPING =====
  /** Enable early stopping */
  useEarlyStopping: boolean;
  /** Number of epochs to wait before stopping (5-20) */
  patience: number;
  /** Minimum change to qualify as improvement (0.0001 - 0.001) */
  minDelta: number;
  
  // ===== LEARNING RATE SCHEDULING =====
  /** Enable learning rate decay */
  learningRateDecay: boolean;
  /** Decay rate (0.9 - 0.99) */
  decayRate: number;
  /** Number of steps between decay applications */
  decaySteps: number;
}

// ============================================================================
// TRAINING & EVALUATION METRICS
// ============================================================================

/**
 * Metrics tracked during training for each epoch
 */
export interface TrainingMetrics {
  /** Current epoch number */
  epoch: number;
  /** Training loss */
  loss: number;
  /** Training accuracy */
  accuracy?: number;
  /** Validation loss */
  valLoss?: number;
  /** Validation accuracy */
  valAccuracy?: number;
  /** Learning rate at this epoch */
  learningRate?: number;
}

/**
 * Comprehensive evaluation metrics for model performance
 */
export interface EvaluationMetrics {
  /** Overall accuracy */
  accuracy: number;
  /** Overall loss */
  loss: number;
  /** Precision score for each class */
  precision: number[];
  /** Recall score for each class */
  recall: number[];
  /** F1-score for each class */
  f1Score: number[];
  /** Confusion matrix (predicted vs actual) */
  confusionMatrix: number[][];
  /** Class weights used during training (if any) */
  classWeights?: number[];
  /** Support (number of samples) for each class */
  support?: number[];
}

/**
 * Training summary after model training completes
 */
export interface TrainingSummary {
  /** Final training loss */
  finalTrainLoss: number;
  /** Final training accuracy */
  finalTrainAccuracy: number;
  /** Final validation loss */
  finalValLoss: number;
  /** Final validation accuracy */
  finalValAccuracy: number;
  /** Test set loss */
  testLoss?: number;
  /** Test set accuracy */
  testAccuracy?: number;
  /** Total epochs completed */
  totalEpochs: number;
  /** Epoch with best validation performance */
  bestEpoch?: number;
  /** Training time in seconds */
  trainingTime: number;
  /** Whether early stopping was triggered */
  earlyStopped: boolean;
  /** Comprehensive test set metrics */
  testMetrics?: EvaluationMetrics;
}

// ============================================================================
// DATASET INTERFACES
// ============================================================================

/**
 * Dataset information after splitting
 */
export interface DatasetInfo {
  /** Feature data (2D array) */
  features: number[][];
  /** Label data (2D array, one-hot encoded) */
  labels: number[][];
  /** Number of training samples */
  trainSize: number;
  /** Number of validation samples */
  valSize: number;
  /** Number of test samples */
  testSize: number;
  /** Number of features per sample */
  numFeatures: number;
  /** Number of classes */
  numClasses: number;
}

/**
 * Split dataset into train, validation, and test sets
 */
export interface SplitDataset {
  /** Training features */
  trainX: number[][];
  /** Training labels */
  trainY: number[][];
  /** Validation features */
  valX: number[][];
  /** Validation labels */
  valY: number[][];
  /** Test features */
  testX: number[][];
  /** Test labels */
  testY: number[][];
}

// ============================================================================
// FUNCTION INFORMATION (FOR UI DISPLAY)
// ============================================================================

/**
 * Information about activation/loss functions for visualization
 */
export interface FunctionInfo {
  /** Display name */
  name: string;
  /** Mathematical formula (LaTeX or plain text) */
  formula: string;
  /** Description of the function */
  description: string;
  /** Graph data points for visualization */
  graphPoints: { x: number; y: number }[];
  /** Use cases or recommendations */
  useCases?: string[];
  /** Pros of using this function */
  pros?: string[];
  /** Cons or limitations */
  cons?: string[];
}

// ============================================================================
// PRESET CONFIGURATION
// ============================================================================

/**
 * Saved configuration preset
 */
export interface PresetConfig {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description of the preset */
  description: string;
  /** Complete network configuration */
  config: NetworkConfig;
  /** Whether this is a built-in or custom preset */
  isCustom: boolean;
  /** Category for organization */
  category?: 'beginner' | 'standard' | 'advanced' | 'custom';
  /** Tags for filtering */
  tags?: string[];
  /** Creation timestamp */
  createdAt?: string;
}

// ============================================================================
// MODEL EXPORT/IMPORT
// ============================================================================

/**
 * Model metadata for export
 */
export interface ModelMetadata {
  /** Model name */
  name: string;
  /** Creation timestamp */
  timestamp: string;
  /** Configuration used for training */
  config: NetworkConfig;
  /** Normalization scaler (for preprocessing new data) */
  scaler?: NormalizationScaler;
  /** Training summary */
  summary: TrainingSummary;
  /** Model architecture description */
  architecture: {
    inputSize: number;
    outputSize: number;
    totalLayers: number;
    totalParams: number;
  };
}

// ============================================================================
// UI COMPONENT PROPS (HELPER TYPES)
// ============================================================================

/**
 * Data split ratios (must sum to 100%)
 */
export interface SplitRatios {
  train: number;
  validation: number;
  test: number;
}

/**
 * Prediction result for display
 */
export interface PredictionResult {
  /** Predicted class index */
  predictedClass: number;
  /** Confidence percentage (0-100) */
  confidence: number;
  /** Probabilities for all classes */
  probabilities: number[];
  /** Class labels (if available) */
  classLabels?: string[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Training state status
 */
export type TrainingStatus = 
  | 'idle' 
  | 'preparing' 
  | 'training' 
  | 'paused' 
  | 'completed' 
  | 'error';

/**
 * Data loading state
 */
export type DataStatus = 
  | 'empty' 
  | 'loading' 
  | 'loaded' 
  | 'error';

/**
 * Validation result for configuration
 */
export interface ValidationResult {
  /** Whether the configuration is valid */
  isValid: boolean;
  /** Error messages (if any) */
  errors: string[];
  /** Warning messages (non-critical) */
  warnings: string[];
}

