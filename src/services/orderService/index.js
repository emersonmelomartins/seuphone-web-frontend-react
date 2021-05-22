import api from "../api";
const route = "orders";

export async function GetOrder(id) {
  return await api.get(`/${route}/${id}`);
}

export async function GetAllOrderByUser(id) {
  return await api.get(`/${route}/user/${id}`);
}

export async function CreateOrder(form) {
  return await api.post(`/${route}`, form);
}
