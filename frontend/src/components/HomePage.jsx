import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Characters",
      description: "Meet the brave demon slayers and their unique abilities",
      icon: "⚔️",
      link: "/characters",
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Breathing Techniques",
      description: "Discover the powerful sword forms and breathing styles",
      icon: "🌪️",
      link: "/breathing-techniques",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Story Arcs",
      description: "Follow Tanjiro's journey through epic adventures",
      icon: "📖",
      link: "/story-arcs",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900/30 to-gray-900"
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-orange-400 rounded-full animate-ping" />
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent animate-gradient">
              鬼滅の刃
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-gray-300 animate-fade-in-up animation-delay-300">
              Demon Slayer
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed animate-fade-in-up animation-delay-600">
            Enter the world of demon slayers, where courage meets steel and determination conquers darkness
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-900">
            <Link
              to="/characters"
              className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Meet the Slayers</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">⚔️</span>
              </span>
            </Link>
            
            <Link
              to="/breathing-techniques"
              className="group px-8 py-4 border-2 border-gray-600 rounded-lg font-semibold text-lg hover:border-orange-500 hover:bg-orange-500/10 transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Explore Techniques</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">🌪️</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Explore the World
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="group block"
              >
                <div className={`h-full p-8 bg-gradient-to-br ${feature.gradient} rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-white/90 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn More</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-300 mb-8 leading-relaxed animate-fade-in">
            "No matter how many people you may lose, you have no choice but to go on living."
          </blockquote>
          <cite className="text-lg text-gray-500 font-semibold">
            — Tanjiro Kamado
          </cite>
        </div>
      </section>
    </div>
  );
};

export default HomePage;