import React, { useEffect, useState } from 'react';
import { BarChart, LineChart, AlertCircle } from 'lucide-react';

export function InsightsSection() {
  const [visualizations, setVisualizations] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchVisualizations = async () => {
      try {
        const response = await fetch('https://rxmediq-model-api.onrender.com/visualizations/', {
          method: 'GET',
        });
        if (!response.ok) throw new Error('Failed to fetch visualizations');
        const data = await response.json();
        if (data.visualizations && data.visualizations.length > 0) {
          // Prepend the base URL to make the paths absolute
          const baseUrl = 'https://rxmediq-model-api.onrender.com/';
          const absolutePaths = data.visualizations.map((path: string) => 
            path.startsWith('http') ? path : `${baseUrl}${path.replace(/^static\//, 'static/')}`
          );
          setVisualizations(absolutePaths);
          setError('');
        } else {
          setError('No visualizations available. Please retrain the model first.');
        }
      } catch (err) {
        setError('Failed to fetch visualizations. Please retrain the model first.');
      }
    };

    fetchVisualizations();
    const interval = setInterval(fetchVisualizations, 5000); // Poll every 5 seconds
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
          {visualizations.length > 0 && (
            <>
              <div className="glass-card rounded-xl p-6 animate-fade-in">
                <div className="flex items-center mb-4">
                  <LineChart className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Training History</h3>
                </div>
                <img src={visualizations[0]} alt="Training History" className="w-full h-[400px] object-contain" />
                <p className="mt-4 text-gray-600 text-sm">
                  Shows model accuracy improvement over training epochs.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 animate-fade-in">
                <div className="flex items-center mb-4">
                  <BarChart className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Confusion Matrix</h3>
                </div>
                <img src={visualizations[1]} alt="Confusion Matrix" className="w-full h-[400px] object-contain" />
                <p className="mt-4 text-gray-600 text-sm">
                  Visualizes prediction accuracy across different drug classes.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 animate-fade-in">
                <div className="flex items-center mb-4">
                  <BarChart className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-semibold">Class Distribution</h3>
                </div>
                <img src={visualizations[2]} alt="Class Distribution" className="w-full h-[400px] object-contain" />
                <p className="mt-4 text-gray-600 text-sm">
                  Displays the distribution of predicted drug classes.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
