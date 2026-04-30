import { useState } from "react";
import { useEffect } from "react";

export default function PropertyForm({onSubmit, initialData}) {
    const [form, setForm] = useState({Title: "", price: "", location: "", images: ""});    // state to hold form data

//  When editing, preload data into form (edit form)
  useEffect(() => {
    if (initialData) {
      setForm({
        Title: initialData.Title || "",
        price: initialData.price || "",
        location: initialData.location || "",
 // convert array → string for image input
        images: initialData.images
          ? initialData.images.join(", ")
          : ""
      });
    }
  }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;     // destructure name and value from event target
        setForm(f => ({...f, [name]: value}));     // update form state with new value
    };

    function handleSubmit(e){
        e.preventDefault();
        if(!form.Title || !form.price || !form.location) return;

        onSubmit({
    ...form,                         // spread operator copy pastes form state
    price: parseInt(form.price) || 0,    // convert price to integer,number
    images: form.images
      ? form.images.split(",").map(img => img.trim())  // convert images string to array 
      : []  
    });

//  reset only if creating (not editing || create form)
    if (!initialData) {
      setForm({ Title: "", price: "", location: "", images: "" });
    }
  }

    return(
        <form onSubmit={handleSubmit} className="flex flex-wrap border rounded-lg p-4 bg-white gap-4">
            <input
                name="Title"
                value={form.Title}
                onChange={handleChange}      // eventhandler function to update form
                placeholder="Title"
                className="border rounded-lg px-3 py-2 flex-1"/>

            <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}       // eventhandler function
                placeholder="Price"
                className="border rounded-lg px-3 py-2 flex-1"/>

            <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="border rounded-lg px-3 py-2 flex-1"/>

            <input
                name="images"
                value={form.images}
                onChange={handleChange}
                placeholder="Images"
                className="border rounded-lg px-3 py-2 flex-1"/>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              {initialData ? "Update" : "Add"}
            </button>
        </form>
    );           
}