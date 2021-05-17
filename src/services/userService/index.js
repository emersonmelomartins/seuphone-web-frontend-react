import api from "../api";
const route = "users";


export async function UserAuthenticate(authenticateForm) {
  return await api.post(`/${route}/authenticate`, authenticateForm);
}

export async function GetUser(id) {
  return await api.get(`/${route}/${id}`);
}

export async function CreateUser(form) {
  return await api.post(`/${route}`, form);
}

export async function UpdateUserAddress(form) {
  return await api.put(`/${route}`, form);
}
