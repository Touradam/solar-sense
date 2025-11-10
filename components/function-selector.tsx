'use client';

import React, { useState } from 'react';
import { Activity, TrendingUp, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ActivationFunction, LossFunction, OptimizerType } from '@/lib/types';
import { getActivationInfo, getLossInfo, getOptimizerInfo } from '@/lib/ml-utils';

interface FunctionSelectorProps {
  hiddenActivation: ActivationFunction;
  outputActivation: ActivationFunction;
  lossFunction: LossFunction;
  optimizer: OptimizerType;
  onHiddenActivationChange: (val: ActivationFunction) => void;
  onOutputActivationChange: (val: ActivationFunction) => void;
  onLossFunctionChange: (val: LossFunction) => void;
  onOptimizerChange: (val: OptimizerType) => void;
}

export function FunctionSelector({
  hiddenActivation,
  outputActivation,
  lossFunction,
  optimizer,
  onHiddenActivationChange,
  onOutputActivationChange,
  onLossFunctionChange,
  onOptimizerChange,
}: FunctionSelectorProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('activation');

  const hiddenActInfo = getActivationInfo(hiddenActivation);
  const outputActInfo = getActivationInfo(outputActivation);
  const lossInfo = getLossInfo(lossFunction);
  const optimizerInfo = getOptimizerInfo(optimizer);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-4">
      {/* ===== ACTIVATION FUNCTIONS ===== */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <button
          onClick={() => toggleSection('activation')}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activation Functions
            </h2>
          </div>
          {expandedSection === 'activation' ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {expandedSection === 'activation' && (
          <div className="p-6 pt-0 space-y-6">
            {/* Hidden Layers Activation */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Hidden Layers Activation
              </label>
              <select
                value={hiddenActivation}
                onChange={(e) => onHiddenActivationChange(e.target.value as ActivationFunction)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="relu">ReLU</option>
                <option value="sigmoid">Sigmoid</option>
                <option value="tanh">Tanh</option>
                <option value="linear">Linear</option>
              </select>

              <div className="mt-4 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {hiddenActInfo.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Formula:</strong> {hiddenActInfo.formula}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {hiddenActInfo.description}
                </p>

                {/* Graph */}
                {hiddenActInfo.graphPoints.length > 0 && (
                  <div className="h-40 bg-white dark:bg-gray-900 rounded-lg p-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hiddenActInfo.graphPoints}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="x" stroke="#6B7280" tick={{ fontSize: 10 }} />
                        <YAxis stroke="#6B7280" tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="y" stroke="#06b6d4" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Pros/Cons */}
                {(hiddenActInfo.pros || hiddenActInfo.cons) && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {hiddenActInfo.pros && (
                      <div>
                        <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">Pros:</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                          {hiddenActInfo.pros.slice(0, 2).map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {hiddenActInfo.cons && (
                      <div>
                        <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">Cons:</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                          {hiddenActInfo.cons.slice(0, 2).map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Output Layer Activation */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Output Layer Activation
              </label>
              <select
                value={outputActivation}
                onChange={(e) => onOutputActivationChange(e.target.value as ActivationFunction)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="softmax">Softmax (Multi-class)</option>
                <option value="sigmoid">Sigmoid (Binary)</option>
                <option value="linear">Linear (Regression)</option>
              </select>

              <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <p className="text-xs text-cyan-800 dark:text-cyan-200">
                  <strong>{outputActInfo.name}:</strong> {outputActInfo.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== LOSS FUNCTION ===== */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <button
          onClick={() => toggleSection('loss')}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Loss Function
            </h2>
          </div>
          {expandedSection === 'loss' ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {expandedSection === 'loss' && (
          <div className="p-6 pt-0">
            <select
              value={lossFunction}
              onChange={(e) => onLossFunctionChange(e.target.value as LossFunction)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="categoricalCrossentropy">Categorical Cross-Entropy</option>
              <option value="meanSquaredError">Mean Squared Error (MSE)</option>
              <option value="meanAbsoluteError">Mean Absolute Error (MAE)</option>
              <option value="hinge">Hinge Loss</option>
            </select>

            <div className="mt-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {lossInfo.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                <strong>Formula:</strong> {lossInfo.formula}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                {lossInfo.description}
              </p>

              {/* Graph for MSE/MAE */}
              {lossInfo.graphPoints.length > 0 && (
                <div className="h-40 bg-white dark:bg-gray-900 rounded-lg p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lossInfo.graphPoints}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="x" stroke="#6B7280" tick={{ fontSize: 10 }} />
                      <YAxis stroke="#6B7280" tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="y" stroke="#f97316" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Use Cases */}
              {lossInfo.useCases && lossInfo.useCases.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Best for:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {lossInfo.useCases.map((useCase, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===== OPTIMIZER ===== */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <button
          onClick={() => toggleSection('optimizer')}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Optimizer
            </h2>
          </div>
          {expandedSection === 'optimizer' ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {expandedSection === 'optimizer' && (
          <div className="p-6 pt-0">
            <select
              value={optimizer}
              onChange={(e) => onOptimizerChange(e.target.value as OptimizerType)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="adam">Adam (Recommended)</option>
              <option value="sgd">SGD (Stochastic Gradient Descent)</option>
              <option value="rmsprop">RMSprop</option>
              <option value="adadelta">Adadelta</option>
              <option value="adamax">Adamax</option>
            </select>

            <div className="mt-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {optimizerInfo.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                {optimizerInfo.description}
              </p>

              {/* Pros/Cons */}
              {(optimizerInfo.pros || optimizerInfo.cons) && (
                <div className="grid grid-cols-2 gap-3">
                  {optimizerInfo.pros && (
                    <div>
                      <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">
                        Pros:
                      </p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                        {optimizerInfo.pros.slice(0, 3).map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {optimizerInfo.cons && (
                    <div>
                      <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-1">
                        Cons:
                      </p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                        {optimizerInfo.cons.slice(0, 3).map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Use Cases */}
              {optimizerInfo.useCases && optimizerInfo.useCases.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Best for:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {optimizerInfo.useCases.map((useCase, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

