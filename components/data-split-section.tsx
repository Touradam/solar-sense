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
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Split className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Data Split
          </h2>
          {totalSamples > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Total: <span className="font-semibold text-purple-600 dark:text-purple-400">{totalSamples}</span> samples
            </p>
          )}
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/20"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Training Split */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              Training
            </label>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {localRatios.train.toFixed(0)}%
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 font-normal ml-1.5">
                  ({trainSamples})
                </span>
              )}
            </span>
          </div>
          <input
            type="range"
            min="40"
            max="80"
            step="1"
            value={localRatios.train}
            onChange={(e) => handleTrainChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(16, 185, 129) 0%, rgb(16, 185, 129) ${(localRatios.train - 40) * 100 / 40}%, rgb(229, 231, 235) ${(localRatios.train - 40) * 100 / 40}%, rgb(229, 231, 235) 100%)`,
            }}
          />
        </div>

        {/* Validation Split */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              Validation
            </label>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {localRatios.validation.toFixed(0)}%
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 font-normal ml-1.5">
                  ({valSamples})
                </span>
              )}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={localRatios.validation}
            onChange={(e) => handleValidationChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${(localRatios.validation - 10) * 100 / 30}%, rgb(229, 231, 235) ${(localRatios.validation - 10) * 100 / 30}%, rgb(229, 231, 235) 100%)`,
            }}
          />
        </div>

        {/* Test Split */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
              Test
            </label>
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {localRatios.test.toFixed(0)}%
              {totalSamples > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 font-normal ml-1.5">
                  ({testSamples})
                </span>
              )}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={localRatios.test}
            onChange={(e) => handleTestChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(147, 51, 234) ${(localRatios.test - 10) * 100 / 30}%, rgb(229, 231, 235) ${(localRatios.test - 10) * 100 / 30}%, rgb(229, 231, 235) 100%)`,
            }}
          />
        </div>
      </div>

      {/* Validation Warning or Summary */}
      {!isValid ? (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-300">
            <strong className="font-semibold">Warning:</strong> Ratios must sum to 100%. Current: {ratiosSum.toFixed(1)}%
          </p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <p className="text-xs text-emerald-700 dark:text-emerald-300 text-center">
            <strong className="font-semibold">✓ Split configured:</strong> {localRatios.train}% train / {localRatios.validation}% val / {localRatios.test}% test
            {totalSamples > 0 && ` (${trainSamples} / ${valSamples} / ${testSamples} samples)`}
          </p>
        </div>
      )}
    </div>
  );
}

