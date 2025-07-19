// Mock data for ecoTrack application
export const userStats = {
  totalCarbonSaved: 2340, // kg CO2
  recyclingScore: 87, // percentage
  energySaved: 1250, // kWh
  transportScore: 92, // eco-friendly transport percentage
  weeklyProgress: 78, // overall weekly progress
  monthlyGoal: 3000, // monthly carbon reduction goal
  currentStreak: 12, // days of consistent eco-actions
  dailyCarbonFootprint: 18.5, // kg CO2 today
  weeklyAverage: 21.3, // kg CO2 per day average this week
  monthlyTotal: 612.8, // kg CO2 this month
  aiRecommendationsUsed: 23, // number of AI suggestions followed
  personalizedPlanProgress: 76 // percentage of personal plan completed
};

export const environmentalImpact = [
  {
    category: "Carbon Footprint",
    currentMonth: 450,
    lastMonth: 520,
    unit: "kg CO2",
    trend: -13.5,
    icon: "🌱",
    color: "#22c55e"
  },
  {
    category: "Recycling",
    currentMonth: 89,
    lastMonth: 76,
    unit: "% recycled",
    trend: 17.1,
    icon: "♻️",
    color: "#3b82f6"
  },
  {
    category: "Energy Usage",
    currentMonth: 320,
    lastMonth: 380,
    unit: "kWh",
    trend: -15.8,
    icon: "⚡",
    color: "#eab308"
  },
  {
    category: "Transport",
    currentMonth: 95,
    lastMonth: 78,
    unit: "% eco-friendly",
    trend: 21.8,
    icon: "🚴",
    color: "#06b6d4"
  }
];

export const dailyTracking = [
  { date: "Today", carbon: 18.5, target: 20, aiSuggestions: 3 },
  { date: "Yesterday", carbon: 22.1, target: 20, aiSuggestions: 2 },
  { date: "2 days ago", carbon: 19.3, target: 20, aiSuggestions: 4 },
  { date: "3 days ago", carbon: 17.8, target: 20, aiSuggestions: 2 },
  { date: "4 days ago", carbon: 25.6, target: 20, aiSuggestions: 5 },
  { date: "5 days ago", carbon: 21.4, target: 20, aiSuggestions: 3 },
  { date: "6 days ago", carbon: 16.9, target: 20, aiSuggestions: 1 }
];

export const weeklyTracking = [
  { week: "This Week", carbon: 149.2, target: 140, improvement: 12.3 },
  { week: "Last Week", carbon: 171.5, target: 140, improvement: 8.7 },
  { week: "2 weeks ago", carbon: 187.3, target: 140, improvement: 5.2 },
  { week: "3 weeks ago", carbon: 198.1, target: 140, improvement: 2.1 }
];

export const monthlyTracking = [
  { month: "This Month", carbon: 612.8, target: 580, planCompletion: 76 },
  { month: "Last Month", carbon: 698.4, target: 650, planCompletion: 68 },
  { month: "2 months ago", carbon: 742.1, target: 700, planCompletion: 61 },
  { month: "3 months ago", carbon: 789.5, target: 750, planCompletion: 54 }
];

export const aiRecommendations = [
  {
    id: 1,
    category: "Transport",
    suggestion: "Take the metro instead of car for your 9 AM meeting",
    impact: "Save 4.2kg CO2",
    difficulty: "Easy",
    timeToComplete: "0 min",
    aiConfidence: 94
  },
  {
    id: 2,
    category: "Energy",
    suggestion: "Adjust thermostat to 68°F during work hours",
    impact: "Save 1.8kg CO2 daily",
    difficulty: "Easy",
    timeToComplete: "1 min",
    aiConfidence: 89
  },
  {
    id: 3,
    category: "Diet",
    suggestion: "Try plant-based lunch 2x this week",
    impact: "Save 6.3kg CO2",
    difficulty: "Medium",
    timeToComplete: "30 min prep",
    aiConfidence: 92
  },
  {
    id: 4,
    category: "Shopping",
    suggestion: "Buy local produce at farmer's market",
    impact: "Save 2.1kg CO2",
    difficulty: "Easy",
    timeToComplete: "15 min detour",
    aiConfidence: 88
  }
];

export const ecoActions = [
  {
    id: 1,
    action: "Used public transport",
    impact: "Saved 2.5kg CO2",
    points: 25,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    action: "Recycled plastic bottles",
    impact: "Diverted 0.8kg waste",
    points: 15,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    action: "Switched to LED bulbs",
    impact: "Save 40kWh monthly",
    points: 50,
    timestamp: "1 day ago"
  },
  {
    id: 4,
    action: "Planted a tree",
    impact: "Absorbs 21kg CO2/year",
    points: 100,
    timestamp: "2 days ago"
  }
];

export const globalImpact = {
  totalUsers: 2847392,
  carbonSavedGlobally: 45287.3, // tons CO2
  treesPlanted: 892847,
  plasticRecycled: 23847.2 // tons
};

export const features = [
  {
    title: "AI-Powered Carbon Insights",
    description: "Advanced AI analyzes your daily activities and provides personalized recommendations to reduce your carbon footprint with real-time tracking.",
    icon: "🤖",
    demoData: { 
      dailyFootprint: 18.5, 
      weeklyAverage: 21.3, 
      monthlyTarget: 580, 
      aiSuggestions: 4,
      unit: "kg CO2" 
    }
  },
  {
    title: "Smart Daily Tracking",
    description: "Track your carbon footprint hour by hour with intelligent activity recognition and get instant feedback on your environmental impact.",
    icon: "📊",
    demoData: { 
      today: 18.5, 
      yesterday: 22.1, 
      target: 20, 
      trend: -16.3,
      unit: "kg CO2"
    }
  },
  {
    title: "Personalized Action Plans",
    description: "Receive AI-generated weekly and monthly action plans tailored to your lifestyle, with achievable goals and progress tracking.",
    icon: "🎯",
    demoData: { 
      planProgress: 76, 
      completedActions: 23, 
      totalActions: 30, 
      weeklyGoal: 140,
      unit: "% complete"
    }
  },
  {
    title: "Intelligent Recommendations",
    description: "Get real-time, context-aware suggestions based on your location, schedule, and preferences to minimize your environmental impact.",
    icon: "💡",
    demoData: { 
      activeSuggestions: 4, 
      todaysSavings: 6.8, 
      acceptanceRate: 87,
      avgImpact: 3.2,
      unit: "kg CO2 saved"
    }
  }
];