import api from "./api";

// Create Order
export const createOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);

  return data;
};

// Get My Orders
export const getMyOrders = async () => {
  const { data } = await api.get("/orders/myorders");

  return data;
};
