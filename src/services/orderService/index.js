import api, { baseURL } from "../api";
import axios from 'axios';
const route = "orders";

export async function GetOrder(id) {
  return await api.get(`/${route}/${id}`);
}

export async function GetOrderPDF(id) {
  return await axios(`/${route}/${id}/pdf`, {
    method: 'GET',
            headers: {
          'Content-Type': 'application/pdf',
        },
        responseType: 'blob', 
    baseURL
});
}



export async function GetAllOrderByUser(id) {
  return await api.get(`/${route}/user/${id}`);
}

export async function CreateOrder(form) {
  return await api.post(`/${route}`, form);
}

