const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const loginUser = async (form) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Required for cookie-based sessions
    body: JSON.stringify({
      phoneNumber: form.phoneNumber.trim(),
      password: form.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message || "Login failed." };
  }

  return { success: true, ...data };
};

export const registerUser = async (form) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Required for cookie-based sessions
    body: JSON.stringify({
      name: (form.name || `${form.firstName || ""} ${form.lastName || ""}`).trim(),
      phoneNumber: form.phoneNumber?.trim(),
      password: form.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message || "Registration failed." };
  }

  return { success: true, ...data };
};
