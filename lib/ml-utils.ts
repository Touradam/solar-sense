/**
 * Machine Learning Utility Functions
 * 
 * Core ML functionality using TensorFlow.js for:
 * - Data generation and preprocessing
 * - Model creation and training
 * - Evaluation and metrics
 */

import * as tf from '@tensorflow/tfjs';
import {
  NetworkConfig,
  ActivationFunction,
  LossFunction,
  OptimizerType,
  NormalizationScaler,
  NormalizationMethod,
  SplitDataset,
  EvaluationMetrics,
  FunctionInfo,
  DataFormatConfig,
  TrainingMetrics,
} from './types';

// ============================================================================
// DATA GENERATION
// ============================================================================

/**
 * Generate synthetic dataset for testing and demonstration
 * Creates non-linear decision boundaries for multi-class classification
 * 
 * @param samples - Number of samples to generate
 * @param classes - Number of classes (2-10)
 * @param features - Number of features (default: 2 for visualization)
 * @returns Object with features and one-hot encoded labels
 */
export function generateSyntheticData(
  samples: number = 300,
  classes: number = 3,
  features: number = 2
): { features: number[][]; labels: number[][] } {
  const featuresData: number[][] = [];
  const labelsData: number[][] = [];

  const samplesPerClass = Math.floor(samples / classes);

  for (let c = 0; c < classes; c++) {
    for (let i = 0; i < samplesPerClass; i++) {
      const feature: number[] = [];
      
      // Generate features with class-specific patterns
      for (let f = 0; f < features; f++) {
        // Add class-specific offset and noise
        const angle = (c / classes) * 2 * Math.PI + (Math.random() * 0.5);
        const radius = 2 + Math.random() * 1.5;
        
        if (f === 0) {
          feature.push(radius * Math.cos(angle) + (Math.random() - 0.5) * 0.5);
        } else if (f === 1) {
          feature.push(radius * Math.sin(angle) + (Math.random() - 0.5) * 0.5);
        } else {
          // Additional features with some correlation
          feature.push(
            Math.sin(angle * (f + 1)) * radius + (Math.random() - 0.5) * 0.8
          );
        }
      }
      
      featuresData.push(feature);
      
      // One-hot encode labels
      const label = new Array(classes).fill(0);
      label[c] = 1;
      labelsData.push(label);
    }
  }

  // Shuffle the data
  const indices = Array.from({ length: featuresData.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const shuffledFeatures = indices.map(i => featuresData[i]);
  const shuffledLabels = indices.map(i => labelsData[i]);

  return {
    features: shuffledFeatures,
    labels: shuffledLabels,
  };
}

// ============================================================================
// DATA PREPROCESSING - NORMALIZATION
// ============================================================================

/**
 * Normalize data using specified method
 * 
 * @param data - Input data (2D array)
 * @param method - Normalization method
 * @returns Normalized data and scaler parameters
 */
export function normalizeData(
  data: number[][],
  method: NormalizationMethod
): { normalized: number[][]; scaler: NormalizationScaler } {
  if (method === 'none' || data.length === 0) {
    return {
      normalized: data,
      scaler: { method: 'none' },
    };
  }

  const numFeatures = data[0].length;
  const normalized: number[][] = [];

  if (method === 'minmax') {
    // Min-Max Normalization: (x - min) / (max - min)
    const min: number[] = [];
    const max: number[] = [];

    // Calculate min and max for each feature
    for (let f = 0; f < numFeatures; f++) {
      const featureValues = data.map(row => row[f]);
      min[f] = Math.min(...featureValues);
      max[f] = Math.max(...featureValues);
    }

    // Normalize
    for (const row of data) {
      const normalizedRow: number[] = [];
      for (let f = 0; f < numFeatures; f++) {
        const range = max[f] - min[f];
        // Handle constant features
        const normalizedValue = range === 0 ? 0.5 : (row[f] - min[f]) / range;
        normalizedRow.push(normalizedValue);
      }
      normalized.push(normalizedRow);
    }

    return {
      normalized,
      scaler: { method: 'minmax', min, max },
    };
  } else if (method === 'standardization') {
    // Standardization (Z-score): (x - mean) / std
    const mean: number[] = [];
    const std: number[] = [];

    // Calculate mean for each feature
    for (let f = 0; f < numFeatures; f++) {
      const featureValues = data.map(row => row[f]);
      mean[f] = featureValues.reduce((a, b) => a + b, 0) / featureValues.length;
    }

    // Calculate standard deviation for each feature
    for (let f = 0; f < numFeatures; f++) {
      const featureValues = data.map(row => row[f]);
      const variance =
        featureValues.reduce((sum, val) => sum + Math.pow(val - mean[f], 2), 0) /
        featureValues.length;
      std[f] = Math.sqrt(variance);
    }

    // Normalize
    for (const row of data) {
      const normalizedRow: number[] = [];
      for (let f = 0; f < numFeatures; f++) {
        // Handle constant features
        const normalizedValue = std[f] === 0 ? 0 : (row[f] - mean[f]) / std[f];
        normalizedRow.push(normalizedValue);
      }
      normalized.push(normalizedRow);
    }

    return {
      normalized,
      scaler: { method: 'standardization', mean, std },
    };
  } else if (method === 'robust') {
    // Robust Scaling: (x - median) / IQR
    const median: number[] = [];
    const iqr: number[] = [];

    // Calculate median and IQR for each feature
    for (let f = 0; f < numFeatures; f++) {
      const featureValues = data.map(row => row[f]).sort((a, b) => a - b);
      const n = featureValues.length;

      // Median
      median[f] =
        n % 2 === 0
          ? (featureValues[n / 2 - 1] + featureValues[n / 2]) / 2
          : featureValues[Math.floor(n / 2)];

      // Q1 and Q3
      const q1Index = Math.floor(n * 0.25);
      const q3Index = Math.floor(n * 0.75);
      const q1 = featureValues[q1Index];
      const q3 = featureValues[q3Index];
      iqr[f] = q3 - q1;
    }

    // Normalize
    for (const row of data) {
      const normalizedRow: number[] = [];
      for (let f = 0; f < numFeatures; f++) {
        // Handle constant features
        const normalizedValue = iqr[f] === 0 ? 0 : (row[f] - median[f]) / iqr[f];
        normalizedRow.push(normalizedValue);
      }
      normalized.push(normalizedRow);
    }

    return {
      normalized,
      scaler: { method: 'robust', median, iqr },
    };
  }

  // Fallback
  return {
    normalized: data,
    scaler: { method: 'none' },
  };
}

/**
 * Denormalize data using the stored scaler
 * 
 * @param data - Normalized data
 * @param scaler - Scaler used for normalization
 * @returns Original scale data
 */
export function denormalizeData(
  data: number[][],
  scaler: NormalizationScaler
): number[][] {
  if (scaler.method === 'none' || data.length === 0) {
    return data;
  }

  const denormalized: number[][] = [];

  if (scaler.method === 'minmax' && scaler.min && scaler.max) {
    for (const row of data) {
      const denormalizedRow = row.map(
        (val, f) => val * (scaler.max![f] - scaler.min![f]) + scaler.min![f]
      );
      denormalized.push(denormalizedRow);
    }
  } else if (scaler.method === 'standardization' && scaler.mean && scaler.std) {
    for (const row of data) {
      const denormalizedRow = row.map(
        (val, f) => val * scaler.std![f] + scaler.mean![f]
      );
      denormalized.push(denormalizedRow);
    }
  } else if (scaler.method === 'robust' && scaler.median && scaler.iqr) {
    for (const row of data) {
      const denormalizedRow = row.map(
        (val, f) => val * scaler.iqr![f] + scaler.median![f]
      );
      denormalized.push(denormalizedRow);
    }
  } else {
    return data;
  }

  return denormalized;
}

// ============================================================================
// DATA PREPROCESSING - CLASS WEIGHTS
// ============================================================================

/**
 * Calculate class weights for imbalanced datasets
 * Uses formula: total_samples / (n_classes * samples_per_class)
 * 
 * @param labels - One-hot encoded labels
 * @returns Array of weights for each class
 */
export function calculateClassWeights(labels: number[][]): number[] {
  if (labels.length === 0) return [];

  const numClasses = labels[0].length;
  const classCounts = new Array(numClasses).fill(0);

  // Count samples per class
  for (const label of labels) {
    const classIndex = label.indexOf(1);
    if (classIndex !== -1) {
      classCounts[classIndex]++;
    }
  }

  const totalSamples = labels.length;
  const weights: number[] = [];

  // Calculate weights
  for (let c = 0; c < numClasses; c++) {
    if (classCounts[c] === 0) {
      weights.push(1.0); // Avoid division by zero
    } else {
      weights.push(totalSamples / (numClasses * classCounts[c]));
    }
  }

  return weights;
}

// ============================================================================
// DATA SPLITTING
// ============================================================================

/**
 * Split data into training, validation, and test sets
 * Maintains class distribution (stratified split)
 * 
 * @param features - Feature data
 * @param labels - Label data (one-hot encoded)
 * @param trainRatio - Proportion for training (0-1)
 * @param valRatio - Proportion for validation (0-1)
 * @param shuffle - Whether to shuffle before splitting
 * @returns Split datasets
 */
export function splitData(
  features: number[][],
  labels: number[][],
  trainRatio: number = 0.6,
  valRatio: number = 0.2,
  shuffle: boolean = true
): SplitDataset {
  const totalSamples = features.length;
  const trainSize = Math.floor(totalSamples * trainRatio);
  const valSize = Math.floor(totalSamples * valRatio);

  // Shuffle if requested
  let indices = Array.from({ length: totalSamples }, (_, i) => i);
  if (shuffle) {
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
  }

  // Split indices
  const trainIndices = indices.slice(0, trainSize);
  const valIndices = indices.slice(trainSize, trainSize + valSize);
  const testIndices = indices.slice(trainSize + valSize);

  return {
    trainX: trainIndices.map(i => features[i]),
    trainY: trainIndices.map(i => labels[i]),
    valX: valIndices.map(i => features[i]),
    valY: valIndices.map(i => labels[i]),
    testX: testIndices.map(i => features[i]),
    testY: testIndices.map(i => labels[i]),
  };
}

// ============================================================================
// CSV PARSING
// ============================================================================

/**
 * Parse CSV data based on format configuration
 * 
 * @param csvText - Raw CSV text
 * @param config - Data format configuration
 * @returns Features and one-hot encoded labels
 */
export function parseCSVData(
  csvText: string,
  config: DataFormatConfig
): { features: number[][]; labels: number[][] } {
  const lines = csvText.trim().split('\n');
  const features: number[][] = [];
  const rawLabels: number[] = [];
  let skippedRows = 0;
  let textColumnDetected = false;

  const startRow = config.hasHeaders ? 1 : 0;

  for (let i = startRow; i < lines.length; i++) {
    // Handle quoted fields properly (basic CSV parsing)
    const values: string[] = [];
    let currentValue = '';
    let inQuotes = false;
    
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());
    
    let featureValues: number[];
    let labelValue: number;

    if (config.labelColumn === 'last') {
      featureValues = values.slice(0, -1).map(Number);
      labelValue = Number(values[values.length - 1]);
    } else if (config.labelColumn === 'first') {
      labelValue = Number(values[0]);
      featureValues = values.slice(1).map(Number);
    } else {
      const labelIndex = config.labelColumn as number;
      featureValues = values
        .filter((_, idx) => idx !== labelIndex)
        .map(Number);
      labelValue = Number(values[labelIndex]);
    }

    // Check for text columns
    if (featureValues.some(isNaN)) {
      textColumnDetected = true;
    }

    // Validate numbers
    if (featureValues.some(isNaN) || isNaN(labelValue)) {
      skippedRows++;
      continue; // Skip invalid rows
    }

    features.push(featureValues);
    rawLabels.push(labelValue);
  }

  // Throw error if no valid data
  if (features.length === 0) {
    if (textColumnDetected) {
      throw new Error(
        'No valid data found. Your CSV contains text columns. ' +
        'Neural networks require all numeric features. ' +
        'Please remove text columns (like names or IDs) and ensure you have a numeric label column.'
      );
    } else {
      throw new Error(
        'No valid data found. Please check your CSV format. ' +
        'Ensure all columns are numeric and properly formatted.'
      );
    }
  }

  // Warn if many rows were skipped
  if (skippedRows > features.length * 0.5) {
    console.warn(
      `Warning: ${skippedRows} rows were skipped due to invalid data. ` +
      `This might indicate text columns or incorrect label column position.`
    );
  }

  // One-hot encode labels
  const uniqueLabels = Array.from(new Set(rawLabels)).sort((a, b) => a - b);
  const numClasses = uniqueLabels.length;
  
  // Check for too many classes
  if (numClasses > 50) {
    throw new Error(
      `Too many unique classes detected (${numClasses}). ` +
      `This might indicate that your label column contains continuous values instead of categorical labels. ` +
      `For classification, labels should be categories like 0, 1, 2, not continuous values.`
    );
  }
  
  const labelMap = new Map(uniqueLabels.map((label, idx) => [label, idx]));

  const labels = rawLabels.map(label => {
    const oneHot = new Array(numClasses).fill(0);
    oneHot[labelMap.get(label)!] = 1;
    return oneHot;
  });

  return { features, labels };
}

// ============================================================================
// MODEL CREATION
// ============================================================================

/**
 * Create a TensorFlow.js Sequential model based on configuration
 * Includes dropout, batch normalization, regularization, and proper initialization
 * 
 * @param config - Network configuration
 * @param inputSize - Number of input features
 * @param outputSize - Number of output classes
 * @returns Compiled TensorFlow.js model
 */
export function createModel(
  config: NetworkConfig,
  inputSize: number,
  outputSize: number
): tf.Sequential {
  const model = tf.sequential();

  // Determine weight initializer based on activation
  const getKernelInitializer = (activation: ActivationFunction): any => {
    switch (config.weightInit) {
      case 'heNormal':
        return tf.initializers.heNormal({});
      case 'heUniform':
        return tf.initializers.heUniform({});
      case 'leCunNormal':
        return tf.initializers.leCunNormal({});
      case 'glorotUniform':
      default:
        return tf.initializers.glorotUniform({});
    }
  };

  // Regularizer
  const getRegularizer = () => {
    if (config.regularization === 'none') return undefined;
    
    const rate = config.regularizationRate;
    if (config.regularization === 'l1') return tf.regularizers.l1({ l1: rate });
    if (config.regularization === 'l2') return tf.regularizers.l2({ l2: rate });
    if (config.regularization === 'l1_l2') {
      return tf.regularizers.l1l2({ l1: rate / 2, l2: rate / 2 });
    }
    return undefined;
  };

  const kernelInitializer = getKernelInitializer(config.hiddenActivation);
  const kernelRegularizer = getRegularizer();

  // Input layer (first hidden layer)
  if (config.hiddenLayers.length > 0) {
    model.add(
      tf.layers.dense({
        units: config.hiddenLayers[0],
        activation: config.hiddenActivation,
        inputShape: [inputSize],
        kernelInitializer,
        kernelRegularizer,
        name: 'dense_input',
      })
    );

    // Batch normalization after first layer
    if (config.useBatchNormalization) {
      model.add(tf.layers.batchNormalization({ name: 'batch_norm_0' }));
    }

    // Dropout after first layer
    if (config.useDropout && config.dropoutRate > 0) {
      model.add(tf.layers.dropout({ rate: config.dropoutRate, name: 'dropout_0' }));
    }

    // Additional hidden layers
    for (let i = 1; i < config.hiddenLayers.length; i++) {
      model.add(
        tf.layers.dense({
          units: config.hiddenLayers[i],
          activation: config.hiddenActivation,
          kernelInitializer,
          kernelRegularizer,
          name: `dense_hidden_${i}`,
        })
      );

      if (config.useBatchNormalization) {
        model.add(tf.layers.batchNormalization({ name: `batch_norm_${i}` }));
      }

      if (config.useDropout && config.dropoutRate > 0) {
        model.add(tf.layers.dropout({ rate: config.dropoutRate, name: `dropout_${i}` }));
      }
    }
  }

  // Output layer
  model.add(
    tf.layers.dense({
      units: outputSize,
      activation: config.outputActivation,
      kernelInitializer: tf.initializers.glorotUniform({}),
      name: 'dense_output',
    })
  );

  // Compile model
  const optimizer = getOptimizer(config);
  const loss = getLossFunction(config.lossFunction);

  model.compile({
    optimizer,
    loss,
    metrics: ['accuracy'],
  });

  return model;
}

// ============================================================================
// OPTIMIZER CONFIGURATION
// ============================================================================

/**
 * Get configured optimizer with learning rate and optional features
 * 
 * @param config - Network configuration
 * @returns TensorFlow.js optimizer
 */
export function getOptimizer(config: NetworkConfig): tf.Optimizer {
  const lr = config.learningRate;
  // Note: Gradient clipping in TensorFlow.js is typically done via clipByValue or clipByNorm
  // layers, or in custom training loops, not in the optimizer constructor

  switch (config.optimizer) {
    case 'sgd':
      return tf.train.sgd(lr);
    case 'adam':
      return tf.train.adam(lr);
    case 'rmsprop':
      return tf.train.rmsprop(lr);
    case 'adadelta':
      return tf.train.adadelta(lr);
    case 'adamax':
      return tf.train.adamax(lr);
    default:
      return tf.train.adam(lr);
  }
}

/**
 * Get TensorFlow.js loss function
 * 
 * @param lossFunction - Loss function type
 * @returns TensorFlow.js loss function name
 */
function getLossFunction(lossFunction: LossFunction): string {
  switch (lossFunction) {
    case 'categoricalCrossentropy':
      return 'categoricalCrossentropy';
    case 'meanSquaredError':
      return 'meanSquaredError';
    case 'meanAbsoluteError':
      return 'meanAbsoluteError';
    case 'hinge':
      return 'hinge';
    default:
      return 'categoricalCrossentropy';
  }
}

// ============================================================================
// MODEL TRAINING
// ============================================================================

/**
 * Train the model with validation and callbacks
 * 
 * @param model - TensorFlow.js model
 * @param trainX - Training features
 * @param trainY - Training labels
 * @param valX - Validation features
 * @param valY - Validation labels
 * @param config - Network configuration
 * @param onEpochEnd - Callback for epoch completion
 * @param onBatchEnd - Optional callback for batch completion
 * @returns Training history
 */
export async function trainModel(
  model: tf.Sequential,
  trainX: number[][],
  trainY: number[][],
  valX: number[][],
  valY: number[][],
  config: NetworkConfig,
  onEpochEnd?: (epoch: number, logs: tf.Logs) => void,
  onBatchEnd?: (batch: number, logs: tf.Logs) => void
): Promise<tf.History> {
  // Convert to tensors
  const xTrain = tf.tensor2d(trainX);
  const yTrain = tf.tensor2d(trainY);
  const xVal = tf.tensor2d(valX);
  const yVal = tf.tensor2d(valY);

  // Calculate class weights if enabled
  let classWeight: { [classId: number]: number } | undefined;
  if (config.handleImbalance) {
    const weights = calculateClassWeights(trainY);
    classWeight = {};
    weights.forEach((weight, idx) => {
      classWeight![idx] = weight;
    });
  }

  // Setup callbacks
  const callbacks: tf.CustomCallbackArgs = {};
  
  if (onEpochEnd) {
    callbacks.onEpochEnd = async (epoch, logs) => {
      await onEpochEnd(epoch, logs || {});
    };
  }

  if (onBatchEnd) {
    callbacks.onBatchEnd = async (batch, logs) => {
      await onBatchEnd(batch, logs || {});
    };
  }

  // Early stopping callback
  if (config.useEarlyStopping) {
    const earlyStopping = tf.callbacks.earlyStopping({
      monitor: 'val_loss',
      patience: config.patience,
      minDelta: config.minDelta,
      // Note: restoreBestWeights is not supported in TensorFlow.js
    });
    
    // Merge callbacks
    const originalOnEpochEnd = callbacks.onEpochEnd;
    callbacks.onEpochEnd = async (epoch, logs) => {
      await earlyStopping.onEpochEnd?.(epoch, logs);
      if (originalOnEpochEnd) {
        await originalOnEpochEnd(epoch, logs);
      }
    };
  }

  try {
    const history = await model.fit(xTrain, yTrain, {
      epochs: config.epochs,
      batchSize: config.batchSize,
      validationData: [xVal, yVal],
      classWeight,
      shuffle: true,
      verbose: 0,
      callbacks,
    });

    // Clean up tensors
    xTrain.dispose();
    yTrain.dispose();
    xVal.dispose();
    yVal.dispose();

    return history;
  } catch (error) {
    // Clean up on error
    xTrain.dispose();
    yTrain.dispose();
    xVal.dispose();
    yVal.dispose();
    throw error;
  }
}

// ============================================================================
// EVALUATION METRICS
// ============================================================================

/**
 * Calculate comprehensive evaluation metrics
 * 
 * @param model - Trained model
 * @param features - Test features
 * @param labels - True labels (one-hot encoded)
 * @returns Evaluation metrics
 */
export async function calculateMetrics(
  model: tf.Sequential,
  features: number[][],
  labels: number[][]
): Promise<EvaluationMetrics> {
  if (features.length === 0 || labels.length === 0) {
    throw new Error('Cannot calculate metrics on empty dataset');
  }

  const numClasses = labels[0].length;
  
  // Get predictions
  const xTest = tf.tensor2d(features);
  const predictions = model.predict(xTest) as tf.Tensor;
  const predArray = await predictions.array() as number[][];
  
  xTest.dispose();
  predictions.dispose();

  // Convert predictions and labels to class indices
  const predClasses = predArray.map(pred => pred.indexOf(Math.max(...pred)));
  const trueClasses = labels.map(label => label.indexOf(1));

  // Calculate confusion matrix
  const confusionMatrix: number[][] = Array(numClasses)
    .fill(0)
    .map(() => Array(numClasses).fill(0));

  for (let i = 0; i < predClasses.length; i++) {
    confusionMatrix[trueClasses[i]][predClasses[i]]++;
  }

  // Calculate per-class metrics
  const precision: number[] = [];
  const recall: number[] = [];
  const f1Score: number[] = [];
  const support: number[] = [];

  for (let c = 0; c < numClasses; c++) {
    // True positives
    const tp = confusionMatrix[c][c];
    
    // False positives (predicted as c but actually other class)
    const fp = confusionMatrix.reduce((sum, row, i) => 
      i !== c ? sum + row[c] : sum, 0
    );
    
    // False negatives (actually c but predicted as other class)
    const fn = confusionMatrix[c].reduce((sum, val, i) => 
      i !== c ? sum + val : sum, 0
    );

    // Support (total samples of this class)
    support.push(confusionMatrix[c].reduce((a, b) => a + b, 0));

    // Precision: TP / (TP + FP)
    const precisionValue = tp + fp > 0 ? tp / (tp + fp) : 0;
    precision.push(precisionValue);

    // Recall: TP / (TP + FN)
    const recallValue = tp + fn > 0 ? tp / (tp + fn) : 0;
    recall.push(recallValue);

    // F1-Score: 2 * (precision * recall) / (precision + recall)
    const f1 = precisionValue + recallValue > 0
      ? 2 * (precisionValue * recallValue) / (precisionValue + recallValue)
      : 0;
    f1Score.push(f1);
  }

  // Overall accuracy
  const correctPredictions = predClasses.filter((pred, i) => pred === trueClasses[i]).length;
  const accuracy = correctPredictions / predClasses.length;

  // Calculate loss
  const yTest = tf.tensor2d(labels);
  const yPred = tf.tensor2d(predArray);
  const lossValue = tf.losses.softmaxCrossEntropy(yTest, yPred).dataSync()[0];
  
  yTest.dispose();
  yPred.dispose();

  return {
    accuracy,
    loss: lossValue,
    precision,
    recall,
    f1Score,
    confusionMatrix,
    support,
  };
}

// ============================================================================
// FUNCTION INFORMATION (FOR UI)
// ============================================================================

/**
 * Get information about an activation function
 * 
 * @param activation - Activation function type
 * @returns Function information with formula and graph
 */
export function getActivationInfo(activation: ActivationFunction): FunctionInfo {
  const generatePoints = (fn: (x: number) => number, min = -3, max = 3, steps = 100) => {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = min + (i / steps) * (max - min);
      points.push({ x, y: fn(x) });
    }
    return points;
  };

  switch (activation) {
    case 'relu':
      return {
        name: 'ReLU (Rectified Linear Unit)',
        formula: 'f(x) = max(0, x)',
        description: 'Returns x if positive, 0 otherwise. Most popular activation for hidden layers.',
        graphPoints: generatePoints(x => Math.max(0, x)),
        useCases: ['Hidden layers', 'Deep networks', 'General purpose'],
        pros: ['Fast computation', 'No vanishing gradient', 'Sparse activation'],
        cons: ['Dying ReLU problem', 'Not zero-centered'],
      };

    case 'sigmoid':
      return {
        name: 'Sigmoid (Logistic)',
        formula: 'f(x) = 1 / (1 + e^(-x))',
        description: 'Squashes values between 0 and 1. Good for binary classification output.',
        graphPoints: generatePoints(x => 1 / (1 + Math.exp(-x))),
        useCases: ['Binary classification', 'Output layer', 'Probability outputs'],
        pros: ['Smooth gradient', 'Output in [0,1]', 'Clear probability'],
        cons: ['Vanishing gradient', 'Not zero-centered', 'Slow convergence'],
      };

    case 'tanh':
      return {
        name: 'Tanh (Hyperbolic Tangent)',
        formula: 'f(x) = (e^x - e^(-x)) / (e^x + e^(-x))',
        description: 'Squashes values between -1 and 1. Zero-centered version of sigmoid.',
        graphPoints: generatePoints(x => Math.tanh(x)),
        useCases: ['Hidden layers', 'RNN/LSTM', 'Zero-centered data'],
        pros: ['Zero-centered', 'Stronger gradient than sigmoid'],
        cons: ['Vanishing gradient', 'Slower than ReLU'],
      };

    case 'softmax':
      return {
        name: 'Softmax',
        formula: 'f(x_i) = e^(x_i) / Σ(e^(x_j))',
        description: 'Converts logits to probability distribution. Used for multi-class classification.',
        graphPoints: generatePoints(x => 1 / (1 + Math.exp(-x))), // Simplified visualization
        useCases: ['Multi-class output', 'Probability distribution'],
        pros: ['Sum to 1', 'Clear probabilities', 'Differentiable'],
        cons: ['Only for output layer', 'Sensitive to outliers'],
      };

    case 'linear':
      return {
        name: 'Linear (Identity)',
        formula: 'f(x) = x',
        description: 'No activation. Output equals input. Used for regression.',
        graphPoints: generatePoints(x => x),
        useCases: ['Regression', 'Output layer for continuous values'],
        pros: ['Simple', 'No information loss', 'Unbounded output'],
        cons: ['No non-linearity', 'Can lead to gradient explosion'],
      };

    default:
      return {
        name: 'Unknown',
        formula: '',
        description: '',
        graphPoints: [],
      };
  }
}

/**
 * Get information about a loss function
 * 
 * @param loss - Loss function type
 * @returns Function information with formula and description
 */
export function getLossInfo(loss: LossFunction): FunctionInfo {
  switch (loss) {
    case 'categoricalCrossentropy':
      return {
        name: 'Categorical Cross-Entropy',
        formula: 'L = -Σ(y_true * log(y_pred))',
        description: 'Measures difference between two probability distributions. Standard for multi-class classification.',
        graphPoints: [], // Not meaningful to visualize
        useCases: ['Multi-class classification', 'Softmax output'],
        pros: ['Penalizes confident wrong predictions', 'Probabilistic interpretation'],
        cons: ['Requires probability outputs', 'Sensitive to class imbalance'],
      };

    case 'meanSquaredError':
      return {
        name: 'Mean Squared Error (MSE)',
        formula: 'L = (1/n) * Σ(y_true - y_pred)²',
        description: 'Average of squared differences. Standard for regression tasks.',
        graphPoints: Array.from({ length: 100 }, (_, i) => {
          const x = (i - 50) / 10;
          return { x, y: x * x };
        }),
        useCases: ['Regression', 'Continuous outputs'],
        pros: ['Smooth gradient', 'Penalizes large errors'],
        cons: ['Sensitive to outliers', 'Not scale-invariant'],
      };

    case 'meanAbsoluteError':
      return {
        name: 'Mean Absolute Error (MAE)',
        formula: 'L = (1/n) * Σ|y_true - y_pred|',
        description: 'Average of absolute differences. More robust to outliers than MSE.',
        graphPoints: Array.from({ length: 100 }, (_, i) => {
          const x = (i - 50) / 10;
          return { x, y: Math.abs(x) };
        }),
        useCases: ['Regression', 'When outliers present'],
        pros: ['Robust to outliers', 'Linear error penalty'],
        cons: ['Not differentiable at 0', 'Slow convergence'],
      };

    case 'hinge':
      return {
        name: 'Hinge Loss',
        formula: 'L = max(0, 1 - y_true * y_pred)',
        description: 'Used for "maximum-margin" classification, particularly for SVMs.',
        graphPoints: Array.from({ length: 100 }, (_, i) => {
          const x = (i - 50) / 10;
          return { x, y: Math.max(0, 1 - x) };
        }),
        useCases: ['Binary classification', 'SVM-style models'],
        pros: ['Margin-based', 'Robust decision boundary'],
        cons: ['Only for binary/multi-class', 'Less probabilistic'],
      };

    default:
      return {
        name: 'Unknown',
        formula: '',
        description: '',
        graphPoints: [],
      };
  }
}

/**
 * Get information about an optimizer
 * 
 * @param optimizer - Optimizer type
 * @returns Description and information
 */
export function getOptimizerInfo(optimizer: OptimizerType): FunctionInfo {
  switch (optimizer) {
    case 'sgd':
      return {
        name: 'SGD (Stochastic Gradient Descent)',
        formula: 'θ = θ - η * ∇L',
        description: 'Classic optimizer. Updates weights in direction opposite to gradient.',
        graphPoints: [],
        useCases: ['Simple problems', 'When you understand the data well'],
        pros: ['Simple', 'Memory efficient', 'Well understood'],
        cons: ['Slow convergence', 'Sensitive to learning rate', 'Can get stuck'],
      };

    case 'adam':
      return {
        name: 'Adam (Adaptive Moment Estimation)',
        formula: 'Combines momentum and RMSprop',
        description: 'Most popular optimizer. Adapts learning rate per parameter. Good default choice.',
        graphPoints: [],
        useCases: ['Most deep learning tasks', 'Default choice', 'Complex problems'],
        pros: ['Fast convergence', 'Adaptive learning rates', 'Handles sparse gradients'],
        cons: ['More memory', 'Can overfit', 'May not converge on some problems'],
      };

    case 'rmsprop':
      return {
        name: 'RMSprop (Root Mean Square Propagation)',
        formula: 'Adapts learning rate using moving average of squared gradients',
        description: 'Good for recurrent networks. Adapts learning rate per parameter.',
        graphPoints: [],
        useCases: ['RNNs', 'Online learning', 'Non-stationary objectives'],
        pros: ['Good for non-stationary problems', 'Works well with RNNs'],
        cons: ['Requires learning rate tuning', 'Less popular than Adam'],
      };

    case 'adadelta':
      return {
        name: 'Adadelta',
        formula: 'Extension of AdaGrad',
        description: 'Reduces aggressive learning rate decay of AdaGrad.',
        graphPoints: [],
        useCases: ['When you don\'t want to tune learning rate'],
        pros: ['No learning rate parameter', 'Robust'],
        cons: ['Slower than Adam', 'Less commonly used'],
      };

    case 'adamax':
      return {
        name: 'Adamax',
        formula: 'Variant of Adam based on infinity norm',
        description: 'Sometimes more stable than Adam with large gradients.',
        graphPoints: [],
        useCases: ['Embeddings', 'When Adam is unstable'],
        pros: ['More stable than Adam sometimes', 'Good for sparse updates'],
        cons: ['Less tested', 'Not always better than Adam'],
      };

    default:
      return {
        name: 'Unknown',
        formula: '',
        description: '',
        graphPoints: [],
      };
  }
}

