import { useState } from "react";
import {
  Search,
  MapPin,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Shipments() {
  const [searchTerm, setSearchTerm] = useState("");

  const shipments = [
    {
      id: "SHP-7832",
      orderId: "ORD-4521",
      partner: "FedEx Express",
      route: "New York → Los Angeles",
      estimatedDelivery: "2026-05-02",
      status: "In Transit",
      progress: 65,
      currentLocation: "Denver, CO",
    },
    {
      id: "SHP-7833",
      orderId: "ORD-4522",
      partner: "UPS Ground",
      route: "Chicago → Miami",
      estimatedDelivery: "2026-05-01",
      status: "In Transit",
      progress: 80,
      currentLocation: "Atlanta, GA",
    },
    {
      id: "SHP-7831",
      orderId: "ORD-4520",
      partner: "DHL Express",
      route: "Seattle → Boston",
      estimatedDelivery: "2026-04-30",
      status: "Delivered",
      progress: 100,
      currentLocation: "Boston, MA",
    },
    {
      id: "SHP-7830",
      orderId: "ORD-4519",
      partner: "USPS Priority",
      route: "San Francisco → Dallas",
      estimatedDelivery: "2026-05-03",
      status: "Delayed",
      progress: 45,
      currentLocation: "Phoenix, AZ",
    },
    {
      id: "SHP-7829",
      orderId: "ORD-4518",
      partner: "FedEx Ground",
      route: "Houston → Philadelphia",
      estimatedDelivery: "2026-05-04",
      status: "In Transit",
      progress: 30,
      currentLocation: "Memphis, TN",
    },
  ];

  const performanceData = [
    { month: "Jan", onTime: 94, delayed: 6 },
    { month: "Feb", onTime: 96, delayed: 4 },
    { month: "Mar", onTime: 93, delayed: 7 },
    { month: "Apr", onTime: 95, delayed: 5 },
    { month: "May", onTime: 97, delayed: 3 },
    { month: "Jun", onTime: 98, delayed: 2 },
  ];

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.partner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inTransitCount = shipments.filter((s) => s.status === "In Transit").length;
  const deliveredCount = shipments.filter((s) => s.status === "Delivered").length;
  const delayedCount = shipments.filter((s) => s.status === "Delayed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shipments Tracking</h1>
        <p className="text-gray-600 mt-1">Monitor shipments and delivery performance in real-time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Shipments</p>
              <p className="text-2xl font-bold text-gray-900">{shipments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-900">{inTransitCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{deliveredCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Delayed</p>
              <p className="text-2xl font-bold text-gray-900">{delayedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Shipment ID, Order ID, or carrier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.map((shipment) => (
          <div
            key={shipment.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    shipment.status === "Delivered"
                      ? "bg-green-100"
                      : shipment.status === "Delayed"
                      ? "bg-red-100"
                      : "bg-blue-100"
                  }`}
                >
                  {shipment.status === "Delivered" ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : shipment.status === "Delayed" ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : (
                    <Truck className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{shipment.id}</h3>
                  <p className="text-sm text-gray-600">Order: {shipment.orderId}</p>
                </div>
              </div>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  shipment.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : shipment.status === "Delayed"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {shipment.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Carrier</p>
                <p className="font-medium text-gray-900">{shipment.partner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Route</p>
                <p className="font-medium text-gray-900">{shipment.route}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                <p className="font-medium text-gray-900">{shipment.estimatedDelivery}</p>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{shipment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    shipment.status === "Delivered"
                      ? "bg-green-500"
                      : shipment.status === "Delayed"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${shipment.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
              <MapPin className="w-4 h-4" />
              Current Location: <span className="font-medium text-gray-900">{shipment.currentLocation}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Performance Analytics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="onTime"
              stroke="#10b981"
              strokeWidth={2}
              name="On Time %"
            />
            <Line
              type="monotone"
              dataKey="delayed"
              stroke="#ef4444"
              strokeWidth={2}
              name="Delayed %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Route Optimization */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white border border-white/10">
        <h3 className="text-xl font-semibold mb-3">Route Optimization Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/30 rounded-lg p-4 backdrop-blur-md border border-white/20">
            <p className="text-sm mb-1 opacity-90">Average Delivery Time</p>
            <p className="text-2xl font-bold">2.8 days</p>
            <p className="text-xs mt-1 opacity-80">12% faster than last month</p>
          </div>
          <div className="bg-white/30 rounded-lg p-4 backdrop-blur-md border border-white/20">
            <p className="text-sm mb-1 opacity-90">Route Efficiency</p>
            <p className="text-2xl font-bold">94.2%</p>
            <p className="text-xs mt-1 opacity-80">Optimized routes</p>
          </div>
          <div className="bg-white/30 rounded-lg p-4 backdrop-blur-md border border-white/20">
            <p className="text-sm mb-1 opacity-90">Fuel Savings</p>
            <p className="text-2xl font-bold text-green-300">$12,450</p>
            <p className="text-xs mt-1 opacity-80">Through optimization</p>
          </div>
        </div>
      </div>
    </div>
  );
}
