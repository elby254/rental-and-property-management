import { useEffect, useState } from "react";
import PropertyForm from "../components/PropertyForm";
import PropertyCard from "../components/PropertyCard";
import GoBackButton from "../components/GoBackButton";
import { useAuth } from "../context/AuthContext";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty
} from "../services/propertyService";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { user } = useAuth();

  // FETCH
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await getProperties();
      setProperties(data.data || data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // CREATE
  const handleCreate = async (data) => {
    try {
      await createProperty(data);
      fetchProperties();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // UPDATE
  const handleUpdate = async (data) => {
    try {
      await updateProperty(editing._id, data);
      setEditing(null);
      fetchProperties();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleSubmit = (data) => {
    if (editing) handleUpdate(data);
    else handleCreate(data);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);
      fetchProperties();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // FILTER ONLY BY LOCATION
  const filteredProperties = properties.filter((p) =>
    p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <GoBackButton fallback="/dashboard" />
          <h1 className="text-2xl font-bold">
            Manage Properties
          </h1>
        </div>

        {editing && (
          <button
            onClick={() => setEditing(null)}
            className="text-sm text-red-500 hover:underline"
          >
            Cancel Editing
          </button>
        )}

      </div>

      {/* SEARCH (TENANT FRIENDLY) */}
      <input
        type="text"
        placeholder="Search by location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* FORM ONLY FOR LANDLORD */}
      {user?.role === "landlord" && (
        <div className="bg-white p-4 rounded-xl shadow">
          <PropertyForm
            onSubmit={handleSubmit}
            initialData={editing}
          />
        </div>
      )}

      {/* CONTENT */}
      <div>

        {loading && (
          <p className="text-center text-gray-500">
            Loading properties...
          </p>
        )}

        {!loading && filteredProperties.length === 0 && (
          <p className="text-center text-gray-500">
            No properties found
          </p>
        )}

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

          {filteredProperties.map((p) => (
            <PropertyCard
              key={p._id}
              property={p}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}

        </div>

      </div>

    </div>
  );
}