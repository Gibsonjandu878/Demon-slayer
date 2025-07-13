import React, { useState, useEffect } from 'react';
import { storyArcsAPI } from '../services/api';

const StoryArcs = () => {
  const [storyArcs, setStoryArcs] = useState([]);
  const [selectedArc, setSelectedArc] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoryArcs = async () => {
      try {
        setLoading(true);
        const arcsData = await storyArcsAPI.getAll();
        setStoryArcs(arcsData);
        setError(null);
      } catch (err) {
        setError('Failed to load story arcs. Please try again later.');
        console.error('Error fetching story arcs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryArcs();
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

    const cards = document.querySelectorAll('.arc-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [storyArcs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading story arcs...</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-orange-900/20" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
            Story Arcs
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Follow Tanjiro's epic journey through danger, growth, and the bonds that define a true demon slayer
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 rounded-full" />

            {storyArcs.map((arc, index) => (
              <div
                key={arc.id}
                id={`arc-${arc.id}`}
                className={`arc-card relative flex flex-col md:flex-row items-center mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${isVisible[`arc-${arc.id}`] ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 shadow-lg z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <div
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                    onClick={() => setSelectedArc(arc)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={arc.image}
                        alt={arc.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm font-semibold bg-purple-500/80 px-2 py-1 rounded">
                          {arc.episodes}
                        </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
                        {arc.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {arc.description}
                      </p>

                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Key Events</p>
                        <div className="space-y-1">
                          {arc.key_events.slice(0, 3).map((event, eventIndex) => (
                            <p key={eventIndex} className="text-sm text-gray-300 flex items-center space-x-2">
                              <span className="w-1 h-1 bg-purple-400 rounded-full" />
                              <span>{event}</span>
                            </p>
                          ))}
                          {arc.key_events.length > 3 && (
                            <p className="text-sm text-gray-500">
                              +{arc.key_events.length - 3} more events
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm text-gray-500">Click to explore</span>
                        <span className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arc Number */}
                <div className={`hidden md:block w-2/12 text-center ${
                  index % 2 === 0 ? 'ml-8' : 'mr-8'
                }`}>
                  <div className="text-6xl font-bold text-gray-700/50">
                    {String(arc.order).padStart(2, '0')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arc Detail Modal */}
      {selectedArc && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedArc.image}
                alt={selectedArc.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-2xl" />
              
              <button
                onClick={() => setSelectedArc(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 text-white">
                <p className="text-sm font-semibold bg-purple-500/80 px-3 py-1 rounded-full mb-2">
                  {selectedArc.episodes}
                </p>
                <h2 className="text-3xl font-bold">{selectedArc.title}</h2>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {selectedArc.description}
              </p>

              <div>
                <h4 className="text-2xl font-semibold mb-6 text-purple-400 flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Key Events & Moments</span>
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedArc.key_events.map((event, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-purple-300 font-medium">{event}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setSelectedArc(null)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
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

export default StoryArcs;