import api from "../api";
const route = "products";


export async function GetAllProduct() {
  return await api.get(`/${route}`);
}

export async function GetProduct(id) {
  return await api.get(`/${route}/${id}`);
}
