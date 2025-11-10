'use client';

import React, { useState, useEffect } from 'react';
import { Split, AlertCircle } from 'lucide-react';
import { SplitRatios } from '@/lib/types';

interface DataSplitSectionProps {
  splitRatios: SplitRatios;
  onSplitChange: (ratios: SplitRatios) => void;
  totalSamples: number;
}

export function DataSplitSection({
  splitRatios,
  onSplitChange,
  totalSamples,
}: DataSplitSectionProps) {
  const [localRatios, setLocalRatios] = useState(splitRatios);
  const [error, setError] = useState<string>('');

  // Sync with parent
  useEffect(() => {
    setLocalRatios(splitRatios);
  }, [splitRatios]);

  // Calculate sample counts
  const trainSamples = Math.floor(totalSamples * (localRatios.train / 100));
  const valSamples = Math.floor(totalSamples * (localRatios.validation / 100));
  const testSamples = Math.floor(totalSamples * (localRatios.test / 100));

  // Check if ratios sum to 100
  const ratiosSum = localRatios.train + localRatios.validation + localRatios.test;
  const isValid = Math.abs(ratiosSum - 100) < 0.1;

  /**
   * Handle train ratio change
   */
  const handleTrainChange = (value: number) => {
    const newTrain = Math.max(40, Math.min(80, value));
    
    // Auto-adjust validation and test to maintain 100%
    const remaining = 100 - newTrain;
    const valTestRatio = localRatios.validation / (localRatios.validation + localRatios.test);
    const newVal = Math.round(remaining * valTestRatio);
    const newTest = remaining - newVal;

    const newRatios = {
      train: newTrain,
      validation: newVal,
      test: newTest,
    };

    setLocalRatios(newRatios);
    onSplitChange(newRatios);
    setError('');
  };

  /**
   * Handle validation ratio change
   */
  const handleValidationChange = (value: number) => {
    const newVal = Math.max(10, Math.min(40, value));
    
    // Auto-adjust train and test to maintain 100%
    const remaining = 100 - newVal;
    const trainTestRatio = localRatios.train / (localRatios.train + localRatios.test);
    const newTrain = Math.round(remaining * trainTestRatio);
    const newTest = remaining - newTrain;

    const newRatios = {
      train: newTrain,
      validation: newVal,
      test: newTest,
    };

    setLocalRatios(newRatios);
    onSplitChange(newRatios);
    setError('');
  };

  /**
   * Handle test ratio change
   */
  const handleTestChange = (value: number) => {
    const newTest = Math.max(10, Math.min(40, value));
    
    // Auto-adjust train and validation to maintain 100%
    const remaining = 100 - newTest;
    const trainValRatio = localRatios.train / (localRatios.train + localRatios.validation);
    const newTrain = Math.round(remaining * trainValRatio);
    const newVal = remaining - newTrain;

    const newRatios = {
      train: newTrain,
      validation: newVal,
      test: newTest,
    };

    setLocalRatios(newRatios);
    onSplitChange(newRatios);
    setError('');
  };

  /**
   * Reset to default 60/20/20
   */
  const handleReset = () => {
    const defaultRatios: SplitRatios = {
      train: 60,
      validation: 20,
      test: 20,
    };
    setLocalRatios(defaultRatios);
    onSplitChange(defaultRatios);
    setError('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Split className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Data Split
        </h2>
        <button
          onClick={handleReset}
          className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          Reset to 60/20/20
        </button>
      </div>

      {/* Total Samples Badge */}
      {totalSamples > 0 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-sm font-medium text-center text-purple-800 dark:text-purple-200">
            Total Samples: <span className="text-lg font-bold">{totalSamples}</span>
          </p>
        </div>
      )}

      <div className="space-y-5">
        {/* Training Split */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Training Set
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {localRatios.train.toFixed(0)}%
              </span>
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({trainSamples} samples)
                </span>
              )}
            </div>
          </div>
          <input
            type="range"
            min="40"
            max="80"
            step="1"
            value={localRatios.train}
            onChange={(e) => handleTrainChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-emerald"
            style={{
              background: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${localRatios.train}%, rgb(229, 231, 235) ${localRatios.train}%, rgb(229, 231, 235) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>40%</span>
            <span>80%</span>
          </div>
        </div>

        {/* Validation Split */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Validation Set
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {localRatios.validation.toFixed(0)}%
              </span>
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({valSamples} samples)
                </span>
              )}
            </div>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={localRatios.validation}
            onChange={(e) => handleValidationChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-blue"
            style={{
              background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${(localRatios.validation - 10) * 100 / 30}%, rgb(229, 231, 235) ${(localRatios.validation - 10) * 100 / 30}%, rgb(229, 231, 235) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10%</span>
            <span>40%</span>
          </div>
        </div>

        {/* Test Split */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Test Set
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {localRatios.test.toFixed(0)}%
              </span>
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({testSamples} samples)
                </span>
              )}
            </div>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={localRatios.test}
            onChange={(e) => handleTestChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-purple"
            style={{
              background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(147, 51, 234) ${(localRatios.test - 10) * 100 / 30}%, rgb(229, 231, 235) ${(localRatios.test - 10) * 100 / 30}%, rgb(229, 231, 235) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>10%</span>
            <span>40%</span>
          </div>
        </div>
      </div>

      {/* Validation Warning */}
      {!isValid && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
              Split Ratios Warning
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              Ratios should sum to 100%. Current sum: {ratiosSum.toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {/* Summary Card */}
      <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-950 dark:to-purple-950/20 rounded-lg border border-gray-200 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
          Split Summary
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              Training
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {localRatios.train.toFixed(0)}%
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  ({trainSamples})
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Validation
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {localRatios.validation.toFixed(0)}%
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  ({valSamples})
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              Test
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {localRatios.test.toFixed(0)}%
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  ({testSamples})
                </span>
              )}
            </span>
          </div>
          <div className="pt-2 mt-2 border-t border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-700 dark:text-gray-300">Total</span>
              <span
                className={
                  isValid
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }
              >
                {ratiosSum.toFixed(1)}%
                {totalSamples > 0 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    ({trainSamples + valSamples + testSamples})
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong className="font-semibold">Tip:</strong> A common split is 60% training, 20% validation, and 20% testing. 
          Training data trains the model, validation helps tune hyperparameters and detect overfitting, 
          and test data provides final evaluation.
        </p>
      </div>
    </div>
  );
}

