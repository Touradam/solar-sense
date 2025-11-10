'use client';

import React, { useState } from 'react';
import { Brain, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { DataInputSection } from '@/components/data-input-section';
import { DataSplitSection } from '@/components/data-split-section';
import { SplitRatios } from '@/lib/types';

export default function TestPage() {
  const [features, setFeatures] = useState<number[][]>([]);
  const [labels, setLabels] = useState<number[][]>([]);
  const [dataInfo, setDataInfo] = useState<{
    numSamples: number;
    numFeatures: number;
    numClasses: number;
  } | null>(null);

  const [splitRatios, setSplitRatios] = useState<SplitRatios>({
    train: 60,
    validation: 20,
    test: 20,
  });

  const handleDataLoaded = (
    newFeatures: number[][],
    newLabels: number[][],
    info: { numSamples: number; numFeatures: number; numClasses: number }
  ) => {
    setFeatures(newFeatures);
    setLabels(newLabels);
    setDataInfo(info);
    console.log('✅ Data loaded:', info);
    console.log('Features sample:', newFeatures.slice(0, 3));
    console.log('Labels sample:', newLabels.slice(0, 3));
  };

  const handleSplitChange = (ratios: SplitRatios) => {
    setSplitRatios(ratios);
    console.log('✅ Split ratios updated:', ratios);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-950 dark:via-emerald-950/10 dark:to-teal-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Component Testing
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Phase 1-4 Complete
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-950/30 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Main UI
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Status Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">🎉 Testing Components</h2>
          <p className="text-emerald-50 mb-4">
            Testing Phases 1-4: Data Input & Data Split components with full functionality
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-xs text-emerald-100 mb-1">Phase 1</p>
              <p className="text-sm font-semibold">Types ✅</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-xs text-emerald-100 mb-1">Phase 2</p>
              <p className="text-sm font-semibold">ML Utils ✅</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-xs text-emerald-100 mb-1">Phase 3</p>
              <p className="text-sm font-semibold">Data Input ✅</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-xs text-emerald-100 mb-1">Phase 4</p>
              <p className="text-sm font-semibold">Data Split ✅</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Data Input */}
          <div>
            <DataInputSection onDataLoaded={handleDataLoaded} />
          </div>

          {/* Right Column - Data Split */}
          <div>
            <DataSplitSection
              splitRatios={splitRatios}
              onSplitChange={handleSplitChange}
              totalSamples={dataInfo?.numSamples || 0}
            />
          </div>
        </div>

        {/* Data Preview Section */}
        {dataInfo && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📊 Loaded Data Summary
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                  Total Samples
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {dataInfo.numSamples}
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                  Features
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {dataInfo.numFeatures}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">
                  Classes
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {dataInfo.numClasses}
                </p>
              </div>
            </div>

            {/* Split Breakdown */}
            <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 dark:from-gray-950 dark:to-emerald-950/20 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Data Split Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    Training Set
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {Math.floor(dataInfo.numSamples * (splitRatios.train / 100))} samples (
                    {splitRatios.train}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Validation Set
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {Math.floor(dataInfo.numSamples * (splitRatios.validation / 100))} samples (
                    {splitRatios.validation}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    Test Set
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {Math.floor(dataInfo.numSamples * (splitRatios.test / 100))} samples (
                    {splitRatios.test}%)
                  </span>
                </div>
              </div>
            </div>

            {/* First Few Samples */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Sample Data (First 5 rows)
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                        #
                      </th>
                      {Array.from({ length: Math.min(5, dataInfo.numFeatures) }).map((_, i) => (
                        <th
                          key={i}
                          className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                          Feature {i + 1}
                        </th>
                      ))}
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                        Label
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.slice(0, 5).map((row, i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-800">
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-300 font-medium">
                          {i + 1}
                        </td>
                        {row.slice(0, 5).map((val, j) => (
                          <td key={j} className="px-3 py-2 text-gray-700 dark:text-gray-300">
                            {val.toFixed(3)}
                          </td>
                        ))}
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                          Class {labels[i].indexOf(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            📝 Testing Instructions
          </h3>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <p>
              <strong>1. Test Data Input:</strong> Try both options:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Upload a CSV file (drag & drop or click to browse)</li>
              <li>Generate synthetic data (adjust samples, classes, features)</li>
            </ul>
            <p className="mt-3">
              <strong>2. Test Data Split:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Move the sliders to adjust train/validation/test ratios</li>
              <li>Watch how the other sliders auto-adjust to maintain 100%</li>
              <li>See real-time sample counts update below</li>
            </ul>
            <p className="mt-3">
              <strong>3. Check Console:</strong> Open browser DevTools to see logged data
            </p>
            <p className="mt-3 bg-blue-100 dark:bg-blue-900/30 rounded p-2">
              <strong>💡 Tip:</strong> Try generating 300 samples with 3 classes and 2 features, then adjust
              the split to 70/15/15 to see everything in action!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

