import api from "./api";

// Add Product
export const addToCart = async (productId, quantity = 1) => {
  const { data } = await api.post("/cart", {
    productId,
    quantity,
  });

  return data;
};

// Get Cart
export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};
export const updateQuantity = async (productId, quantity) => {
  const { data } = await api.put(`/cart/${productId}`, {
    quantity,
  });

  return data;
};

export const removeItem = async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);

  return data;
};
