import React, { useState } from "react";
import axios from "axios";
import { FiPlus, FiTrash2, FiCheck, FiZap, FiInfo } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const API = "https://eco-backend-2.onrender.com/api";

const activityOptions = {
  transport: {
    car_petrol: { label: "🚗 Car (Petrol)", factor: 0.21, example: "Daily commute to work", icon: "🚗" },
    car_diesel: { label: "🚙 Car (Diesel)", factor: 0.18, example: "Road trip or long journey", icon: "🚙" },
    public_transport: { label: "🚌 Public Transport", factor: 0.05, example: "Bus, train, metro ride", icon: "🚌" },
    bike: { label: "🚴 Bicycle", factor: 0.0, example: "Eco-friendly bike ride", icon: "🚴" },
    walk: { label: "🚶 Walking", factor: 0.0, example: "Walking to nearby places", icon: "🚶" },
    motorbike: { label: "🏍️ Motorbike", factor: 0.12, example: "Scooter or motorcycle trip", icon: "🏍️" },
  },
  energy: {
    electricity: { label: "💡 Electricity", factor: 0.5, example: "Home electricity usage", icon: "💡" },
    heating_gas: { label: "🔥 Gas Heating", factor: 0.2, example: "Natural gas for heating", icon: "🔥" },
    heating_oil: { label: "🛢️ Oil Heating", factor: 0.3, example: "Heating oil consumption", icon: "🛢️" },
  },
  food: {
    meat_meal: { label: "🥩 Meat Meal", factor: 3.3, example: "Beef, pork, or lamb meal", icon: "🥩" },
    vegetarian_meal: { label: "🥗 Vegetarian Meal", factor: 0.9, example: "Dairy and egg-based meal", icon: "🥗" },
    vegan_meal: { label: "🌱 Vegan Meal", factor: 0.6, example: "Plant-based meal only", icon: "🌱" },
    local_food: { label: "🏡 Local Food", factor: 0.5, example: "Locally sourced produce", icon: "🏡" },
    imported_food: { label: "✈️ Imported Food", factor: 1.2, example: "Food shipped from abroad", icon: "✈️" },
  },
};

const getUnit = (type) => {
  const units = {
    transport: "km",
    energy: "kWh",
    food: "meals"
  };
  return units[type] || "units";
};

const calculateCO2 = (activity) => {
  const data = activityOptions[activity.activity_type]?.[activity.subtype];
  return parseFloat(activity.amount || 0) * (data?.factor || 0); // ✅ FIXED
};

const MultiActivityLogger = ({ onActivitiesAdded }) => {
  const [activities, setActivities] = useState([]);
  const [current, setCurrent] = useState({
    activity_type: "transport",
    subtype: "car_petrol",
    amount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("transport");

  const addActivity = () => {
    if (!current.amount || parseFloat(current.amount) <= 0) {
      alert("Please enter a valid amount greater than zero");
      return;
    }

    const newEntry = {
      ...current,
      amount: parseFloat(current.amount),
      id: Date.now(),
      co2: calculateCO2(current),
      timestamp: new Date().toISOString()
    };

    setActivities([...activities, newEntry]);
    setCurrent(prev => ({
      ...prev,
      amount: "",
      description: ""
    }));
  };

  const removeActivity = (id) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const submitAll = async () => {
    if (!activities.length) {
      alert("Please add at least one activity before submitting");
      return;
    }

    setLoading(true);
    try {
      const payload = activities.map((a) => ({
        activity_type: a.activity_type,
        subtype: a.subtype,
        amount: a.amount,
        description: a.description || null,
        timestamp: a.timestamp
      }));

      await axios.post(`${API}/activities/bulk`, { activities: payload });
      setSuccessMessage(`${activities.length} activities logged successfully!`);
      setActivities([]);
      onActivitiesAdded();
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      alert(`Failed to log activities: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const totalCO2 = activities.reduce((sum, a) => sum + parseFloat(a.co2), 0);
  const currentActivityData = activityOptions[current.activity_type]?.[current.subtype];

  const ecoSavings = activities.reduce((sum, a) => {
    const baseFactor = a.activity_type === "transport" ? 0.21 :
                       a.activity_type === "food" ? 3.3 :
                       0.5;
    const thisFactor = activityOptions[a.activity_type][a.subtype].factor;
    return sum + (baseFactor - thisFactor) * a.amount;
  }, 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Track Your Carbon Footprint</h2>
        <p className="text-gray-600 mb-6">Log your daily activities to understand your environmental impact</p>

        <AnimatePresence>
          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-4 text-green-700 bg-green-50 border border-green-200 rounded-lg flex items-center"
            >
              <FiCheck className="mr-2" />
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {Object.keys(activityOptions).map((type) => (
            <button
              key={type}
              className={`px-4 py-2 font-medium text-sm flex items-center ${
                activeTab === type
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => {
                setActiveTab(type);
                setCurrent(prev => ({
                  ...prev,
                  activity_type: type,
                  subtype: Object.keys(activityOptions[type])[0]
                }));
              }}
            >
              {type === "transport" && "🚗"}
              {type === "energy" && "⚡"}
              {type === "food" && "🍽️"}
              <span className="ml-2 capitalize">{type}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
            <select
              value={current.subtype}
              onChange={(e) => setCurrent({ ...current, subtype: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.entries(activityOptions[current.activity_type] || {}).map(([key, data]) => (
                <option key={key} value={key}>
                {data.label}
              </option>
              
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ({getUnit(current.activity_type)})
            </label>
            <input
              type="number"
              min="0"
              step={current.activity_type === "food" ? "1" : "0.1"}
              placeholder={`Enter ${getUnit(current.activity_type)}`}
              value={current.amount}
              onChange={(e) => setCurrent({ ...current, amount: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <input
            type="text"
            placeholder="e.g. 'Commute to work', 'Dinner'"
            value={current.description}
            onChange={(e) => setCurrent({ ...current, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {current.amount && parseFloat(current.amount) > 0 && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center text-blue-800">
              <FiInfo className="mr-2" />
              <span className="font-medium">
                CO₂ Impact: {calculateCO2(current).toFixed(2)} kg
              </span>
            </div>
            <p className="mt-1 text-sm text-blue-700">{currentActivityData?.example}</p>
          </div>
        )}

        <button
          onClick={addActivity}
          disabled={!current.amount || parseFloat(current.amount) <= 0}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className="mr-2" />
          Add Activity
        </button>
      </div>

      {/* Activity List */}
      {activities.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Your Activities</h3>
            <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
              <span className="font-medium">{activities.length}</span> items
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <AnimatePresence>
              {activities.map((a) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">
                      {activityOptions[a.activity_type][a.subtype].icon}
                    </span>
                    <div>
                      <div className="font-medium">
                        {activityOptions[a.activity_type][a.subtype].label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {a.amount} {getUnit(a.activity_type)}
                        {a.description && <span> • {a.description}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium text-red-600">
                        {parseFloat(a.co2).toFixed(2)} kg CO₂
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <button
                      onClick={() => removeActivity(a.id)}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                      aria-label="Remove activity"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="text-sm text-red-800 mb-1">Total CO₂ Emissions</div>
              <div className="text-2xl font-bold text-red-600">
                {totalCO2.toFixed(2)} kg
              </div>
            </div>
            {ecoSavings > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="text-sm text-green-800 mb-1">CO₂ Savings</div>
                <div className="text-2xl font-bold text-green-600">
                  {ecoSavings.toFixed(2)} kg
                </div>
                <div className="text-xs text-green-700 mt-1">
                  Compared to least eco-friendly options
                </div>
              </div>
            )}
          </div>

          <button
            onClick={submitAll}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FiZap className="mr-2" />
                Submit All Activities
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MultiActivityLogger;
