import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { api } from "../api";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Users,
  BarChart3,
  Brain,
  Leaf,
  MessageSquare,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Database,
} from "lucide-react";

export function DashboardLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user_name");
    if (!user && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [location, navigate]);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await api.checkHealth();
      setIsBackendConnected(connected);
    };
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/inventory", label: "Inventory", icon: Package },
    { path: "/orders", label: "Orders", icon: ShoppingCart },
    { path: "/shipments", label: "Shipments", icon: Truck },
    { path: "/suppliers", label: "Suppliers", icon: Users },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/demand-prediction", label: "AI Predictions", icon: Brain },
    { path: "/sustainability", label: "Sustainability", icon: Leaf },
    { path: "/support", label: "Support", icon: MessageSquare },
  ];

  const notifications = [
    { id: 1, type: "warning", message: "Low stock alert: Product #A123", time: "5 min ago" },
    { id: 2, type: "info", message: "New order received #ORD-4521", time: "15 min ago" },
    { id: 3, type: "danger", message: "Delayed shipment: #SHP-7832", time: "1 hour ago" },
    { id: 4, type: "success", message: "Shipment delivered: #SHP-7801", time: "2 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white shadow-xl w-64`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">SmartChain</h1>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${
                    isBackendConnected === null ? "bg-gray-400" : 
                    isBackendConnected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : 
                    "bg-red-500 animate-pulse"
                  }`}></div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    {isBackendConnected === null ? "Connecting..." : 
                     isBackendConnected ? "SQL Connected" : "SQL Offline"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@smartchain.com</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("user_name");
                navigate("/login");
              }}
              className="flex items-center gap-2 px-4 py-2 mt-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, orders, shipments..."
                  className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notif.type === "warning"
                                  ? "bg-yellow-500"
                                  : notif.type === "danger"
                                  ? "bg-red-500"
                                  : notif.type === "success"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
