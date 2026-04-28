import {
  Package,
  Truck,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Zap,
  Shield,
  Activity,
  Plus,
  BarChart3,
  Globe,
} from "lucide-react";
import { Link } from "react-router";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$2,847,500",
      change: "+24.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Active Shipments",
      value: "1,243",
      change: "+8.2%",
      trend: "up",
      icon: Truck,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Stock Value",
      value: "$845,200",
      change: "-3.1%",
      trend: "down",
      icon: Package,
      color: "from-orange-500 to-amber-600",
    },
    {
      title: "Customer Sat.",
      value: "98.2%",
      change: "+2.4%",
      trend: "up",
      icon: Activity,
      color: "from-purple-500 to-pink-600",
    },
  ];

  const salesData = [
    { month: "Jan", sales: 450000 },
    { month: "Feb", sales: 520000 },
    { month: "Mar", sales: 480000 },
    { month: "Apr", sales: 610000 },
    { month: "May", sales: 550000 },
    { month: "Jun", sales: 670000 },
  ];

  const shipmentPerformance = [
    { name: "On Time", value: 85, color: "#10b981" },
    { name: "Delayed", value: 10, color: "#f59e0b" },
    { name: "Critical", value: 5, color: "#ef4444" },
  ];

  const userName = localStorage.getItem("user_name") || "Commander";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Hiii, <span className="text-blue-400">{userName}.</span>
            </h1>
            <p className="text-lg text-blue-100/80 font-medium">
              Your supply chain is operating at <span className="text-green-400 font-bold">94% efficiency</span> today.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-xs uppercase tracking-widest text-blue-200 font-bold">System Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="font-bold">ALL SYSTEMS NOMINAL</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <p className="text-xs uppercase tracking-widest text-blue-200 font-bold">Region</p>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="w-4 h-4 text-blue-300" />
                <span className="font-bold">GLOBAL OPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Revenue Dynamics</h3>
              <p className="text-sm text-gray-500">Global sales performance vs last quarter</p>
            </div>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none ring-2 ring-gray-100">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions - THE CORE NAVIGATION FIX */}
        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl text-white">
          <h3 className="text-xl font-bold mb-6 tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Quick Ops
          </h3>
          <div className="space-y-4">
            <Link 
              to="/inventory" 
              state={{ openAddModal: true }}
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/10 hover:bg-white hover:text-slate-900 border border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">New Product</span>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>

            <Link 
              to="/orders"
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/10 hover:bg-white hover:text-slate-900 border border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">Create Order</span>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>

            <Link 
              to="/shipments"
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/10 hover:bg-white hover:text-slate-900 border border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">Track Shipment</span>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>

            <Link 
              to="/analytics"
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/10 hover:bg-white hover:text-slate-900 border border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">BI Reports</span>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
            <Shield className="absolute bottom-0 right-0 -mb-4 -mr-4 w-24 h-24 text-white/10" />
            <h4 className="font-bold text-lg mb-1">Security Audit</h4>
            <p className="text-sm text-blue-100 mb-4 opacity-80">Last audit: 2h ago</p>
            <button className="w-full py-2 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
              Verify Integrity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
