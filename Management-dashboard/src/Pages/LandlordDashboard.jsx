import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getLandlordDashboard } from "../services/leaseService";
import GoBackButton from "../components/GoBackButton";

export default function LandlordDashboard() {
  const { user } = useAuth();
  const [leases, setLeases] = useState([]);

   const fetchData = async () => {
  const res = await fetch("http://localhost:3000/api/leases/landlord-dashboard", {
    credentials: "include"
  });

  console.log("STATUS:", res.status);

  const data = await res.json();
  console.log("DATA:", data);

  setLeases(data.leases || []);
};

  useEffect(() => {
    if (user?.role === "landlord") {
      fetchData();
    }
  }, [user]);

  if (user?.role !== "landlord") {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <GoBackButton fallback="/dashboard" />
        <p className="p-6">Access denied</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <GoBackButton fallback="/dashboard" />
        <h1 className="text-2xl font-bold">
          Landlord Dashboard
        </h1>
      </div>

      {leases.length === 0 && (
        <p>No tenants yet</p>
      )}

      <div className="grid gap-4">

        {leases.map((lease) => (
          <div
            key={lease._id}
            className="bg-white p-5 rounded-lg shadow space-y-2"
          >

            <h2 className="text-lg font-semibold">
              {lease.propertyId?.Title}
            </h2>

            <p><b>Location:</b> {lease.propertyId?.location}</p>
            <p><b>Rent:</b> KES {lease.propertyId?.price}</p>

            <hr />

            <p><b>Tenant:</b> {lease.userId?.name}</p>
            <p><b>Phone:</b> {lease.userId?.phoneNumber}</p>

            <hr />

            <p>
              <b>Status:</b>{" "}
              <span className="text-green-600">{lease.status}</span>
            </p>

            <p>
              <b>Payment:</b>{" "}
              {lease.isPaid ? "Paid" : "Pending"}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}