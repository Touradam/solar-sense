'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Play, Pause, RotateCcw, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { TrainingMetrics, TrainingSummary, EvaluationMetrics } from '@/lib/types';

// Dynamically import the graph component with no SSR
const TrainingGraph = dynamic(() => import('./training-graph').then(mod => ({ default: mod.TrainingGraph })), {
  ssr: false,
  loading: () => <div className="h-80 flex items-center justify-center"><div className="text-gray-400">Loading chart...</div></div>
});

interface TrainingSectionProps {
  isTraining: boolean;
  trainingData: TrainingMetrics[];
  onTrain: () => void;
  onPause: () => void;
  onReset: () => void;
  summary?: TrainingSummary;
  testMetrics?: EvaluationMetrics;
}

export function TrainingSection({
  isTraining,
  trainingData,
  onTrain,
  onPause,
  onReset,
  summary,
  testMetrics,
}: TrainingSectionProps) {
  const hasData = trainingData.length > 0;
  
  // Debug logging
  useEffect(() => {
    console.log('TrainingSection render:', { 
      hasData, 
      dataLength: trainingData.length,
      isTraining,
      firstEpoch: trainingData[0]?.epoch,
      lastEpoch: trainingData[trainingData.length - 1]?.epoch 
    });
  }, [trainingData.length, isTraining]);

  // Format confusion matrix as heatmap data
  const getConfusionMatrixHeatmap = (matrix: number[][]) => {
    const max = Math.max(...matrix.flat());
    return matrix.map((row, i) => 
      row.map((val, j) => ({
        actual: i,
        predicted: j,
        value: val,
        intensity: max > 0 ? val / max : 0,
      }))
    ).flat();
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Training
          </h2>
          
          {isTraining && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Training...
              </span>
            </div>
          )}
          
          {summary?.earlyStopped && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs font-medium">Early Stopped</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={isTraining ? onPause : onTrain}
            disabled={isTraining && trainingData.length === 0}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
              isTraining
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isTraining ? (
              <>
                <Pause className="h-4 w-4" />
                Pause Training
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start Training
              </>
            )}
          </button>
          
          <button
            onClick={onReset}
            disabled={!hasData && !isTraining}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Training Graph */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Training Progress
          </h3>
          {trainingData.length > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {trainingData.length} epoch{trainingData.length !== 1 ? 's' : ''} completed
            </span>
          )}
        </div>

        {hasData ? (
          <TrainingGraph trainingData={trainingData} summary={summary} />
        ) : (
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-950 dark:to-purple-950/20 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Training graph will appear here
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Click "Start Training" to begin
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Training Metrics */}
      {hasData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-xl border border-red-200 dark:border-red-800">
            <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Training Loss</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {trainingData[trainingData.length - 1]?.loss?.toFixed(4) ?? '--'}
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">Validation Loss</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {trainingData[trainingData.length - 1]?.valLoss?.toFixed(4) ?? '--'}
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">Accuracy</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {trainingData[trainingData.length - 1]?.accuracy 
                ? `${(trainingData[trainingData.length - 1].accuracy! * 100).toFixed(1)}%`
                : '--'}
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">Epoch</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {trainingData[trainingData.length - 1]?.epoch ?? 0}/{summary?.totalEpochs ?? '?'}
            </p>
          </div>
        </div>
      )}

      {/* Training Summary */}
      {summary && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Training Summary
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Final Metrics */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Final Performance
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                  <span className="text-gray-600 dark:text-gray-400">Train Loss:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {summary.finalTrainLoss.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                  <span className="text-gray-600 dark:text-gray-400">Val Loss:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {summary.finalValLoss.toFixed(4)}
                  </span>
                </div>
                {summary.testLoss !== undefined && (
                  <div className="flex justify-between items-center p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800">
                    <span className="text-emerald-700 dark:text-emerald-300 font-medium">Test Loss:</span>
                    <span className="font-bold text-emerald-900 dark:text-emerald-100">
                      {summary.testLoss.toFixed(4)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                  <span className="text-gray-600 dark:text-gray-400">Train Accuracy:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(summary.finalTrainAccuracy * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                  <span className="text-gray-600 dark:text-gray-400">Val Accuracy:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(summary.finalValAccuracy * 100).toFixed(2)}%
                  </span>
                </div>
                {summary.testAccuracy !== undefined && (
                  <div className="flex justify-between items-center p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800">
                    <span className="text-emerald-700 dark:text-emerald-300 font-medium">Test Accuracy:</span>
                    <span className="font-bold text-emerald-900 dark:text-emerald-100">
                      {(summary.testAccuracy * 100).toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Training Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Training Info
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                  <span className="text-gray-600 dark:text-gray-400">Total Epochs:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {summary.totalEpochs}
                  </span>
                </div>
                {summary.bestEpoch && (
                  <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-950/20 rounded border border-purple-200 dark:border-purple-800">
                    <span className="text-purple-700 dark:text-purple-300">Best Epoch:</span>
                    <span className="font-semibold text-purple-900 dark:text-purple-100">
                      {summary.bestEpoch}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Training Time:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {summary.trainingTime.toFixed(1)}s
                  </span>
                </div>
                {summary.earlyStopped && (
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-800 text-center">
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                      ⚠️ Training stopped early
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Test Metrics */}
      {testMetrics && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Detailed Test Metrics
          </h3>

          {/* Per-Class Metrics */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Per-Class Performance
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Class</th>
                    <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">Precision</th>
                    <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">Recall</th>
                    <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">F1-Score</th>
                    {testMetrics.support && (
                      <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">Support</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {testMetrics.precision.map((_, idx) => (
                    <tr key={idx} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-3 font-medium text-gray-900 dark:text-white">
                        Class {idx}
                      </td>
                      <td className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">
                        {testMetrics.precision[idx].toFixed(3)}
                      </td>
                      <td className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">
                        {testMetrics.recall[idx].toFixed(3)}
                      </td>
                      <td className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">
                        {testMetrics.f1Score[idx].toFixed(3)}
                      </td>
                      {testMetrics.support && (
                        <td className="text-right py-2 px-3 text-gray-700 dark:text-gray-300">
                          {testMetrics.support[idx]}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Confusion Matrix */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Confusion Matrix
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                <thead>
                  <tr>
                    <th className="p-2 bg-gray-100 dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700"></th>
                    {testMetrics.confusionMatrix[0].map((_, idx) => (
                      <th
                        key={idx}
                        className="p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-center text-xs text-gray-600 dark:text-gray-400"
                      >
                        Pred {idx}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {testMetrics.confusionMatrix.map((row, i) => (
                    <tr key={i}>
                      <td className="p-2 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 font-medium">
                        Actual {i}
                      </td>
                      {row.map((val, j) => {
                        const max = Math.max(...testMetrics.confusionMatrix.flat());
                        const intensity = max > 0 ? val / max : 0;
                        const bgColor = i === j 
                          ? `rgba(16, 185, 129, ${0.2 + intensity * 0.6})` 
                          : `rgba(239, 68, 68, ${intensity * 0.4})`;
                        
                        return (
                          <td
                            key={j}
                            className="p-2 border border-gray-200 dark:border-gray-700 text-center font-semibold"
                            style={{ backgroundColor: bgColor }}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Green diagonal = correct predictions, Red = incorrect
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

