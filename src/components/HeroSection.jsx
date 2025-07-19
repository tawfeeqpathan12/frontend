import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { userStats } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const FloatingElement = ({ children, className, delay = 0 }) => (
  <div
    className={`absolute animate-float ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '6s'
    }}
  >
    {children}
  </div>
);

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl transform rotate-12 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-emerald-300 rounded-full opacity-15 blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-teal-200 rounded-full opacity-10 blur-3xl transform -rotate-45"></div>
      </div>

      {/* Floating Environmental Elements */}
      <FloatingElement className="top-16 left-16 text-6xl opacity-30" delay={0}>🌱</FloatingElement>
      <FloatingElement className="top-32 right-24 text-5xl opacity-25" delay={1}>🌍</FloatingElement>
      <FloatingElement className="bottom-40 left-20 text-4xl opacity-35" delay={2}>♻️</FloatingElement>
      <FloatingElement className="top-80 left-1/2 text-5xl opacity-20" delay={1.5}>🌳</FloatingElement>
      <FloatingElement className="bottom-20 right-32 text-6xl opacity-30" delay={0.5}>💚</FloatingElement>

      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}>
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
                <span className="text-green-800 font-semibold text-sm">🌿 Track. Act. Impact.</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                  eco
                </span>
                <span className="text-gray-800">Track</span>
              </h1>

              <p className="text-2xl lg:text-3xl font-light text-green-700 italic">
                Small actions, big impact through AI
              </p>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Transform your environmental impact with intelligent daily tracking, AI-powered personal plans,
                and smart recommendations that adapt to your lifestyle. Track your carbon footprint daily, weekly, and monthly.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-green-200 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-green-600">
                  <CountUp end={userStats.dailyCarbonFootprint} suffix=" kg" />
                </div>
                <div className="text-sm text-gray-600">Today's Footprint</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-green-200 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-emerald-600">
                  <CountUp end={userStats.aiRecommendationsUsed} suffix=" AI tips" />
                </div>
                <div className="text-sm text-gray-600">Followed</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/app')}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get AI-Powered Plan 🤖
              </Button>
              <Button
                onClick={() => navigate('/app')}
                variant="outline"
                size="lg"
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                See Daily Tracking 📊
              </Button>
            </div>
          </div>

          {/* Right Content - 3D Hero Image with Effects */}
          <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}>

            {/* Main Hero Image Container with 3D Effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>

              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-green-200 hover:border-green-300 transition-all duration-500 transform hover:rotate-1 hover:scale-105 shadow-2xl">

                {/* Hero Image */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1593069567131-53a0614dde1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxlbnZpcm9ubWVudHxlbnwwfHx8Z3JlZW58MTc1MjkyMTI3NXww&ixlib=rb-4.1.0&q=85"
                    alt="Aerial view of lush green forest representing environmental conservation"
                    className="w-full h-80 object-cover hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Stats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl font-bold">AI Insights</div>
                      <div className="text-sm opacity-90">Real-time tracking</div>
                    </div>
                  </div>
                </div>

                {/* Floating Achievement Cards */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-green-200 hover:animate-none hover:scale-110 transition-transform duration-300" style={{ animation: 'bounce 3s ease-in-out infinite' }}>
                  <div className="text-2xl">🏆</div>
                  <div className="text-xs text-green-600 font-semibold">AI Champion</div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-emerald-200 hover:animate-none hover:scale-110 transition-transform duration-300" style={{ animation: 'pulse 4s ease-in-out infinite' }}>
                  <div className="text-lg font-bold text-emerald-600">
                    <CountUp end={userStats.personalizedPlanProgress} suffix="%" />
                  </div>
                  <div className="text-xs text-gray-600">Plan Progress</div>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative w-96 h-96">
                  <div className="absolute top-0 left-1/2 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl animate-spin hover:animate-none transition-all duration-300" style={{ animationDuration: '20s' }}>
                    🌱
                  </div>
                  <div className="absolute top-1/2 right-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl animate-spin hover:animate-none transition-all duration-300" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                    💧
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-2xl animate-spin hover:animate-none transition-all duration-300" style={{ animationDuration: '25s' }}>
                    ☀️
                  </div>
                  <div className="absolute top-1/2 left-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-lg animate-spin hover:animate-none transition-all duration-300" style={{ animationDuration: '18s', animationDirection: 'reverse' }}>
                    🦋
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;