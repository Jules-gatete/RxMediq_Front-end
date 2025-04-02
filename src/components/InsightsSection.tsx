import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { API_ENDPOINTS } from '../config';
import type { LiveData } from '../types';
import { BarChart, LineChart, AlertCircle } from 'lucide-react';

export function InsightsSection() {
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.LIVE_DATA);
        if (!response.ok) throw new Error('Failed to fetch live data');
        const data = await response.json();
        setLiveData(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch live data. Please try again later.');
      }
    };

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <BarChart className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
        <h2 className="text-3xl font-bold mb-4">Real-time Insights</h2>
        <p className="text-gray-600">Live analysis of prescription patterns and trends</p>
      </div>

      {error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {liveData && (
            <>
              <div className="glass-card rounded-xl p-6 animate-fade-in">
                <div className="flex items-center mb-4">
                  <LineChart className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Age Distribution</h3>
                </div>
                <Plot
                  data={liveData.age_plot.data}
                  layout={{
                    ...liveData.age_plot.layout,
                    autosize: true,
                    margin: { t: 20, r: 20, b: 40, l: 40 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { family: 'Inter, sans-serif' },
                  }}
                  useResizeHandler
                  className="w-full h-[400px]"
                  config={{ responsive: true }}
                />
                <p className="mt-4 text-gray-600 text-sm">
                  Age distribution reveals demographic patterns in medication preferences,
                  helping identify age-specific treatment trends.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 animate-fade-in">
                <div className="flex items-center mb-4">
                  <BarChart className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Severity vs. Drug Distribution</h3>
                </div>
                <Plot
                  data={liveData.severity_plot.data}
                  layout={{
                    ...liveData.severity_plot.layout,
                    autosize: true,
                    margin: { t: 20, r: 20, b: 40, l: 40 },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { family: 'Inter, sans-serif' },
                  }}
                  useResizeHandler
                  className="w-full h-[400px]"
                  config={{ responsive: true }}
                />
                <p className="mt-4 text-gray-600 text-sm">
                  This visualization shows the relationship between condition severity
                  and prescribed medications, highlighting treatment patterns.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}