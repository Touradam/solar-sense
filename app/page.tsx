'use client';

import Image from 'next/image';
import { Brain, Upload, Play, Download, Settings, Info, Zap, TrendingUp } from 'lucide-react';

export default function NeuralNetworkBuilder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-950 dark:via-emerald-950/10 dark:to-teal-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Neural Network Builder
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-950/30 transition-all">
                <Info className="h-4 w-4" />
                Guide
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-950/30 transition-all">
                <Settings className="h-4 w-4" />
                Presets
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Top Section: Network Diagram */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Neural Network Architecture
            </h2>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
              Ready to Configure
            </span>
          </div>
          
          {/* Network Diagram */}
          <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 dark:from-gray-950 dark:to-emerald-950/20 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
            <Image
              src="/neural-network-diagram.png"
              alt="Neural Network Architecture Visualization"
              width={1200}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        {/* Main Grid: Left Controls + Right Content */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar: Data Input & Configuration */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Data Input Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Data Input
              </h2>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-emerald-500 dark:hover:border-emerald-400 transition-all cursor-pointer group">
                <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Drop your CSV file here
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  or click to browse
                </p>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">OR</span>
                </div>
              </div>

              <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg">
                Generate Sample Data
              </button>

              {/* Data Preview */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Data Preview</p>
                <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                  <p>No data loaded yet</p>
                  <p className="text-[10px]">Upload a dataset to see preview</p>
                </div>
              </div>
            </section>

            {/* Data Split Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Data Split
              </h2>
              
              <div className="space-y-4">
                {/* Train Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Training</label>
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">60%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="60"
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                {/* Validation Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Validation</label>
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">20%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="20"
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Test Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Testing</label>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">20%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="20"
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>
            </section>

            {/* Configuration Controls */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Network Configuration
              </h2>
              
              <div className="space-y-4">
                {/* Hidden Layers */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Hidden Layers
                  </label>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all">
                      -
                    </button>
                    <input 
                      type="number" 
                      defaultValue="2" 
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-center font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all">
                      +
                    </button>
                  </div>
                </div>

                {/* Neurons per Layer */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Neurons per Layer
                  </label>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all">
                      -
                    </button>
                    <input 
                      type="number" 
                      defaultValue="64" 
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-center font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all">
                      +
                    </button>
                  </div>
                </div>

                {/* Activation Function */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Activation Function
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>ReLU</option>
                    <option>Sigmoid</option>
                    <option>Tanh</option>
                    <option>Softmax</option>
                  </select>
                </div>

                {/* Loss Function */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Loss Function
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>Categorical Cross-Entropy</option>
                    <option>Mean Squared Error</option>
                    <option>Mean Absolute Error</option>
                    <option>Hinge Loss</option>
                  </select>
                </div>

                {/* Optimizer */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Optimizer
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>Adam</option>
                    <option>SGD</option>
                    <option>RMSprop</option>
                    <option>Adadelta</option>
                  </select>
                </div>

                {/* Epochs */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Epochs
                  </label>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all">
                      -
                    </button>
                    <input 
                      type="number" 
                      defaultValue="100" 
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-center font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all">
                      +
                    </button>
                  </div>
                </div>

                {/* Learning Rate */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Learning Rate
                  </label>
                  <input 
                    type="number" 
                    defaultValue="0.001" 
                    step="0.001"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>
          </aside>

          {/* Right Content: Training & Testing */}
          <main className="lg:col-span-8 space-y-6">
            {/* Training Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Training
                </h2>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  <Play className="h-4 w-4" />
                  Start Training
                </button>
              </div>

              {/* Training Graph Placeholder */}
              <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-950 dark:to-purple-950/20 rounded-xl p-8 border border-gray-200 dark:border-gray-800 min-h-[300px] flex items-center justify-center">
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

              {/* Training Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">Training Loss</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">--</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">Validation Loss</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">--</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">--</p>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">Epoch</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0/100</p>
                </div>
              </div>
            </section>

            {/* Testing Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                Testing & Prediction
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Test Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
                    Test Input Values
                  </label>
                  <textarea 
                    placeholder="Enter comma-separated values&#10;Example: 5.1, 3.5, 1.4, 0.2"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                  <button className="w-full mt-3 py-3 px-4 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold hover:from-teal-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg">
                    Predict
                  </button>
                </div>

                {/* Prediction Result */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
                    Prediction Result
                  </label>
                  <div className="h-[calc(100%-3rem)] bg-gradient-to-br from-gray-50 to-teal-50/30 dark:from-gray-950 dark:to-teal-950/20 rounded-lg border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No prediction yet
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Train a model first
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Model */}
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      Export Trained Model
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Download your model for deployment
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-gray-800 border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </section>

            {/* Model Summary */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Model Summary
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <p>Model: Sequential</p>
                  <p>Total Layers: 4</p>
                  <p>Total Parameters: --</p>
                  <p>Trainable Parameters: --</p>
                  <p className="pt-2 text-xs text-gray-500 dark:text-gray-500">
                    Configure and train the model to see details
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
