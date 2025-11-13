'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FunctionGraphProps {
  data: Array<{ x: number; y: number }>;
  strokeColor: string;
}

export function FunctionGraph({ data, strokeColor }: FunctionGraphProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('FunctionGraph mounted with data:', { 
      dataLength: data?.length, 
      strokeColor,
      firstPoint: data?.[0],
      lastPoint: data?.[data?.length - 1]
    });
  }, [data, strokeColor]);

  if (!mounted) {
    return (
      <div className="h-40 bg-white dark:bg-gray-900 rounded-lg p-2 flex items-center justify-center">
        <div className="text-gray-400 text-xs">Loading...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-40 bg-white dark:bg-gray-900 rounded-lg p-2 flex items-center justify-center">
        <div className="text-gray-400 text-xs">No data available</div>
      </div>
    );
  }

  console.log('FunctionGraph rendering with:', data.length, 'points');

  return (
    <div className="h-40 w-full bg-white dark:bg-gray-900 rounded-lg p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="x" 
            stroke="#6B7280" 
            tick={{ fontSize: 10 }}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis 
            stroke="#6B7280" 
            tick={{ fontSize: 10 }}
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '4px',
              fontSize: '10px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke={strokeColor} 
            strokeWidth={2} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

