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
      // Save model to memory first
      const saveResult = await model.save(tf.io.withSaveHandler(async (artifacts) => {
        // Create a comprehensive download package
        const modelPackage = {
          // Model files
          model: {
            modelTopology: artifacts.modelTopology,
            weightSpecs: artifacts.weightSpecs,
            weightData: Array.from(new Uint8Array(artifacts.weightData as ArrayBuffer)),
            format: artifacts.format,
            generatedBy: artifacts.generatedBy || 'Neural Network Builder',
            convertedBy: artifacts.convertedBy,
          },
          
          // Training configuration
          config: {
            architecture: {
              inputLayers: config.inputLayers,
              hiddenLayers: config.hiddenLayers,
              outputLayers: config.outputLayers,
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
            regularization: {
              useDropout: config.useDropout,
              dropoutRate: config.dropoutRate,
              regularization: config.regularization,
              l1Rate: config.l1Rate,
              l2Rate: config.l2Rate,
            },
          },
          
          // Data preprocessing info
          preprocessing: {
            normalization: config.normalization,
            scaler: normalizationScaler,
            dataInfo: dataInfo,
          },
          
          // Performance metrics
          performance: summary ? {
            finalTrainLoss: summary.finalTrainLoss,
            finalTrainAccuracy: summary.finalTrainAccuracy,
            finalValLoss: summary.finalValLoss,
            finalValAccuracy: summary.finalValAccuracy,
            totalEpochs: summary.totalEpochs,
            bestEpoch: summary.bestEpoch,
          } : null,
          
          // Metadata
          metadata: {
            exportDate: new Date().toISOString(),
            version: '1.0',
            framework: 'TensorFlow.js',
          },
        };

        // Create README content
        const readme = `# Neural Network Model Export

## Model Information
- **Export Date**: ${new Date().toLocaleString()}
- **Input Features**: ${config.inputLayers}
- **Output Classes**: ${config.outputLayers}
- **Architecture**: ${config.hiddenLayers.join(' → ')}
- **Training Epochs**: ${config.epochs}
- **Final Accuracy**: ${summary?.finalValAccuracy ? (summary.finalValAccuracy * 100).toFixed(2) + '%' : 'N/A'}

## How to Use This Model

### 1. Load the Model in Browser

\`\`\`javascript
// Load the model
const model = await tf.loadLayersModel('path/to/model.json');

// Prepare your input data (normalize if needed)
const inputData = tf.tensor2d([[feature1, feature2, ...]]);

// Make prediction
const prediction = model.predict(inputData);
const probabilities = await prediction.data();
console.log('Predictions:', probabilities);
\`\`\`

### 2. Preprocessing Required

${normalizationScaler ? `**Normalization**: ${config.normalization}
${config.normalization === 'minmax' ? `- Min values: ${JSON.stringify(normalizationScaler.min)}
- Max values: ${JSON.stringify(normalizationScaler.max)}` : ''}
${config.normalization === 'standard' ? `- Mean values: ${JSON.stringify(normalizationScaler.mean)}
- Std values: ${JSON.stringify(normalizationScaler.std)}` : ''}` : 'No normalization required'}

### 3. Input/Output Format

- **Input**: Array of ${config.inputLayers} numeric features
- **Output**: Array of ${config.outputLayers} probabilities (one for each class)

### 4. Example Usage

\`\`\`javascript
// Example: Make a prediction
const features = [/* your ${config.inputLayers} feature values */];
const inputTensor = tf.tensor2d([features]);
const output = model.predict(inputTensor);
const predictions = await output.array();
const predictedClass = predictions[0].indexOf(Math.max(...predictions[0]));
console.log('Predicted class:', predictedClass);
\`\`\`

## Files Included

- \`model.json\`: Model architecture and metadata
- \`model-package.json\`: Complete configuration and preprocessing info
- \`README.md\`: This file

## Notes

- Make sure to apply the same preprocessing (normalization) used during training
- The model expects input shape: [batch_size, ${config.inputLayers}]
- Output shape will be: [batch_size, ${config.outputLayers}]
`;

        // Create downloads
        const timestamp = new Date().getTime();
        
        // Download model package JSON
        const packageBlob = new Blob([JSON.stringify(modelPackage, null, 2)], { type: 'application/json' });
        const packageUrl = URL.createObjectURL(packageBlob);
        const packageLink = document.createElement('a');
        packageLink.href = packageUrl;
        packageLink.download = `neural-network-package-${timestamp}.json`;
        packageLink.click();
        URL.revokeObjectURL(packageUrl);
        
        // Download README
        const readmeBlob = new Blob([readme], { type: 'text/markdown' });
        const readmeUrl = URL.createObjectURL(readmeBlob);
        const readmeLink = document.createElement('a');
        readmeLink.href = readmeUrl;
        readmeLink.download = `neural-network-README-${timestamp}.md`;
        setTimeout(() => {
          readmeLink.click();
          URL.revokeObjectURL(readmeUrl);
        }, 100);

        return { modelArtifactsInfo: { dateSaved: new Date(), modelTopologyType: 'JSON' } };
      }));

      // Also use TensorFlow.js default download for the actual model files
      await model.save(`downloads://neural-network-model-${Date.now()}`);
      
      console.log('✅ Model package downloaded');
      alert('Model downloaded successfully!\n\nYou received:\n• Model files (model.json + weights)\n• Complete configuration package\n• README with usage instructions');
    } catch (error) {
      console.error('❌ Download error:', error);
      alert('Failed to download model. Please try again.');
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
