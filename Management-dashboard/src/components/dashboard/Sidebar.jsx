import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col justify-between p-4">

      {/* TOP SECTION */}
      <div>

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-6">
          Rental Admin
        </h2>

        {/* NAV LINKS */}
        <nav className="space-y-2">

          <Link
            to="/dashboard/properties"
            className={linkClass("/dashboard/properties")}
          >
            Properties
          </Link>

          <Link to="/lease" className={linkClass("/lease")}>
            My Lease
          </Link>

          <button onClick={() => navigate("/landlord-dashboard")}>
            Landlord Dashboard
          </button>

        </nav>

      </div>

      {/* BOTTOM SECTION */}
      
      <div className="space-y-3 text-sm text-gray-600">
          <hr />
        <p className="font-medium">Support</p>

        <div className="mt-6 border-t pt-4">
          <LogoutButton />
        </div>

      </div>

    </aside>
  );
}