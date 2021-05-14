import api from "../api";
const route = "products";


export async function GetAllProduct(productName) {
  return await api.get(`/${route}?productName=${productName}`);
}

export async function GetProduct(id) {
  return await api.get(`/${route}/${id}`);
}
