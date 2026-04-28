import { useState } from "react";
import {
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const tickets = [
    {
      id: "TKT-1245",
      customer: "John Smith",
      email: "john@example.com",
      subject: "Delayed shipment inquiry",
      priority: "High",
      status: "In Progress",
      created: "2026-04-28",
      rating: null,
    },
    {
      id: "TKT-1244",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Product quality concern",
      priority: "Medium",
      status: "Resolved",
      created: "2026-04-27",
      rating: 5,
    },
    {
      id: "TKT-1243",
      customer: "Mike Brown",
      email: "mike@example.com",
      subject: "Invoice discrepancy",
      priority: "Low",
      status: "Pending",
      created: "2026-04-27",
      rating: null,
    },
    {
      id: "TKT-1242",
      customer: "Emily Davis",
      email: "emily@example.com",
      subject: "Order cancellation request",
      priority: "High",
      status: "Resolved",
      created: "2026-04-26",
      rating: 4,
    },
    {
      id: "TKT-1241",
      customer: "David Wilson",
      email: "david@example.com",
      subject: "Missing items in delivery",
      priority: "High",
      status: "In Progress",
      created: "2026-04-26",
      rating: null,
    },
  ];

  const satisfactionData = [
    { month: "Jan", rating: 4.2, resolved: 89 },
    { month: "Feb", rating: 4.4, resolved: 92 },
    { month: "Mar", rating: 4.3, resolved: 90 },
    { month: "Apr", rating: 4.6, resolved: 94 },
    { month: "May", rating: 4.5, resolved: 93 },
    { month: "Jun", rating: 4.7, resolved: 96 },
  ];

  const ticketsByCategory = [
    { category: "Shipping", count: 45 },
    { category: "Product Quality", count: 32 },
    { category: "Billing", count: 28 },
    { category: "Returns", count: 25 },
    { category: "Other", count: 15 },
  ];

  const statuses = ["all", "Pending", "In Progress", "Resolved"];

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = tickets.filter((t) => t.status === "Pending").length;
  const inProgressCount = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;
  const avgRating =
    tickets.filter((t) => t.rating).reduce((sum, t) => sum + (t.rating || 0), 0) /
    tickets.filter((t) => t.rating).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Support & Feedback</h1>
        <p className="text-gray-600 mt-1">Manage support tickets and track customer satisfaction</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{resolvedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets by ID, customer, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "All Status" : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-blue-600">{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-gray-900">{ticket.customer}</p>
                      <p className="text-sm text-gray-500">{ticket.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{ticket.subject}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : ticket.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : ticket.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {ticket.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.rating ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-gray-900">{ticket.rating}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Satisfaction Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Avg Rating"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tickets by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tickets by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketsByCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Tickets" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white border border-white/10">
        <h3 className="text-xl font-semibold mb-4">Support Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/30 rounded-lg p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <p className="text-sm">Resolution Rate</p>
            </div>
            <p className="text-3xl font-bold">96%</p>
            <p className="text-xs mt-1 opacity-90">+4% from last month</p>
          </div>
          <div className="bg-white/30 rounded-lg p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <p className="text-sm">Avg Response Time</p>
            </div>
            <p className="text-3xl font-bold">2.4h</p>
            <p className="text-xs mt-1 opacity-90">18% faster than target</p>
          </div>
          <div className="bg-white/30 rounded-lg p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5" />
              <p className="text-sm">Customer Satisfaction</p>
            </div>
            <p className="text-3xl font-bold text-yellow-300">4.7/5</p>
            <p className="text-xs mt-1 opacity-90">Excellent rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
