// sets up routing for the app
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import Properties from "./Pages/Properties";
import PropertyDetails from "./Pages/PropertyDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Lease from "./Pages/Lease";
import LandlordDashboard from "./Pages/LandlordDashboard";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
         
        <Route
          path="/dashboard/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />

      {/* LEASE AGREEMENTS */}
      <Route path="/lease" element={<Lease />} />     

      {/* PROPERTY DETAILS */}
      <Route path="/property/:id" element={<PropertyDetails />} />

      {/* LANDLORD DASHBOARD */}
      <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
         
   </Routes>
  );
}