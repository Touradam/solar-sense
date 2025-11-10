/**
 * Local Storage Utilities for Preset Management
 * 
 * Handles saving, loading, and managing custom user presets
 */

import { PresetConfig } from './types';

const STORAGE_KEY = 'neural-network-builder-presets';

/**
 * Load all custom presets from localStorage
 */
export function loadCustomPresets(): PresetConfig[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const presets = JSON.parse(stored) as PresetConfig[];
    return presets.filter(p => p.isCustom);
  } catch (error) {
    console.error('Failed to load custom presets:', error);
    return [];
  }
}

/**
 * Save a custom preset to localStorage
 */
export function saveCustomPreset(preset: PresetConfig): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const existing = loadCustomPresets();
    
    // Check if preset with this ID already exists
    const index = existing.findIndex(p => p.id === preset.id);
    
    if (index >= 0) {
      // Update existing
      existing[index] = { ...preset, isCustom: true };
    } else {
      // Add new
      existing.push({ ...preset, isCustom: true });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return true;
  } catch (error) {
    console.error('Failed to save custom preset:', error);
    return false;
  }
}

/**
 * Delete a custom preset by ID
 */
export function deleteCustomPreset(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const existing = loadCustomPresets();
    const filtered = existing.filter(p => p.id !== id);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete custom preset:', error);
    return false;
  }
}

/**
 * Export all custom presets as JSON
 */
export function exportPresets(): string {
  const presets = loadCustomPresets();
  return JSON.stringify(presets, null, 2);
}

/**
 * Import presets from JSON
 */
export function importPresets(jsonString: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const imported = JSON.parse(jsonString) as PresetConfig[];
    
    // Validate structure
    if (!Array.isArray(imported)) {
      throw new Error('Invalid preset format');
    }
    
    const existing = loadCustomPresets();
    
    // Merge imported with existing (avoid duplicates by ID)
    const merged = [...existing];
    for (const preset of imported) {
      const index = merged.findIndex(p => p.id === preset.id);
      if (index >= 0) {
        merged[index] = { ...preset, isCustom: true };
      } else {
        merged.push({ ...preset, isCustom: true });
      }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return true;
  } catch (error) {
    console.error('Failed to import presets:', error);
    return false;
  }
}

/**
 * Generate a unique ID for a new preset
 */
export function generatePresetId(name: string): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `custom-${safeName}-${timestamp}-${randomSuffix}`;
}

