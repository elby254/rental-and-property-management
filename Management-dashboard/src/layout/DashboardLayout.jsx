import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If not logged in, redirect to login page
  if (!user) {
    navigate("/login");
    return null;
  }  

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        <div className="w-full bg-white shadow px-4 py-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900">Overview</h1>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 text-sm">
              <a
                href="mailto:support@rentalapp.com"
                className="text-blue-600 hover:text-blue-800 underline"
                aria-label="Email support"
              >
                Email Support
              </a>
              <a
                href="tel:+254700000000"
                className="text-blue-600 hover:text-blue-800 underline"
                aria-label="Call support"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* TOP BAR */}
        <div className="w-full flex justify-end items-center px-4 py-3 bg-white shadow">

          {user && (
            <div className="flex items-center gap-3">

              {/* USER NAME */}
              <span className="text-sm text-gray-700 font-medium">
                {user.name}
              </span>

              {/* ROLE BADGE */}
              <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                {user.role}
              </span>

            </div>
          )}

        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>

        </main>

      </div>
    </div>
  );
}