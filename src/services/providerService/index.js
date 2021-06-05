import api from "../api";
const route = "providers";


export async function GetAllProviders() {
  return await api.get(`/${route}`);
}

export async function GetProvider(id) {
  return await api.get(`/${route}/${id}`);
}
