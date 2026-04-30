// show login || logout link
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">

      {/* LOGO */}
      <h1 className="font-bold text-xl">
        RentalApp
      </h1>

      {/* LINKS */}
      <div className="flex gap-4">

        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        <Link to="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/properties" className="hover:text-blue-600">
          Properties
        </Link>

        <Link to="/payment" className="hover:text-blue-600">
          Payment
        </Link>

        <Link to="/login" className="text-red-500">
          Login
        </Link>

      </div>

    </nav>
  );
}