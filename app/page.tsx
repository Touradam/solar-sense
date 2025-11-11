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
      
      // Step 1: Download TensorFlow.js model files (model.json + weights.bin)
      console.log('📦 Saving model files...');
      await model.save(`downloads://neural-network-model-${timestamp}`);
      
      // Wait a bit to ensure first download completes
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Create and download configuration package
      console.log('📄 Creating configuration package...');
      const configPackage = {
        modelInfo: {
          name: `neural-network-model-${timestamp}`,
          exportDate: new Date().toISOString(),
          framework: 'TensorFlow.js',
          version: '1.0',
        },
        architecture: {
          inputSize: config.inputLayers,
          hiddenLayers: config.hiddenLayers,
          outputSize: config.outputLayers,
          hiddenActivation: config.hiddenActivation,
          outputActivation: config.outputActivation,
        },
        training: {
          epochs: config.epochs,
          batchSize: config.batchSize,
          learningRate: config.learningRate,
          optimizer: config.optimizer,
          lossFunction: config.lossFunction,
        },
        preprocessing: {
          normalization: config.normalization,
          scaler: normalizationScaler,
        },
        dataInfo: dataInfo,
        performance: summary ? {
          trainLoss: summary.finalTrainLoss,
          trainAccuracy: summary.finalTrainAccuracy,
          valLoss: summary.finalValLoss,
          valAccuracy: summary.finalValAccuracy,
          totalEpochs: summary.totalEpochs,
          bestEpoch: summary.bestEpoch,
        } : null,
        usageInstructions: {
          loading: "const model = await tf.loadLayersModel('path/to/model.json');",
          preprocessing: normalizationScaler ? 
            `Apply ${config.normalization} normalization with provided scaler values` : 
            'No preprocessing required',
          prediction: `
const input = tf.tensor2d([[feature1, feature2, ..., feature${config.inputLayers}]]);
const output = model.predict(input);
const probabilities = await output.data();
const predictedClass = probabilities.indexOf(Math.max(...probabilities));
          `.trim(),
        },
      };

      const configBlob = new Blob([JSON.stringify(configPackage, null, 2)], { 
        type: 'application/json' 
      });
      const configUrl = URL.createObjectURL(configBlob);
      const configLink = document.createElement('a');
      configLink.href = configUrl;
      configLink.download = `model-config-${timestamp}.json`;
      document.body.appendChild(configLink);
      configLink.click();
      document.body.removeChild(configLink);
      URL.revokeObjectURL(configUrl);
      
      // Wait again
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 3: Create and download README
      console.log('📝 Creating README...');
      const readme = `# Neural Network Model - Export Package

## 📊 Model Information
- **Export Date**: ${new Date().toLocaleString()}
- **Model ID**: neural-network-model-${timestamp}
- **Input Features**: ${config.inputLayers}
- **Output Classes**: ${config.outputLayers}
- **Architecture**: ${config.hiddenLayers.join(' → ')}
- **Final Validation Accuracy**: ${summary?.finalValAccuracy ? (summary.finalValAccuracy * 100).toFixed(2) + '%' : 'N/A'}

## 📦 Files Included
1. **model.json** - Model architecture
2. **model.weights.bin** - Trained weights
3. **model-config-${timestamp}.json** - Complete configuration
4. **README.md** - This file

## 🚀 Quick Start

### Load the Model
\`\`\`javascript
import * as tf from '@tensorflow/tfjs';

// Load model
const model = await tf.loadLayersModel('file://path/to/model.json');
// or from web server: 'http://yourserver.com/model.json'
\`\`\`

### Preprocess Input Data
${normalizationScaler ? `
**⚠️ IMPORTANT: Apply ${config.normalization} normalization**

\`\`\`javascript
// Your normalization scaler values:
${config.normalization === 'minmax' ? `const min = ${JSON.stringify(normalizationScaler.min)};
const max = ${JSON.stringify(normalizationScaler.max)};

// Normalize: (x - min) / (max - min)
function normalize(features) {
  return features.map((val, i) => (val - min[i]) / (max[i] - min[i]));
}` : ''}${config.normalization === 'standard' ? `const mean = ${JSON.stringify(normalizationScaler.mean)};
const std = ${JSON.stringify(normalizationScaler.std)};

// Normalize: (x - mean) / std
function normalize(features) {
  return features.map((val, i) => (val - mean[i]) / std[i]);
}` : ''}
\`\`\`
` : '**No preprocessing required** - Use raw feature values'}

### Make Predictions
\`\`\`javascript
// Example with ${config.inputLayers} features
const rawFeatures = [1.5, 2.3, ${config.inputLayers > 2 ? '..., ' : ''}0.8]; // Your ${config.inputLayers} features
${normalizationScaler ? 'const normalizedFeatures = normalize(rawFeatures);' : 'const normalizedFeatures = rawFeatures;'}

// Create tensor and predict
const inputTensor = tf.tensor2d([normalizedFeatures]);
const prediction = model.predict(inputTensor);
const probabilities = await prediction.data();

// Get predicted class
const predictedClass = probabilities.indexOf(Math.max(...probabilities));
console.log('Predicted Class:', predictedClass);
console.log('Probabilities:', probabilities);

// Clean up
inputTensor.dispose();
prediction.dispose();
\`\`\`

## 📋 Model Specifications
- **Input Shape**: [batchSize, ${config.inputLayers}]
- **Output Shape**: [batchSize, ${config.outputLayers}]
- **Output Type**: Probabilities (one per class)
- **Activation**: ${config.outputActivation}

## 💡 Tips
- Always apply the same preprocessing used during training
- Output is an array of ${config.outputLayers} probabilities (sum = 1.0)
- Use \`tf.dispose()\` to clean up tensors and avoid memory leaks
- For batch predictions, pass multiple rows: \`tf.tensor2d([[feat1], [feat2], ...])\`

## 🔧 Configuration Details
See **model-config-${timestamp}.json** for complete training configuration including:
- All hyperparameters
- Exact scaler values
- Training performance metrics
- Full architecture details

---
*Generated by Neural Network Builder*
`;

      const readmeBlob = new Blob([readme], { type: 'text/markdown' });
      const readmeUrl = URL.createObjectURL(readmeBlob);
      const readmeLink = document.createElement('a');
      readmeLink.href = readmeUrl;
      readmeLink.download = `README-${timestamp}.md`;
      document.body.appendChild(readmeLink);
      readmeLink.click();
      document.body.removeChild(readmeLink);
      URL.revokeObjectURL(readmeUrl);
      
      console.log('✅ All files downloaded successfully');
      alert('✅ Model downloaded successfully!\n\nFiles downloaded:\n📄 model.json + model.weights.bin\n📄 model-config.json\n📄 README.md\n\nCheck your Downloads folder!');
      
    } catch (error) {
      console.error('❌ Download error:', error);
      alert('Failed to download model. Error: ' + (error as Error).message);
    }
  }, [model, config, normalizationScaler, dataInfo, summary]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-950 dark:via-emerald-950/10 dark:to-teal-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/SEPT_logo_Transparent.png"
                alt="SEPT Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>

            {/* Center: Tagline (takes remaining space) */}
            <div className="flex-1 text-center hidden sm:block">
              <h1 className="text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Build and train your own Neural Network
              </h1>
            </div>

            {/* Right: Test Link */}
            <div className="flex-shrink-0">
              <Link
                href="/test"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-950/30 transition-all"
              >
                <Info className="h-4 w-4" />
                <span className="hidden lg:inline">Test Components</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Network Diagram */}
        <NetworkDiagram
          inputNodes={config.inputLayers}
          hiddenLayers={config.hiddenLayers}
          outputNodes={config.outputLayers}
        />

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <PresetManager currentConfig={config} onLoadPreset={handleLoadPreset} />
            <DataInputSection onDataLoaded={handleDataLoaded} />
            <DataSplitSection
              splitRatios={splitRatios}
              onSplitChange={handleSplitChange}
              totalSamples={dataInfo?.numSamples || 0}
            />
          </aside>

          {/* Center Column - Training & Testing (More Space for Graphs) */}
          <main className="lg:col-span-5 space-y-6">
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

          {/* Right Column - Configuration Controls */}
          <aside className="lg:col-span-3 space-y-6">
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
