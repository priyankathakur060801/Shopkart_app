import api from "./api";

// Get all orders for admin

export const getAllOrders = async () => {
  const { data } = await api.get("/orders/admin/all");

  return data;
};

// Update order status

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(`/orders/admin/${id}`, {
    status,
  });

  return data;
};
