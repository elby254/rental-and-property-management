import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createRequest,
  getRequests,
  updateRequest,
} from "../services/maintenanceService";
import GoBackButton from "../components/GoBackButton";

export default function Maintenance() {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [issue, setIssue] = useState("");
  const [propertyID, setPropertyID] = useState("");

  const fetchData = async () => {
    const data = await getRequests();
    setRequests(data.requests || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    await createRequest({ propertyID, issue });
    setIssue("");
    fetchData();
  };

  const handleUpdate = async (id, status) => {
    await updateRequest(id, status);
    fetchData();
  };

  return (
    <div className="p-6 space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <GoBackButton fallback="/dashboard" />
        <h1 className="text-xl font-bold">Maintenance</h1>
      </div>

      {/* TENANT FORM */}
      {user?.role === "tenant" && (
        <div className="space-y-2">
          <input
            placeholder="Property ID"
            value={propertyID}
            onChange={(e) => setPropertyID(e.target.value)}
            className="border p-2 w-full"
          />

          <input
            placeholder="Describe issue..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="border p-2 w-full"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Request
          </button>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r._id} className="p-3 border rounded">

            <p><b>Issue:</b> {r.issue}</p>
            <p><b>Status:</b> {r.status}</p>

            {/* LANDLORD ACTION */}
            {user?.role === "landlord" && (
              <div className="space-x-2 mt-2">
                <button onClick={() => handleUpdate(r._id, "in-progress")}>
                  Start
                </button>

                <button onClick={() => handleUpdate(r._id, "resolved")}>
                  Resolve
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}