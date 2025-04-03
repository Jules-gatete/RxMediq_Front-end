import React, { useState, useEffect } from 'react';
import { Upload, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export function RetrainingSection() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string>('');
  const [visualizations, setVisualizations] = useState<string[]>([]);

  // Listen for retrain completion event
  useEffect(() => {
    const handleRetrainComplete = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.visualizations) {
        setVisualizations(customEvent.detail.visualizations);
      }
    };

    window.addEventListener('retrainComplete', handleRetrainComplete);
    return () => window.removeEventListener('retrainComplete', handleRetrainComplete);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setResult(null);
    setVisualizations([]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://rxmediq-model-api.onrender.com/retrain/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Retraining failed');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to retrain model. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <RefreshCw className="w-16 h-16 mx-auto text-indigo-600 mb-4" />
        <h2 className="text-3xl font-bold mb-4">Model Retraining</h2>
        <p className="text-gray-600">Upload new data to improve the prediction model's accuracy</p>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 transition-all duration-200 hover:border-indigo-500">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Drop your CSV file here, or{' '}
                    <span className="text-indigo-600 hover:text-indigo-500">browse</span>
                  </span>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">CSV file up to 10MB</p>
            </div>
          </div>

          {file && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>{file.name}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Retraining...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Upload & Retrain
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-6">
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="text-xl font-medium text-green-900">Retraining Complete</h3>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-lg text-green-800">{result.message}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <span className="w-32 text-sm text-gray-600">Accuracy:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${result.metrics.accuracy * 100}%` }}
                      />
                    </div>
                    <span className="ml-4 font-semibold text-green-800">
                      {(result.metrics.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-sm text-gray-600">Precision:</span>
                    <span className="font-semibold text-green-800">
                      {(result.metrics.precision * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-sm text-gray-600">Recall:</span>
                    <span className="font-semibold text-green-800">
                      {(result.metrics.recall * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-sm text-gray-600">F1 Score:</span>
                    <span className="font-semibold text-green-800">
                      {(result.metrics.f1_score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-sm text-gray-600">Dataset Size:</span>
                    <span className="font-semibold text-green-800">{result.dataset_size} records</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualizations Section */}
            {visualizations.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Training Visualizations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {visualizations.map((viz, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <img
                        src={viz}
                        alt={`Visualization ${index + 1}`}
                        className="w-full h-auto rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                        }}
                      />
                      <p className="mt-2 text-sm text-gray-600 text-center">
                        {viz.includes('training_history') ? 'Training History' :
                         viz.includes('confusion_matrix') ? 'Confusion Matrix' :
                         'Class Distribution'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

