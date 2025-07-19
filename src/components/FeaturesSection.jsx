import React, { useState, useEffect, use } from 'react';
import { features } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ feature, index, isActive, onHover }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  const navigate = useNavigate();
  return (
    <div
      className={`group relative cursor-pointer transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        } ${isActive
          ? 'scale-105 z-10'
          : 'hover:scale-102'
        }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(-1)}
    >
      {/* 3D Card Container */}
      <div className={`relative bg-white rounded-3xl p-8 transition-all duration-500 border-2 ${isActive
          ? 'border-green-400 shadow-2xl shadow-green-500/25'
          : 'border-gray-200 hover:border-green-300 shadow-xl hover:shadow-2xl'
        }`}>

        {/* Background Glow Effect */}
        <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${isActive
            ? 'bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 opacity-100'
            : 'bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100'
          }`}></div>

        {/* Content */}
        <div className="relative z-10">

          {/* Icon with 3D Effect */}
          <div className={`relative mb-6 transition-transform duration-500 ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-105 group-hover:rotate-3'
            }`}>
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              {feature.icon}
            </div>
            {/* Floating shadow */}
            <div className="absolute inset-0 bg-green-200 rounded-2xl blur-lg opacity-20 transform translate-y-2 group-hover:translate-y-3 transition-transform duration-300"></div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
            {feature.title}
          </h3>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {feature.description}
          </p>

          {/* Demo Data Visualization */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 group-hover:bg-green-50 transition-colors duration-300">
            <div className="text-sm text-gray-500 mb-2">Live Demo Data:</div>

            {feature.title === 'AI-Powered Carbon Insights' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily Footprint</span>
                  <span className="font-bold text-green-600">{feature.demoData.dailyFootprint} {feature.demoData.unit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Weekly Average</span>
                  <span className="font-bold text-blue-600">{feature.demoData.weeklyAverage} {feature.demoData.unit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Suggestions</span>
                  <span className="font-bold text-purple-600">{feature.demoData.aiSuggestions} active</span>
                </div>
              </div>
            )}

            {feature.title === 'Smart Daily Tracking' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Today</span>
                  <span className="font-bold text-green-600">{feature.demoData.today} {feature.demoData.unit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Yesterday</span>
                  <span className="text-gray-500">{feature.demoData.yesterday} {feature.demoData.unit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((feature.demoData.target / feature.demoData.today) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-green-600 font-semibold">
                  {feature.demoData.trend}% vs yesterday
                </div>
              </div>
            )}

            {feature.title === 'Personalized Action Plans' && (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-blue-600">{feature.demoData.completedActions}/{feature.demoData.totalActions}</div>
                  <div className="text-xs text-gray-500">Actions Completed</div>
                </div>
                <div className="w-16 h-16">
                  <div className="relative w-full h-full">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray={`${feature.demoData.planProgress}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-600">
                      {feature.demoData.planProgress}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {feature.title === 'Intelligent Recommendations' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg font-bold text-purple-600">{feature.demoData.activeSuggestions}</div>
                  <div className="text-xs text-gray-500">Active Tips</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{feature.demoData.todaysSavings}</div>
                  <div className="text-xs text-gray-500">{feature.demoData.unit}</div>
                </div>
                <div className="col-span-2">
                  <div className="flex justify-between">
                    <span className="text-xs">Acceptance Rate</span>
                    <span className="text-xs font-bold">{feature.demoData.acceptanceRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${feature.demoData.acceptanceRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Button */}
          <button
            onClick={() => navigate('/app')}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${isActive
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}>
            Try Feature
          </button>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className={`absolute top-6 right-6 w-3 h-3 bg-green-300 rounded-full transition-opacity duration-500 ${isActive ? 'opacity-100 animate-ping' : 'opacity-0'
              }`}></div>
            <div className={`absolute bottom-12 left-8 w-2 h-2 bg-blue-300 rounded-full transition-opacity duration-700 ${isActive ? 'opacity-60 animate-pulse' : 'opacity-0'
              }`} style={{ animationDelay: '1s' }}></div>
            <div className={`absolute top-20 left-16 w-1.5 h-1.5 bg-yellow-300 rounded-full transition-opacity duration-900 ${isActive ? 'opacity-50 animate-bounce' : 'opacity-0'
              }`} style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(-1);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('features-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const navigate = useNavigate();

  return (
    <section id="features-section" className="py-20 bg-gradient-to-b from-white via-green-50/30 to-white relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200/10 to-green-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">

        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
            <span className="text-green-800 font-semibold text-sm">🚀 Powerful Features</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
              Carbon
            </span> Intelligence
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience personalized daily, weekly, and monthly carbon tracking with intelligent AI recommendations
            that adapt to your lifestyle and provide actionable insights for meaningful environmental impact.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isActive={activeFeature === index}
              onHover={setActiveFeature}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
          <button 
          onClick={() => navigate('/app')}
          className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-12 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700">
            Get Your AI Plan 🤖
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;