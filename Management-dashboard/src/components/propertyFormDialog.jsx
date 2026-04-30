import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PropertyFormDialog({
  onSuccess,
  editingProperty,
  setEditingProperty,
}) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    Title: "",
    price: "",
    location: "",
    isAvailable: true,
    images: "",
  });

  useEffect(() => {
    if (editingProperty) {
      setForm({
        Title: editingProperty.Title || "",
        price: editingProperty.price || "",
        location: editingProperty.location || "",
        isAvailable: editingProperty.isAvailable,
        images: editingProperty.images?.join(",") || "",
      });
      setOpen(true);
    }
  }, [editingProperty]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 HARD GUARD (extra safety)
    if (user?.role !== "landlord") {
      toast.error("Only landlords can perform this action");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      images: form.images ? form.images.split(",") : [],
    };

    try {
      const url = editingProperty
        ? `http://localhost:3000/api/properties/${editingProperty._id}`
        : "http://localhost:3000/api/properties";

      const method = editingProperty ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save property");

      toast.success(
        editingProperty
          ? "Property updated successfully"
          : "Property created successfully"
      );

      setOpen(false);
      setEditingProperty(null);

      setForm({
        Title: "",
        price: "",
        location: "",
        isAvailable: true,
        images: "",
      });

      onSuccess();

    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      {/* 🔐 ONLY LANDLORD SEES CREATE BUTTON */}
      {user?.role === "landlord" && (
        <DialogTrigger asChild>
          <Button onClick={() => setEditingProperty(null)}>
            + Add Property
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>
          <DialogTitle>
            {editingProperty ? "Edit Property" : "Add Property"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            name="Title"
            placeholder="Title"
            value={form.Title}
            onChange={handleChange}
          />

          <Input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />

          <Input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <Input
            name="images"
            placeholder="Image URLs (comma separated)"
            value={form.images}
            onChange={handleChange}
          />

          <Select
            value={form.isAvailable ? "true" : "false"}
            onValueChange={(val) =>
              setForm({ ...form, isAvailable: val === "true" })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Availability" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Rented</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">
            {editingProperty ? "Update Property" : "Create Property"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}