const BASE_URL = "http://localhost:3000";

export const getLandlordDashboard = async () => {
  const res = await fetch(`${BASE_URL}/api/leases/landlord-dashboard`, {
    credentials: "include",
  });

  return res.json();
};