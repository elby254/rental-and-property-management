// show payment record
export default function PaymentCard({ payment }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">

      {/* AMOUNT */}
      <h2 className="text-lg font-bold">
        KES {payment.amount}
      </h2>

      {/* PHONE / TENANT */}
      <p className="text-gray-600">
          {payment.phone}
      </p>

      {/* STATUS */}
      <p
        className={`mt-2 font-semibold ${
          payment.status === "paid"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {payment.status}
      </p>

      {/* DATE */}
      <p className="text-sm text-gray-400 mt-1">
        {payment.date}
      </p>

    </div>
  );
}