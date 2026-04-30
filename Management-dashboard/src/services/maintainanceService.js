const BASE_URL = "http://localhost:3000";

// CREATE
export const createRequest = async (data) => {
  const res = await fetch(`${BASE_URL}/api/maintenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
};

// GET
export const getRequests = async () => {
  const res = await fetch(`${BASE_URL}/api/maintenance`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

// UPDATE
export const updateRequest = async (id, status) => {
  const res = await fetch(`${BASE_URL}/api/maintenance/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  return res.json();
};