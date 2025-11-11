'use client';

import React, { useState, useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Brain, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import { DataInputSection } from '@/components/data-input-section';
import { DataSplitSection } from '@/components/data-split-section';
import { ConfigControls } from '@/components/config-controls';
import { PresetManager } from '@/components/preset-manager';
import { NetworkDiagram } from '@/components/network-diagram';
import { FunctionSelector } from '@/components/function-selector';
import { TrainingSection } from '@/components/training-section';
import { TestingSection } from '@/components/testing-section';

// Types & Utils
import {
  NetworkConfig,
  SplitRatios,
  TrainingMetrics,
  TrainingSummary,
  NormalizationScaler,
  EvaluationMetrics,
  PredictionResult,
  ActivationFunction,
  LossFunction,
  OptimizerType,
} from '@/lib/types';
import {
  normalizeData,
  denormalizeData,
  splitData,
  createModel,
  trainModel,
  calculateMetrics,
} from '@/lib/ml-utils';
import { BUILT_IN_PRESETS } from '@/lib/presets';

export default function NeuralNetworkBuilder() {
  // ===== DATA STATE =====
  const [rawFeatures, setRawFeatures] = useState<number[][]>([]);
  const [rawLabels, setRawLabels] = useState<number[][]>([]);
  const [dataInfo, setDataInfo] = useState<{
    numSamples: number;
    numFeatures: number;
    numClasses: number;
  } | null>(null);
  const [normalizationScaler, setNormalizationScaler] = useState<NormalizationScaler | null>(null);

  // ===== SPLIT STATE =====
  const [splitRatios, setSplitRatios] = useState<SplitRatios>({
    train: 60,
    validation: 20,
    test: 20,
  });

  // ===== CONFIGURATION STATE =====
  const [config, setConfig] = useState<NetworkConfig>(BUILT_IN_PRESETS[1].config); // Standard preset

  // ===== MODEL & TRAINING STATE =====
  const [model, setModel] = useState<tf.Sequential | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingMetrics[]>([]);
  const [summary, setSummary] = useState<TrainingSummary | undefined>(undefined);
  const [testMetrics, setTestMetrics] = useState<EvaluationMetrics | undefined>(undefined);
  
  const trainingRef = useRef<boolean>(false);

  /**
   * Handle data loaded from input section
   */
  const handleDataLoaded = useCallback(
    (features: number[][], labels: number[][], info: { numSamples: number; numFeatures: number; numClasses: number }) => {
      setRawFeatures(features);
      setRawLabels(labels);
      setDataInfo(info);
      
      // Update config with detected sizes
      setConfig(prev => ({
        ...prev,
        inputLayers: info.numFeatures,
        outputLayers: info.numClasses,
      }));

      // Reset training state
      setModel(null);
      setTrainingData([]);
      setSummary(undefined);
      setTestMetrics(undefined);
      setNormalizationScaler(null);

      console.log('✅ Data loaded:', info);
    },
    []
  );

  /**
   * Handle split ratio change
   */
  const handleSplitChange = useCallback((ratios: SplitRatios) => {
    setSplitRatios(ratios);
  }, []);

  /**
   * Handle config change
   */
  const handleConfigChange = useCallback((updates: Partial<NetworkConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Handle preset load
   */
  const handleLoadPreset = useCallback((presetConfig: NetworkConfig) => {
    setConfig(prev => ({
      ...presetConfig,
      inputLayers: prev.inputLayers, // Preserve detected input size
      outputLayers: prev.outputLayers, // Preserve detected output size
    }));
  }, []);

  /**
   * Handle training
   */
  const handleTrain = useCallback(async () => {
    if (!dataInfo || rawFeatures.length === 0) {
      alert('Please load data first');
      return;
    }

    try {
      setIsTraining(true);
      trainingRef.current = true;
      setTrainingData([]);
      setSummary(undefined);
      setTestMetrics(undefined);

      const startTime = Date.now();

      // Step 1: Normalize data if enabled
      let features = rawFeatures;
      let scaler: NormalizationScaler | null = null;

      if (config.normalization !== 'none') {
        const normalized = normalizeData(rawFeatures, config.normalization);
        features = normalized.normalized;
        scaler = normalized.scaler;
        setNormalizationScaler(scaler);
        console.log('✅ Data normalized:', config.normalization);
      }

      // Step 2: Split data
      const trainRatio = splitRatios.train / 100;
      const valRatio = splitRatios.validation / 100;
      
      const split = splitData(features, rawLabels, trainRatio, valRatio, true);
      console.log('✅ Data split:', {
        train: split.trainX.length,
        val: split.valX.length,
        test: split.testX.length,
      });

      // Step 3: Create model
      const newModel = createModel(config, dataInfo.numFeatures, dataInfo.numClasses);
      setModel(newModel);
      console.log('✅ Model created');

      // Step 4: Train model
      const metrics: TrainingMetrics[] = [];
      let bestEpoch = 0;
      let bestValLoss = Infinity;

      const history = await trainModel(
        newModel,
        split.trainX,
        split.trainY,
        split.valX,
        split.valY,
        config,
        (epoch, logs) => {
          if (!trainingRef.current) return;

          const metric: TrainingMetrics = {
            epoch: epoch + 1,
            loss: logs.loss as number,
            accuracy: logs.acc as number,
            valLoss: logs.val_loss as number,
            valAccuracy: logs.val_acc as number,
            learningRate: config.learningRate,
          };

          metrics.push(metric);
          setTrainingData([...metrics]);

          // Track best epoch
          if (logs.val_loss && logs.val_loss < bestValLoss) {
            bestValLoss = logs.val_loss as number;
            bestEpoch = epoch + 1;
          }

          console.log(`Epoch ${epoch + 1}/${config.epochs}`, logs);
        }
      );

      if (!trainingRef.current) {
        console.log('⚠️ Training cancelled');
        return;
      }

      const trainingTime = (Date.now() - startTime) / 1000;

      // Step 5: Evaluate on test set
      const testEval = await calculateMetrics(newModel, split.testX, split.testY);
      setTestMetrics(testEval);
      console.log('✅ Test metrics calculated:', testEval);

      // Step 6: Create summary
      const finalSummary: TrainingSummary = {
        finalTrainLoss: metrics[metrics.length - 1].loss,
        finalTrainAccuracy: metrics[metrics.length - 1].accuracy || 0,
        finalValLoss: metrics[metrics.length - 1].valLoss || 0,
        finalValAccuracy: metrics[metrics.length - 1].valAccuracy || 0,
        testLoss: testEval.loss,
        testAccuracy: testEval.accuracy,
        totalEpochs: metrics.length,
        bestEpoch,
        trainingTime,
        earlyStopped: metrics.length < config.epochs,
        testMetrics: testEval,
      };

      setSummary(finalSummary);
      console.log('✅ Training complete!', finalSummary);

    } catch (error) {
      console.error('❌ Training error:', error);
      alert(`Training failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTraining(false);
      trainingRef.current = false;
    }
  }, [dataInfo, rawFeatures, rawLabels, config, splitRatios]);

  /**
   * Handle pause training
   */
  const handlePause = useCallback(() => {
    trainingRef.current = false;
    setIsTraining(false);
    console.log('⏸️ Training paused');
  }, []);

  /**
   * Handle reset
   */
  const handleReset = useCallback(() => {
    trainingRef.current = false;
    setIsTraining(false);
    setTrainingData([]);
    setSummary(undefined);
    setTestMetrics(undefined);
    
    if (model) {
      model.dispose();
      setModel(null);
    }
    
    console.log('🔄 Training reset');
  }, [model]);

  /**
   * Handle test/prediction
   */
  const handleTest = useCallback(
    async (inputs: number[]): Promise<PredictionResult | null> => {
      if (!model || !dataInfo) return null;

      try {
        // Normalize inputs if scaler exists
        let processedInputs = inputs;
        if (normalizationScaler && normalizationScaler.method !== 'none') {
          const normalized = normalizeData([inputs], normalizationScaler.method);
          processedInputs = normalized.normalized[0];
        }

        // Make prediction
        const inputTensor = tf.tensor2d([processedInputs]);
        const prediction = model.predict(inputTensor) as tf.Tensor;
        const probabilities = await prediction.data();
        
        inputTensor.dispose();
        prediction.dispose();

        const probArray = Array.from(probabilities);
        const predictedClass = probArray.indexOf(Math.max(...probArray));
        const confidence = probArray[predictedClass];

        return {
          predictedClass,
          confidence,
          probabilities: probArray,
        };
      } catch (error) {
        console.error('❌ Prediction error:', error);
        throw error;
      }
    },
    [model, dataInfo, normalizationScaler]
  );

  /**
   * Handle model download
   */
  const handleDownloadModel = useCallback(async () => {
    if (!model) {
      alert('No trained model to download');
      return;
    }

    try {
      const timestamp = Date.now();
      
      // Create comprehensive README with all information
      const readme = `# Neural Network Model Package
**Export Date**: ${new Date().toLocaleString()}
**Model ID**: neural-network-model-${timestamp}

## 📊 Model Information
- **Input Features**: ${config.inputLayers}
- **Output Classes**: ${config.outputLayers}
- **Architecture**: ${config.hiddenLayers.join(' → ')} neurons per hidden layer
- **Activation Functions**: ${config.hiddenActivation} (hidden), ${config.outputActivation} (output)
- **Final Validation Accuracy**: ${summary?.finalValAccuracy ? (summary.finalValAccuracy * 100).toFixed(2) + '%' : 'N/A'}
- **Training Epochs**: ${summary?.totalEpochs || config.epochs}
- **Best Epoch**: ${summary?.bestEpoch || 'N/A'}

## 📦 Downloaded Files
1. **neural-network-model-${timestamp}.json** - Model architecture
2. **neural-network-model-${timestamp}.weights.bin** - Trained weights

## 🚀 How to Use This Model

### Step 1: Load the Model
\`\`\`javascript
import * as tf from '@tensorflow/tfjs';

// Load the model (adjust path as needed)
const model = await tf.loadLayersModel('path/to/neural-network-model-${timestamp}.json');
// Or from a web server: 'https://yourserver.com/neural-network-model-${timestamp}.json'
\`\`\`

### Step 2: Preprocess Your Input
${normalizationScaler ? `
**⚠️ IMPORTANT: You MUST normalize your input data the same way it was during training!**

**Normalization Method**: ${config.normalization.toUpperCase()}

\`\`\`javascript
${config.normalization === 'minmax' ? `// Min-Max Normalization values from training:
const min = ${JSON.stringify(normalizationScaler.min)};
const max = ${JSON.stringify(normalizationScaler.max)};

// Normalization function: (x - min) / (max - min)
function normalizeInput(features) {
  return features.map((value, index) => {
    const range = max[index] - min[index];
    return range === 0 ? 0.5 : (value - min[index]) / range;
  });
}` : ''}${config.normalization === 'standardization' ? `// Standardization (Z-score) values from training:
const mean = ${JSON.stringify(normalizationScaler.mean)};
const std = ${JSON.stringify(normalizationScaler.std)};

// Normalization function: (x - mean) / std
function normalizeInput(features) {
  return features.map((value, index) => {
    return std[index] === 0 ? 0 : (value - mean[index]) / std[index];
  });
}` : ''}${config.normalization === 'robust' ? `// Robust Normalization values from training:
const median = ${JSON.stringify(normalizationScaler.median)};
const iqr = ${JSON.stringify(normalizationScaler.iqr)};

// Normalization function: (x - median) / IQR
function normalizeInput(features) {
  return features.map((value, index) => {
    return iqr[index] === 0 ? 0 : (value - median[index]) / iqr[index];
  });
}` : ''}

// Example usage:
const rawFeatures = [1.5, 2.3, 0.8${config.inputLayers > 3 ? ', ...' : ''}]; // Your ${config.inputLayers} raw feature values
const normalizedFeatures = normalizeInput(rawFeatures);
\`\`\`
` : `
**No preprocessing required** - You can use raw feature values directly.
`}

### Step 3: Make Predictions
\`\`\`javascript
// Prepare input (${config.inputLayers} features)
const inputFeatures = [/* your ${config.inputLayers} feature values */];
${normalizationScaler ? 'const normalizedFeatures = normalizeInput(inputFeatures);' : 'const normalizedFeatures = inputFeatures;'}

// Create tensor (2D: [1, ${config.inputLayers}] for single prediction)
const inputTensor = tf.tensor2d([normalizedFeatures]);

// Make prediction
const outputTensor = model.predict(inputTensor);
const probabilities = await outputTensor.data();

// Get predicted class (highest probability)
const predictedClass = Array.from(probabilities).indexOf(Math.max(...probabilities));
console.log('Predicted Class:', predictedClass);
console.log('Class Probabilities:', probabilities);

// IMPORTANT: Clean up tensors to prevent memory leaks
inputTensor.dispose();
outputTensor.dispose();
\`\`\`

### Batch Predictions
\`\`\`javascript
// For multiple predictions at once
const batchFeatures = [
  [feat1_1, feat1_2, ..., feat1_${config.inputLayers}],
  [feat2_1, feat2_2, ..., feat2_${config.inputLayers}],
  // ... more samples
];
${normalizationScaler ? 'const normalizedBatch = batchFeatures.map(normalizeInput);' : 'const normalizedBatch = batchFeatures;'}
const batchTensor = tf.tensor2d(normalizedBatch);
const predictions = model.predict(batchTensor);
const allProbabilities = await predictions.data();
batchTensor.dispose();
predictions.dispose();
\`\`\`

## 📋 Technical Specifications

### Input
- **Shape**: [batchSize, ${config.inputLayers}]
- **Type**: Float32 tensor
- **Preprocessing**: ${config.normalization === 'none' ? 'None required' : config.normalization + ' normalization (see values above)'}

### Output
- **Shape**: [batchSize, ${config.outputLayers}]
- **Type**: Float32 tensor (probabilities)
- **Format**: ${config.outputLayers} values, one per class, summing to 1.0
- **Activation**: ${config.outputActivation}

### Architecture
\`\`\`
Input Layer (${config.inputLayers} features)
    ↓
${config.hiddenLayers.map((neurons, i) => `Hidden Layer ${i + 1} (${neurons} neurons, ${config.hiddenActivation} activation)${config.useDropout ? ` + Dropout(${config.dropoutRate})` : ''}${config.useBatchNormalization ? ' + BatchNorm' : ''}`).join('\n    ↓\n')}
    ↓
Output Layer (${config.outputLayers} classes, ${config.outputActivation} activation)
\`\`\`

### Training Configuration
- **Optimizer**: ${config.optimizer}
- **Learning Rate**: ${config.learningRate}
- **Loss Function**: ${config.lossFunction}
- **Batch Size**: ${config.batchSize}
- **Epochs Trained**: ${summary?.totalEpochs || config.epochs}
- **Best Epoch**: ${summary?.bestEpoch || 'N/A'}

### Performance Metrics
${summary ? `
- **Training Loss**: ${summary.finalTrainLoss?.toFixed(4) || 'N/A'}
- **Training Accuracy**: ${summary.finalTrainAccuracy ? (summary.finalTrainAccuracy * 100).toFixed(2) + '%' : 'N/A'}
- **Validation Loss**: ${summary.finalValLoss?.toFixed(4) || 'N/A'}
- **Validation Accuracy**: ${summary.finalValAccuracy ? (summary.finalValAccuracy * 100).toFixed(2) + '%' : 'N/A'}
` : 'No training metrics available'}

## 💡 Important Tips

1. **Always normalize inputs** using the exact same method and values from training
2. **Dispose tensors** after use to prevent memory leaks: \`tensor.dispose()\`
3. **Check input shape** - must be [batchSize, ${config.inputLayers}]
4. **Interpret output** - returns probabilities, not class labels
5. **Batch processing** - process multiple samples together for better performance

## 🔧 Troubleshooting

**Error: "Input shape mismatch"**
- Ensure input has exactly ${config.inputLayers} features
- Check tensor shape: should be 2D [batchSize, ${config.inputLayers}]

**Error: "Memory leak detected"**
- Call \`.dispose()\` on all tensors after use
- Use \`tf.tidy()\` to automatically clean up: \`tf.tidy(() => { /* operations */ })\`

**Poor predictions:**
- Verify normalization is applied correctly
- Check that features are in the same order as training
- Ensure feature values are in reasonable ranges

## 📚 Additional Resources
- TensorFlow.js Documentation: https://js.tensorflow.org/
- Model Loading Guide: https://js.tensorflow.org/tutorials/import-saved-model.html

---
*Generated by Neural Network Builder*
*Framework: TensorFlow.js*
*Export Time: ${new Date().toISOString()}*
`;

      // Save model using TensorFlow.js (this downloads 2 files: model.json + weights.bin)
      console.log('📦 Saving model files...');
      await model.save(`downloads://neural-network-model-${timestamp}`);
      
      // Save README as a single comprehensive file
      console.log('📝 Creating README...');
      const readmeBlob = new Blob([readme], { type: 'text/markdown' });
      const readmeUrl = URL.createObjectURL(readmeBlob);
      const readmeLink = document.createElement('a');
      readmeLink.href = readmeUrl;
      readmeLink.download = `neural-network-README-${timestamp}.md`;
      readmeLink.style.display = 'none';
      document.body.appendChild(readmeLink);
      
      // Small delay to ensure model files start downloading first
      setTimeout(() => {
        readmeLink.click();
        document.body.removeChild(readmeLink);
        URL.revokeObjectURL(readmeUrl);
      }, 1000);
      
      console.log('✅ Model export complete');
      alert(`✅ Model download started!\n\nYou should receive 3 files:\n\n1. neural-network-model-${timestamp}.json\n2. neural-network-model-${timestamp}.weights.bin\n3. neural-network-README-${timestamp}.md\n\n⚠️ If your browser blocks multiple downloads, please allow them when prompted.\n\nCheck your Downloads folder!`);
      
    } catch (error) {
      console.error('❌ Download error:', error);
      alert('Failed to download model. Error: ' + (error as Error).message);
    }
  }, [model, config, normalizationScaler, dataInfo, summary]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-950 dark:via-emerald-950/10 dark:to-teal-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden">
          <div className="flex h-14 items-center justify-between gap-2 sm:gap-4">
            {/* Left: Logo (clickable - returns to landing page) */}
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src="/SEPT_logo_Transparent.png"
                alt="SEPT Logo"
                width={100}
                height={33}
                className="h-8 sm:h-10 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Center: Tagline (takes remaining space) */}
            <div className="flex-1 text-center hidden md:block px-2">
              <h1 className="text-sm md:text-base lg:text-lg xl:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent truncate">
                Build and train your own Neural Network
              </h1>
            </div>

            {/* Right: Back to SEPT button */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all touch-manipulation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden xs:inline sm:hidden">Back</span>
                <span className="hidden sm:inline">Back to SEPT</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
        {/* Network Diagram */}
        <div className="w-full overflow-x-auto">
          <NetworkDiagram
            inputNodes={config.inputLayers}
            hiddenLayers={config.hiddenLayers}
            outputNodes={config.outputLayers}
          />
        </div>

        {/* Main Grid Layout - Stack on Mobile, Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Sidebar - First on Mobile */}
          <aside className="lg:col-span-4 space-y-4 sm:space-y-6 order-1">
            <PresetManager currentConfig={config} onLoadPreset={handleLoadPreset} />
            <DataInputSection onDataLoaded={handleDataLoaded} />
            <DataSplitSection
              splitRatios={splitRatios}
              onSplitChange={handleSplitChange}
              totalSamples={dataInfo?.numSamples || 0}
            />
          </aside>

          {/* Center Column - Training & Testing (More Space for Graphs) - Second on Mobile */}
          <main className="lg:col-span-5 space-y-4 sm:space-y-6 order-2">
            <TrainingSection
              isTraining={isTraining}
              trainingData={trainingData}
              onTrain={handleTrain}
              onPause={handlePause}
              onReset={handleReset}
              summary={summary}
              testMetrics={testMetrics}
            />
            <TestingSection
              model={model}
              inputSize={config.inputLayers}
              outputSize={config.outputLayers}
              onTest={handleTest}
              onDownloadModel={handleDownloadModel}
              isModelTrained={model !== null && !isTraining}
            />
          </main>

          {/* Right Column - Configuration Controls - Third on Mobile */}
          <aside className="lg:col-span-3 space-y-4 sm:space-y-6 order-3">
            <ConfigControls config={config} onConfigChange={handleConfigChange} />
            <FunctionSelector
              hiddenActivation={config.hiddenActivation}
              outputActivation={config.outputActivation}
              lossFunction={config.lossFunction}
              optimizer={config.optimizer}
              onHiddenActivationChange={(val: ActivationFunction) =>
                handleConfigChange({ hiddenActivation: val })
              }
              onOutputActivationChange={(val: ActivationFunction) =>
                handleConfigChange({ outputActivation: val })
              }
              onLossFunctionChange={(val: LossFunction) =>
                handleConfigChange({ lossFunction: val })
              }
              onOptimizerChange={(val: OptimizerType) =>
                handleConfigChange({ optimizer: val })
              }
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
