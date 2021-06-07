import api from "../api";
const route = "providers";


export async function GetAllProviders() {
  return await api.get(`/${route}`);
}

export async function CreateProvider(form) {
  return await api.post(`/${route}`, form);
}

export async function UpdateProvider(form, idProvider) {
  return await api.put(`/${route}/${idProvider}`, form);
}

export async function DeleteProvider(id) {
  return await api.delete(`/${route}/${id}`);
}

export async function GetProvider(id) {
  return await api.get(`/${route}/${id}`);
}
