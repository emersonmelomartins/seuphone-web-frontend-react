import api from "../api";
const route = "orders";

export async function GetOrder(id) {
  return await api.get(`/${route}/${id}`);
}

export async function GetAllOrders(type) {
  return await api.get(`/${route}?orderType=${type}`);
}

export async function GetAllOrderByUser(id) {
  return await api.get(`/${route}/user/${id}`);
}

export async function UpdateOrderStatus(form) {
  return await api.put(`/${route}/${form.id}/order-status`, form);
}
