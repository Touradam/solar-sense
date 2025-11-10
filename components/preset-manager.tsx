'use client';

import React, { useState, useEffect } from 'react';
import { Star, Save, Trash2, Download, Upload, Check, X } from 'lucide-react';
import { NetworkConfig, PresetConfig } from '@/lib/types';
import { BUILT_IN_PRESETS } from '@/lib/presets';
import {
  loadCustomPresets,
  saveCustomPreset,
  deleteCustomPreset,
  exportPresets,
  importPresets,
  generatePresetId,
} from '@/lib/storage-utils';

interface PresetManagerProps {
  currentConfig: NetworkConfig;
  onLoadPreset: (config: NetworkConfig) => void;
}

export function PresetManager({ currentConfig, onLoadPreset }: PresetManagerProps) {
  const [customPresets, setCustomPresets] = useState<PresetConfig[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetDesc, setNewPresetDesc] = useState('');
  const [saveError, setSaveError] = useState('');

  // Load custom presets on mount
  useEffect(() => {
    const loaded = loadCustomPresets();
    setCustomPresets(loaded);
  }, []);

  /**
   * Handle loading a preset
   */
  const handleLoadPreset = (preset: PresetConfig) => {
    onLoadPreset(preset.config);
  };

  /**
   * Handle saving current config as preset
   */
  const handleSaveCurrentConfig = () => {
    setSaveError('');
    
    if (!newPresetName.trim()) {
      setSaveError('Please enter a preset name');
      return;
    }

    const newPreset: PresetConfig = {
      id: generatePresetId(newPresetName),
      name: newPresetName.trim(),
      description: newPresetDesc.trim() || 'Custom configuration',
      config: { ...currentConfig },
      isCustom: true,
      category: 'custom',
      createdAt: new Date().toISOString(),
    };

    const success = saveCustomPreset(newPreset);
    
    if (success) {
      setCustomPresets(loadCustomPresets());
      setShowSaveDialog(false);
      setNewPresetName('');
      setNewPresetDesc('');
    } else {
      setSaveError('Failed to save preset');
    }
  };

  /**
   * Handle deleting a custom preset
   */
  const handleDeletePreset = (id: string) => {
    if (confirm('Are you sure you want to delete this preset?')) {
      const success = deleteCustomPreset(id);
      if (success) {
        setCustomPresets(loadCustomPresets());
      }
    }
  };

  /**
   * Handle exporting presets
   */
  const handleExport = () => {
    const json = exportPresets();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neural-network-presets-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Handle importing presets
   */
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = importPresets(content);
      if (success) {
        setCustomPresets(loadCustomPresets());
        alert('Presets imported successfully!');
      } else {
        alert('Failed to import presets. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
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

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          Configuration Presets
        </h2>
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all">
              <Upload className="h-3.5 w-3.5" />
              Import
            </div>
          </label>
          {customPresets.length > 0 && (
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Built-in Presets */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Built-in Presets
        </h3>
        {BUILT_IN_PRESETS.map((preset) => {
          const features = getEnabledFeatures(preset.config);
          return (
            <div
              key={preset.id}
              className="group p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all cursor-pointer"
              onClick={() => handleLoadPreset(preset)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {preset.name}
                    </h4>
                    {preset.id === 'standard' && (
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    )}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryBadge(
                        preset.category
                      )}`}
                    >
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {preset.description}
                  </p>
                </div>
              </div>
              
              {/* Config Summary */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>
                  {preset.config.hiddenLayers.length} layer
                  {preset.config.hiddenLayers.length !== 1 ? 's' : ''}
                </span>
                <span>•</span>
                <span>{preset.config.epochs} epochs</span>
                <span>•</span>
                <span>LR: {preset.config.learningRate}</span>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Custom Presets */}
      {customPresets.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Custom Presets
          </h3>
          {customPresets.map((preset) => {
            const features = getEnabledFeatures(preset.config);
            return (
              <div
                key={preset.id}
                className="group p-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-400 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleLoadPreset(preset)}
                  >
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {preset.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {preset.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePreset(preset.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Config Summary */}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>
                    {preset.config.hiddenLayers.length} layer
                    {preset.config.hiddenLayers.length !== 1 ? 's' : ''}
                  </span>
                  <span>•</span>
                  <span>{preset.config.epochs} epochs</span>
                  {preset.createdAt && (
                    <>
                      <span>•</span>
                      <span>
                        {new Date(preset.createdAt).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>

                {/* Features */}
                {features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Save Current Config Button */}
      {!showSaveDialog && (
        <button
          onClick={() => setShowSaveDialog(true)}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Current Configuration
        </button>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-800 space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
            Save as New Preset
          </h4>
          
          <input
            type="text"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            placeholder="Preset name"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          
          <textarea
            value={newPresetDesc}
            onChange={(e) => setNewPresetDesc(e.target.value)}
            placeholder="Description (optional)"
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />

          {saveError && (
            <p className="text-xs text-red-600 dark:text-red-400">{saveError}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleSaveCurrentConfig}
              className="flex-1 py-2 px-3 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-all flex items-center justify-center gap-1"
            >
              <Check className="h-4 w-4" />
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setNewPresetName('');
                setNewPresetDesc('');
                setSaveError('');
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-1"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

