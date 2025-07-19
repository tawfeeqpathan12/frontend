import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

// Context & Auth
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthWrapper from "./components/AuthWrapper";

// Pages & Components
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import FeaturesSection from "./components/FeaturesSection";
import SignUpSection from "./components/SignUpSection";
import MultiActivityLogger from "./components/MultiActivityLogger";
import Dashboard from "./components/Dashboard";

const API = "https://eco-backend-2.onrender.com/api";

// ------------------------
// Landing Page (Public)
// ------------------------
const LandingPage = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error("Errored out requesting / api", e);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen">
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
  const { isAuthenticated, loading, logout, user } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);

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

  useEffect(() => {
    if (isAuthenticated) fetchDashboardData();
  }, [isAuthenticated]);

  const handleActivitiesAdded = () => {
    fetchDashboardData();
    setCurrentView("dashboard");
  };

  if (loading) return <div className="text-center py-24">Loading EcoTrack...</div>;
  if (!isAuthenticated) return <AuthWrapper />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-600">🌱 EcoTrack</h1>
            <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
          </div>
          <nav className="flex space-x-3">
            <button onClick={() => setCurrentView("dashboard")}>📊 Dashboard</button>
            <button onClick={() => setCurrentView("log")}>➕ Log</button>
            <button onClick={logout}>🚪 Logout</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {dashboardLoading && currentView === "dashboard" ? (
          <div className="text-center">Loading Dashboard...</div>
        ) : (
          <>
            {currentView === "dashboard" && (
              <Dashboard summary={dashboardSummary} />
            )}
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
// Main App (No Router here!)
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
