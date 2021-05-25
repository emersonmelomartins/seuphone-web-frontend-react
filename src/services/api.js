import axios from "axios";

export const baseURL =  'https://localhost:44361/api' // local
//export const baseURL =  "http://api.emersonmelomartins.dev.br/api", // cloud

const api = axios.create({
  baseURL
});

api.interceptors.request.use(async (config) => {
  const storagedUser = localStorage.getItem("@Seuphone::user");

  if (storagedUser !== null) {
    const { token } = JSON.parse(localStorage.getItem("@Seuphone::user"));

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
