import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property, onEdit, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isOwner =
    user?.role === "landlord" &&
    property.landlordID?.toString() === user._id;

  const image =
    property.images && property.images.length > 0
      ? property.images[0]
      : "https://via.placeholder.com/300";

  const isPayDisabled = !property.isAvailable;
  const payLabel = property.isAvailable ? "Pay Rent" : "Already Paid";

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

        <div className="flex flex-wrap gap-2 pt-3">
          {user?.role === "tenant" && (
            <>
              {property.isAvailable ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/property/${property._id}`);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Book Property
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isPayDisabled) return;
                    navigate(`/property/${property._id}`);
                  }}
                  disabled={isPayDisabled}
                  className={`px-3 py-1 rounded text-sm ${isPayDisabled ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
                >
                  {payLabel}
                </button>
              )}
            </>
          )}

          {user?.role === "landlord" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isOwner) return;
                  onEdit(property);
                }}
                disabled={!isOwner}
                className={`px-3 py-1 rounded text-sm ${isOwner ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-yellow-200 text-yellow-800 cursor-not-allowed"}`}
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isOwner) return;
                  onDelete(property._id);
                }}
                disabled={!isOwner}
                className={`px-3 py-1 rounded text-sm ${isOwner ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-200 text-red-800 cursor-not-allowed"}`}
              >
                Delete
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
}