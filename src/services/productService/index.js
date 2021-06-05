import api from "../api";
const route = "products";


export async function GetAllProduct(obj) {
  return await api.get(`/${route}?productName=${obj.productName ?? ""}&limit=${obj.limit ?? 0}`);
}

export async function GetProduct(id) {
  return await api.get(`/${route}/${id}`);
}
