import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { InsightsSection } from './components/InsightsSection';
import { PredictionForm } from './components/PredictionForm';
import { RetrainingSection } from './components/RetrainingSection';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="hero-gradient text-white py-20 px-4">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Welcome to RxMediq
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-12 animate-slide-up">
              An advanced machine learning system for drug prediction and prescription analysis.
              Explore insights, make predictions, and help improve our model.
            </p>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 -mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Insights',
                description: 'Explore real-time visualizations of prescription patterns and trends.',
                link: '/insights',
                image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80',
              },
              {
                title: 'Drug Prediction',
                description: 'Get AI-powered drug recommendations based on patient data.',
                link: '/predict',
                image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80',
              },
              {
                title: 'Model Retraining',
                description: 'Upload new data to improve the prediction model accuracy.',
                link: '/retrain',
                image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="glass-card rounded-xl overflow-hidden card-hover animate-fade-in"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <a
                    href={card.link}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Predictions Made', value: '10,000+' },
              { label: 'Accuracy Rate', value: '95%' },
              { label: 'Active Users', value: '500+' },
              { label: 'Diseases Covered', value: '100+' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-lg p-6 animate-fade-in">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/insights" element={<InsightsSection />} />
            <Route path="/predict" element={<PredictionForm />} />
            <Route path="/retrain" element={<RetrainingSection />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App