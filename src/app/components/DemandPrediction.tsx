import { Brain, TrendingUp, AlertCircle, CheckCircle, Sparkles, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function DemandPrediction() {
  const predictionData = [
    { month: "Jul", actual: 180, predicted: 185, confidence: 92 },
    { month: "Aug", actual: null, predicted: 195, confidence: 89 },
    { month: "Sep", actual: null, predicted: 210, confidence: 87 },
    { month: "Oct", actual: null, predicted: 205, confidence: 85 },
    { month: "Nov", actual: null, predicted: 230, confidence: 83 },
    { month: "Dec", actual: null, predicted: 280, confidence: 80 },
  ];

  const seasonalData = [
    { season: "Q1", demand: 450, trend: "Moderate" },
    { season: "Q2", demand: 520, trend: "Growing" },
    { season: "Q3", demand: 580, trend: "Peak" },
    { season: "Q4", demand: 720, trend: "Holiday Peak" },
  ];

  const productPredictions = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      currentStock: 145,
      predictedDemand: 280,
      recommendation: "Increase stock by 135 units",
      confidence: 94,
      trend: "up",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      currentStock: 12,
      predictedDemand: 95,
      recommendation: "Critical: Order 83+ units immediately",
      confidence: 91,
      trend: "up",
    },
    {
      id: 3,
      name: "Designer Sneakers",
      currentStock: 89,
      predictedDemand: 110,
      recommendation: "Moderate increase: Add 21 units",
      confidence: 88,
      trend: "up",
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      currentStock: 34,
      predictedDemand: 45,
      recommendation: "Minor increase: Add 11 units",
      confidence: 86,
      trend: "up",
    },
  ];

  const aiInsights = [
    {
      id: 1,
      type: "success",
      title: "High Demand Alert",
      message: "Electronics category expected to surge by 45% in next quarter",
    },
    {
      id: 2,
      type: "warning",
      title: "Stock Optimization",
      message: "12 products require restocking within next 2 weeks",
    },
    {
      id: 3,
      type: "info",
      title: "Seasonal Trend",
      message: "Holiday season spike predicted starting November",
    },
    {
      id: 4,
      type: "success",
      title: "Cost Savings",
      message: "AI optimization could save $15,000 in carrying costs",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            AI-Powered Demand Prediction
          </h1>
          <p className="text-gray-600 mt-1">
            Smart forecasting and inventory optimization powered by machine learning
          </p>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-900">AI Model Active</span>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Brain className="w-8 h-8" />
            <h3 className="font-semibold">AI Accuracy</h3>
          </div>
          <p className="text-3xl font-bold">94.2%</p>
          <p className="text-sm opacity-90 mt-1">Prediction accuracy rate</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-8 h-8" />
            <h3 className="font-semibold">Forecast Horizon</h3>
          </div>
          <p className="text-3xl font-bold">6 Months</p>
          <p className="text-sm opacity-90 mt-1">Prediction window</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-8 h-8" />
            <h3 className="font-semibold">Products Analyzed</h3>
          </div>
          <p className="text-3xl font-bold">2,847</p>
          <p className="text-sm opacity-90 mt-1">In AI database</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-8 h-8" />
            <h3 className="font-semibold">Optimization</h3>
          </div>
          <p className="text-3xl font-bold">$28,400</p>
          <p className="text-sm opacity-90 mt-1">Potential savings</p>
        </div>
      </div>

      {/* Demand Forecast Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Month Demand Forecast</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              strokeWidth={3}
              name="Actual Demand"
              dot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8b5cf6"
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Predicted Demand"
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Seasonal Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Demand Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={seasonalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="season" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Bar dataKey="demand" fill="#8b5cf6" name="Predicted Demand" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product-Level Predictions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Smart Stock Optimization Recommendations
        </h3>
        <div className="space-y-4">
          {productPredictions.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{product.recommendation}</p>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-lg">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">
                    {product.confidence}% confident
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Current Stock</p>
                  <p className="text-lg font-bold text-gray-900">{product.currentStock}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Predicted Demand</p>
                  <p className="text-lg font-bold text-purple-600">{product.predictedDemand}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Gap</p>
                  <p className="text-lg font-bold text-red-600">
                    -{product.predictedDemand - product.currentStock}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI-Generated Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${
                insight.type === "success"
                  ? "bg-green-50 border-green-200"
                  : insight.type === "warning"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {insight.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : insight.type === "warning" ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600">{insight.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
