'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Star, Sparkles, Check } from 'lucide-react';
import { NetworkConfig, PresetConfig } from '@/lib/types';
import { BUILT_IN_PRESETS } from '@/lib/presets';
import { loadCustomPresets } from '@/lib/storage-utils';
import { ConfigControls } from './config-controls';

interface NetworkConfigSelectorProps {
  currentConfig: NetworkConfig;
  onConfigChange: (updates: Partial<NetworkConfig>) => void;
  onLoadPreset: (config: NetworkConfig) => void;
}

export function NetworkConfigSelector({ 
  currentConfig, 
  onConfigChange,
  onLoadPreset 
}: NetworkConfigSelectorProps) {
  const [mode, setMode] = useState<'preset' | 'custom'>('preset');
  const [customPresets, setCustomPresets] = useState<PresetConfig[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('standard');

  // Load custom presets on mount
  useEffect(() => {
    const loaded = loadCustomPresets();
    setCustomPresets(loaded);
  }, []);

  // Get all presets (built-in + custom)
  const allPresets = [...BUILT_IN_PRESETS, ...customPresets];

  /**
   * Handle preset selection
   */
  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = allPresets.find((p) => p.id === presetId);
    if (preset) {
      onLoadPreset(preset.config);
    }
  };

  /**
   * Get badge color for category
   */
  const getCategoryBadge = (category?: string) => {
    switch (category) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'standard':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'custom':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  /**
   * Get features enabled in a config
   */
  const getEnabledFeatures = (config: NetworkConfig): string[] => {
    const features: string[] = [];
    if (config.normalization !== 'none') features.push('Normalization');
    if (config.useDropout) features.push('Dropout');
    if (config.regularization !== 'none') features.push(config.regularization.toUpperCase());
    if (config.useBatchNormalization) features.push('BatchNorm');
    if (config.useEarlyStopping) features.push('EarlyStopping');
    if (config.learningRateDecay) features.push('LR Decay');
    if (config.handleImbalance) features.push('Class Weights');
    if (config.clipGradients) features.push('Grad Clip');
    return features;
  };

  // If custom mode, just render ConfigControls directly (it has its own card wrapper)
  if (mode === 'custom') {
    return (
      <div className="space-y-4">
        {/* Mode Toggle */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setMode('preset')}
              className="h-11 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white touch-manipulation"
            >
              <Star className="h-4 w-4 flex-shrink-0" />
              <span className="hidden xs:inline">Use </span>Preset
            </button>
            <button
              onClick={() => setMode('custom')}
              className="h-11 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2 bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-md touch-manipulation"
            >
              <Sparkles className="h-4 w-4 flex-shrink-0" />
              Customize
            </button>
          </div>
        </div>
        <ConfigControls config={currentConfig} onConfigChange={onConfigChange} />
      </div>
    );
  }

  // Otherwise, render preset selection UI
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 dark:text-teal-400" />
          Network Configuration
        </h2>
      </div>

      {/* Mode Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 sm:mb-6">
        <button
          onClick={() => setMode('preset')}
          className="h-11 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2 bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-md touch-manipulation"
        >
          <Star className="h-4 w-4 flex-shrink-0" />
          <span className="hidden xs:inline">Use </span>Preset
        </button>
        <button
          onClick={() => setMode('custom')}
          className="h-11 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white touch-manipulation"
        >
          <Sparkles className="h-4 w-4 flex-shrink-0" />
          Customize
        </button>
      </div>

      {/* Preset Selection UI */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Choose a configuration preset
          </label>
          
          <div className="space-y-3">
            {BUILT_IN_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              const features = getEnabledFeatures(preset.config);
              
              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset.id)}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all touch-manipulation ${
                    isSelected
                      ? 'border-emerald-500 dark:border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 bg-white dark:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                        {preset.name}
                      </h3>
                      {preset.id === 'standard' && (
                        <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                      )}
                      <span
                        className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${getCategoryBadge(
                          preset.category
                        )}`}
                      >
                        {preset.category}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                    {preset.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs mb-2">
                    <div className="flex justify-between p-1.5 sm:p-2 bg-white/50 dark:bg-gray-900/30 rounded">
                      <span className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs">Layers:</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-[10px] sm:text-xs">
                        {preset.config.hiddenLayers.length}
                      </span>
                    </div>
                    <div className="flex justify-between p-1.5 sm:p-2 bg-white/50 dark:bg-gray-900/30 rounded">
                      <span className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs">Epochs:</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-[10px] sm:text-xs">
                        {preset.config.epochs}
                      </span>
                    </div>
                  </div>

                  {features.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                      {features.length > 4 && (
                        <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          +{features.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {customPresets.length > 0 && (
            <div className="mt-4">
              <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                Your Custom Presets
              </p>
              <select
                value={selectedPresetId}
                onChange={(e) => handlePresetSelect(e.target.value)}
                className="w-full h-11 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent touch-manipulation"
              >
                {customPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
