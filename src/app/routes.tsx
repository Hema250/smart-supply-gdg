import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Inventory } from "./components/Inventory";
import { Orders } from "./components/Orders";
import { Shipments } from "./components/Shipments";
import { Suppliers } from "./components/Suppliers";
import { Analytics } from "./components/Analytics";
import { DemandPrediction } from "./components/DemandPrediction";
import { Sustainability } from "./components/Sustainability";
import { Support } from "./components/Support";

// Reactive Auth Guard Component
const ProtectedRoute = () => {
  const isAuth = !!localStorage.getItem("user_name");
  return isAuth ? <DashboardLayout /> : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "inventory", Component: Inventory },
      { path: "orders", Component: Orders },
      { path: "shipments", Component: Shipments },
      { path: "suppliers", Component: Suppliers },
      { path: "analytics", Component: Analytics },
      { path: "demand-prediction", Component: DemandPrediction },
      { path: "sustainability", Component: Sustainability },
      { path: "support", Component: Support },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
