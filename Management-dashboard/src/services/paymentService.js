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