import api from "./api";

export const createPayment = async (amount) => {
  const { data } = await api.post("/payment/create", {
    amount,
  });

  return data;
};

export const verifyPayment = async (paymentData) => {
  const { data } = await api.post("/payment/verify", paymentData);

  return data;
};
