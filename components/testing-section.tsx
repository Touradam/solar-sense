'use client';

import React, { useState } from 'react';
import { Zap, AlertCircle, Sparkles } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import { PredictionResult } from '@/lib/types';

interface TestingSectionProps {
  model: tf.Sequential | null;
  inputSize: number;
  outputSize: number;
  onTest: (inputs: number[]) => Promise<PredictionResult | null>;
  isModelTrained: boolean;
}

export function TestingSection({
  model,
  inputSize,
  outputSize,
  onTest,
  isModelTrained,
}: TestingSectionProps) {
  const [inputValues, setInputValues] = useState<string[]>(
    Array(inputSize).fill('')
  );
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  /**
   * Handle input change
   */
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputValues];
    newInputs[index] = value;
    setInputValues(newInputs);
    setError('');
  };

  /**
   * Handle prediction
   */
  const handlePredict = async () => {
    setError('');
    setPrediction(null);

    // Validate inputs
    const numericInputs = inputValues.map(v => parseFloat(v));
    if (numericInputs.some(isNaN)) {
      setError('Please enter valid numeric values for all features');
      return;
    }

    if (numericInputs.length !== inputSize) {
      setError(`Expected ${inputSize} input features`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await onTest(numericInputs);
      if (result) {
        setPrediction(result);
      } else {
        setError('Prediction failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Prediction failed');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle quick fill with sample data
   */
  const handleQuickFill = () => {
    const sampleData = Array(inputSize).fill(0).map(() => 
      (Math.random() * 10 - 5).toFixed(3)
    );
    setInputValues(sampleData);
    setError('');
  };

  /**
   * Handle clear inputs
   */
  const handleClear = () => {
    setInputValues(Array(inputSize).fill(''));
    setPrediction(null);
    setError('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 dark:text-teal-400" />
          Testing & Prediction
        </h2>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Input Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Test Input Values
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleQuickFill}
                  disabled={!isModelTrained}
                  className="text-xs px-2.5 py-1.5 h-8 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 touch-manipulation"
                >
                  <Sparkles className="h-3 w-3" />
                  Sample
                </button>
                <button
                  onClick={handleClear}
                  className="text-xs px-2.5 py-1.5 h-8 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all touch-manipulation"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {inputValues.map((value, idx) => (
                <div key={idx}>
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    Feature {idx + 1}
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    placeholder={`Value for feature ${idx + 1}`}
                    step="any"
                    disabled={!isModelTrained}
                    className="w-full h-11 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <button
              onClick={handlePredict}
              disabled={!isModelTrained || isLoading}
              className="w-full h-11 sm:h-12 py-3 px-4 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Predicting...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Run Prediction
                </>
              )}
            </button>
          </div>

          {/* Prediction Result */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
              Prediction Result
            </label>
            
            {prediction ? (
              <div className="h-full bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 rounded-lg border border-teal-200 dark:border-teal-800 p-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Predicted Class
                  </p>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 text-white text-3xl font-bold shadow-lg">
                    {prediction.predictedClass}
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3">
                    Confidence: {(prediction.confidence * 100).toFixed(2)}%
                  </p>
                </div>

                {/* Class Probabilities */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    All Class Probabilities:
                  </p>
                  {prediction.probabilities.map((prob, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Class {idx}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {(prob * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            idx === prediction.predictedClass
                              ? 'bg-gradient-to-r from-teal-600 to-cyan-600'
                              : 'bg-gray-400 dark:bg-gray-600'
                          }`}
                          style={{ width: `${prob * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] bg-gradient-to-br from-gray-50 to-teal-50/30 dark:from-gray-950 dark:to-teal-950/20 rounded-lg border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-700" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {isModelTrained ? 'Enter values and click predict' : 'Train a model first'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}

