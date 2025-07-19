import React, { useState, useEffect } from 'react';
import { environmentalImpact, globalImpact } from '../data/mockData';

const Progress3D = ({ value, max = 100, color = "#22c55e", size = 120 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedValue / max) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke={`url(#gradient-${color})`}
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="url(#glow)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {Math.round(animatedValue)}{max === 100 ? '%' : ''}
        </span>
      </div>
    </div>
  );
};

const StatCard = ({ stat, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isPositiveTrend = stat.trend > 0;
  const isGoodTrend = (stat.category === 'Carbon Footprint' || stat.category === 'Energy Usage') 
    ? stat.trend < 0 
    : stat.trend > 0;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
        
        {/* Background Glow */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
          style={{ backgroundColor: stat.color }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="text-4xl">{stat.icon}</div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isGoodTrend 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isPositiveTrend ? '+' : ''}{stat.trend.toFixed(1)}%
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4">{stat.category}</h3>

          {/* 3D Progress Visualization */}
          <div className="flex items-center justify-center mb-6">
            <Progress3D 
              value={stat.category === 'Recycling' || stat.category === 'Transport' 
                ? stat.currentMonth 
                : Math.max(0, 100 - (stat.currentMonth / stat.lastMonth) * 100)
              } 
              color={stat.color}
              size={140}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current</span>
              <span className="font-bold text-lg" style={{ color: stat.color }}>
                {stat.currentMonth} {stat.unit}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Month</span>
              <span className="text-gray-500">
                {stat.lastMonth} {stat.unit}
              </span>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-4 right-8 w-2 h-2 bg-green-300 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute bottom-8 left-6 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-16 left-12 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobalStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('global-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const CountUpNumber = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

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
    }, [end, duration, isVisible]);

    return <span>{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <div id="global-stats" className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 text-white relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            🤖 AI-Driven Global Impact
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join millions using AI-powered insights to reduce their carbon footprint daily
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="relative">
              <div className="text-5xl lg:text-6xl font-black mb-2 transition-transform duration-300 group-hover:scale-110">
                <CountUpNumber end={globalImpact.totalUsers} />
              </div>
              <div className="text-lg opacity-80">Active Users</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="relative">
              <div className="text-5xl lg:text-6xl font-black mb-2 transition-transform duration-300 group-hover:scale-110">
                <CountUpNumber end={globalImpact.carbonSavedGlobally} suffix="T" />
              </div>
              <div className="text-lg opacity-80">CO₂ Saved</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="relative">
              <div className="text-5xl lg:text-6xl font-black mb-2 transition-transform duration-300 group-hover:scale-110">
                <CountUpNumber end={globalImpact.treesPlanted} />
              </div>
              <div className="text-lg opacity-80">Trees Planted</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="relative">
              <div className="text-5xl lg:text-6xl font-black mb-2 transition-transform duration-300 group-hover:scale-110">
                <CountUpNumber end={globalImpact.plasticRecycled} suffix="T" />
              </div>
              <div className="text-lg opacity-80">Plastic Recycled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
            Your AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Impact
            </span> Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your daily, weekly, and monthly carbon footprint with intelligent insights and personalized AI recommendations
          </p>
        </div>

        {/* Environmental Impact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {environmentalImpact.map((stat, index) => (
            <StatCard key={stat.category} stat={stat} index={index} />
          ))}
        </div>

        {/* Global Impact Stats */}
        <GlobalStats />

      </div>
    </section>
  );
};

export default StatsSection;