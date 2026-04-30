import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { payRent } from "../services/paymentService";
import GoBackButton from "../components/GoBackButton";

export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  // FETCH PROPERTY
  const fetchProperty = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/properties/${id}`);
      const data = await res.json();
      setProperty(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  // BOOK PROPERTY
  const handleBook = async () => {
    if (!user) return;

    try {
      setBooking(true);

      const res = await fetch(`http://localhost:3000/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          propertyId: id,
          userId: user._id || user.id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBooked(true);
        alert("Booking successful!");
        fetchProperty();
      } else {
        alert(data.message || "Booking failed");
      }

    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setBooking(false);
    }
  };

  // PAYMENT
const handlePayment = async () => {
  if (!user || !property) return;

  try {
    setPaying(true);

    const payload = {
      tenantID: user._id || user.id,
      propertyID: property._id,
      phone: user.phoneNumber || user.phone || user.contact,
      amount: property.price || property.Price,
    };

    console.log("PAYMENT PAYLOAD:", JSON.stringify(payload, null, 2));

    const data = await payRent(payload);

    if (data.success) {
      alert("Payment successful!");
    } else {
      alert(data.message || "Payment failed");
    }

  } catch (err) {
    console.error("Payment error:", err);
  } finally {
    setPaying(false);
  }
};

  // LOADING
  if (loading) return <p className="p-6">Loading...</p>;
  if (!property) return <p className="p-6">Property not found</p>;

  const image =
    property.images?.[0] || "https://via.placeholder.com/600";

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <GoBackButton fallback="/properties" />
        <h1 className="text-3xl font-bold">Property Details</h1>
      </div>

      {/* IMAGE */}
      <img
        src={image}
        alt="property"
        className="w-full h-80 object-cover rounded-xl shadow"
      />

      {/* DETAILS */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{property.Title}</h1>

        <p className="text-gray-600">{property.location}</p>

        <p className="text-green-600 text-xl font-bold">
          KES {property.price}
        </p>

        <span
          className={`inline-block px-3 py-1 text-sm rounded-full ${
            property.isAvailable
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {property.isAvailable ? "Available" : "Rented"}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-4 items-center">

        {/* BOOKING BUTTON */}
        {user?.role === "tenant" && property.isAvailable && !booked && (
          <button
            onClick={handleBook}
            disabled={booking}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            {booking ? "Booking..." : "Book Property"}
          </button>
        )}

        {/* BOOKED STATE */}
        {booked && (
          <span className="text-green-600 font-medium">
            ✔ Property booked
          </span>
        )}

        {/* PAYMENT BUTTON */}
        {user && (
          <button
            onClick={handlePayment}
            disabled={paying}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {paying ? "Processing..." : "Pay Rent"}
          </button>
        )}

      </div>

    </div>
  );
}