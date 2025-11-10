'use client';

import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { DataFormatConfig } from '@/lib/types';
import { generateSyntheticData, parseCSVData } from '@/lib/ml-utils';

interface DataInputSectionProps {
  onDataLoaded: (features: number[][], labels: number[][], info: {
    numSamples: number;
    numFeatures: number;
    numClasses: number;
  }) => void;
}

export function DataInputSection({ onDataLoaded }: DataInputSectionProps) {
  const [dataStatus, setDataStatus] = useState<'empty' | 'loading' | 'loaded' | 'error'>('empty');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [dataInfo, setDataInfo] = useState<{
    numSamples: number;
    numFeatures: number;
    numClasses: number;
  } | null>(null);
  const [previewData, setPreviewData] = useState<string[][] | null>(null);
  
  // Synthetic data options
  const [syntheticSamples, setSyntheticSamples] = useState(300);
  const [syntheticClasses, setSyntheticClasses] = useState(3);
  const [syntheticFeatures, setSyntheticFeatures] = useState(2);
  
  // CSV format configuration
  const [formatConfig, setFormatConfig] = useState<DataFormatConfig>({
    hasHeaders: true,
    labelColumn: 'last',
  });

  /**
   * Handle file drop/upload
   */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setDataStatus('loading');
    setErrorMessage('');

    // Parse CSV file
    Papa.parse(file, {
      complete: (results) => {
        try {
          const csvText = results.data
            .map((row: any) => (Array.isArray(row) ? row.join(',') : ''))
            .join('\n');
          
          processCSVData(csvText);
        } catch (error) {
          setDataStatus('error');
          setErrorMessage('Failed to parse CSV file. Please check the format.');
        }
      },
      error: (error) => {
        setDataStatus('error');
        setErrorMessage(`Error reading file: ${error.message}`);
      },
    });
  }, [formatConfig]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
      'application/vnd.ms-excel': ['.csv'],
    },
    maxFiles: 1,
    multiple: false,
  });

  /**
   * Process CSV data
   */
  const processCSVData = (csvText: string) => {
    try {
      const { features, labels } = parseCSVData(csvText, formatConfig);

      if (features.length === 0) {
        throw new Error('No valid data found in file');
      }

      const numSamples = features.length;
      const numFeatures = features[0].length;
      const numClasses = labels[0].length;

      // Store preview (first 5 rows)
      const preview: string[][] = [];
      const lines = csvText.trim().split('\n');
      const startRow = formatConfig.hasHeaders ? 0 : 1;
      for (let i = startRow; i < Math.min(startRow + 5, lines.length); i++) {
        preview.push(lines[i].split(','));
      }
      setPreviewData(preview);

      // Update state
      setDataInfo({ numSamples, numFeatures, numClasses });
      setDataStatus('loaded');

      // Notify parent
      onDataLoaded(features, labels, { numSamples, numFeatures, numClasses });
    } catch (error) {
      setDataStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  /**
   * Generate synthetic dataset
   */
  const handleGenerateSynthetic = () => {
    try {
      setDataStatus('loading');
      setErrorMessage('');

      const { features, labels } = generateSyntheticData(
        syntheticSamples,
        syntheticClasses,
        syntheticFeatures
      );

      const numSamples = features.length;
      const numFeatures = features[0].length;
      const numClasses = labels[0].length;

      // Create preview
      const preview: string[][] = [];
      preview.push(['Feature 1', 'Feature 2', '...', 'Label']);
      for (let i = 0; i < Math.min(5, features.length); i++) {
        const labelIndex = labels[i].indexOf(1);
        preview.push([
          features[i][0].toFixed(3),
          features[i][1].toFixed(3),
          numFeatures > 2 ? '...' : '',
          labelIndex.toString(),
        ]);
      }
      setPreviewData(preview);

      // Update state
      setDataInfo({ numSamples, numFeatures, numClasses });
      setDataStatus('loaded');

      // Notify parent
      onDataLoaded(features, labels, { numSamples, numFeatures, numClasses });
    } catch (error) {
      setDataStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate data');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        Data Input
      </h2>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragActive
            ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-400'
        } ${dataStatus === 'loading' ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload
          className={`h-12 w-12 mx-auto mb-3 transition-colors ${
            isDragActive
              ? 'text-emerald-500 dark:text-emerald-400'
              : 'text-gray-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400'
          }`}
        />
        {dataStatus === 'loading' ? (
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Processing...
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isDragActive ? 'Drop your file here' : 'Drop your CSV file here'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              or click to browse
            </p>
          </div>
        )}
      </div>

      {/* Format Configuration */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-3">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          CSV Format Options
        </p>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hasHeaders"
            checked={formatConfig.hasHeaders}
            onChange={(e) =>
              setFormatConfig({ ...formatConfig, hasHeaders: e.target.checked })
            }
            className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="hasHeaders" className="text-sm text-gray-700 dark:text-gray-300">
            First row contains headers
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Label Column Position
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setFormatConfig({ ...formatConfig, labelColumn: 'first' })}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                formatConfig.labelColumn === 'first'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              First
            </button>
            <button
              onClick={() => setFormatConfig({ ...formatConfig, labelColumn: 'last' })}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                formatConfig.labelColumn === 'last'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Last
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
            OR
          </span>
        </div>
      </div>

      {/* Synthetic Data Generation */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
              Samples
            </label>
            <input
              type="number"
              value={syntheticSamples}
              onChange={(e) => setSyntheticSamples(parseInt(e.target.value) || 300)}
              min="50"
              max="5000"
              step="50"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
              Classes
            </label>
            <input
              type="number"
              value={syntheticClasses}
              onChange={(e) => setSyntheticClasses(parseInt(e.target.value) || 3)}
              min="2"
              max="10"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
              Features
            </label>
            <input
              type="number"
              value={syntheticFeatures}
              onChange={(e) => setSyntheticFeatures(parseInt(e.target.value) || 2)}
              min="2"
              max="20"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateSynthetic}
          disabled={dataStatus === 'loading'}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Generate Sample Data
        </button>
      </div>

      {/* Error Message */}
      {dataStatus === 'error' && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">Error</p>
            <p className="text-xs text-red-700 dark:text-red-300 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Success Message with Data Info */}
      {dataStatus === 'loaded' && dataInfo && (
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <div className="flex items-start gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                Data Loaded Successfully
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                <div className="bg-white dark:bg-emerald-950/30 rounded px-2 py-1 text-center">
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {dataInfo.numSamples}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Samples</p>
                </div>
                <div className="bg-white dark:bg-emerald-950/30 rounded px-2 py-1 text-center">
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {dataInfo.numFeatures}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Features</p>
                </div>
                <div className="bg-white dark:bg-emerald-950/30 rounded px-2 py-1 text-center">
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {dataInfo.numClasses}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Classes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Preview */}
          {previewData && previewData.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  Data Preview (first {Math.min(5, previewData.length - 1)} rows)
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <table className="w-full text-xs">
                  <tbody>
                    {previewData.map((row, i) => (
                      <tr
                        key={i}
                        className={i === 0 && formatConfig.hasHeaders ? 'font-medium border-b border-gray-200 dark:border-gray-700' : ''}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="px-2 py-1 text-gray-700 dark:text-gray-300 whitespace-nowrap"
                          >
                            {cell.length > 15 ? cell.substring(0, 12) + '...' : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

