import { createBrowserRouter, Navigate } from "react-router";
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

// Simple Auth Check for Route Guarding
const isAuthenticated = () => !!localStorage.getItem("user_name");

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" replace />,
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
