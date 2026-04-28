import { Leaf, Truck, Recycle, Droplet, Zap, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function Sustainability() {
  const carbonData = [
    { month: "Jan", emissions: 450, offset: 420 },
    { month: "Feb", emissions: 420, offset: 430 },
    { month: "Mar", emissions: 390, offset: 440 },
    { month: "Apr", emissions: 370, offset: 450 },
    { month: "May", emissions: 340, offset: 460 },
    { month: "Jun", emissions: 310, offset: 470 },
  ];

  const deliveryMethodData = [
    { name: "Electric Vehicles", value: 35, color: "#10b981" },
    { name: "Hybrid Vehicles", value: 30, color: "#3b82f6" },
    { name: "Bike Couriers", value: 15, color: "#8b5cf6" },
    { name: "Standard Fleet", value: 20, color: "#f59e0b" },
  ];

  const wasteData = [
    { month: "Jan", recycled: 85, reduced: 10, landfill: 5 },
    { month: "Feb", recycled: 87, reduced: 11, landfill: 2 },
    { month: "Mar", recycled: 89, reduced: 9, landfill: 2 },
    { month: "Apr", recycled: 91, reduced: 8, landfill: 1 },
    { month: "May", recycled: 93, reduced: 6, landfill: 1 },
    { month: "Jun", recycled: 95, reduced: 4, landfill: 1 },
  ];

  const sustainabilityMetrics = [
    {
      title: "Carbon Footprint",
      value: "310 tons",
      change: "-31.1%",
      icon: Leaf,
      color: "green",
      description: "CO₂ emissions this month",
    },
    {
      title: "Green Deliveries",
      value: "80%",
      change: "+15.2%",
      icon: Truck,
      color: "blue",
      description: "Eco-friendly shipping",
    },
    {
      title: "Waste Reduction",
      value: "95%",
      change: "+12.5%",
      icon: Recycle,
      color: "purple",
      description: "Recycling rate",
    },
    {
      title: "Energy Savings",
      value: "42%",
      change: "+8.3%",
      icon: Zap,
      color: "yellow",
      description: "Compared to baseline",
    },
  ];

  const initiatives = [
    {
      id: 1,
      title: "Electric Vehicle Fleet",
      description: "Transitioning 80% of delivery fleet to electric vehicles by 2027",
      progress: 35,
      impact: "Reduces CO₂ by 45%",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Sustainable Packaging",
      description: "100% recyclable and biodegradable packaging materials",
      progress: 78,
      impact: "Eliminates 120 tons of plastic waste",
      status: "On Track",
    },
    {
      id: 3,
      title: "Solar-Powered Warehouses",
      description: "Installing solar panels across all distribution centers",
      progress: 52,
      impact: "40% reduction in grid energy",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Carbon Offset Program",
      description: "Investing in reforestation and renewable energy projects",
      progress: 90,
      impact: "Offset 470 tons CO₂ annually",
      status: "Exceeding Goals",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Leaf className="w-8 h-8 text-green-600" />
            Sustainability Tracker
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor environmental impact and eco-friendly initiatives
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
          <Leaf className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-900">Carbon Neutral Goal 2027</span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sustainabilityMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <span className="text-sm font-medium text-green-600">{metric.change}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm font-medium text-gray-900">{metric.title}</p>
              <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Carbon Footprint Tracking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Carbon Footprint Tracking & Offset
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={carbonData}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOffset" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="emissions"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#colorEmissions)"
              name="CO₂ Emissions (tons)"
            />
            <Area
              type="monotone"
              dataKey="offset"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorOffset)"
              name="Carbon Offset (tons)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Green Delivery Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Green Delivery Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deliveryMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {deliveryMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Reduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Reduction Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Bar dataKey="recycled" stackId="a" fill="#10b981" name="Recycled %" />
              <Bar dataKey="reduced" stackId="a" fill="#3b82f6" name="Reduced %" />
              <Bar dataKey="landfill" stackId="a" fill="#ef4444" name="Landfill %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sustainability Initiatives */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sustainability Initiatives</h3>
        <div className="space-y-4">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{initiative.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{initiative.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    initiative.status === "Exceeding Goals"
                      ? "bg-green-100 text-green-800"
                      : initiative.status === "On Track"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {initiative.status}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{initiative.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Impact: {initiative.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Score */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Overall Sustainability Score</h3>
            <p className="text-green-100 mb-4">
              Your supply chain is performing exceptionally well on environmental metrics
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-bold">87.4</span>
              <span className="text-2xl">/100</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingDown className="w-5 h-5" />
              <span className="text-sm">15.3% improvement from last quarter</span>
            </div>
          </div>
          <div className="text-right">
            <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
              <Leaf className="w-20 h-20" />
            </div>
            <p className="text-sm opacity-90">Certified Green Business</p>
          </div>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Droplet className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Water Saved</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">1.2M gal</p>
          <p className="text-sm text-gray-600 mt-1">Through efficiency programs</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Recycle className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Materials Recycled</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">145 tons</p>
          <p className="text-sm text-gray-600 mt-1">Packaging and materials</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Renewable Energy</h4>
          </div>
          <p className="text-3xl font-bold text-gray-900">52%</p>
          <p className="text-sm text-gray-600 mt-1">Of total energy consumption</p>
        </div>
      </div>
    </div>
  );
}
