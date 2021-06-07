import api from "../api";
const route = "products";


export async function GetAllProduct(obj) {
  return await api.get(`/${route}?productName=${obj.productName ?? ""}&limit=${obj.limit ?? 0}`);
}

export async function GetAllProductAdmin() {
  return await api.get(`/${route}/admin`);
}

export async function CreateProduct(form){
  return await api.post(`/${route}`, form);
}

export async function UpdateProduct(form, idProduct) {
  return await api.put(`/${route}/${idProduct}`, form);
}

export async function DeleteProduct(idProduct) {
  return await api.delete(`/${route}/${idProduct}`);
}

export async function GetProduct(id) {
  return await api.get(`/${route}/${id}`);
}
