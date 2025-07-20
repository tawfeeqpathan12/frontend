import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthWrapper from "./components/AuthWrapper";

import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import FeaturesSection from "./components/FeaturesSection";
import SignUpSection from "./components/SignUpSection";
import MultiActivityLogger from "./components/MultiActivityLogger";
import Dashboard from "./components/Dashboard";

import { LeafLoader, CarbonFootprintLoader } from "./components/icons/EcoIcons";

const API = "https://eco-backend-2.onrender.com/api";

// ------------------------
// Landing Page (Public)
// ------------------------
const LandingPage = () => {
  useEffect(() => {
    axios
      .get(`${API}/`)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.error("Landing API failed:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <SignUpSection />
    </div>
  );
};

// ------------------------
// Authenticated Dashboard
// ------------------------
const ProtectedApp = () => {
  const { isAuthenticated, loading: authLoading, logout, user } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);

  const loadingMessages = [
    "Calculating your carbon impact...",
    "Analyzing your recent activities...",
    "Preparing personalized insights...",
    "Updating sustainability metrics..."
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchDashboardData();
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${API}/dashboard/summary`);
      setDashboardSummary(res.data);
    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleActivitiesAdded = () => {
    fetchDashboardData();
    setCurrentView("dashboard");
  };

  if (authLoading || !minTimePassed) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center transition-all duration-500">
        <CarbonFootprintLoader className="w-16 h-16 animate-spin text-green-600" />
        <p className="mt-6 text-lg text-gray-600 animate-pulse">
          {loadingMessages[messageIndex]}
        </p>
      </div>
    );
  }

  if (!isAuthenticated) return <AuthWrapper />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 transition-all">
      {/* 🧠 Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-green-600">🌱 EcoTrack</h1>
            <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
          </div>
          <nav className="flex gap-2 text-sm md:text-base font-medium">
            <button
              className={`px-4 py-2 rounded-md transition-all duration-200
      ${currentView === "dashboard"
                  ? "bg-green-500 text-white"
                  : "bg-white text-green-700 hover:bg-green-100"
                }`}
              onClick={() => setCurrentView("dashboard")}
            >
              📊 Dashboard
            </button>

            <button
              className={`px-4 py-2 rounded-md transition-all duration-200
      ${currentView === "log"
                  ? "bg-blue-700 text-white"
                  : "bg-white text-green-700 hover:bg-blue-100"
                }`}
              onClick={() => setCurrentView("log")}
            >
              ➕ Log Activity
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-md transition-all duration-200 bg-white text-red-600 hover:bg-red-100"
            >
              🚪 Logout
            </button>
          </nav>

        </div>
      </header>

      {/* 🌿 Main Section */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {dashboardLoading && currentView === "dashboard" ? (
          <div className="text-center py-10 text-gray-500">
            <LeafLoader className="mx-auto w-10 h-10 animate-spin text-green-500" />
            <p className="mt-4">Loading Dashboard Insights...</p>
          </div>
        ) : (
          <>
            {currentView === "dashboard" && <Dashboard summary={dashboardSummary} />}
            {currentView === "log" && (
              <MultiActivityLogger onActivitiesAdded={handleActivitiesAdded} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

// ------------------------
// Main App Wrapper
// ------------------------
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<ProtectedApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
