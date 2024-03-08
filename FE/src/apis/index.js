import API from "../config/axios";

export const getProducts = () => {
    return API.get("/products")
}

export const newProduct = (data) => {
  return API.post("/products", data);
};

export const updateProduct = (data) => {
  return API.put(`/products/${data.id}`, data);
};

export const searchProduct = (query) => {
  return API.get(`/products?search=${query}`);
};

export const delProduct = (id) => {
   return API.delete(`/products/${id}`);
};

export const newUser = (data) => {
  return API.post(`/users/`, data);
};

export const getUsers = () => {
  return API.get(`/users`);
};

export const updateUser = (data) => {
  return API.put(`/users/${data.email}`, data);
};