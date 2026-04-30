export const payRent = async (data) => {
  const res = await fetch("http://localhost:3000/api/payments/pay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const usePaymentService = () => {
  const initiatePayment = async (data) => {
    // Assuming data has amount and phone, but for lease, need property
    // This might not create lease
    return await payRent(data);
  };

  return { initiatePayment };
};