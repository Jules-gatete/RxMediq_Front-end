import React from 'react';
import { NavLink } from 'react-router-dom';
import { Pill, Activity, Brain, RefreshCw } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-200">
              <Pill className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              RxMediq
            </h1>
          </NavLink>
          
          <nav>
            <ul className="flex space-x-8">
              {[
                ['Home', '/', null],
                ['Insights', '/insights', Activity],
                ['Predict', '/predict', Brain],
                ['Retrain', '/retrain', RefreshCw],
              ].map(([title, url, Icon]) => (
                <li key={url}>
                  <NavLink
                    to={url}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}