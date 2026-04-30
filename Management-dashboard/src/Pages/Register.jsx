import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/authService";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    role: "tenant",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ BASIC VALIDATION (prevents bad DB data)
    if (!form.name || !form.phoneNumber || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser(form);

      console.log("REGISTER RESPONSE:", data);

      if (!data.success) {
        alert(data.message || "Register failed");
        return;
      }

      // ✅ AUTO LOGIN AFTER REGISTER
      login(data.user);

      // ✅ GO TO DASHBOARD
      navigate("/dashboard");

    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <Card className="w-full max-w-sm p-6 space-y-4 shadow-lg">

        <h1 className="text-xl font-bold text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <Label>Role</Label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <input type="hidden" name="role" value="tenant" />
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>

        </form>

      </Card>

    </div>
  );
}