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
  }, []);

  if (!mounted) {
    return (
      <div className="h-40 bg-white dark:bg-gray-900 rounded-lg p-2 flex items-center justify-center">
        <div className="text-gray-400 text-xs">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-40 w-full bg-white dark:bg-gray-900 rounded-lg p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="x" stroke="#6B7280" tick={{ fontSize: 10 }} />
          <YAxis stroke="#6B7280" tick={{ fontSize: 10 }} />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke={strokeColor} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

