'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrainingMetrics, TrainingSummary } from '@/lib/types';

interface TrainingGraphProps {
  trainingData: TrainingMetrics[];
  summary?: TrainingSummary;
}

export function TrainingGraph({ trainingData, summary }: TrainingGraphProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trainingData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="epoch" 
            stroke="#6B7280" 
            label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#6B7280" 
            label={{ value: 'Loss', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#6B7280" 
            label={{ value: 'Accuracy', angle: 90, position: 'insideRight' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Legend />
          
          {/* Loss Lines */}
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="loss" 
            stroke="#EF4444" 
            strokeWidth={2}
            dot={false}
            name="Training Loss"
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="valLoss" 
            stroke="#F59E0B" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Validation Loss"
          />
          
          {/* Accuracy Lines */}
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="accuracy" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={false}
            name="Training Accuracy"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="valAccuracy" 
            stroke="#3B82F6" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Validation Accuracy"
          />
          
          {/* Best Epoch Marker */}
          {summary?.bestEpoch && (
            <ReferenceLine 
              x={summary.bestEpoch} 
              stroke="#8B5CF6" 
              strokeDasharray="3 3"
              label={{ value: 'Best', position: 'top' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

