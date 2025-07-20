import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useAuth } from '../context/AuthContext.jsx';
import Chatbot from './Chatbot.jsx';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-md px-3 py-2 text-sm">
        <p className="font-medium text-gray-800">{payload[0].name}</p>
        <p className="text-gray-600">{payload[0].value.toFixed(2)} kg CO₂</p>
      </div>
    );
  }
  return null;
};

const Dashboard = ({ summary }) => {
  const { user } = useAuth();

  if (!summary) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading your environmental impact data...</p>
      </div>
    );
  }

  const formatCO2 = (value) => (value ? value.toFixed(2) : '0.00');

  const getCO2Comparison = (kg) => {
    if (kg < 1) return { text: "🌱 Excellent! Very low impact", color: "text-green-600" };
    if (kg < 5) return { text: "✨ Good! Below average impact", color: "text-blue-600" };
    if (kg < 10) return { text: "⚠️ Moderate impact", color: "text-yellow-600" };
    return { text: "🔴 High impact - consider alternatives", color: "text-red-600" };
  };

  const todayComparison = getCO2Comparison(summary.total_co2_today);

  const pieData = [
    { name: 'Transportation', value: summary.breakdown_by_category.transport, color: COLORS[0] },
    { name: 'Energy', value: summary.breakdown_by_category.energy, color: COLORS[1] },
    { name: 'Food', value: summary.breakdown_by_category.food, color: COLORS[2] },
    { name: 'Other', value: summary.breakdown_by_category.other || 0, color: COLORS[3] },
  ];

  const totalBreakdown = pieData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
        <p className="text-green-100">Here's your environmental impact summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-3xl font-bold text-green-600">{formatCO2(summary.total_co2_today)}</div>
          <div className="text-sm text-gray-600">kg CO₂ Today</div>
          <div className={`text-xs mt-1 ${todayComparison.color}`}>{todayComparison.text}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-3xl font-bold text-blue-600">{formatCO2(summary.total_co2_week)}</div>
          <div className="text-sm text-gray-600">kg CO₂ This Week</div>
          <div className="text-xs text-gray-500 mt-1">Avg: {formatCO2(summary.total_co2_week / 7)} kg/day</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-3xl font-bold text-purple-600">{summary.user_stats?.total_activities_month || 0}</div>
          <div className="text-sm text-gray-600">Activities This Month</div>
          <div className="text-xs text-gray-500 mt-1">{summary.user_stats?.days_tracked || 0} days tracked</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="text-3xl font-bold text-orange-600">{formatCO2(summary.user_stats?.avg_daily_co2 || 0)}</div>
          <div className="text-sm text-gray-600">Avg Daily CO₂</div>
          <div className="text-xs text-gray-500 mt-1">This month</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🌍 Monthly Breakdown</h3>
          <p className="text-sm text-gray-500 mb-4">Your total CO₂ emissions by activity</p>

          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 10 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-lg font-bold text-green-600">{totalBreakdown.toFixed(1)} kg</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            {pieData.map((entry, index) => {
              const percent = ((entry.value / totalBreakdown) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                  {entry.name}: {entry.value.toFixed(2)} kg ({percent}%)
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🕒 Recent Activities</h3>
          {summary.recent_activities && summary.recent_activities.length > 0 ? (
            <ul className="space-y-4 divide-y divide-gray-100">
              {summary.recent_activities.map((activity, index) => (
                <li key={index} className="pt-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-gray-800 capitalize">{activity.subtype.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-gray-500">{activity.amount} {activity.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{formatCO2(activity.calculated_co2)} kg CO₂</p>
                      <p className="text-xs text-gray-400">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No activities yet. Start logging to see your impact!</p>
            </div>
          )}
        </div>
      </div>

      <Chatbot summary={summary} userName={user?.name} />
    </div>
  );
};

export default Dashboard;
