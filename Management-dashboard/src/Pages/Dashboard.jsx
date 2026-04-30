import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import PropertyFormDialog from "@/components/PropertyFormDialog";
import GoBackButton from "@/components/GoBackButton";
import DashboardLayout from "@/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    rented: 0,
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/properties", {
        credentials: "include",
      });

      const data = await res.json();

      setProperties(data);

      setStats({
        total: data.length,
        available: data.filter((p) => p.isAvailable).length,
        rented: data.filter((p) => !p.isAvailable).length,
      });

    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Delete failed");
      }

      fetchProperties();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.Title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "available"
        ? p.isAvailable
        : !p.isAvailable;

    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <GoBackButton fallback="/dashboard" />
            <h1 className="text-2xl font-bold">
              Dashboard Overview
            </h1>
          </div>

          {/* LANDLORD ONLY */}
          {user?.role === "landlord" && (
            <PropertyFormDialog
              onSuccess={fetchProperties}
              editingProperty={editingProperty}
              setEditingProperty={setEditingProperty}
            />
          )}

        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-3 justify-between">

          <input
            className="border p-2 rounded w-full md:w-1/2"
            placeholder="Search by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded w-full md:w-48"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </select>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h2>Total Properties</h2>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h2>Available</h2>
            <p className="text-xl font-bold">{stats.available}</p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded-lg">
            <h2>Rented</h2>
            <p className="text-xl font-bold">{stats.rented}</p>
          </div>

        </div>

        {/* TABLE */}
        <div className="rounded-md border bg-white overflow-x-auto">

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {loading && (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              )}

              {!loading && filteredProperties.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>No properties found</TableCell>
                </TableRow>
              )}

              {filteredProperties.map((property) => (
                <TableRow key={property._id}>

                  {/* IMAGE */}
                  <TableCell>
                    <img
                      src={
                        property.images?.[0] ||
                        "https://via.placeholder.com/80"
                      }
                      alt="property"
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </TableCell>

                  <TableCell>{property.Title}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>KES {property.price}</TableCell>

                  <TableCell>
                    {property.isAvailable ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-600">Rented</span>
                    )}
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right">

                    {user?.role === "landlord" ? (
                      <div className="flex flex-col sm:flex-row gap-2 justify-end">

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProperty(property)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(property._id)}
                        >
                          Delete
                        </Button>

                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">
                        View only
                      </span>
                    )}

                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </div>

      </div>

    </DashboardLayout>
  );
}