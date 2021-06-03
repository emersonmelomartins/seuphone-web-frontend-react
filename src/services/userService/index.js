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
  return await api.put(`/${route}/${form.id}/address`, form);
}

export async function ResetUserPassword(form) {
  return await api.put(`/${route}/password/reset`, form);
}

export async function UpdateUserPassword(form) {
  return await api.put(`/${route}/${form.userid}/password`, form);
}
