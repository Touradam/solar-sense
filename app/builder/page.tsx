'use client';

import React, { useState, useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Brain, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/lib/utils';

// Components
import { DataInputSection } from '@/components/data-input-section';
import { DataSplitSection } from '@/components/data-split-section';
import { NetworkConfigSelector } from '@/components/network-config-selector';
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
        async (epoch, logs) => {
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
          
          // Use functional update to ensure React gets the latest state
          setTrainingData(prev => [...prev, metric]);
          
          // Yield to browser to allow UI updates (TensorFlow.js specific)
          await tf.nextFrame();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-950 dark:via-emerald-950/10 dark:to-teal-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden">
          <div className="flex h-14 items-center justify-between gap-2 sm:gap-4">
            {/* Left: Logo (clickable - returns to landing page) */}
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src={withBasePath("/SolarSense_Logo.png")}
                alt="Solar Sense Logo"
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

      {/* Development Notice Banner */}
      <div className="border-b border-amber-200 dark:border-amber-900/50 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 dark:from-amber-950/20 dark:via-yellow-950/20 dark:to-amber-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-amber-900 dark:text-amber-100 mb-1">
                🚧 Under Development
              </p>
              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
                This Neural Network Builder is currently under active development. Features and functionality may change. Use for educational and experimental purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

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
            <DataInputSection onDataLoaded={handleDataLoaded} />
            <DataSplitSection
              splitRatios={splitRatios}
              onSplitChange={handleSplitChange}
              totalSamples={dataInfo?.numSamples || 0}
            />
          </aside>

          {/* Center Column - Training & Testing (More Space for Graphs) - Third on Mobile */}
          <main className="lg:col-span-5 space-y-4 sm:space-y-6 order-3">
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
              isModelTrained={model !== null && !isTraining}
            />
          </main>

          {/* Right Column - Configuration Controls - Second on Mobile */}
          <aside className="lg:col-span-3 space-y-4 sm:space-y-6 order-2">
            <NetworkConfigSelector 
              currentConfig={config} 
              onConfigChange={handleConfigChange}
              onLoadPreset={handleLoadPreset}
            />
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
