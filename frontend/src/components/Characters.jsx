import React, { useState, useEffect } from 'react';
import { charactersAPI } from '../services/api';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const charactersData = await charactersAPI.getAll();
        setCharacters(charactersData);
        setError(null);
      } catch (err) {
        setError('Failed to load characters. Please try again later.');
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
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

    const cards = document.querySelectorAll('.character-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [characters]);

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Hashira': return 'from-yellow-500 to-orange-500';
      case 'Demon Slayer': return 'from-blue-500 to-cyan-500';
      case 'Demon': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 'Hashira': return '👑';
      case 'Demon Slayer': return '⚔️';
      case 'Demon': return '😈';
      default: return '🏃';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading characters...</p>
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
      <section className="py-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent animate-gradient">
          Characters
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Meet the brave souls who fight against the darkness, each with their unique story and abilities
        </p>
      </section>

      {/* Characters Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {characters.map((character, index) => (
              <div
                key={character.id}
                id={`character-${character.id}`}
                className={`character-card p-6 rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  isVisible[`character-${character.id}`] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedCharacter(character)}
              >
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${getRankColor(character.rank)} text-white text-sm font-semibold flex items-center space-x-1`}>
                    <span>{getRankIcon(character.rank)}</span>
                    <span>{character.rank}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors duration-300">
                  {character.name}
                </h3>
                
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {character.description.length > 120 
                    ? `${character.description.substring(0, 120)}...` 
                    : character.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🌪️</span>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Breathing Style</p>
                      <p className="text-sm font-medium text-cyan-400">{character.breathing}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Personality</p>
                      <p className="text-sm font-medium text-green-400">{character.personality}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Click to learn more</span>
                  <span className="text-red-400 hover:text-red-300 transition-colors duration-300">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Character Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedCharacter(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
              >
                ✕
              </button>
              <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${getRankColor(selectedCharacter.rank)} text-white text-sm font-semibold flex items-center space-x-1`}>
                <span>{getRankIcon(selectedCharacter.rank)}</span>
                <span>{selectedCharacter.rank}</span>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-white">{selectedCharacter.name}</h2>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {selectedCharacter.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-cyan-400 flex items-center space-x-2">
                    <span>🌪️</span>
                    <span>Breathing Style</span>
                  </h4>
                  <p className="text-gray-300 bg-gray-700 p-3 rounded-lg">
                    {selectedCharacter.breathing}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-green-400 flex items-center space-x-2">
                    <span>🧠</span>
                    <span>Personality</span>
                  </h4>
                  <p className="text-gray-300 bg-gray-700 p-3 rounded-lg">
                    {selectedCharacter.personality}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <h4 className="text-lg font-semibold mb-3 text-purple-400 flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Special Abilities</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedCharacter.abilities.map((ability, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-3 rounded-lg border border-purple-500/30 text-center"
                      >
                        <span className="text-sm font-medium text-purple-300">{ability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
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

export default Characters;