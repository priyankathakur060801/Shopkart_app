import api from "./api";

// Get all products
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Get single product
export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Add product
export const addProduct = async (formData) => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update product
export const updateProduct = async (id, formData) => {
  const response = await api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
