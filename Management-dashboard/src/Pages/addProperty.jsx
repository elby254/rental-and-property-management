import { useState } from "react";
import PropertyForm from "../components/PropertyForm";
import GoBackButton from "../components/GoBackButton";

export default function AddProperty() {
  // store all created properties (temporary frontend state)
  const [properties, setProperties] = useState([]);

  // handle create property
  const handleAddProperty = (data) => {
    // simulate backend ID
    const newProperty = {
      ...data,
      _id: Date.now(),
      isAvailable: true // default value
    };

    // add to list
    setProperties((prev) => [...prev, newProperty]);

    console.log("Property added:", newProperty);
  };

  return (
    <div className="p-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <GoBackButton fallback="/dashboard" />
        <h1 className="text-2xl font-bold">
          Add New Property
        </h1>
      </div>

      {/* PROPERTY FORM */}
      <PropertyForm
        onSubmit={handleAddProperty}
        initialData={null} // explicitly create mode 
      />

      {/* PREVIEW LIST (optional but useful for testing) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        {properties.map((property) => (
          <div key={property._id} className="border p-3 rounded">
            <h3 className="font-bold">{property.Title}</h3>
            <p>KES {property.price}</p>
            <p>{property.location}</p>
          </div>
        ))}

      </div>

    </div>
  );
}