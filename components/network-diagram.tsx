'use client';

import React from 'react';
import Image from 'next/image';
import { Network } from 'lucide-react';

interface NetworkDiagramProps {
  inputNodes: number;
  hiddenLayers: number[];
  outputNodes: number;
}

export function NetworkDiagram({
  inputNodes,
  hiddenLayers,
  outputNodes,
}: NetworkDiagramProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Network className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Neural Network Architecture
        </h2>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
            {inputNodes} → {hiddenLayers.join(' → ')} → {outputNodes}
          </span>
        </div>
      </div>

      {/* Diagram Container */}
      <div className="relative w-full">
        <Image
          src="/neural-network-diagram.png"
          alt="Neural Network Flow Diagram"
          width={1200}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Input Layer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Hidden Layers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>Output Layer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Loss Function</span>
          </div>
        </div>
      </div>

      {/* Architecture Summary */}
      <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-emerald-50/30 dark:from-gray-950 dark:to-emerald-950/20 rounded-lg border border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Current Architecture
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Input Features:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{inputNodes}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Hidden Layers:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {hiddenLayers.length} layer{hiddenLayers.length !== 1 ? 's' : ''}
            </span>
          </div>
          {hiddenLayers.map((neurons, idx) => (
            <div key={idx} className="flex justify-between items-center pl-4">
              <span className="text-gray-500 dark:text-gray-500 text-xs">
                Layer {idx + 1}:
              </span>
              <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">
                {neurons} neurons
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">Output Classes:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{outputNodes}</span>
          </div>
          <div className="pt-2 mt-2 border-t border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Layers:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {hiddenLayers.length + 2}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <strong className="font-semibold">Flow:</strong> Data flows from Input → Dense Layers → 
          Activation → Prediction. Loss is calculated and backpropagated to update weights during training.
        </p>
      </div>
    </div>
  );
}

