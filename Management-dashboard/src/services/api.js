import { useAuth } from "../context/AuthContext";

export const useApi = () => {
  const { token } = useAuth();
};

export const api = async (url, options = {}) => {
  return fetch(`http://localhost:3000/api${url}`, {
    ...options,
    credentials: "include", //  ALWAYS send cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};