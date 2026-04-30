import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createRequest } from "../services/maintainanceService";
import GoBackButton from "../components/GoBackButton";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Lease() {

  const { user } = useAuth();
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issueText, setIssueText] = useState({});

  const fetchLeases = async (userId) => {
    try {
      console.log("Fetching leases...");

      const res = await fetch(
        `${API_URL}/api/leases?userId=${userId}`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Lease request failed (${res.status})`);
      }

      const data = await res.json();
      
      console.log("Leases data:", data.leases);
      if (data.leases?.[0]) {
        console.log("First lease:", data.leases[0]);
      }
        
      setLeases(Array.isArray(data.leases) ? data.leases : []);

    } catch (err) {
      console.error("Lease fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async (leaseId, propertyID) => {
  const issue = issueText[leaseId];

  if (!issue || issue.trim() === "") {
    alert("Please enter an issue");
    return;
  }

  try {
    console.log("MAINTENANCE PAYLOAD:", {
      propertyID,
      issue,
    });

    const res = await createRequest({
      propertyID,
      issue,
    });

    if (res.success) {
      alert("Issue reported successfully");

      // clear input for that lease
      setIssueText((prev) => ({
        ...prev,
        [leaseId]: "",
      }));
    } else {
      alert(res.message || "Failed to report issue");
    }

   } catch (err) {
    console.error("Maintenance error:", err);
    alert("Error submitting issue");
   }
  };

  useEffect(() => {
    console.log("Lease useEffect, user:", user);
    if (!user?._id) return;
    fetchLeases(user._id);
  }, [user?._id]);

  if (loading) return <p>Loading leases...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <GoBackButton fallback="/dashboard" />
        <h1 className="text-2xl font-bold">
          My Lease Agreements
        </h1>
      </div>

      {leases.length === 0 && (
        <p className="text-gray-500">
          No active leases found.
        </p>
      )}

      <div className="grid gap-4">

        {leases.map((lease) => (
          <div
            key={lease._id}
            className="bg-white shadow rounded-lg p-5 space-y-3"
          >

            <h1 className="text-2xl font-bold text-center">
              Rental Lease Agreement
            </h1>

            <div className="p-3 bg-gray-50 rounded">
              <h2 className="font-semibold mb-1">Tenant Details</h2>
              <p>Name: {user?.name}</p>
              <p>Phone: {user?.phoneNumber}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <h2 className="font-semibold mb-1">Property Details</h2>
              <p>Title: {lease.propertyId?.Title || "N/A"}</p>
              <p>Location: {lease.propertyId?.location || "N/A"}</p>
              <p>Rent: KES {lease.propertyId?.price}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <h2 className="font-semibold mb-1">Landlord Details</h2>
              {lease.propertyId?.landlordID ? (
                <>
                  <p>Name: {lease.propertyId.landlordID.name || "N/A"}</p>
                  <p>Phone: {lease.propertyId.landlordID.phoneNumber || "N/A"}</p>
                </>
              ) : (
                <p className="text-red-600">Landlord information not available. Property may not have landlord assigned.</p>
              )}
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-green-600">{lease.status}</span>
              </p>

              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {lease.isPaid ? "Paid" : "Pending"}
              </p>

              <p>
                <span className="font-semibold">Start Date:</span>{" "}
                {new Date(lease.createdAt).toDateString()}
              </p>
            </div>

            <div className="mt-2 p-3 bg-gray-100 rounded text-sm text-gray-600">
              <p>
                This lease confirms that the tenant agrees to pay rent monthly
                and maintain the property in good condition as agreed with the landlord.
              </p>
            </div>

            {/* MAINTENANCE */}
           <div className="mt-3 p-3 bg-gray-50 rounded">

             <h2 className="font-semibold mb-2">Report Issue</h2>

           <input
             type="text"
             placeholder="Describe issue..."
             value={issueText[lease._id] || ""}
             onChange={(e) =>
             setIssueText({
             ...issueText,
             [lease._id]: e.target.value,
            })
           }
           className="border p-2 w-full mb-2"
          />

          <button
            onClick={() =>
            handleReport(lease._id, lease.propertyId?._id)
          }
           className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Submit Issue
          </button>

        </div>

          </div>
        ))}

      </div>
    </div>
  );
}