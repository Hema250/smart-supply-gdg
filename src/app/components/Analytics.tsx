import { Download, TrendingUp, DollarSign, Package, Users } from "lucide-react";
import { toast } from "sonner";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export function Analytics() {
  const handleDownload = () => {
    const csvContent = "Month,Revenue,Profit,Orders\n" + 
      salesData.map(d => `${d.month},${d.revenue},${d.profit},${d.orders}`).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SupplyChain_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Report downloaded successfully!");
  };

  const salesData = [
    { month: "Jan", revenue: 45000, profit: 12000, orders: 120 },
    { month: "Feb", revenue: 52000, profit: 15000, orders: 145 },
    { month: "Mar", revenue: 48000, profit: 13500, orders: 130 },
    { month: "Apr", revenue: 61000, profit: 18000, orders: 165 },
    { month: "May", revenue: 55000, profit: 16500, orders: 150 },
    { month: "Jun", revenue: 67000, profit: 20000, orders: 180 },
  ];

  const categoryData = [
    { name: "Electronics", value: 35, color: "#3b82f6" },
    { name: "Footwear", value: 25, color: "#10b981" },
    { name: "Furniture", value: 20, color: "#f59e0b" },
    { name: "Apparel", value: 15, color: "#ef4444" },
    { name: "Others", value: 5, color: "#8b5cf6" },
  ];

  const demandData = [
    { month: "Jan", demand: 85, supply: 90 },
    { month: "Feb", demand: 92, supply: 88 },
    { month: "Mar", demand: 88, supply: 92 },
    { month: "Apr", demand: 95, supply: 93 },
    { month: "May", demand: 90, supply: 95 },
    { month: "Jun", demand: 97, supply: 96 },
  ];

  const performanceMetrics = [
    { metric: "Inventory Turnover", value: 85 },
    { metric: "Order Fulfillment", value: 92 },
    { metric: "Supplier Rating", value: 88 },
    { metric: "Customer Satisfaction", value: 94 },
    { metric: "Delivery Speed", value: 90 },
    { metric: "Stock Accuracy", value: 96 },
  ];

  const kpis = [
    {
      title: "Total Revenue",
      value: "$328,000",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Growth Rate",
      value: "24.5%",
      change: "+5.3%",
      trend: "up",
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Products Sold",
      value: "890",
      change: "+12.1%",
      trend: "up",
      icon: Package,
      color: "purple",
    },
    {
      title: "Active Customers",
      value: "1,247",
      change: "+8.7%",
      trend: "up",
      icon: Users,
      color: "yellow",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into your supply chain performance
          </p>
        </div>
      <button 
        onClick={handleDownload}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg active:scale-95"
      >
        <Download className="w-5 h-5" />
        Download Report
      </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-${kpi.color}-100 rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
                <span className="text-sm font-medium text-green-600">{kpi.change}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-sm text-gray-600">{kpi.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Profit Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorProfit)"
                name="Profit ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand vs Supply Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demand vs Supply Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="#ef4444"
                strokeWidth={2}
                name="Demand %"
              />
              <Line
                type="monotone"
                dataKey="supply"
                stroke="#10b981"
                strokeWidth={2}
                name="Supply %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceMetrics}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Orders Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Orders Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#3b82f6" name="Total Orders" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Revenue Growth</h4>
          <p className="text-3xl font-bold mb-2">+49.1%</p>
          <p className="text-sm opacity-90">Year over year revenue increase</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Efficiency Score</h4>
          <p className="text-3xl font-bold mb-2">92.4%</p>
          <p className="text-sm opacity-90">Overall supply chain efficiency</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Cost Savings</h4>
          <p className="text-3xl font-bold mb-2">$45,200</p>
          <p className="text-sm opacity-90">Saved through optimization</p>
        </div>
      </div>
    </div>
  );
}
