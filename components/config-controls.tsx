'use client';

import React, { useState } from 'react';
import { Settings, Info, AlertTriangle } from 'lucide-react';
import { NetworkConfig, ActivationFunction, LossFunction, OptimizerType } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ConfigControlsProps {
  config: NetworkConfig;
  onConfigChange: (updates: Partial<NetworkConfig>) => void;
}

export function ConfigControls({ config, onConfigChange }: ConfigControlsProps) {
  const [activeTab, setActiveTab] = useState('architecture');

  /**
   * Number input with +/- buttons
   */
  const NumberInput = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    tooltip,
  }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
    min: number;
    max: number;
    step?: number;
    tooltip?: string;
  }) => (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) onChange(Math.max(min, Math.min(max, val)));
          }}
          min={min}
          max={max}
          step={step}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-center font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Settings className="h-5 w-5 text-teal-600 dark:text-teal-400" />
        Network Configuration
      </h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="architecture" className="text-xs px-2">
            <span className="hidden sm:inline">Architecture</span>
            <span className="sm:hidden">Arch</span>
          </TabsTrigger>
          <TabsTrigger value="preprocessing" className="text-xs px-2">
            <span className="hidden sm:inline">Preprocessing</span>
            <span className="sm:hidden">Prep</span>
          </TabsTrigger>
          <TabsTrigger value="regularization" className="text-xs px-2">
            <span className="hidden sm:inline">Regularization</span>
            <span className="sm:hidden">Reg</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="text-xs px-2">Training</TabsTrigger>
        </TabsList>

        {/* ===== TAB 1: ARCHITECTURE ===== */}
        <TabsContent value="architecture" className="space-y-4">
          {/* Hidden Layers */}
          <NumberInput
            label="Hidden Layers"
            value={config.hiddenLayers.length}
            onChange={(val) => {
              const newLayers = Array(val).fill(64);
              // Preserve existing layer sizes
              for (let i = 0; i < Math.min(val, config.hiddenLayers.length); i++) {
                newLayers[i] = config.hiddenLayers[i];
              }
              onConfigChange({ hiddenLayers: newLayers });
            }}
            min={1}
            max={10}
            tooltip="Number of hidden layers in the network. More layers = deeper network."
          />

          {/* Neurons per layer */}
          {config.hiddenLayers.map((neurons, idx) => (
            <NumberInput
              key={idx}
              label={`Layer ${idx + 1} Neurons`}
              value={neurons}
              onChange={(val) => {
                const newLayers = [...config.hiddenLayers];
                newLayers[idx] = val;
                onConfigChange({ hiddenLayers: newLayers });
              }}
              min={4}
              max={512}
              step={4}
              tooltip={`Number of neurons in hidden layer ${idx + 1}`}
            />
          ))}

          {/* Epochs */}
          <NumberInput
            label="Epochs"
            value={config.epochs}
            onChange={(val) => onConfigChange({ epochs: val })}
            min={10}
            max={500}
            step={10}
            tooltip="Number of complete passes through the training dataset"
          />

          {/* Batch Size */}
          <NumberInput
            label="Batch Size"
            value={config.batchSize}
            onChange={(val) => onConfigChange({ batchSize: val })}
            min={4}
            max={256}
            step={4}
            tooltip="Number of samples processed before updating weights"
          />

          {/* Learning Rate */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Learning Rate
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Controls how much to adjust weights. Typical: 0.001-0.01
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input
              type="number"
              value={config.learningRate}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && val > 0) {
                  onConfigChange({ learningRate: val });
                }
              }}
              min={0.0001}
              max={1}
              step={0.001}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Random Seed */}
          <NumberInput
            label="Random Seed"
            value={config.randomSeed}
            onChange={(val) => onConfigChange({ randomSeed: val })}
            min={0}
            max={9999}
            tooltip="Seed for reproducible results. Same seed = same results."
          />
        </TabsContent>

        {/* ===== TAB 2: DATA PREPROCESSING ===== */}
        <TabsContent value="preprocessing" className="space-y-4">
          {/* Normalization Method */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Normalization Method
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      MinMax: scales to [0,1]. Standardization: mean=0, std=1. Robust: uses median/IQR.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <select
              value={config.normalization}
              onChange={(e) =>
                onConfigChange({ normalization: e.target.value as any })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="none">None</option>
              <option value="minmax">MinMax (0-1)</option>
              <option value="standardization">Standardization (Z-score)</option>
              <option value="robust">Robust (Median/IQR)</option>
            </select>
            {config.normalization === 'none' && (
              <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/20 rounded border border-amber-200 dark:border-amber-800 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Warning: Training without normalization may lead to poor performance
                </p>
              </div>
            )}
          </div>

          {/* Feature Scaling */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Feature Scaling
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Ensure all features have similar scales
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input
              type="checkbox"
              checked={config.featureScaling}
              onChange={(e) => onConfigChange({ featureScaling: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
          </div>

          {/* Handle Class Imbalance */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Handle Class Imbalance
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Automatically weight classes for imbalanced datasets (e.g., 90/10 split)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input
              type="checkbox"
              checked={config.handleImbalance}
              onChange={(e) => onConfigChange({ handleImbalance: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
          </div>
        </TabsContent>

        {/* ===== TAB 3: REGULARIZATION ===== */}
        <TabsContent value="regularization" className="space-y-4">
          {/* Dropout */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Dropout
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Randomly drops neurons during training to prevent overfitting
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <input
                type="checkbox"
                checked={config.useDropout}
                onChange={(e) => onConfigChange({ useDropout: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
            </div>
            {config.useDropout && (
              <div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Dropout Rate</span>
                  <span className="font-semibold">{config.dropoutRate.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={0.5}
                  step={0.05}
                  value={config.dropoutRate}
                  onChange={(e) =>
                    onConfigChange({ dropoutRate: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Recommended: 0.2-0.3
                </p>
              </div>
            )}
          </div>

          {/* Weight Regularization */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Weight Regularization
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Penalizes large weights. L2 most common. L1 for feature selection.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <select
              value={config.regularization}
              onChange={(e) => onConfigChange({ regularization: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-2"
            >
              <option value="none">None</option>
              <option value="l1">L1 (Lasso)</option>
              <option value="l2">L2 (Ridge)</option>
              <option value="l1_l2">L1 + L2 (Elastic Net)</option>
            </select>
            {config.regularization !== 'none' && (
              <input
                type="number"
                value={config.regularizationRate}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    onConfigChange({ regularizationRate: val });
                  }
                }}
                min={0.0001}
                max={0.1}
                step={0.0001}
                placeholder="Regularization rate"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            )}
          </div>

          {/* Batch Normalization */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Batch Normalization
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Normalizes layer outputs. Speeds up training and improves stability.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input
              type="checkbox"
              checked={config.useBatchNormalization}
              onChange={(e) =>
                onConfigChange({ useBatchNormalization: e.target.checked })
              }
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
          </div>

          {/* Weight Initialization */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Weight Initialization
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      HeNormal: best for ReLU. GlorotUniform: best for Tanh/Sigmoid.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <select
              value={config.weightInit}
              onChange={(e) => onConfigChange({ weightInit: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="glorotUniform">Glorot Uniform (Xavier)</option>
              <option value="heNormal">He Normal (Kaiming)</option>
              <option value="heUniform">He Uniform</option>
              <option value="leCunNormal">LeCun Normal</option>
            </select>
          </div>

          {/* Gradient Clipping */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Gradient Clipping
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Prevents exploding gradients by capping gradient values
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <input
                type="checkbox"
                checked={config.clipGradients}
                onChange={(e) => onConfigChange({ clipGradients: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            {config.clipGradients && (
              <div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Clip Value</span>
                  <span className="font-semibold">{config.clipValue.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={5}
                  step={0.5}
                  value={config.clipValue}
                  onChange={(e) =>
                    onConfigChange({ clipValue: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </TabsContent>

        {/* ===== TAB 4: TRAINING CONTROL ===== */}
        <TabsContent value="training" className="space-y-4">
          {/* Early Stopping */}
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Early Stopping
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Stops training when validation loss stops improving
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <input
                type="checkbox"
                checked={config.useEarlyStopping}
                onChange={(e) => onConfigChange({ useEarlyStopping: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>
            {config.useEarlyStopping && (
              <div className="space-y-3">
                <NumberInput
                  label="Patience (epochs)"
                  value={config.patience}
                  onChange={(val) => onConfigChange({ patience: val })}
                  min={3}
                  max={30}
                  tooltip="Wait this many epochs without improvement before stopping"
                />
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    Min Delta
                  </label>
                  <input
                    type="number"
                    value={config.minDelta}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val >= 0) {
                        onConfigChange({ minDelta: val });
                      }
                    }}
                    min={0.0001}
                    max={0.01}
                    step={0.0001}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Learning Rate Decay */}
          <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Learning Rate Decay
                </label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Gradually reduce learning rate during training for better convergence
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <input
                type="checkbox"
                checked={config.learningRateDecay}
                onChange={(e) =>
                  onConfigChange({ learningRateDecay: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
            </div>
            {config.learningRateDecay && (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Decay Rate</span>
                    <span className="font-semibold">{config.decayRate.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.85}
                    max={0.99}
                    step={0.01}
                    value={config.decayRate}
                    onChange={(e) =>
                      onConfigChange({ decayRate: parseFloat(e.target.value) })
                    }
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <NumberInput
                  label="Decay Steps"
                  value={config.decaySteps}
                  onChange={(val) => onConfigChange({ decaySteps: val })}
                  min={10}
                  max={1000}
                  step={10}
                  tooltip="Apply decay every N steps"
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

