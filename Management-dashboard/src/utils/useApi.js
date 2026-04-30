// custom hook to handle API calls with JWT(api helper)
import { useAuth } from "../context/AuthContext";

export const useApi = () => {
  const { token } = useAuth();

  const api = async (url, options = {}) => {
    return fetch(`http://localhost:3000${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...options.headers
      }
    });
  };

  return api;
}; 