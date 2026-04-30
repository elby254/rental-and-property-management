import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property, onEdit, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const image =
    property.images && property.images.length > 0
      ? property.images[0]
      : "https://via.placeholder.com/300";

  return (
    <div
      onClick={() => navigate(`/property/${property._id}`)}
      className="border rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition cursor-pointer"
    >

      {/* IMAGE */}
      <img
        src={image}
        alt={property.Title}
        className="w-full h-48 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        <h2 className="text-lg font-bold">
          {property.Title}
        </h2>

        <p className="text-gray-600 font-medium">
          KES {property.price}
        </p>

        <p className="text-gray-500 text-sm">
          {property.location}
        </p>

        {/* STATUS */}
        <span className={`inline-block text-xs px-2 py-1 rounded-full ${
          property.isAvailable
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}>
          {property.isAvailable ? "Available" : "Rented"}
        </span>

        {/* ONLY LANDLORD CAN SEE THIS */}
        {user?.role === "landlord" && (
          <div className="flex gap-2 pt-3">

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(property);
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(property._id);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>

          </div>
        )}

      </div>

    </div>
  );
}