const BASE_URL = "http://localhost:3000";

// REGISTER
export const registerUser = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  return res.json();
};

// LOGIN
export const loginUser = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  return res.json();
};

// PROFILE
export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/profile`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};