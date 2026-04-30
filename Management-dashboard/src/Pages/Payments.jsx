import { useState } from "react";
import { usePaymentService } from "../services/paymentService";
import GoBackButton from "../components/GoBackButton";

export default function Payment() {
  const [form, setForm] = useState({
    amount: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { initiatePayment } = usePaymentService();

  // handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await initiatePayment({
        amount: Number(form.amount),
        phone: form.phone
      });

      if (!res.success) {
        setMessage(res.message || "Payment failed");
        return;
      }

      setMessage("Payment request sent successfully");

      setForm({ amount: "", phone: "" });

    } catch (err) {
      console.error("Payment error:", err);
      setMessage("Something went wrong ");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-lg">
        <GoBackButton fallback="/dashboard" />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full mt-4"
        >

        <h1 className="text-xl font-bold mb-4">
          Pay Rent 
        </h1>

        {/* AMOUNT */}
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        {/* PHONE */}
        <input
          name="phone"
          placeholder="Phone (07xx...)"
          value={form.phone}
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        {/* STATUS MESSAGE */}
        {message && (
          <p className="text-sm text-center mb-2 text-gray-700">
            {message}
          </p>
        )}

        {/* BUTTON */}
        <button
          disabled={loading}
          className="bg-purple-600 text-white w-full py-2 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

      </form>

    </div>
  </div>
  );
}