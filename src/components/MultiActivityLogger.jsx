import React, { useState } from "react";
import axios from "axios";

const API = "https://eco-backend-2.onrender.com/api";


const activityOptions = {
  transport: {
    car_petrol: { label: "🚗 Car (Petrol)", factor: 0.21, example: "Daily commute to work" },
    car_diesel: { label: "🚙 Car (Diesel)", factor: 0.18, example: "Road trip or long journey" },
    public_transport: { label: "🚌 Public Transport", factor: 0.05, example: "Bus, train, metro ride" },
    bike: { label: "🚴 Bicycle", factor: 0.0, example: "Eco-friendly bike ride" },
    walk: { label: "🚶 Walking", factor: 0.0, example: "Walking to nearby places" },
    motorbike: { label: "🏍️ Motorbike", factor: 0.12, example: "Scooter or motorcycle trip" },
  },
  energy: {
    electricity: { label: "💡 Electricity", factor: 0.5, example: "Home electricity usage" },
    heating_gas: { label: "🔥 Gas Heating", factor: 0.2, example: "Natural gas for heating" },
    heating_oil: { label: "🛢️ Oil Heating", factor: 0.3, example: "Heating oil consumption" },
  },
  food: {
    meat_meal: { label: "🥩 Meat Meal", factor: 3.3, example: "Beef, pork, or lamb meal" },
    vegetarian_meal: { label: "🥗 Vegetarian Meal", factor: 0.9, example: "Dairy and egg-based meal" },
    vegan_meal: { label: "🌱 Vegan Meal", factor: 0.6, example: "Plant-based meal only" },
    local_food: { label: "🏡 Local Food", factor: 0.5, example: "Locally sourced produce" },
    imported_food: { label: "✈️ Imported Food", factor: 1.2, example: "Food shipped from abroad" },
  },
};

const getUnit = (type) => {
  if (type === "transport") return "km";
  if (type === "energy") return "kWh";
  if (type === "food") return "meals";
  return "units";
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

  const calculateCO2 = (activity) => {
    const data = activityOptions[activity.activity_type]?.[activity.subtype];
    return (parseFloat(activity.amount || 0) * (data?.factor || 0)).toFixed(2);
  };

  const addActivity = () => {
    if (!current.amount || parseFloat(current.amount) <= 0) return alert("Invalid amount");

    const newEntry = {
      ...current,
      amount: parseFloat(current.amount),
      id: Date.now(),
      co2: calculateCO2(current),
    };
    setActivities([...activities, newEntry]);
    setCurrent({ activity_type: "transport", subtype: "car_petrol", amount: "", description: "" });
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const submitAll = async () => {
    if (!activities.length) return alert("Add at least one activity");
    setLoading(true);
    try {
      const payload = activities.map((a) => ({
        activity_type: a.activity_type,
        subtype: a.subtype,
        amount: a.amount,
        description: a.description || null,
      }));
      await axios.post(`${API}/activities/bulk`, { activities: payload });
      setSuccessMessage(`✅ ${activities.length} activities logged!`);
      setActivities([]);
      onActivitiesAdded();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      alert("Failed to log activities");
    } finally {
      setLoading(false);
    }
  };

  const totalCO2 = activities.reduce((sum, a) => sum + parseFloat(a.co2), 0);

  const currentActivityData = activityOptions[current.activity_type]?.[current.subtype];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-bold mb-4">Log Your Activities</h2>

        {successMessage && (
          <div className="mb-4 p-4 text-green-700 bg-green-100 border rounded">{successMessage}</div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label>Activity Type</label>
            <select
              value={current.activity_type}
              onChange={(e) =>
                setCurrent({ ...current, activity_type: e.target.value, subtype: Object.keys(activityOptions[e.target.value])[0], amount: "" })
              }
              className="w-full p-2 border rounded"
            >
              <option value="transport">Transportation</option>
              <option value="energy">Energy Usage</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div>
            <label>Activity Subtype</label>
            <select
              value={current.subtype}
              onChange={(e) => setCurrent({ ...current, subtype: e.target.value, amount: "" })}
              className="w-full p-2 border rounded"
            >
              {Object.entries(activityOptions[current.activity_type] || {}).map(([key, data]) => (
                <option key={key} value={key}>{data.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="number"
            placeholder={`Amount (${getUnit(current.activity_type)})`}
            value={current.amount}
            onChange={(e) => setCurrent({ ...current, amount: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Optional Description"
            value={current.description}
            onChange={(e) => setCurrent({ ...current, description: e.target.value })}
            className="p-2 border rounded"
          />
        </div>

        {current.amount && (
          <div className="mb-4 text-orange-600">
            CO₂ Impact: {calculateCO2(current)} kg • Example: {currentActivityData?.example}
          </div>
        )}

        <button onClick={addActivity} className="bg-blue-600 text-white py-2 px-4 rounded">➕ Add Activity</button>
      </div>

      {activities.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-xl font-bold mb-4">Activity List</h3>
          <div className="space-y-2 mb-4">
            {activities.map((a, i) => (
              <div key={a.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <div>
                  <strong>{activityOptions[a.activity_type][a.subtype].label}</strong> – {a.amount} {getUnit(a.activity_type)} → {a.co2} kg CO₂
                  {a.description && <span> • {a.description}</span>}
                </div>
                <button onClick={() => removeActivity(i)} className="text-red-600">Remove</button>
              </div>
            ))}
          </div>
          <div className="mb-4 font-medium">Total CO₂: {totalCO2.toFixed(2)} kg</div>
          <button onClick={submitAll} disabled={loading} className="bg-green-600 text-white py-2 px-4 rounded">
            {loading ? "Submitting..." : `🚀 Submit ${activities.length} Activities`}
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiActivityLogger;
