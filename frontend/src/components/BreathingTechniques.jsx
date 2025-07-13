import React, { useState, useEffect } from 'react';
import { breathingTechniquesAPI } from '../services/api';

const BreathingTechniques = () => {
  const [breathingTechniques, setBreathingTechniques] = useState([]);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreathingTechniques = async () => {
      try {
        setLoading(true);
        const techniquesData = await breathingTechniquesAPI.getAll();
        setBreathingTechniques(techniquesData);
        setError(null);
      } catch (err) {
        setError('Failed to load breathing techniques. Please try again later.');
        console.error('Error fetching breathing techniques:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreathingTechniques();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.technique-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [breathingTechniques]);

  const getColorScheme = (color) => {
    const schemes = {
      blue: {
        gradient: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400'
      },
      yellow: {
        gradient: 'from-yellow-500 to-orange-500',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400'
      },
      brown: {
        gradient: 'from-amber-600 to-orange-600',
        bg: 'bg-amber-600/10',
        border: 'border-amber-600/30',
        text: 'text-amber-400'
      },
      purple: {
        gradient: 'from-purple-500 to-pink-500',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        text: 'text-purple-400'
      },
      red: {
        gradient: 'from-red-500 to-orange-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400'
      }
    };
    return schemes[color] || schemes.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading breathing techniques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Header Section */}
      <section className="py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-gray-900 to-red-900/20" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            Breathing Techniques
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Master the ancient arts of breathing that grant supernatural abilities to demon slayers
          </p>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
        <div className="absolute bottom-20 left-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
      </section>

      {/* Techniques Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {breathingTechniques.map((technique, index) => {
              const colorScheme = getColorScheme(technique.color);
              return (
                <div
                  key={technique.id}
                  id={`technique-${technique.id}`}
                  className={`technique-card p-6 rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 breathing-effect ${
                    isVisible[`technique-${technique.id}`] ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    background: `linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)`,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onClick={() => setSelectedTechnique(technique)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`text-6xl animate-float ${colorScheme.text}`}>
                      {technique.element}
                    </div>
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${colorScheme.gradient} text-white text-sm font-semibold`}>
                      {technique.forms.length} Forms
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white hover:text-cyan-400 transition-colors duration-300">
                    {technique.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                    {technique.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Primary Users</p>
                      <div className="flex flex-wrap gap-2">
                        {technique.users.slice(0, 2).map((user, userIndex) => (
                          <span
                            key={userIndex}
                            className={`px-2 py-1 rounded-lg ${colorScheme.bg} ${colorScheme.border} border text-xs ${colorScheme.text} font-medium`}
                          >
                            {user}
                          </span>
                        ))}
                        {technique.users.length > 2 && (
                          <span className="px-2 py-1 rounded-lg bg-gray-700 border border-gray-600 text-xs text-gray-400 font-medium">
                            +{technique.users.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Signature Forms</p>
                      <div className="space-y-1">
                        {technique.forms.slice(0, 2).map((form, formIndex) => (
                          <p key={formIndex} className="text-xs text-gray-300 truncate">
                            • {form}
                          </p>
                        ))}
                        {technique.forms.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{technique.forms.length - 2} more forms
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Click to explore</span>
                    <span className={`${colorScheme.text} hover:brightness-110 transition-all duration-300`}>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technique Modal */}
      {selectedTechnique && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative p-8">
              <button
                onClick={() => setSelectedTechnique(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300 z-10"
              >
                ✕
              </button>

              <div className="text-center mb-8">
                <div className={`text-8xl mb-4 ${getColorScheme(selectedTechnique.color).text}`}>
                  {selectedTechnique.element}
                </div>
                <h2 className="text-4xl font-bold mb-4 text-white">{selectedTechnique.name}</h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                  {selectedTechnique.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-cyan-400 flex items-center space-x-2">
                    <span>👥</span>
                    <span>Known Users</span>
                  </h4>
                  <div className="space-y-3">
                    {selectedTechnique.users.map((user, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${getColorScheme(selectedTechnique.color).bg} ${getColorScheme(selectedTechnique.color).border} border`}
                      >
                        <span className={`font-medium ${getColorScheme(selectedTechnique.color).text}`}>
                          {user}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4 text-purple-400 flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Technique Forms</span>
                  </h4>
                  <div className="space-y-3">
                    {selectedTechnique.forms.map((form, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 transform hover:scale-105 transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-purple-300">{form}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setSelectedTechnique(null)}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreathingTechniques;