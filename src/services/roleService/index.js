import api from "../api";
const route = "roles/admin";

export async function GetAllRoles() {
  return await api.get(`/${route}`);
}