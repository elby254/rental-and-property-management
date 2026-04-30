console.log("HOME RENDERED");

// landing page for the app (UI page for the app)
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <header className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

          <h1 className="text-lg font-bold">
            Rental Management
          </h1>

          <div className="flex gap-3 items-center">

          {user && user.name ? (
           <>

          <LogoutButton />
           </>
          ) : (
          <>
          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/register")}>
            Register
          </button>
          </>
        )}
      
         </div>

        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[500px] flex items-center justify-center text-center">

        <img
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-white px-4">

          <h2 className="text-5xl font-bold">
            Find Your Perfect Home
          </h2>

          <p className="mt-3 text-gray-200">
            Sign in to access available rental listings
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-3 bg-white text-black rounded-lg font-medium"
          >
            Get Started
          </button>

        </div>

      </section>

      {/* INFO SECTION */}
      <section className="max-w-4xl mx-auto text-center py-16 px-4">

        <h3 className="text-2xl font-bold mb-4">
          Secure Property Access
        </h3>

        <p className="text-gray-600">
          All property listings are private and only accessible to authenticated users.
          Please log in or register to continue.
        </p>

      </section>

    </div>
  );
}