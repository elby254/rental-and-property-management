import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN — store user from successful login response
  const login = (data) => {
    setUser(data.user);
  };

  // LOGOUT — clear cookie session on server then clear local state
  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Logout error:", error.message);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  // FETCH USER FROM COOKIE SESSION on initial load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/profile`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// SAFE HOOK — throws if used outside AuthProvider
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};